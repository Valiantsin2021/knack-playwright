# JS automation tests using Playwright <a href="https://playwright.dev/" target="blank"><img align="center" src="https://playwright.dev/img/playwright-logo.svg" alt="WebdriverIO" height="40" width="40" /></a>

## Author

- [@Valiantsin2021](https://www.github.com/Valiantsin2021) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## This repository purpose is automation of functional test of [Knack.com](https://www.knack.com/)
## There are 2 test suites:
1. Files with naming (*.spec.ts) - tests with POM
2. Files with naming (*.fix.spec.ts) - tests with fixtures (default testMatch pattern)
3. Bonus - file download-upload.spec.ts (tests for download and upload file respectively)

## Allure report - https://valiantsin2021.github.io/knack-playwright/

## Before the test run make sure to update local browsers versions to latest and have NodeJS, npm and Java (for allure report) installed

## Test suite

## Job done:

1.  Page Object model implemented (constants parametrized in .test//utils/constants.js)
2.  Allure reporter with report published on GitHub pages
3.  Test suite integration to GitHub Actions with automated tests run on push and report publishing to gh-pages
4.  Precommit hook for code linting and formatting
5.  Custom fixtures

## Setup:

1. Clone this repository or unzip downloaded file
2. Install dependencies with "npm install"
3. To run tests - open terminal and navigate to the path of the cloned project and:

   - please add username and password for knack.com and username and password for Live App to .env file and run tests with npm test

   .env pattern
   ```
USER=***
PASS=***
APPUSER=***
APPPASS=***
   ```
   - to clean reports directory and screenshots: npm run pretest
   - to open report run : npm run report
   - to run headless with Chrome: npm run github
   - report is created in folder allure-report (index.html should be opened via live server plugin in VSCode)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://valiantsin2021.github.io/Portfolio/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/valiantsin-lutchanka/)
