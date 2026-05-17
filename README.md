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
│   │   └── stLogin.js
│   ├── hooks/                   # Before/After hooks (browser setup/teardown)
│   │   └── hooks.js
│   └── login.feature            # Gherkin scenarios
├── pages/                       # Page Object Model classes
│   └── LoginPage.js
├── reports/                     # Test execution reports (gitignored)
├── cucumber.js                  # Cucumber configuration
├── playwright.config.js         # Playwright configuration
└── package.json
```

---

## ✅ Test Scenarios Covered

### Login
- [ ] Successful login with valid credentials
- [ ] Login attempt with invalid password
- [ ] Login attempt with locked out user
- [ ] Login with empty fields

> More modules (Inventory, Cart, Checkout) coming soon.

---

## 🚀 Running Locally

### Prerequisites

- Node.js 24+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/giovanisop/plwrLabSauce.git
cd PLWRLABSAUCE

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
npx cucumber-js features/login.feature
```

Reports are generated at `reports/cucumber-report.json` after each run.

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
- Hooks own the *lifecycle* (browser open/close)

---

## 👤 Author

**Giovani Ouro Preto** — QA Engineer | Playwright & Functional Testing | Senior Technical Business Analyst | Systems Analyst Background | SDLC Vision | SQL Specialist | International Projects

[LinkedIn](https://linkedin.com/in/giovanisop) · [GitHub](https://github.com/giovanisop)
