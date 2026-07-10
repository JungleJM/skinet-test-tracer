# Bug Report: Tenet Interaction E2E Cannot Bind Local Web Server

## Summary

Tenet's `interaction_e2e` critic could not start the app's local Playwright web server because the critic execution environment rejected local TCP listener binding on `127.0.0.1:5173` with `listen EPERM`.

This is recorded as an execution-provider environment issue for this tracer run. It is not recorded as proof that the app's E2E suite fails.

## Scope of This Report

This report is intentionally not produced through the full normal Tenet development process. The purpose is narrower:

- document an observed Tenet/Codex execution-environment failure;
- preserve reproduction steps and evidence for a future upstream Tenet issue;
- classify the current tracer's E2E result as external controller evidence rather than Tenet-native interaction proof.

The app implementation and tests remain governed by the frozen issue contract and the run harness. This note does not change the feature scope.

## Environment

- Repository: `skinet-test-tracer`
- Branch: `agent/issue-2-fixture-board-shell`
- Run artifact directory: `.tenet/runs/issue-2-attempt-001/`
- App stack: Vite, React, TypeScript, Playwright
- Playwright web server command: `npm run dev -- --host 127.0.0.1`
- Playwright URL: `http://127.0.0.1:5173`
- Execution provider under test: Tenet with Codex adapter

## Steps to Reproduce

1. In the tracer repository, ensure Tenet is initialized with Codex as the agent.
2. Register or run the Issue 2 Tenet job using `.tenet/runs/issue-2-attempt-001/register-job-draft.json`.
3. Let Tenet run the development job and then run evaluation critics for that job.
4. Observe the `interaction_e2e` critic output.

Expected result:

- Tenet's interaction critic can start the Playwright web server.
- `npm run test:e2e` runs inside the critic environment.
- The critic reports pass/fail based on browser-observed app behavior.

Actual result:

- Tenet's interaction critic cannot bind the local HTTP listener.
- The critic reports `listen EPERM` for `127.0.0.1:5173`.
- The E2E tests do not get a valid browser runtime in that Tenet critic context.

## Control Check

The same commands pass when run directly from the normal shell in this repository:

```bash
npm run build
npm test
npm run test:e2e
```

Observed direct-shell result for this tracer after remediation:

- build: passed
- unit tests: passed, 2 tests
- Playwright E2E: passed, 5 tests

## Tenet Evaluation Evidence

Final relevant critic statuses:

- `code_critic`: passed
- `test_critic`: passed
- `interaction_e2e`: failed because the browser proof runtime could not start a local web server

The interaction critic itself classified the problem as a sandbox/listener binding failure, not as a UI assertion failure.

## Current Classification

For Issue 2, mark Playwright evidence as:

```yaml
interaction_e2e:
  tenet_native_status: blocked
  blocker: execution_environment_listen_eperm
  external_controller_evidence: passed
  external_commands:
    - npm run build
    - npm test
    - npm run test:e2e
```

## Harness Implication

Until Tenet's critic execution environment can bind a local web server and launch browser proof reliably, SkiNet should not treat Tenet-native interaction E2E as a dependable provider capability.

For web UI tracers, the controller may still gather E2E evidence outside Tenet by running the deterministic proof commands directly in the repository environment. That evidence should be labeled external controller evidence, not Tenet-native interaction proof.
