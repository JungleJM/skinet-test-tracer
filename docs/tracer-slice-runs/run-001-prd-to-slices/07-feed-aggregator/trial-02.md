# Trial 02

Source: `SpecPrompts/Prompt-Vault/Advanced/Feed_Aggregator.md`

Revision reason: move the first user-visible aggregation proof earlier and isolate operations hardening.

## Proposed slices

1. `One feed to one rendered homepage path`
Blocked by: None
Delivers: one configured RSS feed can be stored in SQLite, fetched by the crawler, deduplicated, and rendered on the homepage via SSR.

2. `Manage multiple feeds`
Blocked by: `One feed to one rendered homepage path`
Delivers: add/delete feed forms on `/feeds`, feed titles displayed, and homepage article list includes source names.

3. `Operational safety`
Blocked by: `Manage multiple feeds`
Delivers: WAL mode, UTC timestamps, request timeouts, logging, and per-feed error counts with deactivation.

4. `Retention and pagination`
Blocked by: `Operational safety`
Delivers: homepage pagination and automatic cleanup of stale articles.

5. `Packaging and parser tests`
Blocked by: `Retention and pagination`
Delivers: build command, Dockerfile, and parser/date/dedup tests.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
- Prefactoring first: `pass`

Verdict: strong revision. The first slice now proves the actual aggregator value instead of only the setup layers.
