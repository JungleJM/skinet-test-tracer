---
canonical_issue: gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/2
parent_prd: gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/1

status: ready
authority: execution_contract
snapshot_version: 1

feature: vikunja-kanban-viewer
feature_branch: feature/vikunja-kanban-viewer
agent_branch: agent/issue-2-fixture-board-shell
run_slug: issue-2-attempt-001
run_path: .tenet/runs/issue-2-attempt-001

model_tier: codex_first
risk_level: low

auto_merge_to_feature: false
manual_review_required: true

runner_retry_budget: 2
tenet_internal_max_retries: 0
tenet_invocation_mode: direct_registered_job

tenet_artifact_paths:
  spec: .tenet/runs/issue-2-attempt-001/spec.md
  scenarios: .tenet/runs/issue-2-attempt-001/scenarios.md
  harness: .tenet/runs/issue-2-attempt-001/harness.md
  decomposition: .tenet/runs/issue-2-attempt-001/decomposition.md
  interview: null

blocked_by: []
blocks:
  - 3
  - 4

proof_required: true
proof_type: playwright
e2e_surface: web_ui
playwright_layer1_required: true
playwright_layer2_required: false

forbidden_paths:
  - .env
  - .env.*
  - secrets/**
  - infra/prod/**

required_commands:
  - npm run build
  - npm test
  - npm run test:e2e
---

# Fixture-backed board shell

## Authority

If the parent PRD conflicts with this tracer issue, obey this tracer issue.
If this tracer issue conflicts with project architecture or testing doctrine, stop and report `scope_conflict`.
If generated Tenet run artifacts conflict with this file, obey this file and regenerate artifacts.

The PRD is planning context. This tracer issue and agent-issue snapshot are implementation authority.

## Baseline Boundary

The Vite React TypeScript and Playwright baseline already exists before this tracer starts.

Baseline commit:

```text
061dffdad01bdf927cee79c19521752a7f79c26f
```

Baseline setup is outside tracer success evidence.

This tracer may add feature code, fixture data, and feature tests. It must not rewrite the package manager, test runner, Playwright config shape, Vite config shape, or baseline smoke test semantics unless the baseline is proven wrong.

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

## Proof Expectations

- `npm run build` passes.
- `npm test` passes.
- `npm run test:e2e` passes.
- A Playwright feature test verifies project title, all three column titles, and at least one expected card under the expected column.
- A Playwright feature test fails if the app attempts a Vikunja/API request.
- The implementation does not require any secret or live service.

## Gitea Dependency State

- Canonical tracer issue: `gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/2`
- Parent epic issue: `gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/1`
- Blocks:
  - `gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/3`
  - `gitea://appliedsci.tail90eacc.ts.net/gitea_admin/skinet-test-tracer/issues/4`
