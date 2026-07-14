# Scenarios

## Acceptance Scenarios

- Given checked-in board fixture data, when the app loads, then at least three board columns are visible.
- Given a column with at least two cards, when the board renders, then those card titles are visible under the correct column.
- Given optional card assignee and due-date metadata, when present, then the metadata is visible.
- Given no Vikunja credentials, when the app runs, then the fixture-backed board still renders.
- Given the app is rendering tracer 1, when Playwright observes network traffic, then no request is made to a Vikunja host or `/api/` path.
- Given a desktop viewport, when the board renders, then columns and card text are readable without overlap.
- Given a mobile viewport, when the board renders, then columns are reachable through horizontal scroll or a stacked layout.

## Anti-Scenarios

- The app must not call the live Vikunja API.
- The app must not require secrets.
- The app must not create, read, or require `.env` files.
- The app must not implement drag and drop or mutation behavior.
- The app must not add project selection.
- The app must not add card details modals, filtering, swimlanes, labels, comments, or attachments.
- The app must not rewrite baseline Vite or Playwright tooling unless the baseline is proven wrong.

## Proof Expectations

- `npm run build` passes.
- `npm test` passes.
- `npm run test:e2e` passes.
- A Playwright feature test verifies project title, all three column titles, and at least one expected card under the expected column.
- A Playwright feature test fails if the app attempts a Vikunja/API request.
- The implementation does not require any secret or live service.
