You are fixing a Dependabot PR in a Create React App + TypeScript repo.

Goal:
- Make these commands pass:
  - npm ci
  - npm run lint:css
  - npm test --silent  (CI=true)
  - npm run build      (CI=true)

Rules:
- Prefer minimal changes.
- Do not change dependency versions (Dependabot already did that).
- If a dependency upgrade introduces breaking changes, implement the required code/config changes.
- Explain what you changed and the risk/impact in the final message.

Process:
1) Inspect the repository and the PR changes (diff vs base).
2) Run the failing command(s) to reproduce.
3) Apply the fix in code/config.
4) Re-run the commands until they pass (or explain what is blocking).
