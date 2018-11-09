// OneSignal

OneSignal.init({appId: "1b2897c2-3c9f-4645-8dc4-5a8eb06c52ea",
                googleProjectNumber: "572437906425"});

// Eternity Extension Event Page
(function () {

  chrome.runtime.onInstalled.addListener(function (details) {
    if (details && details.reason && details.reason == 'install') chrome.tabs.create({url: "index.html"});
  });

  chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: "index.html"});
  });

})();
