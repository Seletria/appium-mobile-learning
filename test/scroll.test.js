const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');

describe('Scroll', () => {
  const targetProductName = 'Sauce Labs Bolt T-Shirt';
  const maxAttempts = 10;
  let client;
  let listContainer;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });

    listContainer = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productRV")'
    );
    await listContainer.waitForDisplayed({ timeout: 5000 });
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  it('should show the product list on launch', async () => {
    const isListDisplayed = await listContainer.isDisplayed();
    assert.strictEqual(isListDisplayed, true, 'Precondition: ürün listesi açılışta görünmeli');
  });

  it('should find the target product by scrolling', async () => {
    const targetElement = await client.$(
      `android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("${targetProductName}")`
    );

    let previousSource = null;
    let found = false;
    let attempts = 0;

    while (!found && attempts < maxAttempts) {
      found = await targetElement.isDisplayed().catch(() => false);
      if (found) break;

      const currentSource = await client.getPageSource();

      if (currentSource === previousSource) {
        throw new Error(
          `"${targetProductName}" elementi bulunamadı ve liste sonuna ulaşıldı (${attempts} scroll denemesi sonrası, ekran artık değişmiyor).`
        );
      }

      previousSource = currentSource;

      await client.execute('mobile: scrollGesture', {
        elementId: await listContainer.elementId,
        direction: 'down',
        percent: 0.75,
      });
      attempts++;
    }

    if (!found) {
      found = await targetElement.isDisplayed().catch(() => false);
    }

    assert.strictEqual(
      found,
      true,
      `"${targetProductName}" elementi ${maxAttempts} scroll denemesinde bulunamadı (liste sonuna ulaşılmadı, deneme hakkı tükendi — locator veya timing sorunu olabilir).`
    );
  });
});
