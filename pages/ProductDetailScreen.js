class ProductDetailScreen {

  constructor(client) {
    this.client = client;
  }

  get addToCartButton() {
    return this.client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartBt")'
    );
  }

  async waitForScreen() {
    const addToCartButton = await this.addToCartButton;
    await addToCartButton.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = ProductDetailScreen;