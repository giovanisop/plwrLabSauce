const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, test} = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { InventoryPage } = require('../../page-objects/InventoryPage');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');

Given('I am on the login page', async function () {
    await this.page.goto('https://www.saucedemo.com/');
    this.loginPage = new LoginPage(this.page);
});
      
When('I enter valid {string} and {string}', async function (username, password) {
    await this.loginPage.insertLogin(username,password);
});

When('I click the login button', async function () {
    await this.loginPage.tryLogin();
});
    
Then('I should be redirected to the inventory page {string}', async function (url) {
    this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.checkPage(url);
    await this.context.storageState({ path: storageStatePath });
});

When('I enter an invalid {string} and {string}', async function (username, password) {
    await this.loginPage.insertLogin(username,password);
});

Then('I should be able to see error message {string}', async function (message) {
    await this.loginPage.getLoginMessage(message);

});

When('I enter password {string} and leave username empty', async function (password) {
    await this.loginPage.insertLogin('', password);
});

When('I leave username and password empty', async function () {
    await this.loginPage.insertLogin('', '');
});

When('I enter username {string} and leave password empty', async function (username) {
    await this.loginPage.insertLogin(username, '');
});