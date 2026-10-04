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

  async scrollToProduct(productName, maxAttempts = 10) {
    const listContainer = await this.listContainer;
    const targetElement = await this.client.$(
      `android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("${productName}")`
    );

    let previousSource = null;
    let found = false;
    let attempts = 0;

    while (!found && attempts < maxAttempts) {
      found = await targetElement.isDisplayed().catch(() => false);
      if (found) break;

      const currentSource = await this.client.getPageSource();

      if (currentSource === previousSource) {
        throw new Error(
          `"${productName}" elementi bulunamadı ve liste sonuna ulaşıldı (${attempts} scroll denemesi sonrası, ekran artık değişmiyor).`
        );
      }

      previousSource = currentSource;

      await this.client.execute('mobile: scrollGesture', {
        elementId: await listContainer.elementId,
        direction: 'down',
        percent: 0.75,
      });
      attempts++;
    }

    if (!found) {
      found = await targetElement.isDisplayed().catch(() => false);
    }

    return found;
  }
}

module.exports = CatalogScreen;
