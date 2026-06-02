const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { CartPage } = require('../../page-objects/CartPage');
const { InventoryPage } = require('../../page-objects/InventoryPage');

Given('I am on the inventory page', async function () {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    this.inventoryPage = new InventoryPage(this.page);
    this.currentPage = this.inventoryPage;
});

Given('I have {string} item in the cart', async function (count) {
    await this.inventoryPage.checkCartBadge(count);
});

Given('I find the item {string}',  async function (item) {
    await this.currentPage.checkItem(item);
});

When('I click the add to cart button for the item {string}', async function (item) {
    await this.inventoryPage.addToCart(item);
});

Then('I should be able to see the cart icon displaying {string} items', async function (count) {
    await this.inventoryPage.checkCartBadge(count);
});

When('I click on the continue shopping button', async function () {
    await this.cartPage.continueShopping();
});

When('I click on the cart icon', async function () {
    await this.inventoryPage.goToCart();
    this.cartPage = new CartPage(this.page);
    this.currentPage = this.cartPage;
});

When ('I click on the Remove button of the item {string}', async function(item){
    await this.currentPage.removeItem(item);
});


Then ('I should be able to see no items in the cart page', async function() {
    await this.cartPage.checkNoItems();
});

