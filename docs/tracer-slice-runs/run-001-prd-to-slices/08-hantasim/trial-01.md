# Trial 01

Source: `SpecPrompts/Prompt-Vault/Advanced/Hantavirus_Simulation.md`

## Proposed slices

1. `Environmental infection invariant`
Blocked by: None
Delivers: a Bevy world with humans, mice, contamination clouds, and live counts where humans can only become infected by entering clouds and never by contact with other humans.

2. `World behavior shaping`
Blocked by: `Environmental infection invariant`
Delivers: POIs, weighted human movement, and day/night cycle influence population flow.

3. `Interactive controls and parameter tuning`
Blocked by: `World behavior shaping`
Delivers: pause, speed presets, restart, and key simulation parameters are adjustable through the UI.

4. `Persistence and richer analytics`
Blocked by: `Interactive controls and parameter tuning`
Delivers: save/load, settings persistence, SIR history, selection details, and R0 estimate.

## Rubric review

- Vertical: `pass`
- Narrow but complete: `borderline`
Slice 4 is broad.
- Independently verifiable: `pass`
- One fresh context window: `borderline`
Persistence plus advanced analytics may need splitting.
- Production-intent: `pass`
- Proof target declared: `pass`
- Non-goals explicit: `pass`
- Prefactoring first: `pass`

Verdict: mostly sound. The first slice is correctly centered on the core epidemiological invariant.
