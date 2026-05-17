const {expect} = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginMessage = page.locator(".error-message-container h3");
        this.errorCloseBtn = this.loginMessage.locator('.error-button');
        this.productsTitle = page.locator('.title');
        
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
        await this.errorCloseBtn.click();
    }

    async checkPage(url){
        await expect(this.page).toHaveURL(url);
        await expect(this.productsTitle).toHaveText('Products');
    }
    
}
module.exports = {LoginPage};
