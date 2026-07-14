# Trial 01

Source: `SpecPrompts/Prompt-Vault/Advanced/LLM_Speedometer.md`

## Proposed slices

1. `Single-engine benchmark path`
Blocked by: None
Delivers: a desktop app where the user enters one OpenAI-compatible endpoint, submits one prompt, and sees TTFT, token counts, and total elapsed time from a real streamed response.

2. `Live stream charting`
Blocked by: `Single-engine benchmark path`
Delivers: tokens-per-second and time-per-output-token update live while the response streams.

3. `Saved benchmark runs`
Blocked by: `Live stream charting`
Delivers: completed runs can be persisted and reopened for comparison.

4. `Cross-engine comparison`
Blocked by: `Saved benchmark runs`
Delivers: users can compare multiple saved runs across different local engines or quantizations.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
- Prefactoring first: `pass`

Verdict: strong. The first slice proves the core value before charts and profile comparison expand the surface.
