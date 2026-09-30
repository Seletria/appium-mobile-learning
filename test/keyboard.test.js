const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('../config/capabilities');
const LoginScreen = require('../pages/LoginScreen');
const MenuScreen = require('../pages/MenuScreen');

describe('Keyboard Management', () => {
  let client;
  let loginScreen;
  let menuScreen;

  beforeEach(async () => {
    client = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities,
    });

    menuScreen = new MenuScreen(client);
    await menuScreen.openMenu();
    await menuScreen.tapLogIn();

    loginScreen = new LoginScreen(client);
    await loginScreen.waitForScreen();
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  it('should have keyboard hidden before tapping', async () => {
    const keyboardBefore = await client.isKeyboardShown();
    assert.strictEqual(keyboardBefore, false, 'Precondition: klavye başlangıçta kapalı olmalı');
  });

  it('should show keyboard after tapping username field', async () => {
    await loginScreen.tapUsernameInput();

    await client.waitUntil(
      async () => await client.isKeyboardShown(),
      { timeout: 5000, timeoutMsg: 'Klavye 5 sn içinde açılmadı' }
    );
  });
});