# Harness

## Required Commands

```bash
npm run build
npm test
npm run test:e2e
```

## Forbidden Paths

- `.env`
- `.env.*`
- `secrets/**`
- `infra/prod/**`

## Baseline Boundary

The Vite React TypeScript + Playwright baseline was created before this tracer.

Baseline commit:

```text
061dffdad01bdf927cee79c19521752a7f79c26f
```

Baseline setup is not part of tracer success evidence.

Tracer work may add feature code, fixture data, and feature tests. It must not rewrite the package manager, test runner, Playwright config shape, Vite config shape, or baseline smoke test semantics unless the baseline is proven wrong.

## Branch Policy

- Current agent branch: `agent/issue-2-fixture-board-shell`
- Feature branch: `feature/vikunja-kanban-viewer`
- Do not merge to `main`.
- Do not auto-merge.
- Manual review is required before merging to the feature branch.

## Retry Policy

- `tenet_internal_max_retries: 0`
- `runner_retry_budget: 2`

## Failure Policy

- If requirements are insufficient, contradictory, or conflict with project doctrine, stop and report `scope_conflict`.
- If required commands cannot run because the baseline harness is broken, stop and report `harness_bug`.
- If implementation requires a live Vikunja service or secret to satisfy this tracer, stop and report `scope_conflict`.
