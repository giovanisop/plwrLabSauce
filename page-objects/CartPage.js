const {expect} = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
        this.continueButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async checkCartItem(item){
        await expect(this.cartItems.filter({ hasText: item })).toBeVisible();
    }

    async continueShopping(){
        await this.continueButton.click();
    }
    

}
module.exports = {CartPage};
