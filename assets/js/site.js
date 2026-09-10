(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var languageButton = document.querySelector("[data-language-toggle]");
  var storageKey = "siteLanguage";

  function readLanguage() {
    try {
      return window.localStorage.getItem(storageKey) === "zh" ? "zh" : "en";
    } catch (error) {
      return "en";
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // The preference is optional; the page still works when storage is blocked.
    }
  }

  function applyLanguage(language, persist) {
    var isChinese = language === "zh";
    root.classList.toggle("lang-zh", isChinese);
    root.setAttribute("lang", language);

    if (languageButton) {
      languageButton.setAttribute("aria-pressed", String(isChinese));
      languageButton.setAttribute("aria-label", isChinese ? "Switch to English" : "切换为中文");
    }

    if (body) {
      document.title = isChinese ? body.dataset.titleZh : body.dataset.titleEn;
      var description = document.getElementById("page-description");
      if (description) {
        description.setAttribute("content", isChinese ? body.dataset.descriptionZh : body.dataset.descriptionEn);
      }
    }

    if (persist) {
      storeLanguage(language);
    }
  }

  applyLanguage(readLanguage(), false);

  if (languageButton) {
    languageButton.addEventListener("click", function () {
      applyLanguage(root.classList.contains("lang-zh") ? "en" : "zh", true);
    });
  }

  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.getElementById("site-navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menuButton.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
      }
    });
  }

  document.querySelectorAll(".news-summary").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".news-item");
      var detail = document.getElementById(button.getAttribute("aria-controls"));
      var open = button.getAttribute("aria-expanded") !== "true";

      button.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
      detail.hidden = !open;
    });
  });

  var newsMoreButton = document.querySelector("[data-news-more]");
  var newsList = document.querySelector("[data-news-list]");

  if (newsMoreButton && newsList) {
    newsMoreButton.addEventListener("click", function () {
      var expanded = newsMoreButton.getAttribute("aria-expanded") !== "true";
      newsMoreButton.setAttribute("aria-expanded", String(expanded));
      newsList.classList.toggle("is-expanded", expanded);
      newsMoreButton.querySelector("[data-more-label]").hidden = expanded;
      newsMoreButton.querySelector("[data-less-label]").hidden = !expanded;
      newsMoreButton.lastElementChild.textContent = expanded ? "↑" : "↓";
    });
  }
})();
