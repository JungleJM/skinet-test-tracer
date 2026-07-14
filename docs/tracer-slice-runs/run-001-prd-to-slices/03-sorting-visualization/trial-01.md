# Trial 01

Source: `SpecPrompts/Prompt-Vault/Medium/Sorting_Visualization.md`

## Proposed slices

1. `Visualizer shell with all controls and all stats`
Blocked by: None
Delivers: one page with algorithm picker, start/pause, shuffle, speed, array size, dark theme, and stats panel.

2. `Implement all six algorithms`
Blocked by: `Visualizer shell with all controls and all stats`
Delivers: Bubble, Insertion, Selection, Merge, Quick, and Heap Sort all animate with comparisons, swaps, and elapsed time.

## Rubric review

- Vertical: `borderline`
The first slice is mostly shell/UI without proving a real sort path.
- Narrow but complete: `fail`
The second slice absorbs too much adjacent functionality at once.
- Independently verifiable: `borderline`
There is proof, but it comes too late.
- One fresh context window: `fail`
All six algorithms in one slice is too large.
- Production-intent: `pass`
- Proof target declared: `borderline`
- Non-goals explicit: `fail`
- Prefactoring first: `pass`

Verdict: too horizontal and too large. Revised below.
