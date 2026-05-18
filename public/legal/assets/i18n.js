// Lightweight i18n: English is the default text in the markup (works with no JS).
// Each translatable node has data-i18n="key". Pages define window.I18N = { ru:{}, ky:{} }.
(function () {
  "use strict";
  var SUPPORTED = ["en", "ru", "ky"];
  var STORAGE_KEY = "dula-lang";
  var DICT = window.I18N || { ru: {}, ky: {} };
  var nodes = document.querySelectorAll("[data-i18n]");
  var original = {}; // cache English markup

  nodes.forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    original[key] = el.innerHTML;
  });

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (lang === "en") {
        el.innerHTML = original[key];
      } else if (DICT[lang] && DICT[lang][key] != null) {
        el.innerHTML = DICT[lang][key];
      } else {
        el.innerHTML = original[key]; // fallback to English
      }
    });
    document.documentElement.setAttribute("lang", lang);
    var btns = document.querySelectorAll(".lang-switch button[data-lang]");
    btns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function init() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var lang = saved || (navigator.language || "en").slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";

    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });
    apply(lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
