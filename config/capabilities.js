require('dotenv').config();

module.exports = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.DEVICE_NAME,
  'appium:appPackage': 'com.saucelabs.mydemoapp.android',
  'appium:appActivity': '.view.activities.SplashActivity',
};

