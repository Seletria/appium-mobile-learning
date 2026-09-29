const { remote } = require('webdriverio');
const assert = require('assert');
const capabilities = require('./config/capabilities');

async function main() {
  const client = await remote({
    hostname: 'localhost',
    port: 4723,
    capabilities

  });

  try {
    const listContainer = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productRV")'
    );

    const targetProductName = 'Sauce Labs Bolt T-Shirt';

    const targetElement = await client.$(
      `android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("${targetProductName}")`
    );

    let previousSource = null;
    let found = false;
    let attempts = 0;
    const maxAttempts = 10;

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

      console.log(`Deneme ${attempts + 1}: henüz görünmüyor, scroll ediliyor...`);
      await client.execute('mobile: scrollGesture', {
        elementId: await listContainer.elementId,
        direction: 'down',
        percent: 0.75
      });
      attempts++;
    }

    if (!found) {
      throw new Error(
        `"${targetProductName}" elementi ${maxAttempts} scroll denemesinde bulunamadı (liste sonuna ulaşılmadı, deneme hakkı tükendi — locator veya timing sorunu olabilir).`
      );
    }

    assert.strictEqual(found, true);
    console.log(`"${targetProductName}" ${attempts} scroll sonrası bulundu ✔`);

  } finally {
    await client.deleteSession();
  }
}

main().catch((err) => {
  console.error('Hata:', err);
  process.exit(1);
});