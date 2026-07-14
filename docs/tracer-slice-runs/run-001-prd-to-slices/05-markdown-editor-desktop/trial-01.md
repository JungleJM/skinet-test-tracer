# Trial 01

Source: `SpecPrompts/Prompt-Vault/Hard/Markdown_Editor_Desktop.md`

## Proposed slices

1. `Desktop shell with live markdown preview`
Blocked by: None
Delivers: a Tauri 2 + Vue 3 app that opens into split view, updates preview live from editor input, and uses the real application shell instead of a browser-only mock.

2. `Open and save one markdown file`
Blocked by: `Desktop shell with live markdown preview`
Delivers: native open, save, save-as, filename in title bar, and unsaved-change indicator.

3. `Keyboard-centric writing flow`
Blocked by: `Open and save one markdown file`
Delivers: new file, keyboard shortcuts, and toolbar formatting actions that modify editor content.

4. `Mode and reading improvements`
Blocked by: `Keyboard-centric writing flow`
Delivers: split view, preview-only, focus mode, and synchronized scrolling.

5. `Theme and typography controls`
Blocked by: `Mode and reading improvements`
Delivers: light/dark support and curated font choices for editor and preview.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `borderline`
Slice 3 may need splitting if toolbar formatting becomes intricate.
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
- Prefactoring first: `pass`

Verdict: good overall. Only the formatting slice may need to split further depending on implementation complexity.
