# Trial 01

Source: `docs/prd/vikunja-kanban-viewer.md`

## Proposed slices

1. `Fixture-backed board shell`
Blocked by: None
Delivers: a read-only board from checked-in fixture data with project title, columns, card titles, optional metadata, and proof that no Vikunja/API request is made.

2. `Empty, loading, and error states`
Blocked by: `Fixture-backed board shell`
Delivers: board loading lifecycle states are visible and existing fixture-board behavior remains intact.

3. `Live Vikunja read-only fetch`
Blocked by: `Empty, loading, and error states`
Delivers: configured read-only API fetch with mocked automated tests and manual-smoke access to the real self-hosted instance.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `pass`
- Prefactoring first: `pass`

Historical comparison to archived issue `docs/prior-attempts/issue-2-attempt-001/agent-issues/ISSUE-2.v1.md`:

- Agreement: tracer 1 boundary is effectively the same fixture-backed board shell.
- Improvement: the rubric makes explicit why this is the right first slice, rather than only recording the slice text.
- No regression found in scope, proof target, or non-goals.
