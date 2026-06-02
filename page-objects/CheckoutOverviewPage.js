const {expect} = require('@playwright/test');
const { ModelPage } = require('./ModelPage');

class CheckoutOverviewPage extends ModelPage {
    constructor(page) {
        super(page);
        this.productsPrices = this.itemList.locator('.inventory_item_price'); 
        this.subtotalPrice = page.locator('.summary_subtotal_label');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        
    }
    async verifyTotalPrice(){
        let totalPrice = 0;
        const subtotalText = await this.subtotalPrice.textContent();
        const subtotalValue = await parseFloat(subtotalText.replace('Item total: $', ''));
        for(let i = 0; i < await this.productsPrices.count(); i++){
            const priceText = await this.productsPrices.nth(i).textContent();
            const price = await parseFloat(priceText.replace('$', ''));
            totalPrice += price;
        }
        await expect(subtotalValue).toBe(totalPrice);
    }

    async finishCheckout(){
        await this.finishButton.click();
    }
    
}
module.exports = { CheckoutOverviewPage };