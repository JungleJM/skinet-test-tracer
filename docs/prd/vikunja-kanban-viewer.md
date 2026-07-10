# Vikunja Kanban Viewer PRD

## Problem

An operator wants a quick read-only view of one Vikunja project as a kanban board without opening the full Vikunja UI. The first harness trial needs this feature to be small, deterministic, and safe to run from a clean clone.

## Goals

- Display one configured project as a read-only kanban board.
- Prove the first tracer with fixture data only.
- Keep the first tracer secret-free and independent of a live Vikunja instance.
- Provide stable build, unit, and Playwright proof commands for the harness.
- Keep the implementation small enough for one frozen agent issue and one Tenet job.

## Non-Goals

- No project-selection UI.
- No live Vikunja API call in the first tracer.
- No card editing.
- No drag and drop.
- No card details modal.
- No filtering.
- No swimlanes, labels, comments, or attachments.
- No custom design system, animations, dark mode, or Vikunja branding fidelity.
- No respec workflow in this first PRD/run.

## User Flow

1. As an operator, I open the app.
2. I see the configured project title.
3. I see the project's work arranged into kanban columns.
4. I can scan card titles and optional assignee/due-date metadata.
5. I can use the view at desktop and mobile widths.

## Implementation Decisions

- The baseline app is Vite + React + TypeScript with Vitest and Playwright.
- Codex created and committed the baseline before tracer work.
- Baseline setup is outside the tracer evidence boundary.
- Tracer 1 may add feature code, fixture data, and feature tests.
- Tracer 1 must not rewrite the package manager, test runner, Playwright config shape, Vite config shape, or baseline smoke test semantics unless the baseline is proven wrong.
- The first board model is app-owned and normalized rather than raw Vikunja API JSON.

```ts
type BoardFixture = {
  project: {
    id: string;
    title: string;
  };
  columns: Array<{
    id: string;
    title: string;
    cards: Array<{
      id: string;
      title: string;
      description?: string;
      assignee?: string;
      dueDate?: string;
    }>;
  }>;
};
```

## Tracer Bullets

### 1. Fixture-backed board shell

Render a read-only kanban board from checked-in fixture JSON.

Acceptance:

- The app displays at least three columns from fixture data.
- At least one column displays at least two cards from fixture data.
- Card titles are visible.
- Optional assignee and due-date metadata are visible when present.
- The board is usable at desktop and mobile widths through horizontal scroll or stacked columns.
- The UI can be run locally without Vikunja credentials.
- No live Vikunja API request is made.
- No request is made to a Vikunja host or `/api/` path.

### 2. Empty, loading, and error states

Add explicit empty, loading, and error states around board loading without calling Vikunja.

Acceptance:

- Empty fixture data renders a clear empty board state.
- Loading state is represented in the UI.
- Error state is represented in the UI.
- Existing fixture-backed board behavior remains intact.

Blocked by:

- Fixture-backed board shell

### 3. Live Vikunja read-only fetch

Load a configured Vikunja project through a read-only API path using environment-injected credentials.

Acceptance:

- Credentials are read only from environment or local ignored config.
- No credentials are committed.
- The app makes no write requests to Vikunja.
- Automated tests use mocked Vikunja API responses.
- Failure to reach Vikunja displays the error state from the previous tracer.
- The real self-hosted Vikunja instance is manual-smoke only.

Blocked by:

- Fixture-backed board shell
- Empty, loading, and error states

## Proof Plan

Baseline and tracer proof commands:

```bash
npm run build
npm test
npm run test:e2e
```

Tracer 1 Playwright proof must verify:

- project title is visible
- all three column titles are visible
- at least one expected card title is visible under the expected column
- no request is made to a Vikunja host or `/api/` path

## Baseline Setup

Codex created the Vite React TypeScript + Playwright baseline before tracer work.

Baseline setup is outside the tracer evidence boundary.

Baseline commit:

```text
061dffdad01bdf927cee79c19521752a7f79c26f
```

Baseline proof passed:

```bash
npm run build
npm test
npm run test:e2e
```

## Risks

- Tenet may not consume externally prepared shim artifacts as expected; that is tested later before implementation.
- A live Vikunja dependency would make early proof flaky, so live service access is postponed.
- If tracer requirements are unclear or conflict with project doctrine, the run should stop as `scope_conflict`.
