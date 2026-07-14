# Trial 02

Source: `SpecPrompts/Prompt-Vault/Hard/Kanban_Board.md`

Revision reason: split the overloaded middle slice into smaller verifiable paths.

## Proposed slices

1. `Seeded board shell`
Blocked by: None
Delivers: four default columns, seeded example cards, dark board layout, and board-state persistence.

2. `Inline card creation and deletion`
Blocked by: `Seeded board shell`
Delivers: inline add-card form, hover delete button, due-date and priority rendering, and persistence after edits.

3. `Card drag/drop to Done`
Blocked by: `Inline card creation and deletion`
Delivers: native HTML5 drag/drop between columns, target highlight, and automatic done-style mutation when moved into `Done`.

4. `Column CRUD`
Blocked by: `Card drag/drop to Done`
Delivers: add custom column, rename on double-click, and delete-empty-column behavior.

5. `Search, priority filter, and stats bar`
Blocked by: `Column CRUD`
Delivers: real-time filtering plus statistics for total, overdue, done, and completion rate.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
- Prefactoring first: `pass`

Verdict: strong revision. Each slice now proves a coherent board behavior without hiding too much adjacent work.
