const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');

describe('Keyboard Management', () => {
  let client;
  let usernameInput;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });

    const menuIcon = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuIV")'
    );
    await menuIcon.waitForDisplayed({ timeout: 5000 });
    await menuIcon.click();

    const loginItem = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemTV").text("Log In")'
    );
    await loginItem.waitForDisplayed({ timeout: 5000 });
    await loginItem.click();

    usernameInput = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")'
    );
    await usernameInput.waitForDisplayed({ timeout: 5000 });
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  it('should have keyboard hidden before tapping', async () => {
    const keyboardBefore = await client.isKeyboardShown();
    assert.strictEqual(keyboardBefore, false, 'Precondition: klavye başlangıçta kapalı olmalı');
  });

  it('should show keyboard after tapping username field', async () => {
    await usernameInput.click();

    await client.waitUntil(
      async () => await client.isKeyboardShown(),
      { timeout: 5000, timeoutMsg: 'Klavye 5 sn içinde açılmadı' }
    );
  });
});