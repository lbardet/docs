# idOS documentation site

This website is built with [Docusaurus](https://docusaurus.io/). The canonical docs content lives one directory up, at the repository root. Docusaurus reads those markdown files directly through `docs.path: ".."` in `docusaurus.config.ts`.

## Installation

```bash
npm ci
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
