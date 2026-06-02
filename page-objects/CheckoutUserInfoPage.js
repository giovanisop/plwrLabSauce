const { ModelPage } = require('./ModelPage');

class CheckoutUserInfoPage extends ModelPage {
    constructor(page) {
        super(page);
        this.firstNameinput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameinput = page.getByRole('textbox', { name: 'Last Name' });
        this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }
    async insertUserInfo(firstName, lastName, postalCode){
        await this.firstNameinput.fill(firstName);
        await this.lastNameinput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async continueCheckout(){
        await this.continueButton.click();
    }

}
module.exports = { CheckoutUserInfoPage };