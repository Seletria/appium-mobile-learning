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

  async #tapMenuItem(itemText) {
    const menuItem = await this.client.$(
      `android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemTV").text("${itemText}")`
    );
    await menuItem.waitForDisplayed({ timeout: 5000 });
    await menuItem.click();
  }

  async tapLogIn() {
    await this.#tapMenuItem("Log In");
  }

  async tapLogOut() {
    await this.#tapMenuItem("Log Out");
  }

  async isLogOutDisplayed() {
    const logoutItem = await this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemTV").text("Log Out")'
    );
    try {
      await logoutItem.waitForDisplayed({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

}

module.exports = MenuScreen;