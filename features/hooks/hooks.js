const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');


Before(async function () {
    this.browser = await chromium.launch({headless:true});

    const contextOptions = {};

    //here we are checking if the storage state is present to be reused,
    //if not we will create a new context over the new loginPage instance and save the storage state for future use
    if (fs.existsSync(storageStatePath)) {
        contextOptions.storageState = storageStatePath;
        this.context = await this.browser.newContext(contextOptions);
        this.page = await this.context.newPage();
    } else {
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        this.loginPage = new LoginPage(this.page);
        await this.context.storageState({ path: storageStatePath });
    }
  
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