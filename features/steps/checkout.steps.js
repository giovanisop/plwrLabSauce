const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { CartPage } = require('../../page-objects/CartPage');
const { CheckoutCompletePage } = require('../../page-objects/CheckoutCompletePage');
const { InventoryPage } = require('../../page-objects/InventoryPage');
const { CheckoutOverviewPage } = require('../../page-objects/CheckoutOverviewPage');
const { CheckoutUserInfoPage } = require('../../page-objects/CheckoutUserInfoPage');

Given('I have inserted The item {string} to the cart', async function (item) {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.addToCart(item);
    await this.inventoryPage.goToCart(); 
    this.cartPage = new CartPage(this.page);
});

When('I click on the checkout button', async function () {
    await this.cartPage.checkout();
    this.checkoutUserInfoPage = new CheckoutUserInfoPage(this.page);
});

When('I enter the first name {string}, last name {string} and postal code {string}', async function (firstName, lastName, postalCode) {
    await this.checkoutUserInfoPage.insertUserInfo(firstName, lastName, postalCode);
});

When('I click on the continue button', async function () {
    await this.checkoutUserInfoPage.continueCheckout();
    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
});

Then('I should be able to see the {string} in the checkout overview page', async function (item) {
    await this.checkoutOverviewPage.checkItem(item);
});

Then('I should be able to see the total price of the order in the checkout overview page', async function () {
    await this.checkoutOverviewPage.verifyTotalPrice();
});

When('I click on the finish button', async function () {
    await this.checkoutOverviewPage.finishCheckout();
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
});

Then('I should be able to see the message {string} in the checkout complete page', async function (message) {
    await this.checkoutCompletePage.verifyMessage(message);
});

When('I click on the back home button', async function () {
    await this.checkoutCompletePage.goHome();
    this.inventoryPage = new InventoryPage(this.page);
});