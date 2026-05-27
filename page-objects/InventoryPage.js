const {expect} = require('@playwright/test');
const { ModelPage } = require('./ModelPage');

class InventoryPage extends ModelPage {
    constructor(page) {
        super(page);
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');
        this.productsTitle = page.locator('.title');
    }

    async addToCart(item){
        const itemCard = await this.itemList.filter({ hasText: item });
        await itemCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async checkCartBadge(count){
        if(count == '0'){
            await expect(this.cartBadge).toBeHidden();
        }else{
            await expect(this.cartBadge).toHaveText(count);
        }
    }

    async goToCart(){
        await this.cartButton.click();
    }

    async checkPage(url){
        await expect(this.page).toHaveURL(url);
        await expect(this.productsTitle).toHaveText('Products');
    }
}
module.exports = {InventoryPage};