class LoginScreen {

  constructor(client) {
    this.client = client;
  }

  get usernameInput() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")'
    );
  }

  get passwordInput() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/passwordET")'
    );
  }

  get loginButton() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginBtn")'
    );
  }

  get loginTitle() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginTV").text("Login")'
    );
  }

  get usernameError() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameErrorTV").text("Username is required")'
    );
  }

  async login(username, password) {
    const usernameInput = await this.usernameInput;
    await usernameInput.waitForDisplayed({ timeout: 5000 });
    await usernameInput.setValue(username);

    const passwordInput = await this.passwordInput;
    await passwordInput.waitForDisplayed({ timeout: 5000 });
    await passwordInput.setValue(password);

    const loginButton = await this.loginButton;
    await loginButton.waitForDisplayed({ timeout: 5000 });
    await loginButton.click();
  }

  async waitForScreen() {
    const title = await this.loginTitle;
    await title.waitForDisplayed({ timeout: 5000 });
  }

  async tapUsernameInput() {
    const usernameInput = await this.usernameInput;
    await usernameInput.waitForDisplayed({ timeout: 5000 });
    await usernameInput.click();
  }
}

module.exports = LoginScreen;