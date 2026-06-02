const {expect} = require('@playwright/test');
const { ModelPage } = require('./ModelPage');

class LoginPage extends ModelPage {

    constructor(page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginMessage = page.locator(".error-message-container h3");
    }

    async insertLogin(username, password) {
        await this.usernameInput.fill(username);    
        await this.passwordInput.fill(password);   
    }
    
    async tryLogin() {
        await this.loginButton.click();
    }

    async getLoginMessage(message) {
        await expect(this.loginMessage).toHaveText(message);
    }


}
module.exports = {LoginPage};
