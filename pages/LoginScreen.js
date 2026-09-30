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

  async waitForScreen() {
    const usernameInput = await this.usernameInput;
    await usernameInput.waitForDisplayed({ timeout: 5000 });
  }

  async tapUsernameInput() {
    const usernameInput = await this.usernameInput;
    await usernameInput.waitForDisplayed({ timeout: 5000 });
    await usernameInput.click();
  }
}

module.exports = LoginScreen;