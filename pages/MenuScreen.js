class MenuScreen {

  constructor(client) {
    this.client = client;
  }

  get menuIcon() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuIV")'
    );
  }

  get loginItem() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemTV").text("Log In")'
    );
  }

  async openMenu() {
    const menuIcon = await this.menuIcon;
    await menuIcon.waitForDisplayed({ timeout: 5000 });
    await menuIcon.click();
  }

  async tapLogIn() {
    const loginItem = await this.loginItem;
    await loginItem.waitForDisplayed({ timeout: 5000 });
    await loginItem.click();
  }
}

module.exports = MenuScreen;