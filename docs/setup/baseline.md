# Baseline Setup

Codex created this Vite React TypeScript and Playwright baseline before tracer work.

This setup is outside the tracer evidence boundary. Tracer 1 starts after this baseline is committed and pushed.

Baseline proof:

```bash
npm run build
npm test
npm run test:e2e
```

Baseline constraints:

- No Vikunja domain code.
- No board fixture data.
- No board UI.
- No Vikunja URL or token.
- No `.env` requirement.
- No live service calls.
