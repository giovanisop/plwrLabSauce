const { CartPage } = require('../page-objects/CartPage');
const { CheckoutUserInfoPage } = require('../page-objects/CheckoutUserInfoPage');
const { CheckoutOverviewPage } = require('../page-objects/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../page-objects/CheckoutCompletePage');
const { InventoryPage } = require('../page-objects/InventoryPage');

/* Please take care of the concept used here:
the pageKey is the ModelPage pageTitle = page.locator('.title');
so define the pageKey as the value of the .title of each page
and the value as the PageObject itself.

Login page do not have .title so its not used here
*/

const pageRegistry = {
  "Products": InventoryPage,
  "Your Cart": CartPage,
  "Checkout: Your Information": CheckoutUserInfoPage,
  "Checkout: Overview": CheckoutOverviewPage,
  "Checkout: Complete!": CheckoutCompletePage,
};

module.exports = { pageRegistry };