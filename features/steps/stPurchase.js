const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, test} = require('@playwright/test');
const { CartPage } = require('../../page-objects/CartPage');
const { InventoryPage } = require('../../page-objects/InventoryPage');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');
let currentCartBadge = '0';

Given('I am on the inventory page', async function () {
    await this.context.storageState({ path: storageStatePath });
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    inventoryPage = new InventoryPage(this.page);
});

Given('I have {string} item in the cart', async function (count) {
    await inventoryPage.checkCartBadge(count);
});

When('I find the item {string}',  async function (item) {
    await inventoryPage.checkItem(item);
});

When('I click the add to cart button for the item {string}', async function (item) {
    await inventoryPage.addToCart(item);
    currentCartBadge++;
});

Then('I should be able to see the cart icon displaying one item was added', async function () {
    await inventoryPage.checkItem(currentCartBadge);
});

Then('I should be able to see the item {string} in the cart page', async function (item) {
    await cartPage.checkCartItem(item);
});

Given('I click on the cart icon', async function () {
    await inventoryPage.goToCart();
    if (!cartPage){
        cartPage = new CartPage(this.page);
    }
});

Given('I see the item {string} in the cart page', async function (item) {
    await cartPage.checkCartItem(item);
});

When('I click on the continue shopping button', async function () {
    await cartPage.continueShopping();
});

Then('I should be able to see the cart icon still displaying {string} items', async function (count) {
    await inventoryPage.checkItem(count);
});

