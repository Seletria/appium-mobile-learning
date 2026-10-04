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
    const found = await catalogScreen.scrollToProduct(targetProductName, maxAttempts);

    assert.strictEqual(
      found,
      true,
      `"${targetProductName}" elementi ${maxAttempts} scroll denemesinde bulunamadı (liste sonuna ulaşılmadı, deneme hakkı tükendi — locator veya timing sorunu olabilir).`
    );
  });
});
