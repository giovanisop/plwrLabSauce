const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');
setDefaultTimeout(20 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });

    const contextOptions = {};

    if (fs.existsSync(storageStatePath)) {
        contextOptions.storageState = storageStatePath;
    }

    this.context = await this.browser.newContext(contextOptions);
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
  //removes the storare state on the and of the test suit to start over clean on next CI run
  if (fs.existsSync(storageStatePath)) {
    fs.unlinkSync(storageStatePath);
  }
});