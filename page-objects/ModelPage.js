const {expect} = require('@playwright/test');

class ModelPage {
    constructor(page) {
        this.page = page;
        this.itemList = page.locator('[data-test="inventory-item"]');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
    }
    async removeItem(item){
        const itemCard = await this.itemList.filter({ hasText: item });
        await itemCard.getByRole('button', { name: 'Remove' }).click();
    }
    
    async checkItem(item){
        await this.itemList.first().waitFor();
        await expect(this.itemList.filter({ hasText: item })).toBeVisible();
    }
}
module.exports = {ModelPage};