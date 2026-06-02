const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');

Given('I am on the login page', async function () {
    await this.page.goto('https://www.saucedemo.com/');
    this.loginPage = new LoginPage(this.page);
});

When('I enter an username {string} and password {string}', async function (username, password) {
    await this.loginPage.insertLogin(username,password);
});

When('I click the login button', async function () {
    await this.loginPage.tryLogin();
});

Then('I should be able to see error message {string}', async function (message) {
    await this.loginPage.getLoginMessage(message);
});