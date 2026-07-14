# Trial 01

Source: `SpecPrompts/Prompt-Vault/Easy/Bubble_Sort_Visualizer.md`

## Proposed slices

1. `Random bars + one complete Bubble Sort run`
Blocked by: None
Delivers: a single-file page that renders a random array as bars, runs Bubble Sort end to end, highlights comparisons, and increments a live comparisons counter.

2. `Reset + speed control + sorted-state visuals`
Blocked by: `Random bars + one complete Bubble Sort run`
Delivers: reset stops/restarts the run with a fresh array, speed changes are visible during animation, and sorted bars transition into their final color.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `borderline`
Need explicit proof command and assertions, not just "watch the animation".
- Non-goals explicit: `borderline`
Could explicitly exclude additional algorithms and persistence.
- Prefactoring first: `pass`

Verdict: acceptable as-is, but the implementation ticket should include a minimal proof target such as "comparison counter increments" and "final bar order is sorted ascending".
