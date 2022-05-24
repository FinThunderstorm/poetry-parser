# poetry-parser - backend lambda

## Development

After making changes to API files, build changes with `sam build`.

With command `sam local start-api` is possible to start local version of backend on `http://localhost:3000`. If making changes no need to reload local API, just run `sam build` after changes.

## Unit tests

Unit tests made with Jest is possible to run with command `npm test` inside the `poetry-parser` folder. Remember to run `npm install` in the first time. With command `npm run test:coverage` is possible to printout testing coverage.

## Code styles

Eslint can check code style with command `npm run lint` and fix minor errors with `npm lint:fix`. Prettier fixes minor style fixes with command `npm run prettier`.
