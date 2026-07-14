# Trial 01

Source: `SpecPrompts/Prompt-Vault/Advanced/File_Listing.md`

## Proposed slices

1. `Native scan to visible table`
Blocked by: None
Delivers: a Tauri desktop app can select a folder, scan files through the Rust backend, and render structured rows with status and error handling in the UI.

2. `Search, type filters, and column selection`
Blocked by: `Native scan to visible table`
Delivers: users can search name/path, filter by type, and change visible columns while keeping the table usable.

3. `Editable export-ready table`
Blocked by: `Search, type filters, and column selection`
Delivers: editable user fields, row selection, record counts, and empty states support export preparation.

4. `Hashing on demand`
Blocked by: `Editable export-ready table`
Delivers: selected or filtered files get md5/sha256 only after explicit action, with progress and per-file errors.

5. `CSV export`
Blocked by: `Hashing on demand`
Delivers: the current filtered/edited/visible state can be saved through a system dialog as UTF-8 CSV.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `pass`
- Independently verifiable: `pass`
- One fresh context window: `pass`
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `borderline`
- Prefactoring first: `pass`

Verdict: strong. The first slice proves the native desktop and backend-integration risk immediately.
