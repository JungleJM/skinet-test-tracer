# Trial 02

Source: `SpecPrompts/Prompt-Vault/Medium/Sorting_Visualization.md`

Revision reason: Trial 01 delayed the first real proof and grouped too many algorithms together.

## Proposed slices

1. `Single-algorithm vertical path`
Blocked by: None
Delivers: a self-contained page that renders bars, runs Bubble Sort end to end, supports Start/Pause, Shuffle, speed control, and shows live comparisons/swaps/elapsed time.

2. `Array-size control and second in-place algorithm`
Blocked by: `Single-algorithm vertical path`
Delivers: array size can be changed safely and one more in-place algorithm such as Insertion Sort can run through the same rendering and instrumentation path.

3. `Complete in-place algorithm family`
Blocked by: `Array-size control and second in-place algorithm`
Delivers: Selection Sort and Heap Sort are added through the same verified harness.

4. `Recursive algorithm family`
Blocked by: `Complete in-place algorithm family`
Delivers: Merge Sort and Quick Sort are added with the same animation and stats contract.

5. `Polish pass`
Blocked by: `Recursive algorithm family`
Delivers: refined visuals and any remaining UI consistency issues, with no new algorithmic scope.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
Could still state that persistence and educational narration are out of scope.
- Prefactoring first: `pass`

Verdict: much stronger. The first slice now proves the whole path before the algorithm set expands.
