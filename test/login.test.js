const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');
const MenuScreen = require('../pages/MenuScreen');
const LoginScreen = require('../pages/LoginScreen');
const CatalogScreen = require('../pages/CatalogScreen');
const ProductDetailScreen = require('../pages/ProductDetailScreen');

describe('Login Flow', () => {
  let client;
  let menuScreen;
  let loginScreen;
  let catalogScreen;
  let productDetailScreen;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });
    menuScreen = new MenuScreen(client);
    loginScreen = new LoginScreen(client);
    catalogScreen = new CatalogScreen(client);
    productDetailScreen = new ProductDetailScreen(client);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  it('should complete the full journey: view product, log in, and verify logout option is available', async () => {

    await catalogScreen.waitForScreen();

    await catalogScreen.tapProductByName('Sauce Labs Backpack');

    await productDetailScreen.waitForScreen();

    await menuScreen.openMenu();

    await menuScreen.tapLogIn();

    await loginScreen.waitForScreen();

    await loginScreen.login('bod@example.com', '10203040');

    await catalogScreen.waitForScreen();

    await menuScreen.openMenu();

    assert.strictEqual(await menuScreen.isLogOutDisplayed(), true);
  });
});