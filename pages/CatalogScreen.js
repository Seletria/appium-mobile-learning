class CatalogScreen {

  constructor(client) {
    this.client = client;
  }

  get title() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productTV")'
    );
  }

  async waitForScreen() {
    const title = await this.title;
    await title.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = CatalogScreen;