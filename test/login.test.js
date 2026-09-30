const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');
const MenuScreen = require('../pages/MenuScreen');

describe('Login Flow', () => {
  let client;
  let menuScreen;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });
    menuScreen = new MenuScreen(client);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  it('should complete the full journey: view product, log in, and verify logout option is available', async () => {
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

    const loginTitle = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginTV").text("Login")'
    );
    const loginText = await loginTitle.getText();
    assert.strictEqual(loginText, 'Login');

    const usernameInput = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")'
    );
    await usernameInput.setValue('bod@example.com');

    const passwordInput = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/passwordET")'
    );
    await passwordInput.setValue('10203040');

    const loginButton = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginBtn")'
    );
    await loginButton.click();

    const catalogAfterLogin = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("Sauce Labs Backpack")'
    );
    await catalogAfterLogin.waitForDisplayed({ timeout: 5000 });

    const menuIconAfterLogin = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuIV")'
    );
    await menuIconAfterLogin.click();

    assert.strictEqual(await menuScreen.isLogOutDisplayed(), true);
  });
});