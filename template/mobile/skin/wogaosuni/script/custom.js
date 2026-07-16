(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var toggle = document.getElementById("menuToggle");
    var sidebarCollapseToggle = document.getElementById("sidebarCollapseToggle");
    var sidebar = document.getElementById("siteSidebar");
    var sidebarClose = document.getElementById("sidebarClose");
    var sidebarOverlay = document.getElementById("siteSidebarOverlay");
    var tabs = document.querySelectorAll("[data-tab-target]");
    var panels = document.querySelectorAll("[data-tab-panel]");
    var searchInput = document.getElementById("edtSearch");
    var siteSearchForm = document.getElementById("siteSearchForm");
    var searchSwitcher = document.getElementById("searchSwitcher");
    var searchSourceBadge = document.getElementById("searchSourceBadge");
    var searchSourceType = document.getElementById("searchSourceType");
    var searchSourceUrl = document.getElementById("searchSourceUrl");
    var searchSourceButtons = document.querySelectorAll("[data-search-source]");
    var searchSuggest = document.getElementById("searchSuggest");
    var searchTermButtons = document.querySelectorAll("[data-search-term]");
    var searchCategoryButtons = document.querySelectorAll("[data-search-category]");
    var searchCategoryAnchor = document.querySelector(".search-switcher__tab-anchor");
    var searchSourceBar = document.querySelector(".search-switcher__bar");
    var searchEngineToggle = document.getElementById("searchEngineToggle");
    var sideToggles = document.querySelectorAll(".side-nav-list__toggle");
    var sideNavLinks = document.querySelectorAll(".side-nav-list__row > a");
    var directoryButtons = document.querySelectorAll("[data-directory-target]");
    var directoryPanels = document.querySelectorAll("[data-directory-panel]");
    var subpanelTriggers = document.querySelectorAll("[data-subpanel-trigger]");
    var dropdownTriggers = document.querySelectorAll("[data-dropdown-trigger]");
    var regionBadgeAnchors = document.querySelectorAll(".nav-card__badge-anchor--region");
    var floatTrigger = document.getElementById("siteFloatTrigger");
    var floatPanel = document.getElementById("siteFloatPanel");
    var quickFavorites = document.getElementById("quickFavorites");
    var quickFavoritesAdd = document.getElementById("quickFavoritesAdd");
    var quickFavoritesAddPanel = document.getElementById("quickFavoritesAddPanel");
    var quickFavoritesAddForm = document.getElementById("quickFavoritesAddForm");
    var quickFavoritesAddTitle = document.getElementById("quickFavoritesAddTitle");
    var quickFavoritesAddUrl = document.getElementById("quickFavoritesAddUrl");
    var quickFavoritesAddClose = document.getElementById("quickFavoritesAddClose");
    var customShortcutCategoryFilter = document.getElementById("customShortcutCategoryFilter");
    var customShortcutPickerList = document.getElementById("customShortcutPickerList");
    var quickFavoritesTrigger = document.getElementById("quickFavoritesTrigger");
    var quickFavoritesPanel = document.getElementById("quickFavoritesPanel");
    var quickFavoritesList = document.getElementById("quickFavoritesList");
    var quickFavoritesEmpty = document.getElementById("quickFavoritesEmpty");
    var quickFavoritesCount = document.getElementById("quickFavoritesCount");
    var quickFavoritesHeadCount = document.getElementById("quickFavoritesHeadCount");
    var quickFavoritesClear = document.getElementById("quickFavoritesClear");
    var quickFavoritesMode = document.getElementById("quickFavoritesMode");
    var quickFavoritesHide = document.getElementById("quickFavoritesHide");
    var quickFavoritesDefaults = document.getElementById("quickFavoritesDefaults");
    var openQuickFavoritesButton = document.getElementById("openQuickFavorites");
    var backToTop = document.getElementById("backToTop");
    var homeRecommendMore = document.getElementById("homeRecommendMore");
    var homeRecommend = document.getElementById("homeRecommend");
    var homeRecommendTabs = document.querySelectorAll("[data-home-recommend-tab]");
    var homeRecommendPanels = document.querySelectorAll("[data-home-recommend-panel]");
    var homeRecommendCustomGrid = document.getElementById("homeRecommendCustomGrid");
    var homeRecommendCustomEmpty = document.getElementById("homeRecommendCustomEmpty");
    var homeRecommendRecentGrid = document.getElementById("homeRecommendRecentGrid");
    var homeRecommendRecentEmpty = document.getElementById("homeRecommendRecentEmpty");
    var homeRecommendMonthlyHotGrid = document.getElementById("homeRecommendMonthlyHotGrid");
    var homeRecommendMonthlyHotEmpty = document.getElementById("homeRecommendMonthlyHotEmpty");
    var homeRecommendPinnedData = document.getElementById("homeRecommendPinnedData");
    var homeRecommendLatestData = document.getElementById("homeRecommendLatestData");
    var homeHotFallbackData = document.getElementById("homeHotFallbackData");
    var contentTypeIndexData = document.getElementById("wogaosuniContentTypeIndex");
    var rankingPage = document.querySelector("[data-ranking-page]");
    var rankingPageFallbackData = document.getElementById("rankingPageFallbackData");
    var sidebarRankingCards = document.querySelectorAll("[data-sidebar-ranking]");
    var homeStatNumbers = document.querySelectorAll(".nav-theme-v2.is-home .search-board__stats [data-countup]");
    var sponsorModal = document.getElementById("sponsorModal");
    var sponsorModalOpeners = document.querySelectorAll("[data-sponsor-modal-open]");
    var sponsorModalClosers = document.querySelectorAll("[data-sponsor-modal-close]");
    var detailTabs = document.querySelectorAll("[data-detail-tab]");
    var detailPanels = document.querySelectorAll("[data-detail-panel]");
    var siteQrTrigger = document.querySelector("[data-site-qr-trigger]");
    var siteQrPopover = document.querySelector("[data-site-qr-popover]");
    var siteQrBox = document.querySelector("[data-site-qr-box]");
    var singleFavoriteToggle = document.querySelector("[data-single-favorite-toggle]");
    var singleShareButton = document.querySelector("[data-share-current-url]");
    var feedbackOpen = document.querySelector("[data-feedback-open]");
    var feedbackModal = document.querySelector("[data-feedback-modal]");
    var feedbackCloseButtons = document.querySelectorAll("[data-feedback-close]");
    var feedbackTypeButtons = document.querySelectorAll("[data-feedback-type]");
    var feedbackForm = document.querySelector("[data-feedback-form]");
    var feedbackText = document.querySelector("[data-feedback-text]");
    var navCards = document.querySelectorAll(".nav-card");
    var cardThemeButtons = document.querySelectorAll("[data-card-theme-option]");
    var desktopCollapseStorageKey = "wogaosuni_sidebar_collapsed_v4";
    var desktopSidebarExpandedWidth = 222;
    var desktopSidebarCollapsedWidth = 70;
    var desktopMainExpandedRightGap = 24;
    var desktopMainCollapsedRightGap = 84;
    var desktopTopbarCollapsedRightGap = 12;
    var cardThemeStorageKey = "wogaosuni_card_theme";
    var quickFavoritesStorageKey = "wogaosuni_quick_favorites";
    var quickFavoritesSeededKey = "wogaosuni_quick_favorites_seeded";
    var quickFavoritesDockModeKey = "wogaosuni_quick_favorites_dock_mode";
    var behaviorStoreStorageKey = "wogaosuni_user_behavior_store";
    var sideAccordionStorageKey = "wogaosuni_side_nav_expanded_v1";
    var sideAccordionClosedValue = "__all_closed__";
    var behaviorStoreVersion = 1;
    var behaviorRecentLimit = 12;
    var behaviorHistoryLimit = 120;
    var behaviorMonthlyRetention = 12;
    var homeMiniShortcutRowLimit = 12;
    var homeCustomSlotCount = homeMiniShortcutRowLimit;
    var homeToolGridRows = 4;
    var homeToolGridMaxItems = 24;
    var homeMiniShortcutBadgeLabels = ["AI神器", "AI编程", "AI办公", "AI创作", "排行", "设计", "热门", "精选", "AI", "效率"];
    var homeMiniShortcutTitleLimit = 8;
    var siteLogoFallbackUrl = "zb_users/theme/wogaosuni_nav/image/favicon-32.png";
    var siteLogoFallbackCheck = {
      "": true,
      "undefined": true,
      "null": true
    };
    siteLogoFallbackCheck["https://www.midjourney.com/favicon.ico"] = true;
    siteLogoFallbackCheck["http://www.midjourney.com/favicon.ico"] = true;
    var suppressBehaviorStoreEvents = false;
    var floatHoverTimer = 0;
    var quickFavoritesHoverTimer = 0;
    var quickFavoriteDraggingId = "";
    var collapsedSidebarHoverTimer = 0;
    var topbarCategoryCloseTimer = 0;
    var fastTooltipNode = null;
    var fastTooltipTarget = null;
    var customShortcutEditMode = false;
    var customShortcutPickerItems = [];
    var customShortcutPendingSlotIndex = -1;
    var sideAccordionRefreshTimer = 0;
    var homeToolGridLimitTimer = 0;
    var cardThemeDefault = normalizeCardTheme(document.body.getAttribute("data-card-theme") || (document.body.classList.contains("is-card-theme-square") ? "square" : "toolify"));

    function normalizeCardTheme(theme) {
      return theme === "square" ? "square" : "toolify";
    }

    function isPageSwitchControl(node) {
      return !!(node && node.closest && node.closest(".pagebar, .pagination, .pager, .page-numbers, .archive-pagination, .news-archive__pagination"));
    }

    function setFastTooltip(node, text) {
      if (!node) {
        return;
      }
      if (isPageSwitchControl(node)) {
        node.removeAttribute("title");
        node.removeAttribute("data-ui-tooltip");
        node.removeAttribute("data-card-tip");
        return;
      }
      var normalizedText = normalizeFavoriteText(text || "");
      if (normalizedText) {
        node.setAttribute("data-ui-tooltip", normalizedText);
      } else {
        node.removeAttribute("data-ui-tooltip");
      }
      node.removeAttribute("title");
    }

    function hydrateFastTooltips(root) {
      var scope = root && root.querySelectorAll ? root : document;
      var pageSwitchNodes = scope.querySelectorAll(".pagebar [title], .pagebar [data-ui-tooltip], .pagebar [data-card-tip], .pagination [title], .pagination [data-ui-tooltip], .pagination [data-card-tip], .pager [title], .pager [data-ui-tooltip], .pager [data-card-tip], .page-numbers [title], .page-numbers [data-ui-tooltip], .page-numbers [data-card-tip], .archive-pagination [title], .archive-pagination [data-ui-tooltip], .archive-pagination [data-card-tip], .news-archive__pagination [title], .news-archive__pagination [data-ui-tooltip], .news-archive__pagination [data-card-tip]");
      for (var p = 0; p < pageSwitchNodes.length; p++) {
        pageSwitchNodes[p].removeAttribute("title");
        pageSwitchNodes[p].removeAttribute("data-ui-tooltip");
        pageSwitchNodes[p].removeAttribute("data-card-tip");
      }
      var titledNodes = scope.querySelectorAll("[title]");
      for (var i = 0; i < titledNodes.length; i++) {
        var titleText = titledNodes[i].getAttribute("title");
        if (titleText) {
          setFastTooltip(titledNodes[i], titleText);
        }
      }
    }

    function getFastTooltipText(node) {
      if (!node) {
        return "";
      }
      if (isPageSwitchControl(node)) {
        return "";
      }
      return normalizeFavoriteText(node.getAttribute("data-card-tip") || node.getAttribute("data-ui-tooltip") || "");
    }

    function findFastTooltipTarget(startNode) {
      if (!startNode || !startNode.closest) {
        return null;
      }
      if (isPageSwitchControl(startNode)) {
        return null;
      }
      return startNode.closest("[data-card-tip], [data-ui-tooltip]");
    }

    function ensureFastTooltipNode() {
      if (fastTooltipNode) {
        return fastTooltipNode;
      }
      fastTooltipNode = document.createElement("div");
      fastTooltipNode.className = "fast-ui-tooltip";
      fastTooltipNode.setAttribute("role", "tooltip");
      fastTooltipNode.setAttribute("aria-hidden", "true");
      document.body.appendChild(fastTooltipNode);
      return fastTooltipNode;
    }

    function positionFastTooltip(target) {
      var tooltip = ensureFastTooltipNode();
      var targetRect = target.getBoundingClientRect();
      var tooltipRect = tooltip.getBoundingClientRect();
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      var gap = target.hasAttribute("data-card-tip") ? 8 : 7;
      var left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      var top = targetRect.top - tooltipRect.height - gap;
      var placement = "top";
      var minLeft = 8;
      var maxLeft = Math.max(minLeft, viewportWidth - tooltipRect.width - 8);
      if (top < 8 && targetRect.bottom + tooltipRect.height + gap < viewportHeight - 8) {
        top = targetRect.bottom + gap;
        placement = "bottom";
      }
      left = Math.max(minLeft, Math.min(maxLeft, left));
      tooltip.style.left = Math.round(left) + "px";
      tooltip.style.top = Math.round(Math.max(8, top)) + "px";
      tooltip.style.setProperty("--fast-tooltip-arrow-left", Math.round(targetRect.left + (targetRect.width / 2) - left) + "px");
      tooltip.setAttribute("data-placement", placement);
    }

    function showFastTooltip(target) {
      var tooltipText = getFastTooltipText(target);
      if (!tooltipText) {
        hideFastTooltip();
        return;
      }
      var tooltip = ensureFastTooltipNode();
      fastTooltipTarget = target;
      tooltip.textContent = tooltipText;
      tooltip.setAttribute("aria-hidden", "false");
      tooltip.setAttribute("data-tone", target.hasAttribute("data-card-tip") ? "card" : "ui");
      positionFastTooltip(target);
      tooltip.classList.add("is-visible");
    }

    function hideFastTooltip() {
      if (!fastTooltipNode) {
        return;
      }
      fastTooltipTarget = null;
      fastTooltipNode.classList.remove("is-visible");
      fastTooltipNode.setAttribute("aria-hidden", "true");
    }

    function bindFastTooltipEvents() {
      document.addEventListener("mouseover", function (event) {
        var target = findFastTooltipTarget(event.target);
        if (!target) {
          return;
        }
        showFastTooltip(target);
      });
      document.addEventListener("mouseout", function (event) {
        var target = findFastTooltipTarget(event.target);
        if (!target || (event.relatedTarget && target.contains(event.relatedTarget))) {
          return;
        }
        hideFastTooltip();
      });
      document.addEventListener("focusin", function (event) {
        var target = findFastTooltipTarget(event.target);
        if (target) {
          showFastTooltip(target);
        }
      });
      document.addEventListener("focusout", function (event) {
        var target = findFastTooltipTarget(event.target);
        if (!target || (event.relatedTarget && target.contains(event.relatedTarget))) {
          return;
        }
        hideFastTooltip();
      });
      window.addEventListener("scroll", function () {
        if (fastTooltipTarget) {
          positionFastTooltip(fastTooltipTarget);
        }
      }, true);
      window.addEventListener("resize", function () {
        if (fastTooltipTarget) {
          positionFastTooltip(fastTooltipTarget);
        }
      });
    }

    function readCardTheme() {
      try {
        return normalizeCardTheme(window.localStorage.getItem(cardThemeStorageKey) || cardThemeDefault);
      } catch (error) {
        return cardThemeDefault;
      }
    }

    function writeCardTheme(theme) {
      try {
        window.localStorage.setItem(cardThemeStorageKey, normalizeCardTheme(theme));
      } catch (error) {
      }
    }

    function applyCardTheme(theme, persist) {
      var nextTheme = normalizeCardTheme(theme);
      document.body.setAttribute("data-card-theme", nextTheme);
      document.body.classList.toggle("is-card-theme-square", nextTheme === "square");
      document.body.classList.toggle("is-card-theme-toolify", nextTheme !== "square");
      for (var i = 0; i < cardThemeButtons.length; i++) {
        var active = cardThemeButtons[i].getAttribute("data-card-theme-option") === nextTheme;
        cardThemeButtons[i].classList.toggle("is-active", active);
        cardThemeButtons[i].setAttribute("aria-pressed", active ? "true" : "false");
      }
      if (persist !== false) {
        writeCardTheme(nextTheme);
      }
    }

    function animateHomeStats() {
      if (!homeStatNumbers.length) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(function () {
          callback(Date.now());
        }, 16);
      };
      for (var hsi = 0; hsi < homeStatNumbers.length; hsi++) {
        (function (node, index) {
          var originalText = (node.textContent || "").trim();
          var target = parseInt(originalText.replace(/[^\d]/g, ""), 10);
          if (!isFinite(target) || target <= 0) {
            return;
          }
          var suffix = originalText.replace(/[\d,\s]/g, "");
          var start = 0;
          var duration = 560 + index * 90;
          var seed = Math.max(18, Math.round(target * (0.18 + index * 0.06)));
          node.textContent = "0" + suffix;
          raf(function tick(timestamp) {
            if (!start) {
              start = timestamp;
            }
            var progress = Math.min(1, (timestamp - start) / duration);
            var easing = 1 - Math.pow(1 - progress, 3);
            var jitter = progress < 0.72 ? Math.round(Math.sin(timestamp / 18 + index) * seed * (1 - progress)) : 0;
            var current = Math.max(0, Math.min(target, Math.round(target * easing + jitter)));
            node.textContent = String(current) + suffix;
            if (progress < 1) {
              raf(tick);
            } else {
              node.textContent = originalText;
            }
          });
        })(homeStatNumbers[hsi], hsi);
      }
    }

    function isMobileSidebar() {
      return window.innerWidth <= 960;
    }

    function isDesktopSidebar() {
      return window.innerWidth > 960;
    }

    function setSidebarState(open) {
      if (!sidebar) {
        return;
      }
      sidebar.classList.toggle("is-open", open);
      document.body.classList.toggle("is-sidebar-open", open);
      if (toggle) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }
    }

    function readCollapsedState() {
      try {
        var stored = window.localStorage.getItem(desktopCollapseStorageKey);
        if (stored === null) {
          return true;
        }
        return stored === "1";
      } catch (error) {
        return true;
      }
    }

    function writeCollapsedState(collapsed) {
      try {
        window.localStorage.setItem(desktopCollapseStorageKey, collapsed ? "1" : "0");
      } catch (error) {
      }
    }

    function getSideAccordionStorageKey() {
      var pageKey = window.location.pathname || "/";
      var parts = [];
      try {
        var params = new URLSearchParams(window.location.search || "");
        var keepParams = ["cate", "id", "ranking", "submit-site", "contact", "q"];
        for (var k = 0; k < keepParams.length; k++) {
          if (params.has(keepParams[k])) {
            parts.push(keepParams[k] + "=" + params.get(keepParams[k]));
          }
        }
      } catch (error) {
      }
      return sideAccordionStorageKey + ":" + pageKey + (parts.length ? "?" + parts.join("&") : "");
    }

    function getSideNavItemKey(item) {
      if (!item) {
        return "";
      }
      var link = item.querySelector(".side-nav-list__row > a");
      if (!link) {
        return "";
      }
      return (
        link.getAttribute("data-title") ||
        link.textContent ||
        link.getAttribute("href") ||
        ""
      ).replace(/\s+/g, " ").trim();
    }

    function readSideExpandedKey() {
      try {
        var stored = window.localStorage.getItem(getSideAccordionStorageKey());
        return stored === null ? "" : stored;
      } catch (error) {
        return "";
      }
    }

    function writeSideExpandedClosed() {
      try {
        window.localStorage.setItem(getSideAccordionStorageKey(), sideAccordionClosedValue);
      } catch (error) {
      }
    }

    function writeSideExpandedKey(item) {
      var key = getSideNavItemKey(item);
      if (!key) {
        return;
      }
      try {
        window.localStorage.setItem(getSideAccordionStorageKey(), key);
      } catch (error) {
      }
    }

    function findSideNavItemByKey(key) {
      if (!key) {
        return null;
      }
      var sideNavItems = document.querySelectorAll(".side-nav-list li.has-children");
      for (var i = 0; i < sideNavItems.length; i++) {
        if (getSideNavItemKey(sideNavItems[i]) === key) {
          return sideNavItems[i];
        }
      }
      return null;
    }

    function setSidebarCollapsed(collapsed, persist) {
      var active = !!collapsed && isDesktopSidebar();
      var siteMain = document.querySelector(".site-main");
      var topbar = document.querySelector(".topbar");
      document.body.classList.toggle("is-sidebar-collapsed", active);
      if (!active) {
        closeCollapsedSidebarFlyouts(null);
      }
      if (isDesktopSidebar()) {
        var sidebarWidthNumber = active ? desktopSidebarCollapsedWidth : desktopSidebarExpandedWidth;
        var sidebarWidth = sidebarWidthNumber + "px";
        var mainOffset = sidebarWidth;
        var mainRightGap = active ? desktopMainCollapsedRightGap : desktopMainExpandedRightGap;
        var mainWidth = "calc(100vw - " + (sidebarWidthNumber + mainRightGap) + "px)";
        var topbarOffset = sidebarWidth;
        var topbarRightGap = active ? desktopTopbarCollapsedRightGap : 0;
        var topbarWidth = "calc(100vw - " + (sidebarWidthNumber + topbarRightGap) + "px)";
        document.body.style.setProperty("--sidebar-shell-width", sidebarWidth);
        if (sidebar) {
          sidebar.style.setProperty("transition", "none", "important");
          sidebar.style.setProperty("left", "0", "important");
          sidebar.style.setProperty("right", "auto", "important");
          sidebar.style.setProperty("transform", "none", "important");
          sidebar.style.setProperty("width", sidebarWidth, "important");
          sidebar.style.setProperty("min-width", sidebarWidth, "important");
          sidebar.style.setProperty("max-width", sidebarWidth, "important");
          sidebar.style.setProperty("inline-size", sidebarWidth, "important");
          sidebar.style.setProperty("min-inline-size", sidebarWidth, "important");
          sidebar.style.setProperty("max-inline-size", sidebarWidth, "important");
          sidebar.style.setProperty("flex-basis", sidebarWidth, "important");
          sidebar.style.setProperty("flex", "0 0 " + sidebarWidth, "important");
          sidebar.style.setProperty("padding-left", active ? "8px" : "16px", "important");
          sidebar.style.setProperty("padding-right", active ? "8px" : "16px", "important");
        }
        if (siteMain) {
          siteMain.style.setProperty("margin-left", mainOffset, "important");
          siteMain.style.setProperty("margin-inline-start", mainOffset, "important");
          siteMain.style.setProperty("width", mainWidth, "important");
        }
        if (topbar) {
          topbar.style.setProperty("margin-left", topbarOffset, "important");
          topbar.style.setProperty("margin-inline-start", topbarOffset, "important");
          topbar.style.setProperty("width", topbarWidth, "important");
        }
      } else {
        document.body.style.removeProperty("--sidebar-shell-width");
        if (sidebar) {
          sidebar.style.removeProperty("width");
          sidebar.style.removeProperty("min-width");
          sidebar.style.removeProperty("max-width");
          sidebar.style.removeProperty("inline-size");
          sidebar.style.removeProperty("min-inline-size");
          sidebar.style.removeProperty("max-inline-size");
          sidebar.style.removeProperty("flex-basis");
          sidebar.style.removeProperty("flex");
          sidebar.style.removeProperty("padding-left");
          sidebar.style.removeProperty("padding-right");
          sidebar.style.removeProperty("transition");
          sidebar.style.removeProperty("transform");
        }
        if (siteMain) {
          siteMain.style.removeProperty("margin-left");
          siteMain.style.removeProperty("margin-inline-start");
          siteMain.style.removeProperty("width");
        }
        if (topbar) {
          topbar.style.removeProperty("margin-left");
          topbar.style.removeProperty("margin-inline-start");
          topbar.style.removeProperty("width");
        }
      }
      if (sidebarCollapseToggle) {
        sidebarCollapseToggle.classList.toggle("is-active", active);
        sidebarCollapseToggle.setAttribute("aria-pressed", active ? "true" : "false");
        sidebarCollapseToggle.setAttribute("data-state", active ? "collapsed" : "expanded");
        setFastTooltip(sidebarCollapseToggle, active ? "展开分类导航" : "收起分类导航");
      }
      if (persist !== false) {
        writeCollapsedState(!!collapsed);
      }
    }

    function finishSidebarBoot() {
      if (!document.body) {
        return;
      }
      window.setTimeout(function () {
        document.body.classList.remove("is-sidebar-booting");
      }, 40);
    }

    function closeCollapsedSidebarFlyouts(exceptItem) {
      if (!sidebar) {
        return;
      }
      var items = sidebar.querySelectorAll(".side-nav-list li");
      for (var csi = 0; csi < items.length; csi++) {
        if (items[csi] !== exceptItem) {
          items[csi].classList.remove("is-flyout-open");
          items[csi].classList.remove("is-flyout-pinned-bottom");
          items[csi].style.removeProperty("--sidebar-flyout-top");
          items[csi].style.removeProperty("--sidebar-flyout-max-height");
        }
      }
    }

    function positionCollapsedSidebarFlyout(item) {
      if (!item || !document.body.classList.contains("is-sidebar-collapsed")) {
        return;
      }
      var flyout = item.querySelector(".side-nav-list__children");
      if (!flyout) {
        return;
      }
      item.classList.remove("is-flyout-pinned-bottom");
      item.style.removeProperty("--sidebar-flyout-top");
      item.style.removeProperty("--sidebar-flyout-max-height");
      var itemRect = item.getBoundingClientRect();
      var flyoutHeight = flyout.scrollHeight || flyout.offsetHeight || 0;
      var minTop = 78;
      var viewportPad = 18;
      var desiredTop = itemRect.top - 10;
      var maxTop = Math.max(minTop, window.innerHeight - flyoutHeight - viewportPad);
      var nextTop = Math.max(minTop, Math.min(desiredTop, maxTop));
      item.style.setProperty("--sidebar-flyout-top", (nextTop - itemRect.top) + "px");
      item.classList.toggle("is-flyout-pinned-bottom", desiredTop > maxTop);
    }

    function setCollapsedSidebarFlyout(item, open) {
      if (!item || !document.body.classList.contains("is-sidebar-collapsed")) {
        return;
      }
      if (open) {
        window.clearTimeout(collapsedSidebarHoverTimer);
        closeCollapsedSidebarFlyouts(item);
        positionCollapsedSidebarFlyout(item);
        item.classList.add("is-flyout-open");
      } else {
        item.classList.remove("is-flyout-open");
        item.classList.remove("is-flyout-pinned-bottom");
        item.style.removeProperty("--sidebar-flyout-top");
        item.style.removeProperty("--sidebar-flyout-max-height");
      }
    }

    function scheduleCollapsedSidebarFlyoutClose(item) {
      window.clearTimeout(collapsedSidebarHoverTimer);
      collapsedSidebarHoverTimer = window.setTimeout(function () {
        if (!item || item.matches(":hover") || item.contains(document.activeElement)) {
          return;
        }
        setCollapsedSidebarFlyout(item, false);
      }, 420);
    }

    function setSearchSource(button) {
      if (!button) {
        return;
      }
      var sourceId = button.getAttribute("data-search-source");
      var sourceType = button.getAttribute("data-search-type") || "internal";
      var sourceUrl = button.getAttribute("data-search-url") || "";
      var sourcePlaceholder = button.getAttribute("data-search-placeholder") || "";
      var sourceName = button.getAttribute("data-search-name") || (button.textContent ? button.textContent.replace(/\s+/g, " ").trim() : "站内搜索");

      for (var i = 0; i < searchSourceButtons.length; i++) {
        searchSourceButtons[i].classList.toggle(
          "is-active",
          searchSourceButtons[i].getAttribute("data-search-source") === sourceId
        );
      }

      if (searchSourceBadge) {
        searchSourceBadge.textContent = sourceName;
      }
      if (searchEngineToggle) {
        searchEngineToggle.textContent = sourceName;
      }
      if (searchSourceType) {
        searchSourceType.value = sourceType;
      }
      if (searchSourceUrl) {
        searchSourceUrl.value = sourceUrl;
      }
      if (searchInput) {
        searchInput.setAttribute("placeholder", "开启精彩搜索");
      }
      updateSearchSourceArrow(button);
    }

    function updateSearchCategoryAnchor(button) {
      if (!searchCategoryAnchor || !button || !button.offsetParent) {
        return;
      }
      searchCategoryAnchor.style.width = button.offsetWidth + "px";
      searchCategoryAnchor.style.transform = "translateX(" + button.offsetLeft + "px)";
    }

    function updateSearchSourceArrow(button) {
      if (!searchSourceBar || !button || button.hidden || !button.offsetParent) {
        return;
      }
      if (searchSourceBar.scrollWidth > searchSourceBar.clientWidth) {
        var nextScrollLeft = button.offsetLeft - (searchSourceBar.clientWidth - button.offsetWidth) / 2;
        nextScrollLeft = Math.max(0, Math.min(searchSourceBar.scrollWidth - searchSourceBar.clientWidth, nextScrollLeft));
        if (Math.abs(searchSourceBar.scrollLeft - nextScrollLeft) > 2) {
          searchSourceBar.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
          window.setTimeout(function () {
            updateSearchSourceArrow(button);
          }, 180);
        }
      }
      var barRect = searchSourceBar.getBoundingClientRect();
      var buttonRect = button.getBoundingClientRect();
      var center = buttonRect.left + buttonRect.width / 2 - barRect.left;
      searchSourceBar.style.setProperty("--active-source-x", center + "px");
      if (siteSearchForm) {
        var formRect = siteSearchForm.getBoundingClientRect();
        var formCenter = buttonRect.left + buttonRect.width / 2 - formRect.left;
        formCenter = Math.max(22, Math.min(formRect.width - 22, formCenter));
        siteSearchForm.style.setProperty("--active-source-x", formCenter + "px");
      }
    }

    function setSearchCategory(categoryId, keepCurrentSource) {
      if (!categoryId || !searchSourceButtons.length) {
        return;
      }

      var activeTab = null;
      for (var i = 0; i < searchCategoryButtons.length; i++) {
        var tab = searchCategoryButtons[i];
        var active = tab.getAttribute("data-search-category") === categoryId;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", active ? "true" : "false");
        if (active) {
          activeTab = tab;
        }
      }
      updateSearchCategoryAnchor(activeTab);

      var firstVisibleButton = null;
      var currentVisible = false;
      for (var b = 0; b < searchSourceButtons.length; b++) {
        var sourceButton = searchSourceButtons[b];
        var buttonCategory = sourceButton.getAttribute("data-search-category-item") || "common";
        var visible = buttonCategory === categoryId;
        sourceButton.hidden = !visible;
        sourceButton.classList.toggle("is-category-hidden", !visible);
        if (visible && !firstVisibleButton) {
          firstVisibleButton = sourceButton;
        }
        if (visible && sourceButton.classList.contains("is-active")) {
          currentVisible = true;
        }
      }

      if (!keepCurrentSource || !currentVisible) {
        setSearchSource(firstVisibleButton || searchSourceButtons[0]);
      } else {
        for (var activeIndex = 0; activeIndex < searchSourceButtons.length; activeIndex++) {
          if (searchSourceButtons[activeIndex].classList.contains("is-active")) {
            updateSearchSourceArrow(searchSourceButtons[activeIndex]);
            break;
          }
        }
      }
    }

    if (toggle && sidebar) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", function () {
        setSidebarState(!sidebar.classList.contains("is-open"));
      });
    }

    if (sidebarCollapseToggle) {
      sidebarCollapseToggle.addEventListener("click", function () {
        if (!isDesktopSidebar()) {
          return;
        }
        var next = !document.body.classList.contains("is-sidebar-collapsed");
        setSidebarCollapsed(next, true);
        scheduleSideAccordionRefresh();
      });
    }

    applyCardTheme(readCardTheme(), false);
    for (var ctb = 0; ctb < cardThemeButtons.length; ctb++) {
      cardThemeButtons[ctb].addEventListener("click", function () {
        applyCardTheme(this.getAttribute("data-card-theme-option"), true);
      });
    }

    if (sidebarClose) {
      sidebarClose.addEventListener("click", function () {
        setSidebarState(false);
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", function () {
        setSidebarState(false);
      });
    }

    if (sidebar) {
      sidebar.addEventListener("click", function (event) {
        var target = event.target;
        var link = null;
        while (target && target !== sidebar) {
          if (target.tagName === "A") {
            link = target;
            break;
          }
          target = target.parentNode;
        }
        if (
          isMobileSidebar() &&
          link &&
          link.getAttribute("href")
        ) {
          setSidebarState(false);
        }
      });
    }

    function getSideNavItem(element) {
      var node = element;
      while (node && node.tagName !== "LI") {
        node = node.parentNode;
      }
      return node;
    }

    function collapseSiblingSideItems(currentItem) {
      if (!currentItem || !currentItem.parentNode) {
        return;
      }
      var siblings = document.querySelectorAll(".side-nav-list li.has-children");
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] !== currentItem && siblings[i].classList) {
          siblings[i].classList.remove("is-expanded");
        }
      }
    }

    function syncSideNavToggleState(item) {
      if (!item || !item.classList) {
        return;
      }
      var toggleButton = item.querySelector(".side-nav-list__toggle");
      if (!toggleButton) {
        return;
      }
      var expanded = item.classList.contains("is-expanded");
      toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
      setFastTooltip(toggleButton, expanded ? "收起子分类" : "展开子分类");
    }

    function syncAllSideNavToggleStates() {
      var sideNavItems = document.querySelectorAll(".side-nav-list li.has-children");
      for (var i = 0; i < sideNavItems.length; i++) {
        syncSideNavToggleState(sideNavItems[i]);
      }
    }

    function collapseSideNavItem(item) {
      if (!item || !item.classList || !item.classList.contains("has-children")) {
        return;
      }
      item.classList.remove("is-expanded");
      if (!document.querySelector(".side-nav-list li.has-children.is-expanded")) {
        writeSideExpandedClosed();
      }
      syncAllSideNavToggleStates();
    }

    function expandSideNavItem(item, persist) {
      if (!item || !item.classList || !item.classList.contains("has-children")) {
        return;
      }
      collapseSiblingSideItems(item);
      item.classList.add("is-expanded");
      if (persist !== false) {
        writeSideExpandedKey(item);
      }
      syncAllSideNavToggleStates();
    }

    function toggleSideNavItem(item) {
      if (!item || !item.classList || !item.classList.contains("has-children")) {
        return;
      }
      if (item.classList.contains("is-expanded")) {
        collapseSideNavItem(item);
        return;
      }
      expandSideNavItem(item, true);
    }

    function initSideAccordion() {
      var sideNavItems = document.querySelectorAll(".side-nav-list li.has-children");
      if (!sideNavItems.length) {
        return;
      }

      if (document.body.classList.contains("is-sidebar-collapsed")) {
        syncAllSideNavToggleStates();
        return;
      }

      var currentlyExpanded = document.querySelector(".side-nav-list li.has-children.is-expanded");
      if (currentlyExpanded) {
        expandSideNavItem(currentlyExpanded, false);
        return;
      }

      var storedExpandedKey = readSideExpandedKey();
      if (storedExpandedKey === sideAccordionClosedValue) {
        syncAllSideNavToggleStates();
        return;
      }
      var storedExpandedItem = findSideNavItemByKey(storedExpandedKey);
      var defaultExpandedItem = storedExpandedItem || document.querySelector(".side-nav-list li.has-children.is-active") || sideNavItems[0];
      expandSideNavItem(defaultExpandedItem, false);
      syncAllSideNavToggleStates();
    }

    function scheduleSideAccordionRefresh() {
      var raf = window.requestAnimationFrame
        ? function (callback) {
          return window.requestAnimationFrame(callback);
        }
        : function (callback) {
          return window.setTimeout(callback, 16);
        };
      var cancelRaf = window.cancelAnimationFrame
        ? function (timer) {
          window.cancelAnimationFrame(timer);
        }
        : function (timer) {
          window.clearTimeout(timer);
        };
      if (sideAccordionRefreshTimer) {
        cancelRaf(sideAccordionRefreshTimer);
      }
      sideAccordionRefreshTimer = raf(function () {
        sideAccordionRefreshTimer = 0;
        initSideAccordion();
      });
    }

    if (sideToggles.length) {
      for (var s = 0; s < sideToggles.length; s++) {
        sideToggles[s].addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          var node = getSideNavItem(this);
          if (node) {
            toggleSideNavItem(node);
          }
        });
      }
    }

    if (sideNavLinks.length) {
      for (var sl = 0; sl < sideNavLinks.length; sl++) {
        sideNavLinks[sl].addEventListener("click", function (event) {
          expandSideNavItem(getSideNavItem(this), true);
        });
      }
    }

    if (sidebar) {
      var sidebarFlyoutItems = sidebar.querySelectorAll(".side-nav-list li");
      for (var sfi = 0; sfi < sidebarFlyoutItems.length; sfi++) {
        (function (item) {
          item.addEventListener("mouseenter", function () {
            setCollapsedSidebarFlyout(item, true);
          });
          item.addEventListener("mouseleave", function () {
            scheduleCollapsedSidebarFlyoutClose(item);
          });
          item.addEventListener("focusin", function () {
            setCollapsedSidebarFlyout(item, true);
          });
          item.addEventListener("focusout", function () {
            scheduleCollapsedSidebarFlyoutClose(item);
          });
        })(sidebarFlyoutItems[sfi]);
      }
    }

    function setDirectoryPanel(targetId) {
      if (!targetId || !directoryPanels.length || !directoryButtons.length) {
        return;
      }
      for (var p = 0; p < directoryPanels.length; p++) {
        directoryPanels[p].classList.toggle(
          "is-active",
          directoryPanels[p].getAttribute("data-directory-panel") === targetId
        );
      }

      for (var b = 0; b < directoryButtons.length; b++) {
        var button = directoryButtons[b];
        var matches = button.getAttribute("data-directory-target") === targetId;
        button.classList.toggle("is-active", matches);
        var item = button.closest ? button.closest("li") : null;
        if (item) {
          item.classList.toggle("is-active", matches);
          if (matches) {
            expandSideNavItem(item, true);
          }
        }
      }
    }

    initSideAccordion();

    if (directoryButtons.length) {
      for (var db = 0; db < directoryButtons.length; db++) {
        directoryButtons[db].addEventListener("click", function () {
          var target = this.getAttribute("data-directory-target");
          if (!target) {
            return;
          }
          setDirectoryPanel(target);
        });
      }
    }

    function setSubpanel(shell, targetId) {
      if (!shell || !targetId) {
        return;
      }
      var triggers = shell.querySelectorAll("[data-subpanel-trigger]");
      var panelsInShell = shell.querySelectorAll("[data-subpanel]");
      var moreLink = shell.querySelector("[data-section-more]");
      for (var sp = 0; sp < panelsInShell.length; sp++) {
        var panelMatched = panelsInShell[sp].getAttribute("data-subpanel") === targetId;
        panelsInShell[sp].classList.toggle("is-active", panelMatched);
        if (panelMatched) {
          hydrateDirectorySubpanel(panelsInShell[sp]);
          applyHomeToolGridRowLimits(panelsInShell[sp]);
        }
      }
      for (var st = 0; st < triggers.length; st++) {
        var matched = triggers[st].getAttribute("data-subpanel-trigger") === targetId;
        triggers[st].classList.toggle("is-active", matched);
        if (matched && moreLink) {
          var nextUrl = triggers[st].getAttribute("data-subpanel-url");
          if (nextUrl) {
            moreLink.setAttribute("href", nextUrl);
          }
        }
      }
      updateSegmentedIndicator(shell);
    }

    function getGridColumnCount(grid) {
      if (!grid || !window.getComputedStyle) {
        return 0;
      }
      var columns = window.getComputedStyle(grid).gridTemplateColumns || "";
      if (!columns || columns === "none") {
        return 0;
      }
      var matches = columns.match(/(?:^|\s)(?:minmax\([^)]*\)|[^\s]+)(?=\s|$)/g);
      return matches ? matches.length : 0;
    }

    function applyHomeToolGridRowLimit(grid) {
      if (!grid || !grid.classList || !grid.classList.contains("tool-grid--browser")) {
        return;
      }
      if (!grid.closest || !grid.closest(".home-recommend__group--aigc, .directory-browser--home")) {
        return;
      }
      if (window.matchMedia && !window.matchMedia("(min-width: 961px)").matches) {
        var mobileItems = grid.children;
        for (var mobileIndex = 0; mobileIndex < mobileItems.length; mobileIndex++) {
          mobileItems[mobileIndex].classList.remove("is-home-grid-overflow");
          mobileItems[mobileIndex].removeAttribute("aria-hidden");
        }
        return;
      }
      var columns = getGridColumnCount(grid);
      var limit = columns > 0 ? Math.min(homeToolGridMaxItems, columns * homeToolGridRows) : homeToolGridMaxItems;
      var items = grid.children;
      for (var i = 0; i < items.length; i++) {
        var hidden = i >= limit;
        items[i].classList.toggle("is-home-grid-overflow", hidden);
        if (hidden) {
          items[i].setAttribute("aria-hidden", "true");
        } else {
          items[i].removeAttribute("aria-hidden");
        }
      }
    }

    function applyHomeToolGridRowLimits(root) {
      var scope = root && root.querySelectorAll ? root : document;
      var grids = scope.querySelectorAll(".home-recommend__group--aigc .tool-grid--browser, .directory-browser--home .tool-grid--browser");
      for (var i = 0; i < grids.length; i++) {
        applyHomeToolGridRowLimit(grids[i]);
      }
    }

    function scheduleHomeToolGridRowLimits(root) {
      var scope = root && root.querySelectorAll ? root : document;
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 16);
      };
      raf(function () {
        applyHomeToolGridRowLimits(scope);
      });
      if (homeToolGridLimitTimer) {
        window.clearTimeout(homeToolGridLimitTimer);
      }
      homeToolGridLimitTimer = window.setTimeout(function () {
        applyHomeToolGridRowLimits(scope);
        homeToolGridLimitTimer = 0;
      }, 180);
    }

    function hydrateDirectorySubpanel(panel) {
      if (!panel || panel.getAttribute("data-subpanel-loaded") === "1") {
        return;
      }
      var panelType = normalizeFavoriteText(panel.getAttribute("data-subpanel-type") || "nav");
      var grid = panel.querySelector(".tool-grid--browser, .article-grid");
      var dataNode = panel.querySelector(".directory-subpanel-data");
      var loadingNode = panel.querySelector(".directory-showcase__loading");
      if (!grid || !dataNode) {
        panel.setAttribute("data-subpanel-loaded", "1");
        return;
      }
      if (loadingNode) {
        loadingNode.hidden = false;
      }
      var items = readJsonScript(dataNode);
      var html = "";
      for (var i = 0; i < items.length; i++) {
        html += panelType === "article"
          ? buildRecommendArticleCard(items[i])
          : buildRecommendNavCard(items[i], { directLabel: "直达" });
      }
      grid.innerHTML = html;
      panel.setAttribute("data-subpanel-loaded", "1");
      applyHomeToolGridRowLimit(grid);
      if (loadingNode) {
        loadingNode.hidden = true;
      }
      if (panelType !== "article") {
        bindNavCardInteractions(grid.querySelectorAll(".nav-card"));
        syncFavoriteButtons();
        syncRegionWarningDirection();
      }
    }

    function updateSegmentedIndicator(shell) {
      if (!shell) {
        return;
      }
      var track = shell.querySelector(".section-filter--subtabs-joly");
      if (!track) {
        return;
      }
      var indicator = track.querySelector(".section-filter__indicator-joly");
      var activeTrigger = track.querySelector("[data-subpanel-trigger].is-active");
      if (!indicator || !activeTrigger) {
        return;
      }
      var trackStyles = window.getComputedStyle(track);
      var paddingLeft = parseFloat(trackStyles.paddingLeft || "0") || 0;
      var offsetX = activeTrigger.offsetLeft - paddingLeft;

      indicator.style.width = activeTrigger.offsetWidth + "px";
      indicator.style.transform = "translateX(" + offsetX + "px)";
    }

    function updateSegmentedHover(shell, trigger) {
      if (!shell) {
        return;
      }
      var track = shell.querySelector(".section-filter--subtabs-joly");
      if (!track) {
        return;
      }
      var hoverLayer = track.querySelector(".section-filter__hover-joly");
      var indicator = track.querySelector(".section-filter__indicator-joly");
      if (!hoverLayer) {
        return;
      }
      if (!indicator) {
        return;
      }
      var triggers = track.querySelectorAll("[data-subpanel-trigger]");
      for (var ti = 0; ti < triggers.length; ti++) {
        triggers[ti].classList.remove("is-hover-proxy");
      }
      if (!trigger) {
        hoverLayer.style.setProperty("width", "0px", "important");
        hoverLayer.style.setProperty("opacity", "0", "important");
        updateSegmentedIndicator(shell);
        return;
      }
      var trackStyles = window.getComputedStyle(track);
      var paddingLeft = parseFloat(trackStyles.paddingLeft || "0") || 0;
      var offsetX = trigger.offsetLeft - paddingLeft;

      hoverLayer.style.setProperty("width", trigger.offsetWidth + "px", "important");
      hoverLayer.style.setProperty("height", trigger.offsetHeight + "px", "important");
      hoverLayer.style.setProperty("transform", "translateX(" + offsetX + "px)", "important");
      hoverLayer.style.setProperty("opacity", "1", "important");
      indicator.style.width = trigger.offsetWidth + "px";
      indicator.style.transform = "translateX(" + offsetX + "px)";
      trigger.classList.add("is-hover-proxy");
    }

    function updateTrackHover(track, trigger) {
      if (!track) {
        return;
      }
      var hoverLayer = track.querySelector(".section-filter__hover-joly");
      if (!hoverLayer) {
        return;
      }
      var triggers = track.querySelectorAll("[data-subpanel-trigger], [data-home-recommend-tab]");
      for (var i = 0; i < triggers.length; i++) {
        triggers[i].classList.remove("is-hover-proxy");
      }
      if (!trigger) {
        hoverLayer.style.setProperty("width", "0px", "important");
        hoverLayer.style.setProperty("opacity", "0", "important");
        return;
      }
      var trackStyles = window.getComputedStyle(track);
      var paddingLeft = parseFloat(trackStyles.paddingLeft || "0") || 0;
      var offsetX = trigger.offsetLeft - paddingLeft;
      hoverLayer.style.setProperty("width", trigger.offsetWidth + "px", "important");
      hoverLayer.style.setProperty("height", trigger.offsetHeight + "px", "important");
      hoverLayer.style.setProperty("transform", "translateX(" + offsetX + "px)", "important");
      hoverLayer.style.setProperty("opacity", "1", "important");
      trigger.classList.add("is-hover-proxy");
    }

    function syncAllSegmentedIndicators() {
      var shells = document.querySelectorAll("[data-subpanel-shell]");
      for (var i = 0; i < shells.length; i++) {
        updateSegmentedIndicator(shells[i]);
      }
    }

    if (subpanelTriggers.length) {
      for (var spt = 0; spt < subpanelTriggers.length; spt++) {
        subpanelTriggers[spt].addEventListener("click", function (event) {
          var target = this.getAttribute("data-subpanel-trigger");
          var shell = this.closest ? this.closest("[data-subpanel-shell]") : null;
          if (!target || !shell) {
            return;
          }
          event.preventDefault();
          setSubpanel(shell, target);
        });
        subpanelTriggers[spt].addEventListener("mouseenter", function () {
          var shell = this.closest ? this.closest("[data-subpanel-shell]") : null;
          if (!shell) {
            return;
          }
          updateSegmentedHover(shell, this);
        });
      }
    }

    var segmentedTracks = document.querySelectorAll(".section-filter--subtabs-joly");
    if (segmentedTracks.length) {
      for (var sti = 0; sti < segmentedTracks.length; sti++) {
        segmentedTracks[sti].addEventListener("mouseleave", function () {
          var shell = this.closest ? this.closest("[data-subpanel-shell]") : null;
          if (shell) {
            updateSegmentedHover(shell, null);
          } else {
            updateTrackHover(this, null);
          }
        });
      }
    }

    syncAllSegmentedIndicators();
    window.addEventListener("resize", syncAllSegmentedIndicators);

    function closeDropdowns(exceptId) {
      for (var d = 0; d < dropdownTriggers.length; d++) {
        var trigger = dropdownTriggers[d];
        var targetId = trigger.getAttribute("data-dropdown-trigger");
        var panel = targetId ? document.getElementById(targetId) : null;
        var open = targetId === exceptId;
        trigger.classList.toggle("is-open", open);
        if (panel) {
          panel.classList.toggle("is-open", open);
        }
      }
    }

    if (dropdownTriggers.length) {
      for (var d = 0; d < dropdownTriggers.length; d++) {
        dropdownTriggers[d].addEventListener("click", function (event) {
          event.stopPropagation();
          var targetId = this.getAttribute("data-dropdown-trigger");
          var panel = targetId ? document.getElementById(targetId) : null;
          var isOpen = panel && panel.classList.contains("is-open");
          closeDropdowns(isOpen ? "" : targetId);
        });
      }
    }

    function setSponsorModalOpen(open) {
      if (!sponsorModal) {
        return;
      }
      if (!open && sponsorModal.contains(document.activeElement) && document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
      sponsorModal.classList.toggle("is-open", !!open);
      sponsorModal.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("is-sponsor-modal-open", !!open);
      syncUiOverlayBlurState();
    }

    function setFloatPanelOpen(open) {
      if (!floatPanel || !floatTrigger) {
        return;
      }
      floatPanel.classList.toggle("is-open", !!open);
      floatTrigger.setAttribute("aria-expanded", open ? "true" : "false");
      syncUiOverlayBlurState();
    }

    function syncUiOverlayBlurState() {
      var active = false;
      if (sponsorModal && sponsorModal.classList.contains("is-open")) {
        active = true;
      }
      if (floatPanel && floatPanel.classList.contains("is-open") && !floatPanel.classList.contains("site-float__qr-popover")) {
        active = true;
      }
      document.body.classList.toggle("is-ui-overlay-open", active);
    }

    if (sponsorModal && sponsorModalOpeners.length) {
      if (document.body && sponsorModal.parentNode !== document.body) {
        document.body.appendChild(sponsorModal);
      }
      for (var smo = 0; smo < sponsorModalOpeners.length; smo++) {
        sponsorModalOpeners[smo].addEventListener("click", function (event) {
          event.preventDefault();
          setSponsorModalOpen(true);
        });
      }
    }

    if (sponsorModal && sponsorModalClosers.length) {
      for (var smc = 0; smc < sponsorModalClosers.length; smc++) {
        sponsorModalClosers[smc].addEventListener("click", function (event) {
          event.preventDefault();
          setSponsorModalOpen(false);
        });
      }
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          setSponsorModalOpen(false);
        }
      });
    }

    var topbarCategoryMenus = document.querySelectorAll("[data-topbar-category-menu]");
    function setTopbarCategoryMenuOpen(menu, open) {
      if (!menu) {
        return;
      }
      var trigger = menu.querySelector("[data-topbar-category-trigger]");
      menu.classList.toggle("is-open", !!open);
      if (trigger) {
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
      }
    }

    function cancelTopbarCategoryClose() {
      window.clearTimeout(topbarCategoryCloseTimer);
      topbarCategoryCloseTimer = 0;
    }

    function closeTopbarCategoryMenus(exceptMenu) {
      cancelTopbarCategoryClose();
      for (var tcm = 0; tcm < topbarCategoryMenus.length; tcm++) {
        if (topbarCategoryMenus[tcm] !== exceptMenu) {
          setTopbarCategoryMenuOpen(topbarCategoryMenus[tcm], false);
        }
      }
    }

    function scheduleTopbarCategoryClose(menu) {
      cancelTopbarCategoryClose();
      topbarCategoryCloseTimer = window.setTimeout(function () {
        if (!menu || menu.matches(":hover") || menu.contains(document.activeElement)) {
          return;
        }
        setTopbarCategoryMenuOpen(menu, false);
      }, 360);
    }

    if (topbarCategoryMenus.length) {
      for (var tci = 0; tci < topbarCategoryMenus.length; tci++) {
        (function (menu) {
          var trigger = menu.querySelector("[data-topbar-category-trigger]");
          var panel = menu.querySelector("[data-topbar-category-panel]");
          if (trigger) {
            trigger.addEventListener("click", function (event) {
              if (isDesktopSidebar()) {
                event.preventDefault();
                event.stopPropagation();
                var isOpen = menu.classList.contains("is-open");
                closeTopbarCategoryMenus(isOpen ? null : menu);
                setTopbarCategoryMenuOpen(menu, !isOpen);
              }
            });
            trigger.addEventListener("mouseenter", cancelTopbarCategoryClose);
            trigger.addEventListener("focus", cancelTopbarCategoryClose);
          }
          if (panel) {
            panel.addEventListener("mouseenter", cancelTopbarCategoryClose);
            panel.addEventListener("mouseleave", function () {
              scheduleTopbarCategoryClose(menu);
            });
            panel.addEventListener("click", function (event) {
              event.stopPropagation();
            });
          }
          menu.addEventListener("mouseenter", cancelTopbarCategoryClose);
          menu.addEventListener("mouseleave", function () {
            scheduleTopbarCategoryClose(menu);
          });
          menu.addEventListener("focusout", function () {
            scheduleTopbarCategoryClose(menu);
          });
        })(topbarCategoryMenus[tci]);
      }
    }

    if (searchSourceButtons.length) {
      for (var ss = 0; ss < searchSourceButtons.length; ss++) {
        searchSourceButtons[ss].addEventListener("click", function () {
          setSearchSource(this);
          if (searchInput) {
            searchInput.focus();
          }
        });
      }
    }

    if (searchCategoryButtons.length) {
      for (var sc = 0; sc < searchCategoryButtons.length; sc++) {
        searchCategoryButtons[sc].addEventListener("click", function () {
          setSearchCategory(this.getAttribute("data-search-category"), false);
          if (searchInput) {
            searchInput.focus();
          }
        });
      }
    }

    if (searchEngineToggle) {
      searchEngineToggle.addEventListener("click", function (event) {
        event.preventDefault();
        var activeButton = null;
        var visibleButtons = [];
        for (var i = 0; i < searchSourceButtons.length; i++) {
          if (!searchSourceButtons[i].hidden) {
            visibleButtons.push(searchSourceButtons[i]);
            if (searchSourceButtons[i].classList.contains("is-active")) {
              activeButton = searchSourceButtons[i];
            }
          }
        }
        if (!visibleButtons.length) {
          visibleButtons = Array.prototype.slice.call(searchSourceButtons);
        }
        if (!visibleButtons.length) {
          return;
        }
        var currentIndex = activeButton ? visibleButtons.indexOf(activeButton) : -1;
        var nextButton = visibleButtons[(currentIndex + 1) % visibleButtons.length];
        setSearchSource(nextButton);
        if (searchInput) {
          searchInput.focus();
        }
      });
      searchEngineToggle.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          searchEngineToggle.click();
        }
      });
    }

    if (searchTermButtons.length) {
      for (var st = 0; st < searchTermButtons.length; st++) {
        searchTermButtons[st].addEventListener("click", function () {
          var term = this.getAttribute("data-search-term");
          if (searchInput && term) {
            searchInput.value = term;
            searchInput.focus();
          }
        });
      }
    }

    if (searchInput && searchSuggest && searchSwitcher) {
      searchSwitcher.classList.remove("is-suggest-open");
    }

    if (siteSearchForm && searchInput && searchSourceType && searchSourceUrl) {
      siteSearchForm.addEventListener("submit", function (event) {
        var keyword = searchInput.value ? searchInput.value.replace(/^\s+|\s+$/g, "") : "";
        if (!keyword) {
          event.preventDefault();
          searchInput.focus();
          return;
        }
        if (searchSourceType.value === "internal") {
          event.preventDefault();
          window.location.href = (searchSourceUrl.value || "/search.php") + "?q=" + encodeURIComponent(keyword);
          return;
        }
        if (searchSourceType.value === "external") {
          event.preventDefault();
          var targetUrl = searchSourceUrl.value || "";
          if (targetUrl.indexOf("{q}") >= 0) {
            window.open(targetUrl.replace(/\{q\}/g, encodeURIComponent(keyword)), "_blank");
          } else if (targetUrl) {
            window.open(targetUrl, "_blank");
          }
        }
      });
    }

    var rankingLinks = document.querySelectorAll("[data-tab-link]");
    if (rankingLinks.length) {
      for (var rl = 0; rl < rankingLinks.length; rl++) {
        rankingLinks[rl].addEventListener("click", function () {
          var target = this.getAttribute("data-tab-link");
          if (target) {
            var btn = document.getElementById("ranking-tab-" + target);
            if (btn) {
              btn.click();
            }
          }
          closeDropdowns("");
        });
      }
    }

    if (floatTrigger && floatPanel) {
      if (document.body && floatPanel.parentNode !== document.body && !floatPanel.classList.contains("site-float__qr-popover")) {
        document.body.appendChild(floatPanel);
      }
      floatTrigger.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = !floatPanel.classList.contains("is-open");
        setFloatPanelOpen(open);
      });

      function scheduleFloatClose() {
        window.clearTimeout(floatHoverTimer);
      }

      floatTrigger.addEventListener("mouseenter", function () {
        window.clearTimeout(floatHoverTimer);
      });

      floatPanel.addEventListener("mouseenter", function () {
        window.clearTimeout(floatHoverTimer);
      });

      floatTrigger.addEventListener("mouseleave", scheduleFloatClose);
      floatPanel.addEventListener("mouseleave", scheduleFloatClose);
    }

    if (backToTop) {
      backToTop.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    function readQuickFavorites() {
      var favorites = readBehaviorStore().favorites;
      return favorites.length ? favorites : readQuickFavoriteDefaults();
    }

    function readQuickFavoriteDefaults() {
      if (!quickFavoritesDefaults) {
        return [];
      }
      try {
        var raw = quickFavoritesDefaults.textContent || quickFavoritesDefaults.innerText || "[]";
        var parsed = JSON.parse(raw);
        return normalizeQuickFavoriteItems(parsed);
      } catch (error) {
        return [];
      }
    }

    function getQuickFavoriteDefaultLookup() {
      var defaults = readQuickFavoriteDefaults();
      var lookup = {
        ids: {},
        identities: {}
      };
      for (var i = 0; i < defaults.length; i++) {
        var item = defaults[i];
        if (!item) {
          continue;
        }
        if (item.id) {
          lookup.ids[String(item.id)] = true;
        }
        var identity = buildFavoriteIdentity(item);
        if (identity) {
          lookup.identities[identity] = true;
        }
      }
      return lookup;
    }

    function isQuickFavoriteDefaultItem(item, lookup) {
      if (!item || !lookup) {
        return false;
      }
      if (item.id && lookup.ids[String(item.id)]) {
        return true;
      }
      var identity = buildFavoriteIdentity(item);
      return !!(identity && lookup.identities[identity]);
    }

    function getQuickFavoritesStorageState() {
      var state = {
        exists: false,
        valid: false,
        items: []
      };
      try {
        var storeRaw = window.localStorage.getItem(behaviorStoreStorageKey);
        if (storeRaw !== null) {
          state.exists = true;
          var parsedStore = JSON.parse(storeRaw);
          state.valid = !!parsedStore && typeof parsedStore === "object";
          state.items = state.valid ? readBehaviorStore().favorites : [];
          return state;
        }

        var raw = window.localStorage.getItem(quickFavoritesStorageKey);
        if (raw === null) {
          return state;
        }
        state.exists = true;
        var parsed = JSON.parse(raw);
        state.valid = Array.isArray(parsed);
        state.items = state.valid ? normalizeQuickFavoriteItems(parsed) : [];
      } catch (error) {
        state.exists = true;
      }
      return state;
    }

    function hasQuickFavoritesSeeded() {
      try {
        return window.localStorage.getItem(quickFavoritesSeededKey) === "1";
      } catch (error) {
        return false;
      }
    }

    function markQuickFavoritesSeeded() {
      try {
        window.localStorage.setItem(quickFavoritesSeededKey, "1");
      } catch (error) {
      }
    }

    function writeQuickFavorites(items) {
      var store = readBehaviorStore();
      store.favorites = normalizeQuickFavoriteItems(items);
      writeBehaviorStore(store, "favorites");
    }

    function createEmptyBehaviorStore() {
      return {
        version: behaviorStoreVersion,
        favorites: [],
        customCards: [],
        customCardSlots: [],
        customFavoritesLinked: false,
        recent: [],
        history: [],
        monthly: {},
        items: {}
      };
    }

    function safeReadStorage(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }

    function safeWriteStorage(key, value) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (error) {
        return false;
      }
    }

    function normalizeBehaviorTimestamp(value) {
      var timestamp = parseInt(value, 10);
      if (!isFinite(timestamp) || timestamp <= 0) {
        return 0;
      }
      return timestamp;
    }

    function getBehaviorMonthKey(timestamp) {
      var date = new Date(normalizeBehaviorTimestamp(timestamp) || Date.now());
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      return String(year) + "-" + (month < 10 ? "0" + month : String(month));
    }

    function getBehaviorDayKey(timestamp) {
      var date = new Date(normalizeBehaviorTimestamp(timestamp) || Date.now());
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return String(year) + "-" + (month < 10 ? "0" + month : String(month)) + "-" + (day < 10 ? "0" + day : String(day));
    }

    function pruneBehaviorMonthly(monthly) {
      var keys = [];
      var key = "";
      for (key in monthly) {
        if (Object.prototype.hasOwnProperty.call(monthly, key)) {
          keys.push(key);
        }
      }
      keys.sort();
      while (keys.length > behaviorMonthlyRetention) {
        delete monthly[keys.shift()];
      }
      return monthly;
    }

    function getObjectOwnKeys(object) {
      var result = [];
      var key = "";
      if (!object || typeof object !== "object") {
        return result;
      }
      for (key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }

    function upsertBehaviorItem(itemsMap, item) {
      var normalized = normalizeQuickFavoriteItem(item);
      if (!normalized || !normalized.id) {
        return null;
      }
      if (shouldExcludeFromToolBehavior(normalized)) {
        delete itemsMap[String(normalized.id)];
        return null;
      }
      itemsMap[String(normalized.id)] = normalized;
      return normalized;
    }

    function seedBehaviorItemsMap(itemsMap, items) {
      if (!Array.isArray(items)) {
        return itemsMap;
      }
      for (var i = 0; i < items.length; i++) {
        upsertBehaviorItem(itemsMap, items[i]);
      }
      return itemsMap;
    }

    function normalizeBehaviorItemsMap(rawItems) {
      var result = {};
      if (!rawItems || typeof rawItems !== "object") {
        return result;
      }
      var key = "";
      for (key in rawItems) {
        if (!Object.prototype.hasOwnProperty.call(rawItems, key)) {
          continue;
        }
        upsertBehaviorItem(result, rawItems[key]);
      }
      return result;
    }

    function normalizeBehaviorRecentEntry(entry, itemsMap) {
      if (!entry) {
        return null;
      }
      var item = null;
      if (typeof entry === "string" || typeof entry === "number") {
        item = itemsMap[String(entry)] || null;
        if (!item) {
          return null;
        }
        return {
          id: String(item.id),
          timestamp: 0,
          source: "",
          target: "",
          action: "click"
        };
      }
      if (entry.item) {
        item = upsertBehaviorItem(itemsMap, entry.item);
      }
      var id = normalizeFavoriteText(entry.id || entry.itemId || entry.favoriteId || "");
      if (!id || !itemsMap[id]) {
        return null;
      }
      return {
        id: id,
        timestamp: normalizeBehaviorTimestamp(entry.timestamp || entry.ts || entry.time),
        source: normalizeFavoriteText(entry.source || entry.from || ""),
        target: normalizeFavoriteText(entry.target || entry.linkType || ""),
        action: normalizeFavoriteText(entry.action || "click") || "click"
      };
    }

    function normalizeBehaviorHistory(entries, itemsMap) {
      if (!Array.isArray(entries)) {
        return [];
      }
      var result = [];
      for (var i = 0; i < entries.length; i++) {
        var normalized = normalizeBehaviorRecentEntry(entries[i], itemsMap);
        if (!normalized) {
          continue;
        }
        result.push(normalized);
        if (result.length >= behaviorHistoryLimit) {
          break;
        }
      }
      return result;
    }

    function normalizeBehaviorRecent(entries, itemsMap) {
      if (!Array.isArray(entries)) {
        return [];
      }
      var result = [];
      var seen = {};
      for (var i = 0; i < entries.length; i++) {
        var normalized = normalizeBehaviorRecentEntry(entries[i], itemsMap);
        if (!normalized || seen[normalized.id]) {
          continue;
        }
        seen[normalized.id] = true;
        result.push(normalized);
        if (result.length >= behaviorRecentLimit) {
          break;
        }
      }
      return result;
    }

    function normalizeBehaviorMonthly(monthly, itemsMap) {
      var result = {};
      if (!monthly || typeof monthly !== "object") {
        return result;
      }
      var monthKey = "";
      for (monthKey in monthly) {
        if (!Object.prototype.hasOwnProperty.call(monthly, monthKey) || !/^\d{4}-\d{2}$/.test(monthKey)) {
          continue;
        }
        var bucket = monthly[monthKey];
        if (!bucket || typeof bucket !== "object") {
          continue;
        }
        var normalizedBucket = {};
        var itemId = "";
        for (itemId in bucket) {
          if (!Object.prototype.hasOwnProperty.call(bucket, itemId) || !itemsMap[itemId]) {
            continue;
          }
          var entry = bucket[itemId];
          var count = parseInt(entry && entry.count, 10);
          if (!isFinite(count) || count <= 0) {
            continue;
          }
          normalizedBucket[itemId] = {
            count: count,
            lastUsedAt: normalizeBehaviorTimestamp(entry.lastUsedAt || entry.timestamp || entry.ts),
            source: normalizeFavoriteText(entry.source || ""),
            target: normalizeFavoriteText(entry.target || "")
          };
        }
        if (getObjectOwnKeys(normalizedBucket).length) {
          result[monthKey] = normalizedBucket;
        }
      }
      return pruneBehaviorMonthly(result);
    }

    function normalizeCustomCardSlots(slots, fallbackCards) {
      var source = Array.isArray(slots) && slots.length ? slots : fallbackCards;
      var result = [];
      var seenIds = {};
      var seenIdentity = {};
      if (!Array.isArray(source)) {
        source = [];
      }
      for (var i = 0; i < homeCustomSlotCount; i++) {
        var item = source[i] || null;
        var normalized = normalizeQuickFavoriteItem(item);
        if (!normalized || shouldExcludeFromToolBehavior(normalized)) {
          result.push(null);
          continue;
        }
        var normalizedId = String(normalized.id);
        var identity = normalized._identity || "";
        if ((normalizedId && seenIds[normalizedId]) || (identity && seenIdentity[identity])) {
          result.push(null);
          continue;
        }
        seenIds[normalizedId] = true;
        if (identity) {
          seenIdentity[identity] = true;
        }
        delete normalized._identity;
        result.push(normalized);
      }
      return result;
    }

    function hasCustomCardSlotContent(slots) {
      if (!Array.isArray(slots)) {
        return false;
      }
      for (var i = 0; i < homeCustomSlotCount; i++) {
        if (normalizeQuickFavoriteItem(slots[i])) {
          return true;
        }
      }
      return false;
    }

    function normalizeBehaviorStore(store) {
      var raw = store && typeof store === "object" ? store : {};
      var result = createEmptyBehaviorStore();
      result.version = behaviorStoreVersion;
      result.items = normalizeBehaviorItemsMap(raw.items);
      result.favorites = normalizeQuickFavoriteItems(raw.favorites || raw.quickFavorites || []);
      result.customCards = normalizeQuickFavoriteItems(raw.customCards || raw.customSquares || raw.squareCards || []);
      result.customCardSlots = normalizeCustomCardSlots(raw.customCardSlots || raw.customSlots || [], result.customCards);
      result.customFavoritesLinked = raw.customFavoritesLinked === true;
      if (!result.customFavoritesLinked && result.favorites.length && !hasCustomCardSlotContent(result.customCardSlots)) {
        result.customCardSlots = normalizeCustomCardSlots(result.favorites, []);
        result.customCards = compactCustomCardSlots(result.customCardSlots);
        result.customFavoritesLinked = true;
      }
      seedBehaviorItemsMap(result.items, result.favorites);
      seedBehaviorItemsMap(result.items, result.customCards);
      seedBehaviorItemsMap(result.items, result.customCardSlots);
      result.history = normalizeBehaviorHistory(raw.history, result.items);
      result.recent = normalizeBehaviorRecent(raw.recent, result.items);
      result.monthly = normalizeBehaviorMonthly(raw.monthly, result.items);
      return result;
    }

    function syncLegacyQuickFavorites(favorites) {
      safeWriteStorage(quickFavoritesStorageKey, JSON.stringify(normalizeQuickFavoriteItems(favorites)));
    }

    function emitBehaviorStoreChange(reason, store) {
      if (suppressBehaviorStoreEvents) {
        return;
      }
      if (typeof window.CustomEvent !== "function") {
        return;
      }
      document.dispatchEvent(new window.CustomEvent("wogaosuni:user-data-change", {
        detail: {
          reason: reason || "",
          store: store || readBehaviorStore()
        }
      }));
    }

    function readBehaviorStore() {
      var rawStore = safeReadStorage(behaviorStoreStorageKey);
      var parsedStore = null;
      if (rawStore) {
        try {
          parsedStore = JSON.parse(rawStore);
        } catch (error) {
          parsedStore = null;
        }
      }

      var normalized = normalizeBehaviorStore(parsedStore);
      if (!normalized.favorites.length) {
        var legacyRaw = safeReadStorage(quickFavoritesStorageKey);
        if (legacyRaw) {
          try {
            var parsedLegacy = JSON.parse(legacyRaw);
            normalized.favorites = normalizeQuickFavoriteItems(parsedLegacy);
            seedBehaviorItemsMap(normalized.items, normalized.favorites);
          } catch (error) {
          }
        }
      }
      return normalized;
    }

    function writeBehaviorStore(store, reason) {
      var normalized = normalizeBehaviorStore(store);
      safeWriteStorage(behaviorStoreStorageKey, JSON.stringify(normalized));
      syncLegacyQuickFavorites(normalized.favorites);
      emitBehaviorStoreChange(reason, normalized);
      return normalized;
    }

    function recordBehaviorRecent(store, itemId, timestamp, source, target, action) {
      var next = [{
        id: String(itemId),
        timestamp: timestamp,
        source: source || "",
        target: target || "",
        action: action || "click"
      }];
      for (var i = 0; i < store.recent.length; i++) {
        if (String(store.recent[i].id) === String(itemId)) {
          continue;
        }
        next.push(store.recent[i]);
        if (next.length >= behaviorRecentLimit) {
          break;
        }
      }
      store.recent = next;
    }

    function recordBehaviorMonthly(store, itemId, timestamp, source, target) {
      var monthKey = getBehaviorMonthKey(timestamp);
      if (!store.monthly[monthKey] || typeof store.monthly[monthKey] !== "object") {
        store.monthly[monthKey] = {};
      }
      var current = store.monthly[monthKey][itemId] || {
        count: 0,
        lastUsedAt: 0,
        source: "",
        target: ""
      };
      current.count = parseInt(current.count, 10) || 0;
      current.count += 1;
      current.lastUsedAt = timestamp;
      current.source = source || current.source || "";
      current.target = target || current.target || "";
      store.monthly[monthKey][itemId] = current;
      pruneBehaviorMonthly(store.monthly);
    }

    function trackToolUsage(item, options) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem || !normalizedItem.id) {
        return null;
      }
      if (shouldExcludeFromToolBehavior(normalizedItem)) {
        return null;
      }
      var settings = options && typeof options === "object" ? options : {};
      var timestamp = Date.now();
      var source = normalizeFavoriteText(settings.source || "card");
      var target = normalizeFavoriteText(settings.target || "");
      var action = normalizeFavoriteText(settings.action || "click") || "click";
      var store = readBehaviorStore();

      normalizedItem = upsertBehaviorItem(store.items, normalizedItem) || normalizedItem;
      store.history.unshift({
        id: String(normalizedItem.id),
        timestamp: timestamp,
        source: source,
        target: target,
        action: action
      });
      if (store.history.length > behaviorHistoryLimit) {
        store.history.length = behaviorHistoryLimit;
      }
      recordBehaviorRecent(store, normalizedItem.id, timestamp, source, target, action);
      recordBehaviorMonthly(store, normalizedItem.id, timestamp, source, target);
      writeBehaviorStore(store, "usage");
      return normalizedItem;
    }

    function getBehaviorItemById(id) {
      if (!id) {
        return null;
      }
      var store = readBehaviorStore();
      return store.items[String(id)] || null;
    }

    function getBehaviorRecentItems(limit) {
      var store = readBehaviorStore();
      var result = [];
      var max = parseInt(limit, 10) || behaviorRecentLimit;
      var knownNavIds = getKnownNavFavoriteIds();
      for (var i = 0; i < store.recent.length; i++) {
        var entry = store.recent[i];
        var item = store.items[String(entry.id)];
        if (shouldExcludeFromToolBehavior(item, knownNavIds)) {
          continue;
        }
        result.push({
          item: item,
          timestamp: entry.timestamp || 0,
          source: entry.source || "",
          target: entry.target || "",
          action: entry.action || "click"
        });
        if (result.length >= max) {
          break;
        }
      }
      return result;
    }

    function getBehaviorMonthlyHotItems(monthKey, limit) {
      var store = readBehaviorStore();
      var bucketKey = /^\d{4}-\d{2}$/.test(String(monthKey || "")) ? String(monthKey) : getBehaviorMonthKey(Date.now());
      var bucket = store.monthly[bucketKey] || {};
      var ids = getObjectOwnKeys(bucket);
      ids.sort(function (left, right) {
        var leftEntry = bucket[left] || {};
        var rightEntry = bucket[right] || {};
        var leftCount = parseInt(leftEntry.count, 10) || 0;
        var rightCount = parseInt(rightEntry.count, 10) || 0;
        if (leftCount !== rightCount) {
          return rightCount - leftCount;
        }
        return (parseInt(rightEntry.lastUsedAt, 10) || 0) - (parseInt(leftEntry.lastUsedAt, 10) || 0);
      });
      var result = [];
      var max = parseInt(limit, 10) || 12;
      var knownNavIds = getKnownNavFavoriteIds();
      for (var i = 0; i < ids.length; i++) {
        var item = store.items[ids[i]];
        if (shouldExcludeFromToolBehavior(item, knownNavIds)) {
          continue;
        }
        result.push({
          item: item,
          count: parseInt(bucket[ids[i]].count, 10) || 0,
          lastUsedAt: parseInt(bucket[ids[i]].lastUsedAt, 10) || 0,
          source: bucket[ids[i]].source || "",
          target: bucket[ids[i]].target || "",
          month: bucketKey
        });
        if (result.length >= max) {
          break;
        }
      }
      return result;
    }

    function getBehaviorDailyHotItems(dayOffset, limit) {
      var store = readBehaviorStore();
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + (parseInt(dayOffset, 10) || 0));
      var targetKey = getBehaviorDayKey(targetDate.getTime());
      var bucket = {};
      var knownNavIds = getKnownNavFavoriteIds();
      for (var i = 0; i < store.history.length; i++) {
        var entry = store.history[i] || {};
        var timestamp = normalizeBehaviorTimestamp(entry.timestamp || entry.ts || entry.time);
        if (!timestamp || getBehaviorDayKey(timestamp) !== targetKey) {
          continue;
        }
        var item = store.items[String(entry.id)];
        if (shouldExcludeFromToolBehavior(item, knownNavIds)) {
          continue;
        }
        var current = bucket[String(entry.id)] || {
          item: item,
          count: 0,
          lastUsedAt: 0,
          day: targetKey
        };
        current.count += 1;
        current.lastUsedAt = Math.max(current.lastUsedAt || 0, timestamp);
        bucket[String(entry.id)] = current;
      }
      var ids = getObjectOwnKeys(bucket);
      ids.sort(function (left, right) {
        var leftEntry = bucket[left] || {};
        var rightEntry = bucket[right] || {};
        if ((leftEntry.count || 0) !== (rightEntry.count || 0)) {
          return (rightEntry.count || 0) - (leftEntry.count || 0);
        }
        return (rightEntry.lastUsedAt || 0) - (leftEntry.lastUsedAt || 0);
      });
      var max = parseInt(limit, 10) || 20;
      var result = [];
      for (var j = 0; j < ids.length; j++) {
        result.push(bucket[ids[j]]);
        if (result.length >= max) {
          break;
        }
      }
      return result;
    }

    function getBehaviorWeeklyHotItems(limit) {
      var store = readBehaviorStore();
      var now = Date.now();
      var start = now - (7 * 24 * 60 * 60 * 1000);
      var bucket = {};
      var knownNavIds = getKnownNavFavoriteIds();
      for (var i = 0; i < store.history.length; i++) {
        var entry = store.history[i] || {};
        var timestamp = normalizeBehaviorTimestamp(entry.timestamp || entry.ts || entry.time);
        if (!timestamp || timestamp < start || timestamp > now) {
          continue;
        }
        var item = store.items[String(entry.id)];
        if (shouldExcludeFromToolBehavior(item, knownNavIds)) {
          continue;
        }
        var current = bucket[String(entry.id)] || {
          item: item,
          count: 0,
          lastUsedAt: 0
        };
        current.count += 1;
        current.lastUsedAt = Math.max(current.lastUsedAt || 0, timestamp);
        bucket[String(entry.id)] = current;
      }
      var ids = getObjectOwnKeys(bucket);
      ids.sort(function (left, right) {
        var leftEntry = bucket[left] || {};
        var rightEntry = bucket[right] || {};
        if ((leftEntry.count || 0) !== (rightEntry.count || 0)) {
          return (rightEntry.count || 0) - (leftEntry.count || 0);
        }
        return (rightEntry.lastUsedAt || 0) - (leftEntry.lastUsedAt || 0);
      });
      var max = parseInt(limit, 10) || 20;
      var result = [];
      for (var j = 0; j < ids.length; j++) {
        result.push(bucket[ids[j]]);
        if (result.length >= max) {
          break;
        }
      }
      return result;
    }

    function readCustomSquareCards() {
      return readBehaviorStore().customCards;
    }

    function compactCustomCardSlots(slots) {
      if (!Array.isArray(slots)) {
        return [];
      }
      return normalizeQuickFavoriteItems(slots);
    }

    function findFirstEmptyCustomSlot(slots) {
      for (var i = 0; i < homeCustomSlotCount; i++) {
        if (!slots[i]) {
          return i;
        }
      }
      return -1;
    }

    function isSameCustomSlotItem(left, right) {
      var leftItem = normalizeQuickFavoriteItem(left);
      var rightItem = normalizeQuickFavoriteItem(right);
      if (!leftItem || !rightItem) {
        return false;
      }
      return String(leftItem.id) === String(rightItem.id) || (!!leftItem._identity && leftItem._identity === rightItem._identity);
    }

    function writeCustomCardSlots(store, slots, reason) {
      store.customCardSlots = normalizeCustomCardSlots(slots, []);
      store.customCards = compactCustomCardSlots(store.customCardSlots);
      seedBehaviorItemsMap(store.items, store.customCardSlots);
      seedBehaviorItemsMap(store.items, store.customCards);
      writeBehaviorStore(store, reason || "custom-cards");
      return store.customCards;
    }

    function setCustomSquareCardAtSlot(item, slotIndex) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem || !normalizedItem.id || shouldExcludeFromToolBehavior(normalizedItem)) {
        return null;
      }
      var targetIndex = parseInt(slotIndex, 10);
      if (!isFinite(targetIndex) || targetIndex < 0) {
        targetIndex = 0;
      }
      if (targetIndex >= homeCustomSlotCount) {
        targetIndex = homeCustomSlotCount - 1;
      }
      var store = readBehaviorStore();
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      for (var i = 0; i < homeCustomSlotCount; i++) {
        if (i !== targetIndex && isSameCustomSlotItem(slots[i], normalizedItem)) {
          slots[i] = null;
        }
      }
      slots[targetIndex] = normalizedItem;
      writeCustomCardSlots(store, slots, "custom-card-slot");
      return normalizedItem;
    }

    function readHomeCustomDisplayCards() {
      var result = [];
      var slots = readHomeCustomDisplaySlots();
      for (var i = 0; i < slots.length; i++) {
        if (slots[i]) {
          result.push(slots[i]);
        }
      }
      return result;
    }

    function readHomeCustomDisplaySlots() {
      var store = readBehaviorStore();
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      var result = [];

      for (var slotIndex = 0; slotIndex < homeCustomSlotCount; slotIndex++) {
        var normalizedItem = normalizeQuickFavoriteItem(slots[slotIndex]);
        if (!normalizedItem || isArticleLikeFavoriteItem(normalizedItem)) {
          result.push(null);
          continue;
        }
        normalizedItem._homeCustomSource = "custom";
        result.push(normalizedItem);
      }

      return result;
    }

    function writeCustomSquareCards(items) {
      var store = readBehaviorStore();
      var normalizedItems = normalizeQuickFavoriteItems(items);
      var slots = [];
      for (var i = 0; i < homeCustomSlotCount; i++) {
        slots.push(normalizedItems[i] || null);
      }
      return writeCustomCardSlots(store, slots, "custom-cards");
    }

    function upsertCustomSquareCard(item) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem || !normalizedItem.id || shouldExcludeFromToolBehavior(normalizedItem)) {
        return null;
      }
      var store = readBehaviorStore();
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      var targetIndex = -1;
      for (var i = 0; i < homeCustomSlotCount; i++) {
        if (isSameCustomSlotItem(slots[i], normalizedItem)) {
          targetIndex = i;
          slots[i] = null;
          break;
        }
      }
      if (targetIndex < 0) {
        targetIndex = findFirstEmptyCustomSlot(slots);
      }
      if (targetIndex < 0) {
        targetIndex = 0;
      }
      slots[targetIndex] = normalizedItem;
      writeCustomCardSlots(store, slots, "custom-cards");
      return normalizedItem;
    }

    function upsertCustomSquareCardInStore(store, item) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!store || !normalizedItem || !normalizedItem.id || shouldExcludeFromToolBehavior(normalizedItem)) {
        return false;
      }
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      var targetIndex = -1;
      for (var i = 0; i < homeCustomSlotCount; i++) {
        if (isSameCustomSlotItem(slots[i], normalizedItem)) {
          targetIndex = i;
          slots[i] = null;
          break;
        }
      }
      if (targetIndex < 0) {
        targetIndex = findFirstEmptyCustomSlot(slots);
      }
      if (targetIndex < 0) {
        targetIndex = 0;
      }
      slots[targetIndex] = normalizedItem;
      store.customCardSlots = normalizeCustomCardSlots(slots, []);
      store.customCards = compactCustomCardSlots(store.customCardSlots);
      seedBehaviorItemsMap(store.items, store.customCardSlots);
      seedBehaviorItemsMap(store.items, store.customCards);
      return true;
    }

    function removeCustomSquareCardFromStore(store, itemOrId) {
      if (!store || !itemOrId) {
        return false;
      }
      var probe = typeof itemOrId === "object" ? normalizeQuickFavoriteItem(itemOrId) : null;
      var targetId = typeof itemOrId === "object" ? normalizeFavoriteText(probe && probe.id) : normalizeFavoriteText(itemOrId);
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      var changed = false;
      for (var s = 0; s < homeCustomSlotCount; s++) {
        if (!slots[s]) {
          continue;
        }
        if ((targetId && String(slots[s].id) === String(targetId)) || (probe && isSameCustomSlotItem(slots[s], probe))) {
          slots[s] = null;
          changed = true;
        }
      }
      if (!changed) {
        return false;
      }
      store.customCardSlots = normalizeCustomCardSlots(slots, []);
      store.customCards = compactCustomCardSlots(store.customCardSlots);
      seedBehaviorItemsMap(store.items, store.customCardSlots);
      seedBehaviorItemsMap(store.items, store.customCards);
      return true;
    }

    function removeCustomSquareCard(id) {
      if (!id) {
        return;
      }
      var store = readBehaviorStore();
      var next = [];
      for (var i = 0; i < store.customCards.length; i++) {
        if (String(store.customCards[i].id) !== String(id)) {
          next.push(store.customCards[i]);
        }
      }
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      for (var s = 0; s < homeCustomSlotCount; s++) {
        if (slots[s] && String(slots[s].id) === String(id)) {
          slots[s] = null;
        }
      }
      store.customCards = normalizeQuickFavoriteItems(next);
      writeCustomCardSlots(store, slots, "custom-cards");
    }

    function readRecommendSeedData(node) {
      if (!node) {
        return [];
      }
      try {
        var raw = node.textContent || node.innerText || "[]";
        var parsed = JSON.parse(raw);
        return normalizeQuickFavoriteItems(parsed);
      } catch (error) {
        return [];
      }
    }

    function escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function normalizeFavoriteMonogramSource(value) {
      var raw = String(value || "");
      raw = raw.replace(/^(AIGC|AI|Ai|ai)[\\s\\-_:：]*/g, "");
      raw = raw.replace(/^人工智能[\\s\\-_:：]*/g, "");
      raw = raw.replace(/^智能[\\s\\-_:：]*/g, "");
      raw = raw.replace(/^工具[\\s\\-_:：]*/g, "");
      raw = raw.replace(/^[\\s\\-_:：]+/g, "");
      raw = raw.replace(/[\\s\\-_:：]*(官网|网站|导航|平台|工具|助手|大全)$/g, "");
      return raw;
    }

    function createFavoriteMonogram(rawTitle, fallbackText) {
      var source = normalizeFavoriteMonogramSource(rawTitle);
      var fallback = normalizeFavoriteMonogramSource(fallbackText);

      if (!source) {
        source = String(rawTitle || "").replace(/^(AIGC|AI|Ai|ai)[\\s\\-_:：]*/g, "");
        source = source.replace(/^[\\s\\-_:：]+/g, "");
      }

      if (!source) {
        source = fallback;
      }

      if (!source) {
        source = "导航";
      }

      if (source.length <= 2) {
        return source;
      }

      if (/^[A-Za-z0-9]+$/.test(source)) {
        return source.slice(0, 2).toUpperCase();
      }

      return source.slice(-2);
    }

    function getFavoriteMonogram(item) {
      return createFavoriteMonogram((item && item.title) || "", (item && item.logoText) || "");
    }

    function getFavoriteShortName(item) {
      var text = normalizeFavoriteText(item && (item.badge || item.logoText || item.title));
      if (!text || text === "常用" || text === "海外" || text === "国外" || text === "推荐" || text === "热门") {
        text = normalizeFavoriteText(item && item.title);
      }
      if (!text) {
        return "收藏";
      }
      text = normalizeFavoriteText(text.replace(/AI工具|AIGC|AI|工具|官网|平台|助手|搜索|生成/g, ""));
      if (!text) {
        text = normalizeFavoriteText(item && item.title) || "收藏";
      }
      return text.length > 4 ? text.slice(0, 4) : text;
    }

    function getFavoriteAccent(item) {
      var source = String((item && (item.id || item.title)) || "fav");
      var hash = 0;
      for (var i = 0; i < source.length; i++) {
        hash = (hash * 31 + source.charCodeAt(i)) % 3600;
      }
      return 205 + (hash % 65);
    }

    function normalizeFavoriteText(value) {
      return String(value == null ? "" : value).replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
    }

    function sanitizeFavoriteUrl(url) {
      var value = normalizeFavoriteText(url).replace(/[\r\n]+/g, "");
      if (!value) {
        return "";
      }
      if (/^(javascript|data|vbscript):/i.test(value)) {
        return "";
      }
      if (
        value.indexOf("//") === 0 ||
        value.indexOf("./") === 0 ||
        value.indexOf("../") === 0 ||
        value.charAt(0) === "/" ||
        value.charAt(0) === "#" ||
        value.charAt(0) === "?"
      ) {
        return value;
      }
      if (/^(https?|mailto|tel):/i.test(value)) {
        return value;
      }
      if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i.test(value)) {
        return "https://" + value;
      }
      return "";
    }

    function normalizeFavoriteFlag(value) {
      if (value === true || value === 1) {
        return true;
      }
      var normalized = normalizeFavoriteText(value).toLowerCase();
      return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "y" || normalized === "overseas" || normalized === "海外";
    }

    function buildFavoriteIdentity(item) {
      var title = normalizeFavoriteText(item && item.title);
      var detailUrl = sanitizeFavoriteUrl(item && item.detailUrl);
      var directUrl = sanitizeFavoriteUrl(item && item.directUrl);
      return title + "|" + detailUrl + "|" + directUrl;
    }

    function normalizeQuickFavoriteItem(item) {
      if (!item || typeof item !== "object") {
        return null;
      }

      var title = normalizeFavoriteText(item.title || item.name);
      var detailUrl = sanitizeFavoriteUrl(item.detailUrl || item.url || item.href);
      var directUrl = sanitizeFavoriteUrl(item.directUrl || item.link || detailUrl);
      var desc = normalizeFavoriteText(item.desc || item.description);
      var logo = sanitizeFavoriteUrl(item.logo);
      var logoText = normalizeFavoriteText(item.logoText || item.logo_text || "");
      var badge = normalizeFavoriteText(item.badge || "");
      var isOverseas = normalizeFavoriteFlag(item.isOverseas);

      if (/^(AI|AIGC)$/i.test(logoText)) {
        logoText = "";
      }

      if (isBlockedFavoriteLogoUrl(logo)) {
        logo = "";
      }

      var rawContentType = normalizeFavoriteText(item.contentType || item.type || item.kind || "");
      var rawCategory = normalizeFavoriteText(item.category || item.categoryName || item.cate || item.topic || "");
      var articleLikeSource = [
        rawContentType,
        rawCategory,
        badge,
        desc,
        detailUrl,
        directUrl
      ].join(" ");

      if (logoText) {
        logoText = createFavoriteMonogram(logoText, title);
      }

      if (!detailUrl && directUrl) {
        detailUrl = directUrl;
      }
      if (!directUrl) {
        directUrl = detailUrl;
      }
      if (!title || !detailUrl) {
        return null;
      }

      if (!badge) {
        badge = isOverseas ? "海外" : "常用";
      }

      var id = normalizeFavoriteText(item.id);
      if (!id) {
        id = title + "|" + detailUrl;
      }

      var contentType = rawContentType;
      if (item.isArticle || item.article || item.kind === "article" || /^(article|post|news)$/i.test(rawContentType) || /教程资讯|内容栏目|阅读全文|cate=271|post-multi-article|article-card|news-feed-card|wn-news-row/.test(articleLikeSource)) {
        contentType = "article";
      }
      contentType = contentType === "article" ? "article" : "nav";
      var indexedContentType = getIndexedFavoriteContentType({
        id: id,
        detailUrl: detailUrl,
        directUrl: directUrl
      });
      if (indexedContentType) {
        contentType = indexedContentType;
      }

      return {
        id: id,
        title: title,
        detailUrl: detailUrl,
        directUrl: directUrl,
        desc: desc,
        logo: logo,
        logoText: logoText,
        isOverseas: isOverseas,
        badge: badge,
        contentType: contentType,
        _identity: buildFavoriteIdentity({
          title: title,
          detailUrl: detailUrl,
          directUrl: directUrl
        })
      };
    }

    function isArticleLikeFavoriteItem(item) {
      if (!item) {
        return false;
      }
      if (item.contentType === "article" || item.type === "article" || item.kind === "article" || item.isArticle) {
        return true;
      }
      var category = normalizeFavoriteText(item.category || item.categoryName || item.cate || item.topic || "");
      if (/教程资讯|教程|资讯|文章|新闻|内容栏目/.test(category)) {
        return true;
      }
      var detailUrl = normalizeFavoriteText(item.detailUrl || item.url || item.href || "");
      var directUrl = normalizeFavoriteText(item.directUrl || item.link || "");
      if (/[?&]cate=271(?:&|$)|\/article\/|\/news\//i.test(detailUrl + " " + directUrl)) {
        return true;
      }
      if (directUrl && detailUrl && directUrl !== detailUrl) {
        return false;
      }
      var badge = normalizeFavoriteText(item.badge || "");
      if (/^(文章|教程|资讯|内容栏目|新闻)$/i.test(badge)) {
        return true;
      }
      var desc = normalizeFavoriteText(item.desc || item.description || "");
      return /阅读全文|点击查看文章详情|内容栏目|教程资讯/.test(desc);
    }

    function getLocalFavoritePostId(url) {
      var value = sanitizeFavoriteUrl(url);
      if (!value) {
        return "";
      }
      try {
        var parsed = new URL(value, window.location.href);
        if (parsed.origin !== window.location.origin) {
          return "";
        }
        return parsed.searchParams.get("id") || "";
      } catch (error) {
        var match = value.match(/[?&]id=(\d+)(?:&|$)/);
        return match ? match[1] : "";
      }
    }

    function readContentTypeIndex() {
      var raw = null;
      try {
        raw = contentTypeIndexData ? JSON.parse(contentTypeIndexData.textContent || contentTypeIndexData.innerText || "{}") : {};
      } catch (error) {
        raw = {};
      }
      var result = {
        nav: {},
        article: {}
      };
      function addIds(ids, target) {
        if (!Array.isArray(ids)) {
          return;
        }
        for (var i = 0; i < ids.length; i++) {
          var id = normalizeFavoriteText(ids[i]);
          if (id) {
            target[id] = true;
          }
        }
      }
      addIds(raw.nav, result.nav);
      addIds(raw.article, result.article);
      return result;
    }

    var contentTypeIndexCache = null;

    function getContentTypeIndex() {
      if (!contentTypeIndexCache) {
        contentTypeIndexCache = readContentTypeIndex();
      }
      return contentTypeIndexCache;
    }

    function getFavoritePostIds(item) {
      var ids = [];
      var seen = {};
      function add(id) {
        id = normalizeFavoriteText(id);
        if (id && !seen[id]) {
          seen[id] = true;
          ids.push(id);
        }
      }
      if (!item) {
        return ids;
      }
      add(item.id);
      add(getLocalFavoritePostId(item.detailUrl || item.url || item.href || ""));
      add(getLocalFavoritePostId(item.directUrl || item.link || ""));
      return ids;
    }

    function getIndexedFavoriteContentType(item) {
      var index = getContentTypeIndex();
      var ids = getFavoritePostIds(item);
      var hasNav = false;
      var hasArticle = false;
      for (var i = 0; i < ids.length; i++) {
        if (index.nav[ids[i]]) {
          hasNav = true;
        }
        if (index.article[ids[i]]) {
          hasArticle = true;
        }
      }
      if (hasArticle) {
        return "article";
      }
      if (hasNav) {
        return "nav";
      }
      return "";
    }

    function getKnownNavFavoriteIds() {
      var known = {};
      var nodes = document.querySelectorAll('[data-content-type="nav"][data-favorite-id], .nav-card[data-favorite-id], .ranking-page__item[data-favorite-id]');
      for (var i = 0; i < nodes.length; i++) {
        var id = normalizeFavoriteText(nodes[i].getAttribute("data-favorite-id") || "");
        if (id) {
          known[id] = true;
        }
      }
      var fallback = readJsonScript(homeHotFallbackData);
      for (var j = 0; j < fallback.length; j++) {
        var item = normalizeQuickFavoriteItem(fallback[j]);
        if (item && item.id && !isArticleLikeFavoriteItem(item)) {
          known[String(item.id)] = true;
        }
      }
      var index = getContentTypeIndex();
      var ids = getObjectOwnKeys(index.nav);
      for (var k = 0; k < ids.length; k++) {
        known[ids[k]] = true;
      }
      return known;
    }

    function isUnknownLocalOnlyFavoriteItem(item, knownNavIds) {
      if (!item) {
        return false;
      }
      var detailId = getLocalFavoritePostId(item.detailUrl || item.url || item.href || "");
      if (!detailId) {
        return false;
      }
      var directUrl = sanitizeFavoriteUrl(item.directUrl || item.link || "");
      var directId = getLocalFavoritePostId(directUrl);
      if (directUrl && !directId) {
        return false;
      }
      var known = knownNavIds || getKnownNavFavoriteIds();
      return !known[String(item.id)] && !known[String(detailId)];
    }

    function shouldExcludeFromToolBehavior(item, knownNavIds) {
      if (!item) {
        return true;
      }
      var indexedType = getIndexedFavoriteContentType(item);
      if (indexedType === "article") {
        return true;
      }
      if (indexedType === "nav") {
        return false;
      }
      return item.contentType === "article" || isArticleLikeFavoriteItem(item) || isUnknownLocalOnlyFavoriteItem(item, knownNavIds);
    }

    function normalizeQuickFavoriteItems(items) {
      if (!Array.isArray(items)) {
        return [];
      }
      var result = [];
      var seenIds = {};
      var seenIdentity = {};
      for (var i = 0; i < items.length; i++) {
        var normalized = normalizeQuickFavoriteItem(items[i]);
        if (!normalized) {
          continue;
        }
        if (shouldExcludeFromToolBehavior(normalized)) {
          continue;
        }
        var normalizedId = String(normalized.id);
        var identity = normalized._identity || "";
        if ((normalizedId && seenIds[normalizedId]) || (identity && seenIdentity[identity])) {
          continue;
        }
        seenIds[normalizedId] = true;
        if (identity) {
          seenIdentity[identity] = true;
        }
        delete normalized._identity;
        result.push(normalized);
        if (result.length >= 24) {
          break;
        }
      }
      return result;
    }

    function isBlockedFavoriteLogoUrl(url) {
      var value = sanitizeFavoriteUrl(url);
      if (!value) {
        return false;
      }
      if (/^https?:\/\/chat\.openai\.com\/favicon\.ico(?:[?#].*)?$/i.test(value)) {
        return true;
      }
      return false;
    }

    function getFavoriteLogoUrl(item) {
      var logoUrl = item && item.logo ? sanitizeFavoriteUrl(item.logo) : "";
      if (!logoUrl || siteLogoFallbackCheck[logoUrl.toLowerCase()]) {
        return siteLogoFallbackUrl;
      }
      if (isBlockedFavoriteLogoUrl(logoUrl)) {
        return siteLogoFallbackUrl;
      }
      return logoUrl;
    }

    function getQuickFavoriteFallbackItems() {
      var defaults = readQuickFavoriteDefaults();
      return defaults.length ? defaults : [];
    }

    function buildFavoriteLogo(item) {
      return '<img src="' + escapeHtml(getFavoriteLogoUrl(item)) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" data-fallback-logo="' + (item && item.logo ? "0" : "1") + '" />';
    }

    function getCardFavoriteData(card) {
      if (!card) {
        return null;
      }
      return normalizeQuickFavoriteItem({
        id: card.getAttribute("data-favorite-id"),
        title: card.getAttribute("data-favorite-title") || "",
        detailUrl: card.getAttribute("data-favorite-detail") || "",
        directUrl: card.getAttribute("data-favorite-direct") || card.getAttribute("data-favorite-detail") || "",
        desc: card.getAttribute("data-favorite-desc") || "",
        logo: card.getAttribute("data-favorite-logo") || "",
        logoText: card.getAttribute("data-favorite-logo-text") || "",
        isOverseas: card.getAttribute("data-favorite-overseas") === "1",
        badge: normalizeFavoriteFlag(card.getAttribute("data-favorite-overseas")) ? "海外" : "",
        contentType: card.getAttribute("data-content-type") || "nav"
      });
    }

    function getFavoriteDataFromNode(node) {
      if (!node || !node.getAttribute) {
        return null;
      }
      var closestArticle = node.closest ? node.closest('[data-content-type="article"], .article-card, .article-list-card, .news-feed-card') : null;
      return normalizeQuickFavoriteItem({
        id: node.getAttribute("data-favorite-id"),
        title: node.getAttribute("data-favorite-title") || "",
        detailUrl: node.getAttribute("data-favorite-detail") || node.getAttribute("href") || "",
        directUrl: node.getAttribute("data-favorite-direct") || node.getAttribute("href") || "",
        desc: node.getAttribute("data-favorite-desc") || "",
        logo: node.getAttribute("data-favorite-logo") || "",
        logoText: node.getAttribute("data-favorite-logo-text") || "",
        isOverseas: node.getAttribute("data-favorite-overseas") === "1",
        badge: node.getAttribute("data-favorite-badge") || "",
        contentType: node.getAttribute("data-content-type") || (closestArticle ? "article" : "nav")
      });
    }

    function buildQrImageUrl(value) {
      var text = encodeURIComponent(value || window.location.href);
      return "https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=10&data=" + text;
    }

    function hydrateSiteQr() {
      if (!siteQrTrigger || !siteQrPopover || !siteQrBox) {
        return;
      }
      var qrUrl = sanitizeFavoriteUrl(siteQrTrigger.getAttribute("data-qr-url") || window.location.href) || window.location.href;
      var qrHideTimer = 0;
      siteQrBox.innerHTML = "";
      if (window.jQuery && typeof window.jQuery.fn.qrcode === "function") {
        window.jQuery(siteQrBox).qrcode({
          render: "canvas",
          width: 150,
          height: 150,
          text: qrUrl,
          background: "#ffffff",
          foreground: "#000000"
        });
      } else {
        siteQrBox.innerHTML = '<img src="' + escapeHtml(buildQrImageUrl(qrUrl)) + '" alt="手机扫码访问" loading="lazy" referrerpolicy="no-referrer" />';
      }
      function positionSiteQrPopover() {
        if (siteQrPopover.hidden) {
          return;
        }
        var triggerRect = siteQrTrigger.getBoundingClientRect();
        var popoverRect = siteQrPopover.getBoundingClientRect();
        var gap = 12;
        var left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
        var top = triggerRect.top - popoverRect.height - gap;
        var minLeft = 10;
        var maxLeft = (window.innerWidth || document.documentElement.clientWidth || 0) - popoverRect.width - 10;
        left = Math.max(minLeft, Math.min(maxLeft, left));
        siteQrPopover.style.setProperty("left", Math.round(left) + "px", "important");
        siteQrPopover.style.setProperty("top", Math.round(Math.max(10, top)) + "px", "important");
        siteQrPopover.style.setProperty("--aiph-qr-arrow-left", Math.round(triggerRect.left + (triggerRect.width / 2) - left) + "px");
      }
      function setVisible(visible) {
        window.clearTimeout(qrHideTimer);
        siteQrPopover.hidden = !visible;
        if (visible) {
          positionSiteQrPopover();
        }
      }
      function scheduleHideSiteQr() {
        window.clearTimeout(qrHideTimer);
        qrHideTimer = window.setTimeout(function () {
          if (!siteQrTrigger.matches(":hover") && !siteQrPopover.matches(":hover")) {
            setVisible(false);
          }
        }, 80);
      }
      siteQrTrigger.addEventListener("mouseenter", function () {
        setVisible(true);
      });
      siteQrTrigger.addEventListener("focus", function () {
        setVisible(true);
      });
      siteQrTrigger.addEventListener("mouseleave", function () {
        scheduleHideSiteQr();
      });
      siteQrTrigger.addEventListener("blur", function () {
        setVisible(false);
      });
      siteQrPopover.addEventListener("mouseenter", function () {
        window.clearTimeout(qrHideTimer);
      });
      siteQrPopover.addEventListener("mouseleave", function () {
        scheduleHideSiteQr();
      });
      siteQrTrigger.addEventListener("click", function (event) {
        event.preventDefault();
        setVisible(siteQrPopover.hidden);
      });
      window.addEventListener("scroll", positionSiteQrPopover, true);
      window.addEventListener("resize", positionSiteQrPopover);
    }

    function bindSingleFavoriteToggle() {
      if (!singleFavoriteToggle) {
        return;
      }
      singleFavoriteToggle.addEventListener("click", function (event) {
        event.preventDefault();
        var item = getFavoriteDataFromNode(singleFavoriteToggle);
        if (!item) {
          return;
        }
        if (isFavorite(item.id)) {
          removeFavorite(item.id);
        } else {
          addFavorite(item);
          setQuickFavoritesOpen(true);
        }
        syncFavoriteButtons();
      });
    }

    function showShareToast(message) {
      var toast = document.querySelector("[data-share-toast]");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "aiph-share-toast";
        toast.setAttribute("data-share-toast", "1");
        document.body.appendChild(toast);
      }
      toast.textContent = message || "链接已复制";
      toast.classList.add("is-visible");
      window.clearTimeout(showShareToast.timer);
      showShareToast.timer = window.setTimeout(function () {
        toast.classList.remove("is-visible");
      }, 1500);
    }

    function copyTextToClipboard(text) {
      var value = text || window.location.href;
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(value);
      }
      return new Promise(function (resolve, reject) {
        var input = document.createElement("textarea");
        input.value = value;
        input.setAttribute("readonly", "readonly");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        input.style.top = "0";
        document.body.appendChild(input);
        input.select();
        try {
          var ok = document.execCommand("copy");
          document.body.removeChild(input);
          ok ? resolve() : reject(new Error("copy failed"));
        } catch (error) {
          document.body.removeChild(input);
          reject(error);
        }
      });
    }

    function bindSingleShareButton() {
      if (!singleShareButton) {
        return;
      }
      singleShareButton.addEventListener("click", function (event) {
        event.preventDefault();
        var shareUrl = window.location.href;
        copyTextToClipboard(shareUrl).then(function () {
          showShareToast("链接已复制");
        }).catch(function () {
          showShareToast("复制失败，请手动复制");
        });
      });
    }

    function setFeedbackModal(open) {
      if (!feedbackModal) {
        return;
      }
      feedbackModal.hidden = !open;
      document.documentElement.classList.toggle("aiph-feedback-open", !!open);
      document.body.classList.toggle("aiph-feedback-open", !!open);
      if (open && feedbackText) {
        feedbackText.focus();
      }
    }

    function bindFeedbackModal() {
      if (!feedbackModal) {
        return;
      }
      if (feedbackOpen) {
        feedbackOpen.addEventListener("click", function (event) {
          event.preventDefault();
          setFeedbackModal(true);
        });
      }
      for (var i = 0; i < feedbackCloseButtons.length; i++) {
        feedbackCloseButtons[i].addEventListener("click", function () {
          setFeedbackModal(false);
        });
      }
      for (var j = 0; j < feedbackTypeButtons.length; j++) {
        feedbackTypeButtons[j].addEventListener("click", function () {
          for (var k = 0; k < feedbackTypeButtons.length; k++) {
            feedbackTypeButtons[k].classList.remove("is-active");
          }
          this.classList.add("is-active");
          if (feedbackText) {
            var type = normalizeFavoriteText(this.getAttribute("data-feedback-type") || this.textContent || "");
            var current = normalizeFavoriteText(feedbackText.value || "");
            var prefix = "【" + type + "】";
            feedbackText.value = current && current.indexOf("【") === 0 ? current.replace(/^【[^】]+】/, prefix) : prefix + (current ? "\n" + current : "\n");
            feedbackText.focus();
          }
        });
      }
      if (feedbackForm && feedbackText) {
        feedbackForm.addEventListener("submit", function (event) {
          var value = normalizeFavoriteText(feedbackText.value || "");
          if (value.length < 4) {
            event.preventDefault();
            feedbackText.focus();
          }
        });
      }
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && feedbackModal && !feedbackModal.hidden) {
          setFeedbackModal(false);
        }
      });
    }

    function isFavorite(id, favorites) {
      var list = favorites || readQuickFavorites();
      for (var i = 0; i < list.length; i++) {
        if (String(list[i].id) === String(id)) {
          return true;
        }
      }
      return false;
    }

    function syncFavoriteButtons(favorites) {
      var currentNavCards = document.querySelectorAll(".nav-card");
      var list = favorites || readQuickFavorites();
      for (var i = 0; i < currentNavCards.length; i++) {
        var card = currentNavCards[i];
        var button = card.querySelector("[data-favorite-toggle]");
        var active = isFavorite(card.getAttribute("data-favorite-id"), list);
        card.classList.toggle("is-favorited", active);
        if (button) {
          button.classList.toggle("is-favorited", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
          button.setAttribute("data-card-tip", active ? "取消收藏" : "点击收藏");
          button.removeAttribute("title");
          button.setAttribute("aria-label", active ? "取消收藏" : "收藏");
          var icon = button.querySelector(".nav-card__favorite-icon");
          if (icon) {
            icon.textContent = "";
          }
        }
      }
      if (singleFavoriteToggle) {
        var singleActive = isFavorite(singleFavoriteToggle.getAttribute("data-favorite-id"), list);
        singleFavoriteToggle.classList.toggle("is-favorited", singleActive);
        singleFavoriteToggle.setAttribute("aria-pressed", singleActive ? "true" : "false");
        singleFavoriteToggle.querySelector("span").textContent = singleActive ? "已收藏" : "收藏";
      }
    }

    function renderQuickFavorites() {
      if (!quickFavoritesList || !quickFavoritesEmpty) {
        return;
      }
      var favorites = readQuickFavorites();
      if (quickFavoritesCount) {
        quickFavoritesCount.textContent = String(favorites.length);
      }
      if (quickFavoritesHeadCount) {
        quickFavoritesHeadCount.textContent = String(favorites.length) + " 项";
      }
      if (!favorites.length) {
        quickFavoritesList.innerHTML = "";
        quickFavoritesEmpty.hidden = false;
        if (quickFavorites) {
          quickFavorites.classList.remove("has-items");
        }
        syncFavoriteButtons(favorites);
        return;
      }
      if (quickFavorites) {
        quickFavorites.classList.add("has-items");
      }
      quickFavoritesEmpty.hidden = true;
      var html = "";
      for (var i = 0; i < favorites.length; i++) {
        var item = favorites[i];
        var shortName = getFavoriteShortName(item);
        html += ''
          + '<article class="quick-favorites__item" draggable="true" data-quick-favorite-id="' + escapeHtml(item.id) + '" title="' + escapeHtml(item.title) + '">'
          +   '<a class="quick-favorites__item-main" href="' + escapeHtml(item.detailUrl || item.directUrl) + '" aria-label="查看' + escapeHtml(item.title) + '">'
          +     '<span class="quick-favorites__item-logo">' + buildFavoriteLogo(item) + '</span>'
          +     '<span class="quick-favorites__item-short">' + escapeHtml(shortName) + '</span>'
          +   '</a>'
          +   '<button class="quick-favorites__item-remove" type="button" data-quick-favorite-remove="' + escapeHtml(item.id) + '" aria-label="移除' + escapeHtml(item.title) + '">×</button>'
          + '</article>';
      }
      quickFavoritesList.innerHTML = html;
      syncFavoriteButtons(favorites);
    }

    function buildCustomShortcutEmptyAddCard(slotIndex, inlineMode) {
      var index = parseInt(slotIndex, 10);
      if (!isFinite(index) || index < 0) {
        index = 0;
      }
      return ''
        + '<button class="custom-shortcut-empty-add custom-shortcut-empty-add--intro' + (inlineMode ? ' custom-shortcut-empty-add--inline' : '') + '" type="button" data-custom-shortcut-slot-add="' + escapeHtml(index) + '" aria-label="添加到第' + escapeHtml(index + 1) + '个自定义位置">'
        +   '<span class="custom-shortcut-empty-add__icon" aria-hidden="true">+</span>'
        +   '<span class="custom-shortcut-empty-add__copy">'
        +     '<strong>添加常用 AI 工具</strong>'
        +     '<em>选择站内卡片或手动输入网址</em>'
        +   '</span>'
        + '</button>';
    }

    function buildCustomShortcutSlotAddCard(slotIndex) {
      var index = parseInt(slotIndex, 10) || 0;
      return ''
        + '<button class="custom-shortcut-slot-add" type="button" data-custom-shortcut-slot-add="' + escapeHtml(index) + '" aria-label="添加到第' + escapeHtml(index + 1) + '个自定义位置">'
        +   '<span aria-hidden="true">+</span>'
        + '</button>';
    }

    function buildCustomShortcutCard(item, options) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem || isArticleLikeFavoriteItem(normalizedItem)) {
        return "";
      }
      var settings = options && typeof options === "object" ? options : {};
      var badgeIndex = typeof settings.badgeIndex === "number" ? settings.badgeIndex : -1;
      var presetMeta = badgeIndex >= 0 ? homeMiniShortcutBadgeLabels[badgeIndex % homeMiniShortcutBadgeLabels.length] : "";
      var explicitMeta = normalizeFavoriteText(settings.meta || (item && item.category) || normalizedItem.badge || "");
      var metaText = normalizeFavoriteText(explicitMeta || presetMeta || "站内工具");
      var displayTitle = normalizeFavoriteText(normalizedItem.title);
      var maxTitleLength = parseInt(settings.titleLimit, 10) || homeMiniShortcutTitleLimit;
      if (displayTitle.length > maxTitleLength) {
        displayTitle = displayTitle.slice(0, maxTitleLength);
      }
      var logoUrl = getFavoriteLogoUrl(normalizedItem);
      var logoHtml = '<img src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" loading="lazy" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var cardDirectUrl = normalizedItem.directUrl || "";
      var cardDetailUrl = normalizedItem.detailUrl || cardDirectUrl;
      var cardHref = cardDirectUrl || cardDetailUrl;
      var cardTargetAttrs = cardDirectUrl && /^https?:\/\//i.test(cardDirectUrl) ? ' target="_blank" rel="nofollow noopener"' : '';
      var hoverText = normalizeFavoriteText(normalizedItem.desc || settings.desc || "");
      if (!hoverText || hoverText === normalizeFavoriteText(normalizedItem.title)) {
        hoverText = "暂无简介，点击访问官网";
      }
      return ''
        + '<article class="custom-shortcut-card home-mini-shortcut-card' + (customShortcutEditMode && settings.removable !== false ? ' is-editing' : '') + (settings.variant ? ' home-mini-shortcut-card--' + escapeHtml(settings.variant) : '') + '" data-custom-shortcut-id="' + escapeHtml(normalizedItem.id) + '" data-card-tip="' + escapeHtml(hoverText) + '">'
        +   '<a class="custom-shortcut-card__link" href="' + escapeHtml(cardHref) + '"' + cardTargetAttrs
        +     ' data-recommend-track="1"'
        +     ' data-favorite-id="' + escapeHtml(normalizedItem.id) + '"'
        +     ' data-favorite-title="' + escapeHtml(normalizedItem.title) + '"'
        +     ' data-favorite-detail="' + escapeHtml(cardDetailUrl) + '"'
        +     ' data-favorite-direct="' + escapeHtml(cardDirectUrl || cardDetailUrl) + '"'
        +     ' data-favorite-desc="' + escapeHtml(normalizedItem.desc || "") + '"'
        +     ' data-favorite-logo="' + escapeHtml(normalizedItem.logo || "") + '"'
        +     ' data-favorite-logo-text="' + escapeHtml(normalizedItem.logoText || "") + '"'
        +     ' data-favorite-overseas="' + (normalizedItem.isOverseas ? "1" : "0") + '"'
        +     ' data-favorite-badge="' + escapeHtml(normalizedItem.badge || "") + '"'
        +     ' data-content-type="nav">'
        +     '<span class="custom-shortcut-card__logo">' + logoHtml + '</span>'
        +     '<span class="custom-shortcut-card__copy"><strong>' + escapeHtml(displayTitle) + '</strong><em>' + escapeHtml(metaText) + '</em></span>'
        +   '</a>'
        +   (settings.removable === false ? '' : '<button class="custom-shortcut-card__remove" type="button" data-custom-shortcut-remove="' + escapeHtml(normalizedItem.id) + '" aria-label="移除' + escapeHtml(normalizedItem.title) + '">×</button>')
        + '</article>';
    }

    function formatBehaviorTime(timestamp) {
      var value = parseInt(timestamp, 10) || 0;
      if (!value) {
        return "";
      }
      var date = new Date(value);
      if (isNaN(date.getTime())) {
        return "";
      }
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      return month + "-" + (day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
    }

    function readJsonScript(node) {
      if (!node) {
        return [];
      }
      try {
        var raw = node.textContent || node.innerText || "[]";
        var parsed = JSON.parse(raw);
        return normalizeQuickFavoriteItems(parsed);
      } catch (error) {
        return [];
      }
    }

    function buildRecommendNavCard(item, options) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem) {
        return "";
      }
      var settings = options && typeof options === "object" ? options : {};
      var directLabel = normalizeFavoriteText(settings.directLabel || "直达");
      var badgeText = normalizeFavoriteText(settings.badge || normalizedItem.badge || "");
      var directUrl = normalizedItem.directUrl || normalizedItem.detailUrl;
      var regionLabel = normalizeFavoriteText(settings.regionLabel || "国外");
      var regionWarning = normalizeFavoriteText(settings.regionWarning || "国外网站可能无法直接访问");
      var navLogoUrl = getFavoriteLogoUrl(normalizedItem);
      var logoHtml = '<img src="' + escapeHtml(navLogoUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" loading="lazy" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var ghostLogoHtml = '<img src="' + escapeHtml(navLogoUrl) + '" alt="" loading="lazy" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var descriptionText = escapeHtml(normalizedItem.desc || settings.desc || "点击查看详情");
      var badgeAttribute = badgeText ? escapeHtml(badgeText) : "";

      var ghostClipClass = 'nav-card__watermark-clip nav-card__watermark-clip--image';

      return ''
        + '<article class="nav-card"'
        +   ' data-favorite-id="' + escapeHtml(normalizedItem.id) + '"'
        +   ' data-favorite-title="' + escapeHtml(normalizedItem.title) + '"'
        +   ' data-favorite-detail="' + escapeHtml(normalizedItem.detailUrl || directUrl) + '"'
        +   ' data-favorite-direct="' + escapeHtml(directUrl || normalizedItem.detailUrl) + '"'
        +   ' data-favorite-desc="' + escapeHtml(normalizedItem.desc || "") + '"'
        +   ' data-favorite-logo="' + escapeHtml(normalizedItem.logo || "") + '"'
        +   ' data-favorite-logo-text="' + escapeHtml(normalizedItem.logoText || "") + '"'
        +   ' data-favorite-badge="' + badgeAttribute + '"'
        +   ' data-content-type="nav"'
        +   ' data-recommend-track="1">'
        +   (normalizedItem.isOverseas ? '<span class="nav-card__foreign-badge" title="' + escapeHtml(regionWarning) + '">' + escapeHtml(regionLabel) + '</span>' : '')
        +   '<div class="' + ghostClipClass + '" aria-hidden="true"><div class="nav-card__ghost-logo">' + ghostLogoHtml + '</div></div>'
        +   '<a class="nav-card__mainlink" href="' + escapeHtml(normalizedItem.detailUrl || directUrl) + '" aria-label="查看' + escapeHtml(normalizedItem.title) + '详情"></a>'
        +   '<div class="nav-card__head">'
        +     '<div class="nav-card__logo" aria-hidden="true">' + logoHtml + '</div>'
        +     '<div class="nav-card__content">'
        +       '<div class="nav-card__title"><div class="nav-card__title-row"><h3>' + escapeHtml(normalizedItem.title) + '</h3></div></div>'
        +       '<div class="nav-card__body"><p class="nav-card__desc">' + descriptionText + '</p></div>'
        +     '</div>'
        +     '</div>'
        +   '<div class="nav-card__tooltip"><div class="nav-card__tooltip-arrow"></div><div class="nav-card__tooltip-body">' + descriptionText + '</div></div>'
        +   '<a class="nav-card__badge-anchor nav-card__badge-anchor--direct" href="' + escapeHtml(directUrl || normalizedItem.detailUrl) + '" target="_blank" rel="nofollow noopener" aria-label="' + escapeHtml(directLabel + normalizedItem.title) + '" data-card-tip="直达官网">'
        +     '<span class="nav-card__badge-chip nav-card__badge-chip--direct" aria-hidden="true">↗</span>'
        +   '</a>'
        +   '<button class="nav-card__favorite" type="button" data-favorite-toggle aria-pressed="false" aria-label="收藏' + escapeHtml(normalizedItem.title) + '" data-card-tip="点击收藏">'
        +     '<span class="nav-card__favorite-icon" aria-hidden="true"></span>'
        +   '</button>'
        + '</article>';
    }

    function buildRecommendArticleCard(item) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem) {
        return "";
      }
      var metaBadge = normalizeFavoriteText(normalizedItem.badge || "文章");
      var descText = normalizeFavoriteText(normalizedItem.desc || "点击查看文章详情");
      var topicText = normalizeFavoriteText(item && item.category ? item.category : metaBadge);
      var dateText = normalizeFavoriteText(item && item.dateLabel ? item.dateLabel : "");
      var coverUrl = normalizeFavoriteText(item && item.cover ? item.cover : (normalizedItem.logo || ""));
      var coverHtml = coverUrl
        ? '<img src="' + escapeHtml(coverUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" loading="lazy" />'
        : '<div class="article-card__placeholder"><span>' + escapeHtml(topicText || metaBadge) + '</span><strong>' + escapeHtml(normalizedItem.title) + '</strong></div>';

      return ''
        + '<article class="article-card" data-content-type="article">'
        +   '<a class="article-card__link" href="' + escapeHtml(normalizedItem.detailUrl || normalizedItem.directUrl) + '" data-recommend-track="1" aria-label="阅读' + escapeHtml(normalizedItem.title) + '详情"></a>'
        +   '<div class="article-card__media">' + coverHtml + '<div class="article-card__media-meta"><span class="article-card__topic">' + escapeHtml(topicText || "教程资讯") + '</span>' + (dateText ? '<span class="article-card__date">' + escapeHtml(dateText) + '</span>' : '') + '</div></div>'
        +   '<div class="article-card__body">'
        +     '<div class="article-card__meta"><span>' + escapeHtml(metaBadge) + '</span><span>内容栏目</span></div>'
        +     '<h3 class="article-card__title">' + escapeHtml(normalizedItem.title) + '</h3>'
        +     '<p class="article-card__summary">' + escapeHtml(descText) + '</p>'
        +     '<div class="article-card__footer"><span class="article-card__badge">' + escapeHtml(topicText || metaBadge) + '</span><span class="article-card__more">阅读全文 →</span></div>'
        +   '</div>'
        + '</article>';
    }

    function buildRecommendCard(item, options) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem) {
        return "";
      }
      var settings = options && typeof options === "object" ? options : {};
      var mode = settings.mode === "square" ? "square" : (settings.mode === "nav" ? "nav" : "list");
      if (mode === "nav") {
        return buildRecommendNavCard(normalizedItem, settings);
      }
      var primaryMeta = normalizeFavoriteText(settings.primaryMeta || "");
      var secondaryMeta = normalizeFavoriteText(settings.secondaryMeta || "");
      var noteText = normalizeFavoriteText(settings.note || normalizedItem.badge || "");
      var descText = normalizeFavoriteText(settings.desc || normalizedItem.desc || "点击查看详情");
      var metaHtml = mode === "square"
        ? (noteText ? '<span class="home-recommend-card__note">' + escapeHtml(noteText) + "</span>" : "")
        : '<span class="home-recommend-card__meta">' +
            '<b>' + escapeHtml(primaryMeta || normalizedItem.badge || "推荐") + "</b>" +
            '<em>' + escapeHtml(secondaryMeta || (normalizedItem.isOverseas ? "国外" : "工具")) + "</em>" +
          "</span>";
      return ''
        + '<article class="home-recommend-card home-recommend-card--' + mode + '">'
        +   '<a class="home-recommend-card__link" href="' + escapeHtml(normalizedItem.detailUrl || normalizedItem.directUrl) + '"'
        +     ' data-recommend-track="1"'
        +     ' data-favorite-id="' + escapeHtml(normalizedItem.id) + '"'
        +     ' data-favorite-title="' + escapeHtml(normalizedItem.title) + '"'
        +     ' data-favorite-detail="' + escapeHtml(normalizedItem.detailUrl || normalizedItem.directUrl) + '"'
        +     ' data-favorite-direct="' + escapeHtml(normalizedItem.directUrl || normalizedItem.detailUrl) + '"'
        +     ' data-favorite-desc="' + escapeHtml(normalizedItem.desc || "") + '"'
        +     ' data-favorite-logo="' + escapeHtml(normalizedItem.logo || "") + '"'
        +     ' data-favorite-logo-text="' + escapeHtml(normalizedItem.logoText || "") + '"'
        +     ' data-favorite-overseas="' + (normalizedItem.isOverseas ? "1" : "0") + '"'
        +     ' data-favorite-badge="' + escapeHtml(normalizedItem.badge || "") + '">'
        +     '<span class="home-recommend-card__logo">' + buildFavoriteLogo(normalizedItem) + '</span>'
        +     '<span class="home-recommend-card__body">'
        +       metaHtml
        +       '<strong>' + escapeHtml(normalizedItem.title) + '</strong>'
        +       '<span>' + escapeHtml(descText) + '</span>'
        +     '</span>'
        +   '</a>'
        + '</article>';
    }

    function renderRecommendCollection(targetNode, emptyNode, items, buildOptions) {
      if (!targetNode) {
        return;
      }
      var list = Array.isArray(items) ? items : [];
      if (!list.length) {
        targetNode.innerHTML = "";
        if (emptyNode) {
          emptyNode.hidden = false;
        }
        return;
      }
      if (emptyNode) {
        emptyNode.hidden = true;
      }
      list = list.slice(0, homeToolGridMaxItems);
      var html = "";
      for (var i = 0; i < list.length; i++) {
        html += buildRecommendCard(list[i], buildOptions ? buildOptions(list[i], i) : null);
      }
      targetNode.innerHTML = html;
      hydrateFastTooltips(targetNode);
      applyHomeToolGridRowLimit(targetNode);
    }

    function appendHotFallbackCards(items, limit) {
      var result = Array.isArray(items) ? items.slice(0) : [];
      var max = parseInt(limit, 10) || 20;
      var filtered = [];
      for (var initialIndex = 0; initialIndex < result.length; initialIndex++) {
        var initialItem = result[initialIndex] && result[initialIndex].item ? result[initialIndex].item : result[initialIndex];
        if (!isArticleLikeFavoriteItem(initialItem)) {
          filtered.push(result[initialIndex]);
        }
      }
      result = filtered;
      if (result.length >= max) {
        return result.slice(0, max);
      }
      var seen = {};
      for (var i = 0; i < result.length; i++) {
        var existing = normalizeQuickFavoriteItem(result[i] && result[i].item ? result[i].item : result[i]);
        if (existing) {
          seen[existing._identity || existing.id] = true;
        }
      }
      var fallback = readJsonScript(homeHotFallbackData);
      for (var j = 0; j < fallback.length && result.length < max; j++) {
        var item = normalizeQuickFavoriteItem(fallback[j]);
        if (!item || isArticleLikeFavoriteItem(item)) {
          continue;
        }
        var key = item._identity || item.id;
        if (seen[key]) {
          continue;
        }
        seen[key] = true;
        result.push(item);
      }
      return result.slice(0, max);
    }

    function renderHomeRecommendCustom() {
      if (!homeRecommendCustomGrid) {
        return;
      }
      var customSlots = readHomeCustomDisplaySlots();
      var hasCards = false;
      for (var cardCheckIndex = 0; cardCheckIndex < customSlots.length; cardCheckIndex++) {
        if (customSlots[cardCheckIndex]) {
          hasCards = true;
          break;
        }
      }
      if (!hasCards) {
        homeRecommendCustomGrid.classList.add("is-empty");
        homeRecommendCustomGrid.classList.remove("has-slot-placeholders");
        homeRecommendCustomGrid.innerHTML = buildCustomShortcutEmptyAddCard(0, false);
        if (homeRecommendCustomEmpty) {
          homeRecommendCustomEmpty.hidden = true;
        }
        return;
      }
      homeRecommendCustomGrid.classList.remove("is-empty");
      homeRecommendCustomGrid.classList.add("has-slot-placeholders");
      if (homeRecommendCustomEmpty) {
        homeRecommendCustomEmpty.hidden = true;
      }
      var introSlotIndex = findFirstEmptyCustomSlot(customSlots);
      var lastVisibleIndex = 0;
      for (var visibleIndex = homeCustomSlotCount - 1; visibleIndex >= 0; visibleIndex--) {
        if (customSlots[visibleIndex]) {
          lastVisibleIndex = visibleIndex;
          break;
        }
      }
      if (introSlotIndex >= 0 && introSlotIndex < homeCustomSlotCount) {
        lastVisibleIndex = Math.max(lastVisibleIndex, introSlotIndex);
      }
      var visibleSlotCount = Math.max(6, Math.ceil((lastVisibleIndex + 1) / 6) * 6);
      visibleSlotCount = Math.min(homeCustomSlotCount, visibleSlotCount);
      var html = "";
      for (var i = 0; i < visibleSlotCount; i++) {
        if (customSlots[i]) {
          html += buildCustomShortcutCard(customSlots[i], {
            badgeIndex: i,
            removable: true
          });
        } else if (i === introSlotIndex) {
          html += buildCustomShortcutEmptyAddCard(i, true);
        } else {
          html += buildCustomShortcutSlotAddCard(i);
        }
      }
      homeRecommendCustomGrid.innerHTML = html;
      hydrateFastTooltips(homeRecommendCustomGrid);
    }

    function renderHomeRecommendRecent() {
      if (!homeRecommendRecentGrid) {
        return;
      }
      var recentItems = getBehaviorRecentItems(homeMiniShortcutRowLimit);
      if (!recentItems.length) {
        homeRecommendRecentGrid.innerHTML = "";
        if (homeRecommendRecentEmpty) {
          homeRecommendRecentEmpty.hidden = false;
        }
        return;
      }
      if (homeRecommendRecentEmpty) {
        homeRecommendRecentEmpty.hidden = true;
      }
      var recentCount = recentItems.length;
      recentItems = appendHotFallbackCards(recentItems, homeMiniShortcutRowLimit);
      var html = "";
      for (var i = 0; i < recentItems.length; i++) {
        var recentItem = recentItems[i] && recentItems[i].item ? recentItems[i].item : recentItems[i];
        html += buildCustomShortcutCard(recentItem, {
          meta: i < recentCount ? (i === 0 ? "刚刚使用" : (formatBehaviorTime(recentItems[i].timestamp) || "最近使用")) : "站内热门",
          badgeIndex: i,
          removable: false,
          variant: "recent"
        });
      }
      homeRecommendRecentGrid.innerHTML = html;
      hydrateFastTooltips(homeRecommendRecentGrid);
    }

    function renderHomeRecommendMonthlyHot() {
      var hotItems = readJsonScript(homeHotFallbackData);
      renderRecommendCollection(homeRecommendMonthlyHotGrid, homeRecommendMonthlyHotEmpty, hotItems, function (item, index) {
        return {
          mode: "nav",
          badge: index === 0 ? "全站热门" : (item.badge || "热门工具"),
          desc: item.desc || "按全站点击量排序展示，点击量不足时随机补充工具"
        };
      });
    }

    function setHomeRecommendPanel(group, targetId) {
      if (!group || !targetId) {
        return;
      }
      for (var i = 0; i < homeRecommendTabs.length; i++) {
        var tab = homeRecommendTabs[i];
        if (tab.getAttribute("data-home-recommend-group-target") !== group) {
          continue;
        }
        var active = tab.getAttribute("data-home-recommend-tab") === targetId;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", active ? "true" : "false");
      }
      for (var p = 0; p < homeRecommendPanels.length; p++) {
        var panel = homeRecommendPanels[p];
        if (panel.getAttribute("data-home-recommend-panel-group") !== group) {
          continue;
        }
        panel.classList.toggle("is-active", panel.getAttribute("data-home-recommend-panel") === targetId);
      }
      scheduleHomeToolGridRowLimits(document);
    }

    function renderHomeRecommendAll() {
      if (!homeRecommend) {
        return;
      }
      renderHomeRecommendCustom();
      renderHomeRecommendRecent();
      renderHomeRecommendMonthlyHot();
      applyHomeToolGridRowLimits(document);
      syncFavoriteButtons();
      syncRegionWarningDirection();
      hydrateFastTooltips(homeRecommend);
    }

    function getRankingFallbackItems(limit) {
      var list = readJsonScript(rankingPageFallbackData);
      var max = parseInt(limit, 10) || 20;
      return list.slice(0, max);
    }

    function getSidebarRankingFallbackItems(card, limit) {
      var dataNode = card ? card.querySelector("[data-sidebar-ranking-fallback]") : null;
      var list = readJsonScript(dataNode);
      var max = parseInt(limit, 10) || 6;
      return list.slice(0, max);
    }

    function fillRankingEntriesWithFallback(entries, fallbackItems, limit) {
      var max = parseInt(limit, 10) || 20;
      var list = Array.isArray(entries) ? entries.slice(0, max) : [];
      var seenIds = {};
      for (var i = 0; i < list.length; i++) {
        var rawItem = list[i] && list[i].item ? list[i].item : list[i];
        var item = normalizeQuickFavoriteItem(rawItem);
        if (item && item.id) {
          seenIds[String(item.id)] = true;
        }
      }
      var fallback = Array.isArray(fallbackItems) ? fallbackItems : [];
      for (var fallbackIndex = 0; fallbackIndex < fallback.length; fallbackIndex++) {
        var fallbackItem = normalizeQuickFavoriteItem(fallback[fallbackIndex]);
        if (!fallbackItem || !fallbackItem.id || seenIds[String(fallbackItem.id)]) {
          continue;
        }
        list.push(fallbackItem);
        seenIds[String(fallbackItem.id)] = true;
        if (list.length >= max) {
          break;
        }
      }
      return list;
    }

    function buildRankingItemHtml(entry, index, metricLabel, useLocalMetric) {
      var item = entry && entry.item ? normalizeQuickFavoriteItem(entry.item) : normalizeQuickFavoriteItem(entry);
      if (!item) {
        return "";
      }
      var metricValue = useLocalMetric ? (parseInt(entry.count, 10) || 0) : normalizeFavoriteText(entry.metric || entry.views || entry.badge || "");
      if (!metricValue) {
        metricValue = useLocalMetric ? 1 : "热门";
      }
      var rankingLogoUrl = getFavoriteLogoUrl(item);
      var logoHtml = '<img src="' + escapeHtml(rankingLogoUrl) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" data-fallback-logo="' + (item.logo ? "0" : "1") + '" />';
      return ''
        + '<article class="ranking-page__item"'
        +   ' data-content-type="nav"'
        +   ' data-favorite-id="' + escapeHtml(item.id) + '"'
        +   ' data-favorite-title="' + escapeHtml(item.title) + '"'
        +   ' data-favorite-detail="' + escapeHtml(item.detailUrl || item.directUrl) + '"'
        +   ' data-favorite-direct="' + escapeHtml(item.directUrl || item.detailUrl) + '"'
        +   ' data-favorite-desc="' + escapeHtml(item.desc || "") + '"'
        +   ' data-favorite-logo="' + escapeHtml(item.logo || "") + '"'
        +   ' data-favorite-logo-text="' + escapeHtml(item.logoText || "") + '"'
        +   ' data-favorite-overseas="' + (item.isOverseas ? "1" : "0") + '">'
        +   '<em class="ranking-page__rank">' + escapeHtml(index + 1) + '</em>'
        +   '<a class="ranking-page__main" href="' + escapeHtml(item.detailUrl || item.directUrl) + '">'
        +     '<span class="ranking-page__logo">' + logoHtml + '</span>'
        +     '<span class="ranking-page__copy"><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.desc || "点击查看详情") + '</small></span>'
        +   '</a>'
        +   '<span class="ranking-page__metric"><strong>' + escapeHtml(metricValue) + '</strong><small>' + escapeHtml(metricLabel || "点击") + '</small></span>'
        +   '<a class="ranking-page__direct" href="' + escapeHtml(item.directUrl || item.detailUrl) + '" target="_blank" rel="nofollow noopener" aria-label="直达' + escapeHtml(item.title) + '">↗</a>'
        + '</article>';
    }

    function buildSidebarRankingItemHtml(entry) {
      var item = entry && entry.item ? normalizeQuickFavoriteItem(entry.item) : normalizeQuickFavoriteItem(entry);
      if (!item) {
        return "";
      }
      var logoUrl = getFavoriteLogoUrl(item);
      return ''
        + '<div class="aiph-iowen-ranking__item posts-item sites-item d-flex style-sites-default muted-bg br-md no-go-ico"'
        +   ' data-content-type="nav"'
        +   ' data-favorite-id="' + escapeHtml(item.id) + '"'
        +   ' data-favorite-title="' + escapeHtml(item.title) + '"'
        +   ' data-favorite-detail="' + escapeHtml(item.detailUrl || item.directUrl) + '"'
        +   ' data-favorite-direct="' + escapeHtml(item.directUrl || item.detailUrl) + '"'
        +   ' data-favorite-desc="' + escapeHtml(item.desc || "") + '"'
        +   ' data-favorite-logo="' + escapeHtml(item.logo || "") + '"'
        +   ' data-favorite-logo-text="' + escapeHtml(item.logoText || "") + '"'
        +   ' data-favorite-overseas="' + (item.isOverseas ? "1" : "0") + '">'
        +   '<a class="sites-body" href="' + escapeHtml(item.detailUrl || item.directUrl) + '" title="' + escapeHtml(item.title) + '">'
        +     '<div class="item-header">'
        +       '<div class="item-media">'
        +         '<div class="blur-img-bg" style="background-image:url(' + escapeHtml(logoUrl) + ');"></div>'
        +         '<div class="item-image"><img class="fill-cover sites-icon" src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" data-fallback-logo="' + (item.logo ? "0" : "1") + '" /></div>'
        +       '</div>'
        +     '</div>'
        +     '<div class="item-body overflow-hidden d-flex flex-column flex-fill">'
        +       '<h3 class="item-title line1"><b>' + escapeHtml(item.title) + '</b></h3>'
        +       '<div class="line1 text-muted text-xs">' + escapeHtml(item.desc || "点击查看详情") + '</div>'
        +     '</div>'
        +   '</a>'
        + '</div>';
    }

    function renderRankingList(kind, entries, sourceLabel, metricLabel, useLocalMetric) {
      if (!rankingPage) {
        return;
      }
      var listNode = rankingPage.querySelector('[data-ranking-list="' + kind + '"]');
      var panelNode = rankingPage.querySelector('[data-ranking-kind="' + kind + '"]');
      var sourceNode = panelNode ? panelNode.querySelector("[data-ranking-source-label]") : null;
      if (!listNode) {
        return;
      }
      var list = Array.isArray(entries) ? entries.slice(0, 20) : [];
      var localCount = list.length;
      if (!list.length) {
        list = getRankingFallbackItems(20);
        sourceLabel = "站内热门基线";
        metricLabel = "热度";
        useLocalMetric = false;
      } else if (list.length < 20) {
        var seenRankingIds = {};
        for (var seenIndex = 0; seenIndex < list.length; seenIndex++) {
          var seenItem = list[seenIndex] && list[seenIndex].item ? list[seenIndex].item : list[seenIndex];
          if (seenItem && seenItem.id) {
            seenRankingIds[String(seenItem.id)] = true;
          }
        }
        var fallbackItems = getRankingFallbackItems(20);
        for (var fallbackIndex = 0; fallbackIndex < fallbackItems.length; fallbackIndex++) {
          var fallbackItem = fallbackItems[fallbackIndex];
          if (!fallbackItem || !fallbackItem.id || seenRankingIds[String(fallbackItem.id)]) {
            continue;
          }
          list.push(fallbackItem);
          seenRankingIds[String(fallbackItem.id)] = true;
          if (list.length >= 20) {
            break;
          }
        }
        sourceLabel = sourceLabel + " · 站内热门补充";
      }
      var html = "";
      for (var i = 0; i < list.length; i++) {
        html += buildRankingItemHtml(list[i], i, i < localCount ? metricLabel : "热度", i < localCount ? useLocalMetric : false);
      }
      if (html) {
        listNode.innerHTML = html;
        hydrateFastTooltips(listNode);
      }
      if (sourceNode) {
        sourceNode.textContent = sourceLabel || "站内热门基线";
      }
    }

    function getSidebarRankingEntries(kind, limit) {
      if (kind === "today") {
        return getBehaviorDailyHotItems(0, limit);
      }
      if (kind === "month") {
        return getBehaviorMonthlyHotItems("", limit);
      }
      return getBehaviorWeeklyHotItems(limit);
    }

    function renderSidebarRankingCard(card, kind) {
      if (!card) {
        return;
      }
      var nextKind = kind || "week";
      var listNode = card.querySelector("[data-sidebar-ranking-list]");
      if (!listNode) {
        return;
      }
      var fallbackItems = getSidebarRankingFallbackItems(card, 6);
      var list = fillRankingEntriesWithFallback(getSidebarRankingEntries(nextKind, 6), fallbackItems, 6);
      var html = '<div class="posts-row row-sm ajax-panel row-col-1a">';
      for (var i = 0; i < list.length; i++) {
        html += buildSidebarRankingItemHtml(list[i]);
      }
      html += '</div>';
      if (list.length) {
        listNode.innerHTML = html;
      }
      listNode.setAttribute("data-sidebar-ranking-list", nextKind);
      var tabButtons = card.querySelectorAll("[data-sidebar-ranking-tab]");
      for (var tabIndex = 0; tabIndex < tabButtons.length; tabIndex++) {
        var active = tabButtons[tabIndex].getAttribute("data-sidebar-ranking-tab") === nextKind;
        tabButtons[tabIndex].classList.toggle("active", active);
        tabButtons[tabIndex].classList.toggle("loaded", active);
        tabButtons[tabIndex].setAttribute("aria-pressed", active ? "true" : "false");
      }
      hydrateFastTooltips(card);
    }

    function bindSidebarRankingCards() {
      if (!sidebarRankingCards.length) {
        return;
      }
      for (var i = 0; i < sidebarRankingCards.length; i++) {
        (function (card) {
          card.addEventListener("click", function (event) {
            var tab = event.target && event.target.closest ? event.target.closest("[data-sidebar-ranking-tab]") : null;
            if (!tab || !card.contains(tab)) {
              return;
            }
            event.preventDefault();
            renderSidebarRankingCard(card, tab.getAttribute("data-sidebar-ranking-tab") || "week");
          });
          renderSidebarRankingCard(card, "week");
        })(sidebarRankingCards[i]);
      }
    }

    function refreshSidebarRankingCards() {
      if (!sidebarRankingCards.length) {
        return;
      }
      for (var i = 0; i < sidebarRankingCards.length; i++) {
        var listNode = sidebarRankingCards[i].querySelector("[data-sidebar-ranking-list]");
        renderSidebarRankingCard(sidebarRankingCards[i], listNode ? listNode.getAttribute("data-sidebar-ranking-list") : "week");
      }
    }

    function renderRankingPage() {
      if (!rankingPage) {
        return;
      }
      renderRankingList("today", getBehaviorDailyHotItems(0, 20), "本机今日真实点击", "今日点击", true);
      renderRankingList("week", getBehaviorWeeklyHotItems(20), "本机近 7 日真实点击", "周点击", true);
      renderRankingList("month", getBehaviorMonthlyHotItems("", 20), "本机本月真实点击", "本月点击", true);
    }

    function addFavorite(item) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem || !normalizedItem.id) {
        return;
      }
      var store = readBehaviorStore();
      var favorites = store.favorites;
      if (isFavorite(normalizedItem.id, favorites)) {
        return;
      }
      upsertBehaviorItem(store.items, normalizedItem);
      favorites.unshift(normalizedItem);
      store.favorites = normalizeQuickFavoriteItems(favorites);
      upsertCustomSquareCardInStore(store, normalizedItem);
      store.customFavoritesLinked = true;
      writeBehaviorStore(store, "favorites");
      renderQuickFavorites();
      renderHomeRecommendCustom();
    }

    function removeFavorite(id) {
      if (!id) {
        return;
      }
      var store = readBehaviorStore();
      var favorites = store.favorites;
      var next = [];
      for (var i = 0; i < favorites.length; i++) {
        if (String(favorites[i].id) !== String(id)) {
          next.push(favorites[i]);
        }
      }
      store.favorites = normalizeQuickFavoriteItems(next);
      removeCustomSquareCardFromStore(store, id);
      store.customFavoritesLinked = true;
      writeBehaviorStore(store, "favorites");
      renderQuickFavorites();
      renderHomeRecommendCustom();
    }

    function moveFavoriteItem(sourceId, targetId) {
      if (!sourceId || !targetId || sourceId === targetId) {
        return;
      }
      var store = readBehaviorStore();
      var favorites = store.favorites.slice();
      var sourceIndex = -1;
      var targetIndex = -1;
      for (var i = 0; i < favorites.length; i++) {
        if (String(favorites[i].id) === String(sourceId)) {
          sourceIndex = i;
        }
        if (String(favorites[i].id) === String(targetId)) {
          targetIndex = i;
        }
      }
      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
        return;
      }
      var moved = favorites.splice(sourceIndex, 1)[0];
      favorites.splice(targetIndex, 0, moved);
      store.favorites = normalizeQuickFavoriteItems(favorites);
      writeBehaviorStore(store, "favorites");
      renderQuickFavorites();
      renderHomeRecommendCustom();
    }

    function getCurrentPageFavoriteCandidate() {
      var detail = document.querySelector(".aiph-single--tool");
      if (!detail) {
        return null;
      }
      var titleNode = detail.querySelector("h1");
      var directNode = detail.querySelector(".aiph-open-btn[href]");
      var logoNode = detail.querySelector(".aiph-preview-card__title img, .aiph-hero img");
      var title = normalizeFavoriteText(titleNode ? titleNode.textContent : document.title);
      var detailUrl = sanitizeFavoriteUrl(window.location.href);
      var directUrl = sanitizeFavoriteUrl(directNode ? directNode.getAttribute("href") : detailUrl);
      if (!title || !detailUrl) {
        return null;
      }
      return normalizeQuickFavoriteItem({
        id: "page|" + detailUrl,
        title: title,
        detailUrl: detailUrl,
        directUrl: directUrl || detailUrl,
        logo: logoNode ? logoNode.getAttribute("src") : "",
        logoText: title,
        badge: "自定义"
      });
    }

    function ensureQuickFavoritesAddPanelLayer() {
      if (quickFavoritesAddPanel && quickFavoritesAddPanel.parentNode !== document.body) {
        document.body.appendChild(quickFavoritesAddPanel);
      }
    }

    function setQuickFavoritesAddPanel(open) {
      if (!quickFavoritesAddPanel) {
        return;
      }
      if (open) {
        ensureQuickFavoritesAddPanelLayer();
        var candidate = getCurrentPageFavoriteCandidate();
        if (candidate) {
          if (quickFavoritesAddTitle && !quickFavoritesAddTitle.value) {
            quickFavoritesAddTitle.value = getFavoriteShortName(candidate);
          }
          if (quickFavoritesAddUrl && !quickFavoritesAddUrl.value) {
            quickFavoritesAddUrl.value = candidate.directUrl || candidate.detailUrl || "";
          }
        }
        quickFavoritesAddPanel.hidden = false;
        renderCustomShortcutPicker();
        if (quickFavorites) {
          quickFavorites.classList.add("is-adding");
        }
        if (quickFavoritesAdd) {
          quickFavoritesAdd.setAttribute("aria-expanded", "true");
        }
        document.body.classList.add("is-custom-shortcut-modal-open");
        window.setTimeout(function () {
          if (quickFavoritesAddTitle) {
            quickFavoritesAddTitle.focus();
            quickFavoritesAddTitle.select();
          }
        }, 30);
      } else {
        quickFavoritesAddPanel.hidden = true;
        customShortcutPendingSlotIndex = -1;
        if (quickFavorites) {
          quickFavorites.classList.remove("is-adding");
        }
        if (quickFavoritesAdd) {
          quickFavoritesAdd.setAttribute("aria-expanded", "false");
        }
        document.body.classList.remove("is-custom-shortcut-modal-open");
      }
    }

    function promptAddQuickFavorite(slotIndex) {
      var parsedSlotIndex = parseInt(slotIndex, 10);
      customShortcutPendingSlotIndex = isFinite(parsedSlotIndex) && parsedSlotIndex >= 0 ? Math.min(parsedSlotIndex, homeCustomSlotCount - 1) : -1;
      setQuickFavoritesAddPanel(true);
    }

    function submitQuickFavoriteForm() {
      var title = normalizeFavoriteText(quickFavoritesAddTitle ? quickFavoritesAddTitle.value : "");
      var url = sanitizeFavoriteUrl(quickFavoritesAddUrl ? quickFavoritesAddUrl.value : "");
      if (!title || !url) {
        if (quickFavoritesAddUrl) {
          quickFavoritesAddUrl.focus();
        }
        return;
      }
      var candidate = getCurrentPageFavoriteCandidate();
      var customItem = {
        id: "custom|" + title + "|" + url,
        title: title,
        detailUrl: url,
        directUrl: url,
        logo: candidate && candidate.logo && (url === candidate.directUrl || url === candidate.detailUrl) ? candidate.logo : "",
        logoText: title,
        badge: "自定义"
      };
      if (customShortcutPendingSlotIndex >= 0) {
        setCustomSquareCardAtSlot(customItem, customShortcutPendingSlotIndex);
      } else {
        upsertCustomSquareCard(customItem);
      }
      renderHomeRecommendCustom();
      if (quickFavoritesAddTitle) {
        quickFavoritesAddTitle.value = "";
      }
      if (quickFavoritesAddUrl) {
        quickFavoritesAddUrl.value = "";
      }
      setQuickFavoritesAddPanel(false);
    }

    function readCustomShortcutPickerItems() {
      var result = [];
      var seen = {};

      function addItem(item, category) {
        if (!item || !item.id || seen[item.id]) {
          return;
        }
        item.category = normalizeFavoriteText(category || item.category || "推荐");
        seen[item.id] = true;
        result.push(item);
      }

      var cards = document.querySelectorAll(".home-recommend__tool-grid .nav-card, .directory-browser--home .nav-card");
      for (var i = 0; i < cards.length; i++) {
        var section = cards[i].closest ? cards[i].closest(".directory-showcase--section, .home-recommend__group") : null;
        var categoryNode = section ? section.querySelector(".directory-showcase__copy h2") : null;
        addItem(getCardFavoriteData(cards[i]), normalizeFavoriteText(categoryNode ? categoryNode.textContent : "推荐"));
        if (result.length >= 120) {
          break;
        }
      }

      var sections = document.querySelectorAll(".directory-browser--home .directory-showcase--section");
      for (var s = 0; s < sections.length && result.length < 120; s++) {
        var sectionTitleNode = sections[s].querySelector(".directory-showcase__copy h2");
        var sectionTitle = normalizeFavoriteText(sectionTitleNode ? sectionTitleNode.textContent : "分类");
        var panels = sections[s].querySelectorAll('.directory-showcase__panel[data-subpanel-type="nav"]');
        for (var p = 0; p < panels.length && result.length < 120; p++) {
          var dataNode = panels[p].querySelector(".directory-subpanel-data");
          var items = dataNode ? readJsonScript(dataNode) : [];
          for (var it = 0; it < items.length && result.length < 120; it++) {
            addItem(items[it], sectionTitle);
          }
        }
      }
      return result;
    }

    function buildCustomShortcutPickerItem(item) {
      var logoHtml = item.logo
        ? '<img src="' + escapeHtml(item.logo) + '" alt="" loading="lazy" />'
        : '<span style="--fav-accent-h:' + escapeHtml(getFavoriteAccent(item)) + ';">' + escapeHtml(getFavoriteMonogram(item)) + '</span>';
      return ''
        + '<button class="custom-shortcut-picker__item" type="button" data-custom-shortcut-pick="' + escapeHtml(item.id) + '">'
        +   '<span class="custom-shortcut-picker__logo">' + logoHtml + '</span>'
        +   '<span class="custom-shortcut-picker__copy"><strong>' + escapeHtml(item.title) + '</strong><em>' + escapeHtml(item.category || "站内") + '</em></span>'
        + '</button>';
    }

    function renderCustomShortcutPicker() {
      if (!customShortcutPickerList) {
        return;
      }
      if (!customShortcutPickerItems.length) {
        customShortcutPickerItems = readCustomShortcutPickerItems();
      }
      var category = customShortcutCategoryFilter ? customShortcutCategoryFilter.value : "";
      var html = "";
      var categories = {};
      for (var i = 0; i < customShortcutPickerItems.length; i++) {
        var item = customShortcutPickerItems[i];
        categories[item.category || "推荐"] = true;
        if (category && item.category !== category) {
          continue;
        }
        html += buildCustomShortcutPickerItem(item);
      }
      customShortcutPickerList.innerHTML = html || '<p class="custom-shortcut-picker__empty">当前分类暂无可选卡片</p>';
      if (customShortcutCategoryFilter && customShortcutCategoryFilter.getAttribute("data-picker-ready") !== "1") {
        var options = '<option value="">全部分类</option>';
        for (var name in categories) {
          if (Object.prototype.hasOwnProperty.call(categories, name)) {
            options += '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '</option>';
          }
        }
        customShortcutCategoryFilter.innerHTML = options;
        customShortcutCategoryFilter.setAttribute("data-picker-ready", "1");
      }
    }

    function readQuickFavoritesDockMode() {
      try {
        var mode = window.localStorage.getItem(quickFavoritesDockModeKey) || "auto";
        return mode === "hidden" ? "auto" : mode;
      } catch (error) {
        return "auto";
      }
    }

    function writeQuickFavoritesDockMode(mode) {
      try {
        window.localStorage.setItem(quickFavoritesDockModeKey, mode || "auto");
      } catch (error) {
      }
    }

    function applyQuickFavoritesDockMode(mode, persist) {
      var nextMode = "auto";
      if (quickFavorites) {
        quickFavorites.classList.remove("is-open", "is-dock-always", "is-dock-hidden");
      }
      if (quickFavoritesTrigger) {
        quickFavoritesTrigger.setAttribute("aria-expanded", "false");
      }
      if (quickFavoritesMode) {
        quickFavoritesMode.setAttribute("aria-pressed", "false");
        quickFavoritesMode.textContent = "常显";
      }
      if (persist !== false) {
        writeQuickFavoritesDockMode(nextMode);
      }
    }

    function setQuickFavoritesOpen(open) {
      if (quickFavorites) {
        quickFavorites.classList.remove("is-open", "is-dock-always", "is-dock-hidden");
      }
      if (quickFavoritesTrigger) {
        quickFavoritesTrigger.setAttribute("aria-expanded", "false");
      }
    }

    function scheduleQuickFavoritesClose() {
      window.clearTimeout(quickFavoritesHoverTimer);
      quickFavoritesHoverTimer = window.setTimeout(function () {
        if (!quickFavorites.matches(":hover")) {
          setQuickFavoritesOpen(false);
        }
      }, 120);
    }

    if (quickFavorites && quickFavoritesTrigger && quickFavoritesPanel) {
      quickFavoritesTrigger.addEventListener("click", function (event) {
        event.stopPropagation();
        promptAddQuickFavorite();
      });
      quickFavoritesPanel.addEventListener("click", function () {
      });
    }

    if (quickFavoritesAdd) {
      quickFavoritesAdd.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        promptAddQuickFavorite();
      });
    }

    if (homeRecommendCustomGrid) {
      homeRecommendCustomGrid.addEventListener("click", function (event) {
        var button = event.target && event.target.closest ? event.target.closest("[data-custom-shortcut-empty-add], [data-custom-shortcut-slot-add]") : null;
        if (!button) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        promptAddQuickFavorite(button.getAttribute("data-custom-shortcut-slot-add"));
      });
    }

    if (customShortcutCategoryFilter) {
      customShortcutCategoryFilter.addEventListener("change", renderCustomShortcutPicker);
    }

    if (customShortcutPickerList) {
      customShortcutPickerList.addEventListener("click", function (event) {
        var button = event.target && event.target.closest ? event.target.closest("[data-custom-shortcut-pick]") : null;
        if (!button) {
          return;
        }
        var id = button.getAttribute("data-custom-shortcut-pick");
        for (var i = 0; i < customShortcutPickerItems.length; i++) {
          if (String(customShortcutPickerItems[i].id) === String(id)) {
            if (customShortcutPendingSlotIndex >= 0) {
              setCustomSquareCardAtSlot(customShortcutPickerItems[i], customShortcutPendingSlotIndex);
            } else {
              upsertCustomSquareCard(customShortcutPickerItems[i]);
            }
            renderHomeRecommendCustom();
            setQuickFavoritesAddPanel(false);
            break;
          }
        }
      });
    }

    if (quickFavoritesAddForm) {
      quickFavoritesAddForm.addEventListener("submit", function (event) {
        event.preventDefault();
        submitQuickFavoriteForm();
      });
    }

    if (quickFavoritesAddClose) {
      quickFavoritesAddClose.addEventListener("click", function (event) {
        event.preventDefault();
        setQuickFavoritesAddPanel(false);
      });
    }

    if (quickFavoritesList) {
      quickFavoritesList.addEventListener("click", function (event) {
        var target = event.target;
        if (!target) {
          return;
        }
        var removeId = target.getAttribute("data-quick-favorite-remove");
        if (removeId) {
          event.preventDefault();
          event.stopPropagation();
          removeFavorite(removeId);
          return;
        }
        var mainLink = target.closest ? target.closest(".quick-favorites__item-main") : null;
        var directLink = target.closest ? target.closest(".quick-favorites__item-direct") : null;
        var itemNode = target.closest ? target.closest(".quick-favorites__item") : null;
        if (!itemNode) {
          return;
        }
        var currentItem = getBehaviorItemById(itemNode.getAttribute("data-quick-favorite-id"));
        if (!currentItem) {
          return;
        }
        if (mainLink) {
          trackToolUsage(currentItem, {
            source: "quick-favorites",
            target: "detail",
            action: "click"
          });
        } else if (directLink) {
          trackToolUsage(currentItem, {
            source: "quick-favorites",
            target: "direct",
            action: "click"
          });
        }
      });

      quickFavoritesList.addEventListener("dragstart", function (event) {
        var item = event.target && event.target.closest ? event.target.closest(".quick-favorites__item") : null;
        if (!item) {
          return;
        }
        quickFavoriteDraggingId = item.getAttribute("data-quick-favorite-id") || "";
        item.classList.add("is-dragging");
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", quickFavoriteDraggingId);
        }
      });

      quickFavoritesList.addEventListener("dragend", function (event) {
        var item = event.target && event.target.closest ? event.target.closest(".quick-favorites__item") : null;
        if (item) {
          item.classList.remove("is-dragging");
        }
        var cards = quickFavoritesList.querySelectorAll(".quick-favorites__item");
        for (var i = 0; i < cards.length; i++) {
          cards[i].classList.remove("is-drop-target");
        }
        quickFavoriteDraggingId = "";
      });

      quickFavoritesList.addEventListener("dragover", function (event) {
        var item = event.target && event.target.closest ? event.target.closest(".quick-favorites__item") : null;
        if (!item || !quickFavoriteDraggingId) {
          return;
        }
        event.preventDefault();
        var cards = quickFavoritesList.querySelectorAll(".quick-favorites__item");
        for (var i = 0; i < cards.length; i++) {
          cards[i].classList.toggle("is-drop-target", cards[i] === item && cards[i].getAttribute("data-quick-favorite-id") !== quickFavoriteDraggingId);
        }
      });

      quickFavoritesList.addEventListener("drop", function (event) {
        var item = event.target && event.target.closest ? event.target.closest(".quick-favorites__item") : null;
        if (!item || !quickFavoriteDraggingId) {
          return;
        }
        event.preventDefault();
        moveFavoriteItem(quickFavoriteDraggingId, item.getAttribute("data-quick-favorite-id"));
      });
    }

    if (quickFavoritesClear) {
      quickFavoritesClear.addEventListener("click", function () {
        var store = readBehaviorStore();
        store.favorites = readQuickFavoriteDefaults();
        seedBehaviorItemsMap(store.items, store.favorites);
        writeBehaviorStore(store, "favorites");
        renderQuickFavorites();
      });
    }

    if (quickFavoritesMode) {
      quickFavoritesMode.addEventListener("click", function (event) {
        event.stopPropagation();
        var isAlways = quickFavorites && quickFavorites.classList.contains("is-dock-always");
        applyQuickFavoritesDockMode(isAlways ? "auto" : "always", true);
      });
    }

    if (quickFavoritesHide) {
      quickFavoritesHide.addEventListener("click", function (event) {
        event.stopPropagation();
        applyQuickFavoritesDockMode("auto", true);
        setQuickFavoritesOpen(false);
      });
    }

    if (openQuickFavoritesButton) {
      openQuickFavoritesButton.addEventListener("click", function (event) {
        event.preventDefault();
        customShortcutEditMode = !customShortcutEditMode;
        openQuickFavoritesButton.classList.toggle("is-active", customShortcutEditMode);
        openQuickFavoritesButton.setAttribute("aria-pressed", customShortcutEditMode ? "true" : "false");
        openQuickFavoritesButton.textContent = customShortcutEditMode ? "完成" : "编辑";
        renderHomeRecommendCustom();
      });
    }

    applyQuickFavoritesDockMode(readQuickFavoritesDockMode(), false);

    if (homeRecommendTabs.length) {
      for (var hrt = 0; hrt < homeRecommendTabs.length; hrt++) {
        homeRecommendTabs[hrt].addEventListener("click", function () {
          var group = this.getAttribute("data-home-recommend-group-target");
          var targetId = this.getAttribute("data-home-recommend-tab");
          setHomeRecommendPanel(
            group,
            targetId
          );
          if (homeRecommendMore && group === "aigc") {
            var nextUrl = targetId === "monthly-hot" ? "#categories" : "";
            homeRecommendMore.setAttribute("href", nextUrl ? nextUrl : "/");
          }
        });
        homeRecommendTabs[hrt].addEventListener("mouseenter", function () {
          var track = this.closest ? this.closest(".section-filter--subtabs-joly") : null;
          updateTrackHover(track, this);
        });
      }
    }

    if (homeRecommend) {
      homeRecommend.addEventListener("click", function (event) {
        var target = event.target;
        var customRemove = target && target.closest ? target.closest("[data-custom-shortcut-remove]") : null;
        if (customRemove) {
          event.preventDefault();
          event.stopPropagation();
          removeCustomSquareCard(customRemove.getAttribute("data-custom-shortcut-remove"));
          renderHomeRecommendCustom();
          return;
        }
        var favoriteToggle = target && target.closest ? target.closest("[data-favorite-toggle]") : null;
        if (favoriteToggle) {
          if (event.__wogaosuniFavoriteHandled) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          var favoriteCard = favoriteToggle.closest ? favoriteToggle.closest(".nav-card") : null;
          var favoriteItem = getCardFavoriteData(favoriteCard);
          if (!favoriteItem) {
            return;
          }
          if (isFavorite(favoriteItem.id)) {
            removeFavorite(favoriteItem.id);
          } else {
            addFavorite(favoriteItem);
            setQuickFavoritesOpen(true);
          }
          syncFavoriteButtons();
          return;
        }
        var directLink = target && target.closest ? target.closest(".nav-card__badge-anchor--direct") : null;
        if (directLink) {
          var directCard = directLink.closest ? directLink.closest(".nav-card") : null;
          var directItem = getCardFavoriteData(directCard);
          if (customShortcutEditMode && directItem) {
            event.preventDefault();
            upsertCustomSquareCard(directItem);
            renderHomeRecommendCustom();
            return;
          }
          if (directItem) {
            trackToolUsage(directItem, {
              source: "home-recommend",
              target: "direct",
              action: "click"
            });
          }
          return;
        }
        var link = target && target.closest ? target.closest("[data-recommend-track]") : null;
        if (!link) {
          return;
        }
        var item = getFavoriteDataFromNode(link);
        if (!item) {
          return;
        }
        if (customShortcutEditMode) {
          event.preventDefault();
          upsertCustomSquareCard(item);
          renderHomeRecommendCustom();
          return;
        }
        trackToolUsage(item, {
          source: "home-recommend",
          target: "detail",
          action: "click"
        });
      });
    }

    document.addEventListener("wogaosuni:user-data-change", function (event) {
      if (event && event.detail && event.detail.reason === "init") {
        return;
      }
      renderHomeRecommendAll();
      renderRankingPage();
      refreshSidebarRankingCards();
    });

    function bindNavCardInteractions(cards) {
      if (!cards || !cards.length) {
        return;
      }
      for (var nc = 0; nc < cards.length; nc++) {
        if (cards[nc].getAttribute("data-nav-card-bound") === "1") {
          continue;
        }
        cards[nc].setAttribute("data-nav-card-bound", "1");
        (function (card) {
          var mainLink = card.querySelector(".nav-card__mainlink");
          var directLink = card.querySelector(".nav-card__badge-anchor--direct");

          if (mainLink) {
            mainLink.addEventListener("click", function (event) {
              var item = getCardFavoriteData(card);
              if (!item) {
                return;
              }
              if (customShortcutEditMode) {
                event.preventDefault();
                upsertCustomSquareCard(item);
                renderHomeRecommendCustom();
                return;
              }
              trackToolUsage(item, {
                source: "nav-card",
                target: "detail",
                action: "click"
              });
            });
          }

          if (directLink) {
            directLink.addEventListener("click", function (event) {
              var item = getCardFavoriteData(card);
              if (!item) {
                return;
              }
              if (customShortcutEditMode) {
                event.preventDefault();
                upsertCustomSquareCard(item);
                renderHomeRecommendCustom();
                return;
              }
              trackToolUsage(item, {
                source: "nav-card",
                target: "direct",
                action: "click"
              });
            });
          }
        })(cards[nc]);

        cards[nc].addEventListener("mousemove", function (event) {
          var rect = this.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;
          this.style.setProperty("--mouse-x", x + "px");
          this.style.setProperty("--mouse-y", y + "px");
        });

        cards[nc].addEventListener("mouseenter", function () {
          var tooltip = this.querySelector(".nav-card__tooltip");
          if (tooltip) {
            this.classList.remove("is-tooltip-left", "is-tooltip-center");
            var tooltipWidth = tooltip.offsetWidth || 240;
            var rect = this.getBoundingClientRect();
            var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
            if (rect.left + 54 + tooltipWidth > viewportWidth - 18) {
              this.classList.add("is-tooltip-left");
            } else if (rect.left + 54 + tooltipWidth > viewportWidth - 72) {
              this.classList.add("is-tooltip-center");
            }
          }
          this.classList.add("is-hovering");
        });

        cards[nc].addEventListener("mouseleave", function () {
          this.classList.remove("is-hovering");
          this.classList.remove("is-tooltip-left", "is-tooltip-center");
          this.style.removeProperty("--mouse-x");
          this.style.removeProperty("--mouse-y");
        });

        var favButton = cards[nc].querySelector("[data-favorite-toggle]");
        if (favButton) {
          favButton.addEventListener("click", function (event) {
            event.__wogaosuniFavoriteHandled = true;
            event.preventDefault();
            event.stopPropagation();
            var card = this.closest ? this.closest(".nav-card") : null;
            var item = getCardFavoriteData(card);
            if (!item) {
              return;
            }
            if (isFavorite(item.id)) {
              removeFavorite(item.id);
            } else {
              addFavorite(item);
              setQuickFavoritesOpen(true);
            }
            syncFavoriteButtons();
          });
        }
      }
    }

    bindNavCardInteractions(navCards);

    function syncRegionWarningDirection() {
      var currentRegionBadgeAnchors = document.querySelectorAll(".nav-card__badge-anchor--region");
      if (!currentRegionBadgeAnchors.length) {
        return;
      }
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      for (var ra = 0; ra < currentRegionBadgeAnchors.length; ra++) {
        var anchor = currentRegionBadgeAnchors[ra];
        var warning = anchor.querySelector(".nav-card__badge-warning");
        anchor.classList.remove("is-warning-left");
        if (!warning) {
          continue;
        }
        var anchorRect = anchor.getBoundingClientRect();
        var warningWidth = Math.ceil(warning.getBoundingClientRect().width || warning.scrollWidth || warning.offsetWidth || 230);
        var spaceRight = viewportWidth - anchorRect.right - 18;
        var spaceLeft = anchorRect.left - 18;
        if (spaceRight < warningWidth && spaceLeft > spaceRight) {
          anchor.classList.add("is-warning-left");
        }
      }
    }

    syncRegionWarningDirection();

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setSidebarState(false);
        closeDropdowns("");
        closeTopbarCategoryMenus(null);
        setSponsorModalOpen(false);
        setFloatPanelOpen(false);
        setQuickFavoritesOpen(false);
        setQuickFavoritesAddPanel(false);
      }
    });

    document.addEventListener("click", function (event) {
      var node = event.target;
      var keepFloat = false;
      var keepSearch = false;
      var keepQuickFavorites = false;
      while (node) {
        if (node === floatPanel || node === floatTrigger) {
          keepFloat = true;
        }
        if (node === quickFavorites || node === quickFavoritesPanel || node === quickFavoritesTrigger) {
          keepQuickFavorites = true;
        }
        if (node === quickFavoritesAddPanel || node === quickFavoritesAdd) {
          keepQuickFavorites = true;
        }
        if (node === searchSwitcher) {
          keepSearch = true;
        }
        if (keepFloat && keepSearch && keepQuickFavorites) {
          break;
        }
        node = node.parentNode;
      }
      if (!keepFloat && floatPanel && floatTrigger) {
        setFloatPanelOpen(false);
      }
      if (!keepSearch && searchSwitcher) {
        searchSwitcher.classList.remove("is-suggest-open");
      }
      if (!keepQuickFavorites && quickFavorites && !quickFavorites.classList.contains("is-dock-always")) {
        setQuickFavoritesOpen(false);
        setQuickFavoritesAddPanel(false);
      }
      if (!keepQuickFavorites) {
        setQuickFavoritesAddPanel(false);
      }
      closeDropdowns("");
      closeTopbarCategoryMenus(null);
    });

    window.addEventListener("resize", function () {
      if (!isMobileSidebar()) {
        setSidebarState(false);
      }
      setSidebarCollapsed(readCollapsedState(), false);
      initSideAccordion();
      syncRegionWarningDirection();
      scheduleHomeToolGridRowLimits(document);
      closeDropdowns("");
      for (var activeSourceIndex = 0; activeSourceIndex < searchSourceButtons.length; activeSourceIndex++) {
        if (searchSourceButtons[activeSourceIndex].classList.contains("is-active")) {
          updateSearchSourceArrow(searchSourceButtons[activeSourceIndex]);
          break;
        }
      }
    });

    setSidebarState(false);
    setSidebarCollapsed(readCollapsedState(), false);
    finishSidebarBoot();
    initSideAccordion();
    if (searchCategoryButtons.length) {
      var defaultSearchCategory = "search";
      for (var activeSearchCategoryIndex = 0; activeSearchCategoryIndex < searchCategoryButtons.length; activeSearchCategoryIndex++) {
        if (searchCategoryButtons[activeSearchCategoryIndex].classList.contains("is-active")) {
          defaultSearchCategory = searchCategoryButtons[activeSearchCategoryIndex].getAttribute("data-search-category") || defaultSearchCategory;
          break;
        }
      }
      setSearchCategory(defaultSearchCategory, false);
    } else if (searchSourceButtons.length) {
      setSearchSource(searchSourceButtons[0]);
    }
    var quickFavoriteDefaultsList = getQuickFavoriteFallbackItems();
    var quickFavoriteStorageState = getQuickFavoritesStorageState();
    if (!hasQuickFavoritesSeeded()) {
      writeQuickFavorites(quickFavoriteDefaultsList);
      markQuickFavoritesSeeded();
    } else if ((!quickFavoriteStorageState.exists || !quickFavoriteStorageState.valid) && quickFavoriteDefaultsList.length) {
      writeQuickFavorites(quickFavoriteDefaultsList);
    }
    suppressBehaviorStoreEvents = true;
    writeBehaviorStore(readBehaviorStore(), "init");
    suppressBehaviorStoreEvents = false;
    renderQuickFavorites();
    renderHomeRecommendAll();
    renderRankingPage();
    bindSidebarRankingCards();
    animateHomeStats();
    hydrateSiteQr();
    bindSingleFavoriteToggle();
    bindSingleShareButton();
    bindFeedbackModal();

    window.WogaosuniUserBehavior = {
      readStore: readBehaviorStore,
      readFavorites: readQuickFavorites,
      writeFavorites: writeQuickFavorites,
      readCustomSquareCards: readCustomSquareCards,
      writeCustomSquareCards: writeCustomSquareCards,
      upsertCustomSquareCard: upsertCustomSquareCard,
      getRecentItems: getBehaviorRecentItems,
      getMonthlyHotItems: getBehaviorMonthlyHotItems,
      getDailyHotItems: getBehaviorDailyHotItems,
      getItemById: getBehaviorItemById,
      trackUsage: trackToolUsage,
      getCurrentMonthKey: function () {
        return getBehaviorMonthKey(Date.now());
      }
    };

    function setTabShell(shellId, targetId) {
      if (!targetId) {
        return;
      }
      var shellTabs = shellId
        ? document.querySelectorAll('[data-tab-shell-target="' + shellId + '"]')
        : tabs;
      var shellPanels = shellId
        ? document.querySelectorAll('[data-tab-shell-panels="' + shellId + '"] [data-tab-panel]')
        : panels;
      for (var j = 0; j < shellTabs.length; j++) {
        shellTabs[j].classList.toggle(
          "is-active",
          shellTabs[j].getAttribute("data-tab-target") === targetId
        );
      }
      for (var k = 0; k < shellPanels.length; k++) {
        shellPanels[k].classList.toggle(
          "is-active",
          shellPanels[k].getAttribute("data-tab-panel") === targetId
        );
      }
    }

    if (tabs.length && panels.length) {
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function () {
          var target = this.getAttribute("data-tab-target");
          var shellId = this.getAttribute("data-tab-shell-target") || "";
          setTabShell(shellId, target);
        });
      }
    }

    function getDetailAnchor(targetId) {
      if (!targetId) {
        return null;
      }
      return document.getElementById(targetId) || document.querySelector('[data-detail-panel="' + targetId + '"]');
    }

    function setDetailAnchor(targetId) {
      if (!targetId || !detailTabs.length) {
        return;
      }
      for (var detailTabIndex = 0; detailTabIndex < detailTabs.length; detailTabIndex++) {
        var detailTab = detailTabs[detailTabIndex];
        var isActiveTab = detailTab.getAttribute("data-detail-tab") === targetId;
        detailTab.classList.toggle("is-active", isActiveTab);
        detailTab.setAttribute("aria-selected", isActiveTab ? "true" : "false");
      }
      for (var detailPanelIndex = 0; detailPanelIndex < detailPanels.length; detailPanelIndex++) {
        detailPanels[detailPanelIndex].hidden = false;
      }
    }

    if (detailTabs.length) {
      var initialDetailPanel = window.location.hash ? window.location.hash.replace(/^#/, "") : "product-info";
      if (!getDetailAnchor(initialDetailPanel)) {
        initialDetailPanel = "product-info";
      }
      setDetailAnchor(initialDetailPanel);
      for (var detailBindIndex = 0; detailBindIndex < detailTabs.length; detailBindIndex++) {
        detailTabs[detailBindIndex].addEventListener("click", function (event) {
          var targetId = this.getAttribute("data-detail-tab");
          if (!targetId) {
            return;
          }
          event.preventDefault();
          setDetailAnchor(targetId);
          var targetPanel = getDetailAnchor(targetId);
          if (targetPanel && targetPanel.scrollIntoView) {
            targetPanel.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
          if (history && history.replaceState) {
            history.replaceState(null, "", "#" + targetId);
          }
        });
      }
    }

    function bindArticleGuessCard() {
      var card = document.querySelector("[data-aiph-guess-card]");
      if (!card) {
        return;
      }
      var tabs = card.querySelectorAll("[data-guess-tab]");
      var panels = card.querySelectorAll("[data-guess-panel]");
      if (!tabs.length || !panels.length) {
        return;
      }

      function setGuessPage(panel, page) {
        if (!panel) {
          return;
        }
        var pager = panel.querySelector("[data-guess-pager]");
        var items = panel.querySelectorAll("[data-guess-page]");
        var pageCount = pager ? parseInt(pager.getAttribute("data-guess-pages") || "1", 10) : 1;
        if (!pageCount || pageCount < 1) {
          pageCount = 1;
        }
        page = parseInt(page || 1, 10);
        if (!page || page < 1) {
          page = 1;
        }
        if (page > pageCount) {
          page = 1;
        }
        for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
          var itemPage = parseInt(items[itemIndex].getAttribute("data-guess-page") || "1", 10);
          items[itemIndex].hidden = itemPage !== page;
        }
        if (!pager) {
          return;
        }
        pager.setAttribute("data-guess-current", String(page));
        var pageButtons = pager.querySelectorAll("[data-guess-page-button]");
        for (var pageIndex = 0; pageIndex < pageButtons.length; pageIndex++) {
          var buttonPage = parseInt(pageButtons[pageIndex].getAttribute("data-guess-page-button") || "1", 10);
          pageButtons[pageIndex].classList.toggle("is-active", buttonPage === page);
        }
      }

      function setGuessPanel(targetId) {
        if (!targetId) {
          return;
        }
        for (var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
          var isActiveTab = tabs[tabIndex].getAttribute("data-guess-tab") === targetId;
          tabs[tabIndex].classList.toggle("is-active", isActiveTab);
          tabs[tabIndex].setAttribute("aria-pressed", isActiveTab ? "true" : "false");
        }
        for (var panelIndex = 0; panelIndex < panels.length; panelIndex++) {
          var isActivePanel = panels[panelIndex].getAttribute("data-guess-panel") === targetId;
          panels[panelIndex].classList.toggle("is-active", isActivePanel);
          panels[panelIndex].hidden = !isActivePanel;
          if (isActivePanel) {
            setGuessPage(panels[panelIndex], 1);
          }
        }
      }

      card.addEventListener("click", function (event) {
        var tab = event.target && event.target.closest ? event.target.closest("[data-guess-tab]") : null;
        var pageButton = event.target && event.target.closest ? event.target.closest("[data-guess-page-button]") : null;
        var nextButton = event.target && event.target.closest ? event.target.closest("[data-guess-next]") : null;
        var jumpButton = event.target && event.target.closest ? event.target.closest("[data-guess-jump]") : null;
        if (tab && card.contains(tab)) {
          event.preventDefault();
          setGuessPanel(tab.getAttribute("data-guess-tab") || "");
          return;
        }
        if (!pageButton && !nextButton && !jumpButton) {
          return;
        }
        var panel = event.target.closest ? event.target.closest("[data-guess-panel]") : null;
        var pager = panel ? panel.querySelector("[data-guess-pager]") : null;
        if (!panel || !pager) {
          return;
        }
        event.preventDefault();
        var currentPage = parseInt(pager.getAttribute("data-guess-current") || "1", 10) || 1;
        var pageCount = parseInt(pager.getAttribute("data-guess-pages") || "1", 10) || 1;
        if (pageButton) {
          setGuessPage(panel, pageButton.getAttribute("data-guess-page-button") || "1");
        } else if (nextButton) {
          setGuessPage(panel, currentPage >= pageCount ? 1 : currentPage + 1);
        } else if (jumpButton) {
          setGuessPage(panel, currentPage >= pageCount ? 1 : currentPage + 1);
        }
      });

      setGuessPanel(tabs[0].getAttribute("data-guess-tab") || "");
    }

    function bindArticleOutline() {
      var outline = document.querySelector("[data-aiph-outline]");
      if (!outline) {
        return;
      }
      var links = outline.querySelectorAll("[data-outline-link]");
      if (!links.length) {
        return;
      }

      var sections = [];
      for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
        var targetId = links[linkIndex].getAttribute("data-outline-link") || "";
        var targetNode = targetId ? document.getElementById(targetId) : null;
        if (targetNode) {
          sections.push({
            id: targetId,
            link: links[linkIndex],
            node: targetNode
          });
        }
      }
      if (!sections.length) {
        return;
      }

      function setActiveOutline(targetId) {
        for (var index = 0; index < sections.length; index++) {
          sections[index].link.classList.toggle("is-active", sections[index].id === targetId);
        }
      }

      function updateActiveOutline() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        var threshold = scrollTop + 140;
        var activeId = sections[0].id;
        for (var index = 0; index < sections.length; index++) {
          var rectTop = sections[index].node.getBoundingClientRect().top + scrollTop;
          if (rectTop <= threshold) {
            activeId = sections[index].id;
          } else {
            break;
          }
        }
        setActiveOutline(activeId);
      }

      outline.addEventListener("click", function (event) {
        var link = event.target && event.target.closest ? event.target.closest("[data-outline-link]") : null;
        if (!link || !outline.contains(link)) {
          return;
        }
        var targetId = link.getAttribute("data-outline-link") || "";
        var targetNode = targetId ? document.getElementById(targetId) : null;
        if (!targetNode) {
          return;
        }
        event.preventDefault();
        setActiveOutline(targetId);
        if (targetNode.scrollIntoView) {
          targetNode.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
        if (history && history.replaceState) {
          history.replaceState(null, "", "#" + targetId);
        }
      });

      updateActiveOutline();
      window.addEventListener("scroll", updateActiveOutline, { passive: true });
      window.addEventListener("resize", updateActiveOutline);
    }

    bindArticleGuessCard();
    bindArticleOutline();
    bindFastTooltipEvents();
    hydrateFastTooltips(document);
  });
})();
