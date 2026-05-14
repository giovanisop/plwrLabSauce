const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, test} = require('@playwright/test');
const{ LoginPage } = require('../../page-objects/LoginPage');


Given('I am on the login page', async function () {
    await this.page.goto('https://www.saucedemo.com/');
    loginPage = new LoginPage(this.page);
});
      
When('I enter valid {string} and {string}', async function (username, password) {
    await loginPage.insertLogin(username,password);
});

When('I click the login button', async function () {
    await loginPage.tryLogin();
});
    
Then('I should be redirected to the inventory page {string}', async function (url) {
    await loginPage.checkPage(url);
});

When('I enter an invalid {string} and {string}', async function (username, password) {
    await loginPage.insertLogin(username,password);
});

Then('I should be able to see error message {string}', async function (message) {
    await loginPage.getLoginMessage(message);
});
