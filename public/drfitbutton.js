(function() {
  /* Add this class to any elements you want to use to open Drift.
   *
   * Examples:
   * - <a class="drift-open-chat">Questions? We're here to help!</a>
   * - <button class="drift-open-chat">Chat now!</button>
   *
   * You can have any additional classes on those elements that you
   * would ilke.
   */
  var DRIFT_CHAT_SELECTOR = '.drift-open-chat'
  /* http://youmightnotneedjquery.com/#ready */
  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
          fn();
      });
    }
  }
  /* http://youmightnotneedjquery.com/#each */
  function forEachElement(selector, fn) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++)
      fn(elements[i], i);
  }
  function openSidebar(driftApi, event) {
    event.preventDefault();
    driftApi.sidebar.open();
    return false;
  }
  ready(function() {
    drift.on('ready', function(api) {
      var handleClick = openSidebar.bind(this, api)
      forEachElement(DRIFT_CHAT_SELECTOR, function(el) {
        el.addEventListener('click', handleClick);
      });
    });
  });
})();