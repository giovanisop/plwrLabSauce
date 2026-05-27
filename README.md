# 🎭 plrwLabSauce — Playwright + Cucumber Test Suite

![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-latest-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?style=flat-square&logo=cucumber&logoColor=white)
![CI](https://img.shields.io/github/actions/workflow/status/giovanisop/plwrLabSauce/playwright.yml?style=flat-square&label=CI)

End-to-end test suite for the [Sauce Demo](https://www.saucedemo.com) application, built as a portfolio project to demonstrate QA automation skills using **BDD with Gherkin**, **Page Object Model**, and **CI/CD integration via GitHub Actions**.

---

## 🛠️ Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation |
| [Cucumber.js](https://cucumber.io) | BDD framework (Gherkin) |
| [Node.js](https://nodejs.org) | Runtime |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

---

## 📁 Project Structure

```
PLWRLABSAUCE/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline definition
├── features/
│   ├── steps/                   # Step definitions (Gherkin → Playwright)
│   ├── hooks/                   # Before/After hooks (browser setup/teardown)
│   ├── Login.feature            # Login scenarios (tagged @login)
│   └── Purchase.feature         # Cart and purchase scenarios
├── page-objects/                # Page Object Model classes
├── reports/                     # Test execution reports (gitignored)
├── cucumber.js                  # Cucumber configuration
└── package.json
```

---

## ✅ Test Scenarios Covered

### Login (`@login`)
- [x] Successful login with valid credentials
- [x] Login attempt with invalid credentials
- [x] Login attempt with locked out user
- [x] Login with empty username
- [x] Login with empty password

### Purchase
- [x] Add an item to cart
- [x] Return to inventory page from cart page
- [x] Remove an item from cart on product page
- [x] Remove an item from cart on cart page
- [x] Add two items to cart

---

## 🚀 Running Locally

### Prerequisites

- Node.js 24+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/giovanisop/plwrLabSauce.git
cd plwrLabSauce

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps
```

### Run tests

```bash
# Run all scenarios
npx cucumber-js

# Run a specific feature
npx cucumber-js features/Login.feature

# Run only login scenarios
npx cucumber-js --tags @login

# Run only non-login scenarios (uses storageState)
npx cucumber-js --tags "not @login"
```

Reports are generated at `reports/cucumber-report.html` after each run.

---

## ⚙️ CI/CD

Every push and pull request to `main`/`master` triggers the GitHub Actions pipeline, which:

1. Installs dependencies with `npm ci`
2. Installs Playwright browsers
3. Runs the full Cucumber test suite
4. Uploads the `reports/` folder as a pipeline artifact (retained for 30 days)

---

## 🏗️ Architecture Decisions

**BDD-first approach**: Gherkin scenarios were written before any automation code, ensuring tests reflect real user behavior and are readable by non-technical stakeholders.

**Page Object Model**: Each page of the application is represented by a dedicated class, keeping test logic decoupled from UI selectors and making maintenance straightforward.

**Separation of concerns**:
- `.feature` files own the *what* (business behavior)
- Step definitions own the *mapping* (Gherkin → code)
- Page Objects own the *how* (UI interactions)
- Hooks own the *lifecycle* (browser open/close, session management)

**Hook strategy with storageState for parallel workers**: Most scenarios require an authenticated session but should not re-test the login flow — that would be redundant and slow. At the same time, running parallel workers with a single shared session file causes race conditions. The solution works in three layers:

1. **`BeforeAll`** — runs once per worker before any scenario. It launches a dedicated browser, performs a real login against the app, and persists the resulting cookies and local storage to `storageState-{CUCUMBER_WORKER_ID}.json`. Each worker gets its own file, so parallel execution has no contention.

2. **`Before { not @login }`** — for every scenario that is not tagged `@login`, the hook creates a browser context that loads that worker's `storageState` file. The scenario starts already authenticated, avoiding a full login round-trip on every test.

3. **`Before { @login }`** — login scenarios get a completely fresh context with no `storageState`. This ensures the login feature tests the real authentication flow end-to-end and is never accidentally short-circuited by a pre-loaded session.

4. **`AfterAll`** — deletes the worker's `storageState` file after the suite finishes, so the next CI run always starts from a clean state.

The `@login` tag is therefore a functional signal, not just a label: its presence or absence determines which browser context a scenario receives and whether stored authentication is applied.

---

## 👤 Author

**Giovani Ouro Preto** — QA Engineer | Playwright & Functional Testing | Senior Technical Business Analyst | Systems Analyst Background | SDLC Vision | SQL Specialist | International Projects

[LinkedIn](https://linkedin.com/in/giovanisop) · [GitHub](https://github.com/giovanisop)
