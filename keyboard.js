const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('./config/capabilities');

async function main() {
  const client = await remote({
    hostname: 'localhost',
    port: 4723,
    capabilities,

  });

  try {
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

    const usernameInput = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")'
    );

    await usernameInput.waitForDisplayed({ timeout: 5000 });

    const keyboardBefore = await client.isKeyboardShown();
    assert.strictEqual(keyboardBefore, false, 'Precondition: klavye click öncesi kapalı olmalı');

    await usernameInput.click();

    await client.waitUntil(
      async () => await client.isKeyboardShown(),
      { timeout: 5000, timeoutMsg: 'Klavye 5 sn içinde açılmadı' }
    );

    console.log('Klavye açıldı ✔');

  } finally {
    await client.deleteSession();
  }
}


main().catch((err) => {
  console.error('Hata:', err);
  process.exit(1);
});