const {expect} = require('@playwright/test');
const { ModelPage } = require('./ModelPage');

class CheckoutCompletePage extends ModelPage {
    constructor(page) {
        super(page);
        this.message = page.locator('.complete-header'); 
        this.homeButton = page.getByRole('button', { name: 'Back Home' });
    }
    async verifyMessage(message){
        await expect(this.message).toHaveText(message);
    }

    async goHome(){
        await this.homeButton.click();
    }

}
module.exports = { CheckoutCompletePage };