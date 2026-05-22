const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, test} = require('@playwright/test');
const { CartPage } = require('../../page-objects/CartPage');
const { InventoryPage } = require('../../page-objects/InventoryPage');
const fs = require('fs');
const path = require('path');

const storageStatePath = path.join(__dirname, '..', '..', 'storageState.json');
let currentCartBadge;

Given('I am on the inventory page', async function () {
    currentCartBadge = 0;
    await this.context.storageState({ path: storageStatePath });
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    inventoryPage = new InventoryPage(this.page);
});

Given('I have {string} item in the cart', async function (count) {
    await inventoryPage.checkCartBadge(count);
});

Given('I find the item {string}',  async function (item) {
    await inventoryPage.checkItem(item);
});

When('I click the add to cart button for the item {string}', async function (item) {
    await inventoryPage.addToCart(item);
    currentCartBadge++;
});

Then('I should be able to see the cart icon displaying one item was added', async function () {
    await inventoryPage.checkCartBadge(String(currentCartBadge));
});

Then('I should be able to see the item {string} in the cart page', async function (item) {
    await cartPage.checkCartItem(item);
});


Given('I see the item {string} in the cart page', async function (item) {
    await cartPage.checkCartItem(item);
});

When('I click on the continue shopping button', async function () {
    await cartPage.continueShopping();
});

When('I click on the cart icon', async function () {
    await inventoryPage.goToCart();
    cartPage = new CartPage(this.page);
});

Then('I should be able to see the cart one more item on the cart icon', async function (){
    await inventoryPage.checkCartBadge(String(currentCartBadge));
});

