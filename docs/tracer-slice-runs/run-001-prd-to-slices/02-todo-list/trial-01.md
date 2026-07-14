# Trial 01

Source: `SpecPrompts/Prompt-Vault/Easy/ToDo_List.md`

## Proposed slices

1. `Renderable task list with add-task flow`
Blocked by: None
Delivers: a styled task manager page with initial tasks, text input, add button, and live total counter.

2. `Completion toggles with active/completed counters`
Blocked by: `Renderable task list with add-task flow`
Delivers: clicking a task toggles completion state and updates active, completed, and total counters.

3. `Deletion and persistence`
Blocked by: `Completion toggles with active/completed counters`
Delivers: tasks can be deleted, newly added tasks include delete controls, data persists in `localStorage`, and clear-all resets both UI and storage.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
Should explicitly exclude categories, dates, and multi-user sync.
- Prefactoring first: `pass`

Verdict: strong tracer chain. The prompt is already incremental, and the slices preserve that without becoming horizontal.
