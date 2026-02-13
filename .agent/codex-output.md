Summary:
- Updated tests to use `userEvent.setup()` and `await` clicks to align with @testing-library/user-event v14’s async behavior. This fixes selection, cell toggling, and button toggle assertions.
- Files: `src/tests/components/PatternList.test.tsx`, `src/tests/components/Grid.test.tsx`.

Tests:
- `npm ci`
- `npm run lint:css`
- `CI=true npm test --silent`
- `CI=true npm run build`

Risk/impact:
- Low. Changes are limited to test interaction timing; production code unchanged. Behavior validated by passing tests.