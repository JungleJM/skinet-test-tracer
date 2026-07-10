# Spec

Generated from `docs/agent-issues/ISSUE-2.v1.md`.

Implement only the fixture-backed board shell.

The canonical issue is:

```text
gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/2
```

The parent PRD is planning context only:

```text
gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/1
```

The frozen agent issue is the execution contract for this attempt:

```text
docs/agent-issues/ISSUE-2.v1.md
```

The Vite React TypeScript + Playwright baseline already exists and is outside the tracer evidence boundary.

Baseline commit:

```text
061dffdad01bdf927cee79c19521752a7f79c26f
```

## Authority

If the parent PRD conflicts with this tracer issue, obey this tracer issue.
If this tracer issue conflicts with project architecture or testing doctrine, stop and report `scope_conflict`.
If generated Tenet run artifacts conflict with `docs/agent-issues/ISSUE-2.v1.md`, obey the agent issue and regenerate artifacts.

The PRD is planning context. The tracer issue and agent-issue snapshot are implementation authority.

## Intent

Render a read-only kanban board from checked-in fixture JSON.

Use an app-owned normalized fixture model, not raw Vikunja API JSON.

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

## Acceptance Criteria

- The app displays at least three columns from fixture data.
- At least one column displays at least two cards from fixture data.
- Card titles are visible.
- Optional assignee and due-date metadata are visible when present.
- The board is usable at desktop and mobile widths through horizontal scroll or stacked columns.
- The UI can be run locally without Vikunja credentials.
- No live Vikunja API request is made.
- No request is made to a Vikunja host or `/api/` path.

## Non-Goals

- No Vikunja API integration.
- No card editing.
- No drag and drop.
- No authentication flow.
- No project-selection UI.
- No card details modal.
- No filtering.
- No swimlanes, labels, comments, or attachments.
- No custom design system, animations, dark mode, or Vikunja branding fidelity.

## Tooling Boundary

This tracer may add feature code, fixture data, and feature tests.

This tracer must not rewrite the package manager, test runner, Playwright config shape, Vite config shape, or baseline smoke test semantics unless the baseline is proven wrong.
