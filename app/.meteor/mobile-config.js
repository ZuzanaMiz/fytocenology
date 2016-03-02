/*App.icons({
  'iphone': 'public/apple-touch-icon-60x60.png',
  'iphone_2x': 'public/apple-touch-icon-120x120.png',
  'ipad': 'public/apple-touch-icon-76x76.png',
  'ipad_2x': 'public/apple-touch-icon-152x152.png'
});

App.launchScreens({
  'iphone': 'public/Default-iphone.png',
  'ipad_landscape_2x': 'public/Default-Landscape@2x~ipad.png',
  'ipad_landscape': 'public/Default-Landscape-ipad.png',
  'ipad_portrait': 'public/Default-Portrait-ipad.png',
  'ipad_portrait_2x':'public/Default-Portrait@2x-ipad.png'
});*/
App.info({
  id: 'com.example.app',
  name: 'Fytocenology',
  description: 'Diplomova praca',
  author: 'Bc. Zuzana Mizakova',
  email: 'mizakova.zuzana@gmail.com',
  
});

/*App.icons({
'android_hdpi':'android/android_hdpi/ic_launcher.png',
'android_ldpi':'android/android_ldpi/ic_launcher.png',
'android_mdpi':'android/android_mdpi/ic_launcher.png',
'android_xhdpi' 'android/android_xhdpi/ic_launcher.png'
  // ... more screen sizes and platforms ...
});*
// Set PhoneGap/Cordova preferences
//App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'landscape');
App.setPreference('DisallowOverscroll', true);
App.setPreference('BackupWebStorage', 'none');
App.setPreference('SuppressesIncrementalRendering', true);
*/
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');