class CatalogScreen {

  constructor(client) {
    this.client = client;
  }

  get title() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productTV")'
    );
  }

  get listContainer() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productRV")'
    );
  }

  async waitForScreen() {
    const title = await this.title;
    await title.waitForDisplayed({ timeout: 5000 });
  }

  async tapProductByName(productName) {
    const productImage = await this.client.$(
      `android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("${productName}")` +
      `.fromParent(new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productIV"))`
    );
    await productImage.waitForDisplayed({ timeout: 5000 });
    await productImage.click();
  }
}

module.exports = CatalogScreen;
