const { Then , When} = require('@cucumber/cucumber');
const { pageRegistry } = require('../../utils/pageRegistry');

Then('I should be redirected to the {string} page {string}', async function (title, url) {
    const PageClass = pageRegistry[title];

    //error handling to easily evaluate the missing title/page in the pageRegistry.utils.js
    if (!PageClass) {
        throw new Error(`Page "${title}" not found in registry. Available: ${Object.keys(pageRegistry).join(', ')}`);
    }

    this.currentPage = new PageClass(this.page);
    await this.currentPage.checkPage(url,title);
});

Then('I should be able to see the item {string} in the page', async function (item) {
    await this.currentPage.checkItem(item);
});

When('I click on the cancel button', async function () {
    await this.currentPage.cancelCheckout();
});
