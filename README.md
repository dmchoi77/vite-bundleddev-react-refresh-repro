# Vite bundledDev React Fast Refresh repro

This is a minimal reproduction for a Vite 8 `experimental.bundledDev` issue.

With `bundledDev: true` and `@vitejs/plugin-react`, requesting
`/@react-refresh` returns the application's `index.html` instead of the React
Fast Refresh runtime JavaScript.

The same fixture works as expected when `experimental.bundledDev` is disabled.

## Environment

- Vite: 8.2.0
- `@vitejs/plugin-react`: 6.0.2
- React: 18.3.1
- Node.js: 22.12 or newer
- Package manager: npm

## Reproduce

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

In another terminal, request the React Fast Refresh endpoint:

```bash
curl -i http://127.0.0.1:5173/@react-refresh
```

### Actual result

The response is `200 OK` with an HTML content type, and the response body is
the application document:

```text
HTTP/1.1 200 OK
Content-Type: text/html
```

### Expected result

The endpoint should return the React Fast Refresh runtime JavaScript, or return
an explicit documented error if Fast Refresh is not supported in bundled dev
mode.

For comparison, change `bundledDev` to `false` in `vite.config.js` and repeat
the request. The endpoint returns JavaScript instead:

```text
HTTP/1.1 200 OK
Content-Type: text/javascript
```

This reproduces without Module Federation. Module Federation exposes the same
behavior when a React Remote's refresh proxy imports the Host's
`/@react-refresh` URL.
