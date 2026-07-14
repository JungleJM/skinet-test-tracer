# Trial 01

Source: `SpecPrompts/Prompt-Vault/Advanced/Feed_Aggregator.md`

## Proposed slices

1. `Feed management page with SQLite persistence`
Blocked by: None
Delivers: SSR page to add and delete feed URLs, backed by SQLite, with WAL mode and UTC timestamps configured.

2. `Crawler and article homepage`
Blocked by: `Feed management page with SQLite persistence`
Delivers: background fetch/parsing writes deduplicated articles and the homepage lists them newest-first.

3. `Operations hardening`
Blocked by: `Crawler and article homepage`
Delivers: pagination, timeouts, error counts, inactive-feed handling, retention cleanup, and logging.

4. `Packaging and tests`
Blocked by: `Operations hardening`
Delivers: `nimble build`, Dockerfile, and unit tests for XML parsing, date parsing, and deduplication.

## Rubric review

- Vertical: `borderline`
Slice 1 is closer to schema/backend/SSR than a user-visible aggregation path.
- Narrow but complete: `borderline`
Slice 3 groups several operational concerns together.
- Independently verifiable: `borderline`
The first real "aggregator works" proof arrives only in slice 2.
- One fresh context window: `borderline`
- Production-intent: `pass`
- Proof target declared: `borderline`
- Non-goals explicit: `fail`
- Prefactoring first: `pass`

Verdict: not quite right. Revised below.
