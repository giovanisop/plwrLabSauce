const {expect} = require('@playwright/test');
const { ModelPage } = require('./ModelPage');

class CartPage extends ModelPage {
    constructor(page) {
        super(page);
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
        this.continueButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async continueShopping(){
        await this.continueButton.click();
    }
    async checkNoItems(){  
        await expect(this.itemList).toBeHidden();
    }

}
module.exports = {CartPage};
