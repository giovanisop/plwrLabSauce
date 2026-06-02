const {expect} = require('@playwright/test');

class ModelPage {
    constructor(page) {
        this.page = page;
        this.itemList = page.locator('[data-test="inventory-item"]');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.pageTitle = page.locator('.title');
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }
    async removeItem(item){
        const itemCard = await this.itemList.filter({ hasText: item });
        await itemCard.getByRole('button', { name: 'Remove' }).click();
    }
    
    async checkItem(item){
        await this.itemList.first().waitFor();
        await expect(this.itemList.filter({ hasText: item })).toBeVisible();
    }

    async checkPage(url, title){
        await expect(this.page).toHaveURL(url);
        await expect(this.pageTitle).toHaveText(title);
    }
    
    async cancelCheckout(){
        await this.cancelButton.click();
    }
    
}
module.exports = {ModelPage};