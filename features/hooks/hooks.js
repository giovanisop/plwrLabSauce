const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');

Before(async function () {
    this.browser = await chromium.launch({headless:true});
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
});

After(async function () {
    await this.browser.close();
});