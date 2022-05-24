# poetry-parser - frontend

## Development

For the first time, remember to run `npm install` to install all required packages.

Running frontend in development mode is possible with command `npm start` and development server starts in `http://localhost:3000`. When developing frontend, remember to start with env `REACT_APP_BACKEND_API=api-adress` to make API calls work.

## Unit tests

Unit tests made with testing library is possible to run with command `npm test`. With command `npm run test:coverage` is possible to printout testing coverage. At the same time is snapshot testing runned. Snapshots can be updated with command `npm run updatesnapshots`.

## Integration tests

Integration tests made with Cypress is possible to run with command `npm run test:e2e`. Cypress GUI can be opened with command `npm run cypress:open`.

## Code styles

Eslint can check code style with command `npm run lint` and fix minor errors with `npm lint:fix`. Prettier fixes minor style fixes with command `npm run prettier`.

## Building

Production build of application can be made with command `npm run build`.
