# Trial 01

Source: `SpecPrompts/Prompt-Vault/Hard/Kanban_Board.md`

## Proposed slices

1. `Board shell with default columns, card rendering, add card, and persistence`
Blocked by: None
Delivers: a dark-themed Kanban board with seeded cards, inline add-card flow, and `localStorage` restore.

2. `Column management and drag/drop`
Blocked by: `Board shell with default columns, card rendering, add card, and persistence`
Delivers: rename/delete/add column flows and drag/drop between columns, including Done-column styling.

3. `Filtering, search, and statistics bar`
Blocked by: `Column management and drag/drop`
Delivers: live title search, priority filtering, placeholder-gap behavior, and live completion statistics.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `borderline`
Slice 2 combines two independently meaningful capabilities.
- Independently verifiable: `pass`
- One fresh context window: `borderline`
Slice 2 is risky because drag/drop plus column CRUD plus done-state styling is a lot.
- Production-intent: `pass`
- Proof target declared: `borderline`
- Non-goals explicit: `borderline`
- Prefactoring first: `pass`

Verdict: usable, but slice 2 is overloaded. Revised below.
