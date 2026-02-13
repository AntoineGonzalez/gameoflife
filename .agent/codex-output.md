Summary:
- Updated component tests to use `fireEvent` with `waitFor` for state updates, avoiding `userEvent.setup()` (not available in `@testing-library/user-event` v13) and eliminating act warnings introduced by `@testing-library/react` v15. Files: `src/tests/components/PatternList.test.tsx`, `src/tests/components/Grid.test.tsx`.

Tests run:
1. `npm ci`
2. `npm run lint:css`
3. `CI=true npm test --silent`
4. `CI=true npm run build`

Risk/impact:
- Low. Tests now use `fireEvent` (slightly less realistic than `userEvent`), but assertions still validate UI behavior. No production code changes.