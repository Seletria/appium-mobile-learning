const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');
const MenuScreen = require('../pages/MenuScreen');
const LoginScreen = require('../pages/LoginScreen');
const CatalogScreen = require('../pages/CatalogScreen');

describe('Login Flow', () => {
  let client;
  let menuScreen;
  let loginScreen;
  let catalogScreen;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });
    menuScreen = new MenuScreen(client);
    loginScreen = new LoginScreen(client);
    catalogScreen = new CatalogScreen(client);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  it('should complete the full journey: view product, log in, and verify logout option is available', async () => {

    await catalogScreen.waitForScreen();

    const blackBackpackTitle = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("Sauce Labs Backpack")'
    );
    const blackText = await blackBackpackTitle.getText();
    assert.strictEqual(blackText, 'Sauce Labs Backpack');

    const blackBackpackCard = await client.$(
      '//androidx.recyclerview.widget.RecyclerView[@content-desc="Displays all products of catalog"]/android.view.ViewGroup[1]'
    );
    await blackBackpackCard.click();

    const addToCartButton = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartBt")'
    );
    await addToCartButton.waitForDisplayed({ timeout: 5000 });

    const isDisplayed = await addToCartButton.isDisplayed();
    assert.strictEqual(isDisplayed, true);

    await menuScreen.openMenu();

    await menuScreen.tapLogIn();

    await loginScreen.waitForScreen();

    await loginScreen.login('bod@example.com', '10203040');

    await catalogScreen.waitForScreen();

    await menuScreen.openMenu();

    assert.strictEqual(await menuScreen.isLogOutDisplayed(), true);
  });
});