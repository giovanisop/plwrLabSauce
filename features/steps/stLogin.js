const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { InventoryPage } = require('../../page-objects/InventoryPage');
//const fs = require('fs');
//const path = require('path');

//const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');

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
    
Then('I should be redirected to the inventory page {string}', async function (url) {
    this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.checkPage(url);
});

Then('I should be able to see error message {string}', async function (message) {
    await this.loginPage.getLoginMessage(message);
});