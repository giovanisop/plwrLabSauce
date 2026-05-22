const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');
setDefaultTimeout(20 * 1000);

// Save the login into storageStato to assist multiple workers to go on on non-login scenarios

BeforeAll(async function () {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html');

    await context.storageState({ path: storageStatePath });
    await browser.close();
});

//comsume for each scenario the stored state of the login done on beforeAll
Before({tags: 'not @login'},async function () {
    this.browser = await chromium.launch({ headless: true });
    const contextOptions = {};
    if (fs.existsSync(storageStatePath)) {
        contextOptions.storageState = storageStatePath;
    }
    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();
});


//Login scenarios will discard storedstate from beforeall to perform full login test

Before({tags: '@login'},async function () {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext(); // -> no storageState
    this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
});

AfterAll(async function () {
  //removes the storageState on the end of the test suit to start over clean on next CI run
  if (fs.existsSync(storageStatePath)) {
    fs.unlinkSync(storageStatePath);
  }
});