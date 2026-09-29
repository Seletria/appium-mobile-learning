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
    const blackBackpackTitle = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/titleTV").text("Sauce Labs Backpack")'
    );
    const blackText = await blackBackpackTitle.getText();
    assert.strictEqual(blackText, 'Sauce Labs Backpack');
    console.log('1. Doğru ürünü bulduk ✔');

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
    console.log('2. Detay ekranına gerçekten geçtiğimiz kanıtlandı ✔');

    const menuIcon = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuIV")'
    );
    await menuIcon.click();

    const loginItem = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemTV").text("Log In")'
    );
    await loginItem.waitForDisplayed({ timeout: 5000 });
    await loginItem.click();

    const loginTitle = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginTV").text("Login")'
    );
    const loginText = await loginTitle.getText();
    assert.strictEqual(loginText, 'Login');
    console.log('3. Login ekranına gerçekten geçtiğimiz kanıtlandı ✔');

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

    const logoutItem = await client.$(
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemTV").text("Log Out")'
    );
    await logoutItem.waitForDisplayed({ timeout: 5000 });
    assert.strictEqual(await logoutItem.isDisplayed(), true);
    console.log('4. Login işlemi başarılı ✔');



  } finally {
    await client.deleteSession();
  }
}

main();

/*
'appium:noReset: true' olmadan Appium her session'da uygulamanın verisini (cache, login state) sıfırlar — şimdilik buna gerek yok, sadece açılışı test ediyoruz.
*/
