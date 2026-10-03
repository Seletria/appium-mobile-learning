const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');
const CatalogScreen = require('../pages/CatalogScreen');

describe('Scroll', () => {
  const targetProductName = 'Sauce Labs Bolt T-Shirt';
  const maxAttempts = 10;
  let client;
  let listContainer;
  let catalogScreen;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });

    catalogScreen = new CatalogScreen(client);
    await catalogScreen.waitForScreen();

    listContainer = await catalogScreen.listContainer;
    await listContainer.waitForDisplayed({ timeout: 5000 });

  });

  afterEach(async () => {
    await client.deleteSession();
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
