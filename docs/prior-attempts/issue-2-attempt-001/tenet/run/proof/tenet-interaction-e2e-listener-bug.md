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

## Remote Preview Experiment

After the initial failure, the app's Playwright configuration was updated to support an externally supplied preview URL:

```bash
E2E_BASE_URL=http://100.114.175.52:5173 npm run test:e2e
```

When `E2E_BASE_URL` is set, Playwright skips its local `webServer` startup and uses the supplied base URL. This models the intended SkiNet production shape: the controller starts or deploys a preview environment, then proof tools consume that URL.

Host-shell result:

- Vite was started outside Tenet with `npm run dev -- --host 0.0.0.0`.
- Vite advertised `http://100.114.175.52:5173/` as a Tailscale network URL.
- `curl -I --max-time 5 http://100.114.175.52:5173/` returned `HTTP/1.1 200 OK`.
- `E2E_BASE_URL=http://100.114.175.52:5173 npm run test:e2e` passed all 5 Playwright tests.

Codex-sandbox result:

- `curl -I --max-time 5 http://100.114.175.52:5173/` returned `HTTP/1.1 200 OK`.
- With Codex `workspace-write` sandbox, `E2E_BASE_URL=http://100.114.175.52:5173 npm run test:e2e` still failed.
- The failure changed from local listener binding to Chromium launch:

```text
FATAL:base/apple/mach_port_rendezvous_mac.cc:159
bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer... Permission denied (1100)
```

Codex unsandboxed result:

- With Codex `--sandbox danger-full-access`, the same command passed against the live Tailscale preview URL:

```bash
codex exec --cd /Users/jmath/Documents/code/skinet-test-tracer \
  --sandbox danger-full-access \
  "Run exactly: E2E_BASE_URL=http://100.114.175.52:5173 npm run test:e2e."
```

- Result: 5 Playwright tests passed.

Localhost retest:

- A preview server started outside Codex on `http://127.0.0.1:5173`.
- With Codex `--sandbox danger-full-access`, `E2E_BASE_URL=http://127.0.0.1:5173 npm run test:e2e` passed all 5 Playwright tests.
- With Codex `--sandbox danger-full-access`, the normal command `npm run test:e2e` also passed all 5 Playwright tests, including Playwright's own local web server startup.

This means the remote preview URL solves the local listener part of the problem for restricted consumers, but it is not required when Codex is allowed to run the browser proof in `danger-full-access`. The blocker is the default Codex `workspace-write` sandbox on macOS, which prevents local listener binding and Chromium Mach service registration.

## Revised Capability Classification

For this environment, classify the Tenet/Codex interaction proof capability as:

```yaml
interaction_e2e_capability:
  can_reach_remote_preview_url: true
  can_bind_local_preview_server_in_workspace_write_sandbox: false
  can_bind_local_preview_server_in_danger_full_access: true
  can_launch_playwright_chromium_in_workspace_write_sandbox: false
  can_launch_playwright_chromium_in_danger_full_access: true
  tenet_native_interaction_e2e_reliable_with_default_sandbox: false
  recommended_controller_strategy: browser_capable_proof_runner_with_preview_url_adapter
```

## Security and Portability Notes

The current working path requires temporarily relaxing the Codex command sandbox for browser proof on macOS. That is acceptable for this spike, but it should not become a hard-coded assumption in SkiNet.

Future abstractions to add:

- `ProofRunner` adapter: owns how Playwright is executed and what sandbox/security mode is required.
- `PreviewProvider` adapter: owns whether the app is exposed on localhost, a Tailscale URL, a deployment preview URL, or another remote address.
- Capability checks: record whether a runner can bind localhost, can reach a remote preview URL, and can launch a browser.
- Policy gate: require explicit authorization before a proof runner uses an unsandboxed or elevated mode.

Tailscale is useful for this operator's environment and for future headless-machine workflows. It must remain an adapter option, not a core harness dependency. If Tailscale is unavailable, the harness should be able to fall back to localhost, a LAN URL, a CI preview deployment, or another configured preview provider.

## Probe Before Escalation Rule

`danger-full-access` should not be the default proof mode. It is a fallback for hosts where the safer runner mode cannot perform browser proof.

For each proof-runner host or runner image, the controller should:

1. run a minimal Playwright/browser probe in the safest configured sandbox;
2. run the actual proof in safe mode if the probe passes;
3. retry once with an explicitly authorized elevated runner only if safe mode fails with a classified browser-runtime or listener-binding sandbox failure;
4. store the result by host identity, OS, runner image, Codex/Tenet version, and Playwright browser version.

Linux hosts may not need the macOS-specific elevated proof runner. The harness should discover this through probing and use the safer mode by default whenever it works.
