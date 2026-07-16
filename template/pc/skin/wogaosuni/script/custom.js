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
    var topbarRootSelector = "#siteTopbar";
    var topbarInnerSelector = ".wn-nav-shell__inner";
    var desktopSearchFormSelector = "[data-topbar-search-form]";
    var sidebarItemSelector = ".wn-sidebar-item";
    var sidebarBranchSelector = ".wn-sidebar-item.has-children";
    var sidebarRowLinkSelector = ".wn-sidebar-item__row > a";
    var sidebarToggleSelector = ".wn-sidebar-item__toggle";
    var sidebarChildrenSelector = ".wn-sidebar-item__children";
    var desktopSearchForm = document.querySelector(desktopSearchFormSelector);
    var desktopSearchInput = desktopSearchForm ? desktopSearchForm.querySelector('input[name="keywords"]') : null;
    var mobileSearchOpen = document.querySelector("[data-mobile-search-open]");
    var mobileSearchSheet = document.querySelector("[data-mobile-search-sheet]");
    var mobileSearchForm = document.querySelector("[data-mobile-search-form]");
    var mobileSearchInput = document.querySelector("[data-mobile-search-input]");
    var mobileSearchCloseButtons = document.querySelectorAll("[data-mobile-search-close]");
    var mobileSearchHistory = document.querySelector("[data-mobile-search-history]");
    var mobileSearchHistoryList = document.querySelector("[data-mobile-search-history-list]");
    var mobileSearchClear = document.querySelector("[data-mobile-search-clear]");
    var mobileSearchValueButtons = document.querySelectorAll("[data-mobile-search-value]");
    var sideToggles = document.querySelectorAll(sidebarToggleSelector);
    var sideNavLinks = document.querySelectorAll(sidebarRowLinkSelector);
    var sideNavChildLinks = document.querySelectorAll(sidebarChildrenSelector + " a[href]");
    var directoryButtons = document.querySelectorAll("[data-directory-target]");
    var directoryPanels = document.querySelectorAll("[data-directory-panel]");
    var subpanelTriggers = document.querySelectorAll("[data-subpanel-trigger]");
    var dropdownTriggers = document.querySelectorAll("[data-dropdown-trigger]");
    var regionBadgeAnchors = document.querySelectorAll(".nav-card__badge-anchor--region");
    var siteFloat = document.getElementById("siteFloat");
    var siteFloatCollapse = document.getElementById("siteFloatCollapse");
    var floatTrigger = document.getElementById("siteFloatTrigger");
    var floatPanel = document.getElementById("siteFloatPanel");
    var quickFavorites = document.getElementById("quickFavorites");
    var quickFavoritesAdd = document.getElementById("quickFavoritesAdd");
    var quickFavoritesAddPanel = document.getElementById("quickFavoritesAddPanel");
    var quickFavoritesAddForm = document.getElementById("quickFavoritesAddForm");
    var quickFavoritesAddTitle = document.getElementById("quickFavoritesAddTitle");
    var quickFavoritesAddUrl = document.getElementById("quickFavoritesAddUrl");
    var quickFavoritesAddClose = document.getElementById("quickFavoritesAddClose");
    var quickFavoritesAddClearAll = document.getElementById("quickFavoritesAddClearAll");
    var customShortcutCategoryFilter = document.getElementById("customShortcutCategoryFilter");
    var customShortcutPickerSearch = document.getElementById("customShortcutPickerSearch");
    var customShortcutPickerList = document.getElementById("customShortcutPickerList");
    var customShortcutPickerToggle = document.getElementById("customShortcutPickerToggle");
    var customShortcutPickerBody = document.getElementById("customShortcutPickerBody");
    var customShortcutEntryMode = document.getElementById("customShortcutEntryMode");
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
    var quickFavoritesAddPanelHost = document.getElementById("quickFavoritesAddPanelHost");

    function cssEscapeValue(value) {
      return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }

    if (siteFloat && document.body && siteFloat.parentNode !== document.body) {
      document.body.appendChild(siteFloat);
    }

    function setSiteFloatCollapsed(collapsed, persist) {
      if (!siteFloat || !siteFloatCollapse) {
        return;
      }
      siteFloat.classList.toggle("is-collapsed", !!collapsed);
      siteFloatCollapse.setAttribute("aria-expanded", collapsed ? "false" : "true");
      siteFloatCollapse.setAttribute("aria-label", collapsed ? "展开联系方式" : "收起联系方式");
      setFastTooltip(siteFloatCollapse, collapsed ? "展开联系方式" : "收起联系方式");
      if (persist) {
        try {
          window.localStorage.setItem(siteFloatCollapsedStorageKey, collapsed ? "1" : "0");
        } catch (error) {}
      }
      queueSiteFloatFooterOffset(true);
    }
    var siteFloatFooterRaf = 0;
    var siteFloatFooterNeedsBaseRefresh = true;
    var siteFloatBaseBottom = 16;
    var backToTopStateRaf = 0;

    function readBackToTopThreshold() {
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      var isCompactViewport = !!(window.matchMedia && window.matchMedia("(max-width: 960px)").matches);
      var minThreshold = isCompactViewport ? 180 : 320;
      var maxThreshold = isCompactViewport ? 300 : 460;
      var factor = isCompactViewport ? 0.42 : 0.58;
      if (!viewportHeight) {
        return minThreshold;
      }
      return Math.max(minThreshold, Math.min(maxThreshold, Math.round(viewportHeight * factor)));
    }

    function setBackToTopVisible(visible) {
      if (!backToTop) {
        return;
      }
      var isVisible = !!visible;
      var wasVisible = backToTop.classList.contains("is-ready") && !backToTop.classList.contains("is-hidden");
      backToTop.classList.toggle("is-hidden", !isVisible);
      backToTop.classList.toggle("is-ready", isVisible);
      backToTop.disabled = !isVisible;
      backToTop.setAttribute("aria-hidden", isVisible ? "false" : "true");
      if (isVisible) {
        backToTop.removeAttribute("tabindex");
      } else {
        backToTop.setAttribute("tabindex", "-1");
      }
      if (wasVisible !== isVisible) {
        queueSiteFloatFooterOffset(true);
      }
    }

    function syncBackToTopState() {
      backToTopStateRaf = 0;
      if (!backToTop) {
        return;
      }
      var docEl = document.documentElement;
      var scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0;
      var viewportHeight = window.innerHeight || docEl.clientHeight || 0;
      var maxScroll = Math.max(0, (docEl.scrollHeight || 0) - viewportHeight);
      if (maxScroll <= 180) {
        setBackToTopVisible(false);
        return;
      }
      var threshold = Math.max(0, Math.min(maxScroll - 24, readBackToTopThreshold()));
      setBackToTopVisible(scrollTop >= threshold);
    }

    function queueBackToTopState() {
      if (!backToTop) {
        return;
      }
      if (backToTopStateRaf) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 16);
      };
      backToTopStateRaf = raf(syncBackToTopState);
    }

    function scrollPageToTop() {
      var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      try {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth"
        });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }

    function clearSiteFloatFooterOffset() {
      if (!siteFloat) {
        return;
      }
      siteFloat.style.removeProperty("bottom");
      siteFloat.style.removeProperty("--site-float-footer-offset");
    }

    function readSiteFloatBaseBottom() {
      if (!siteFloat || !window.getComputedStyle) {
        return 16;
      }
      var previousBottom = siteFloat.style.getPropertyValue("bottom");
      var previousBottomPriority = siteFloat.style.getPropertyPriority("bottom");
      siteFloat.style.removeProperty("bottom");
      var baseBottom = parseFloat(window.getComputedStyle(siteFloat).bottom) || 16;
      if (previousBottom) {
        siteFloat.style.setProperty("bottom", previousBottom, previousBottomPriority || "");
      } else {
        siteFloat.style.removeProperty("bottom");
      }
      return baseBottom;
    }

    function syncSiteFloatFooterOffset() {
      siteFloatFooterRaf = 0;
      if (!siteFloat) {
        return;
      }
      if (!window.matchMedia || !window.matchMedia("(max-width: 960px)").matches) {
        clearSiteFloatFooterOffset();
        siteFloatFooterNeedsBaseRefresh = true;
        return;
      }
      if (siteFloatFooterNeedsBaseRefresh) {
        siteFloatBaseBottom = readSiteFloatBaseBottom();
        siteFloatFooterNeedsBaseRefresh = false;
      }
      var footer = document.querySelector("footer.site-footer, .site-footer");
      if (!footer) {
        clearSiteFloatFooterOffset();
        return;
      }
      var viewportHeight = 0;
      if (window.visualViewport && window.visualViewport.height) {
        viewportHeight = window.visualViewport.height;
      }
      if (!viewportHeight) {
        viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      }
      if (!viewportHeight) {
        clearSiteFloatFooterOffset();
        return;
      }
      var footerRect = footer.getBoundingClientRect();
      var footerGap = 12;
      var nextOffset = Math.max(0, Math.ceil(viewportHeight - footerRect.top - siteFloatBaseBottom + footerGap));
      var floatRect = siteFloat.getBoundingClientRect();
      var floatHeight = floatRect.height || siteFloat.offsetHeight || 52;
      var topbar = document.querySelector("#siteTopbar, .topbar, header.wn-nav-shell");
      var topbarRect = topbar ? topbar.getBoundingClientRect() : null;
      var minTop = topbarRect && topbarRect.bottom > 0 ? topbarRect.bottom + 12 : 12;
      var maxBottom = Math.max(siteFloatBaseBottom, viewportHeight - floatHeight - minTop);
      var nextBottom = Math.min(siteFloatBaseBottom + nextOffset, maxBottom);
      var appliedOffset = Math.max(0, Math.ceil(nextBottom - siteFloatBaseBottom));
      siteFloat.style.setProperty("--site-float-footer-offset", appliedOffset + "px");
      siteFloat.style.setProperty("bottom", nextBottom + "px", "important");
    }

    function queueSiteFloatFooterOffset(refreshBase) {
      if (!siteFloat) {
        return;
      }
      if (refreshBase) {
        siteFloatFooterNeedsBaseRefresh = true;
      }
      if (siteFloatFooterRaf) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 16);
      };
      siteFloatFooterRaf = raf(syncSiteFloatFooterOffset);
    }
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
    var rankingStatNumbers = document.querySelectorAll(".nav-theme-v2.is-ranking-page .ranking-page__stats [data-ranking-countup]");
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
    var feedbackNote = document.querySelector("[data-feedback-note]");
    var feedbackPageTitle = document.querySelector("[data-feedback-page-title]");
    var feedbackPageUrl = document.querySelector("[data-feedback-page-url]");
    var feedbackSelectedType = document.querySelector("[data-feedback-selected-type]");
    var feedbackSubmitButton = document.querySelector("[data-feedback-submit]");
    var feedbackSubmitHint = document.querySelector("[data-feedback-submit-hint]");
    var navCards = document.querySelectorAll(".nav-card");
    var desktopCollapseStorageKey = "wogaosuni_wn_nav_sidebar_collapsed_v1";
    var desktopSidebarExpandedWidth = 222;
    var desktopSidebarCollapsedWidth = 70;
    var desktopMainExpandedRightGap = 24;
    var desktopMainCollapsedRightGap = 24;
    var desktopTopbarCollapsedRightGap = 12;
    var quickFavoritesStorageKey = "wogaosuni_quick_favorites";
    var siteFloatCollapsedStorageKey = "wogaosuni_site_float_collapsed";
    var feedbackSubmitStoragePrefix = "wogaosuni_tool_feedback_last_";
    var quickFavoritesSeededKey = "wogaosuni_quick_favorites_seeded";
    var quickFavoritesDockModeKey = "wogaosuni_quick_favorites_dock_mode";
    var behaviorStoreStorageKey = "wogaosuni_user_behavior_store";
    var mobileSearchHistoryStorageKey = "wogaosuni_mobile_search_history_v1";
    var sideAccordionStorageKey = "wogaosuni_side_nav_expanded_v1";
    var sideAccordionClosedValue = "__all_closed__";
    var behaviorStoreVersion = 1;
    var behaviorRecentLimit = 12;
    var behaviorHistoryLimit = 120;
    var behaviorMonthlyRetention = 12;
    var homeMiniShortcutRowLimit = 12;
    var homeCustomMinSlotCount = homeMiniShortcutRowLimit;
    var homeCustomSlotColumns = 6;
    var homeToolGridRows = 4;
    var homeCategoryGridRows = 3;
    var homeToolGridMaxItems = 24;
    var homeInlineSectionCount = 2;
    var homeInitialPrefetchSections = 2;
    var homeDeferredLoadQueue = [];
    var homeDeferredLoadRunning = 0;
    var homeDeferredUserMoved = false;
    var homeHiddenSubpanelWarmCount = 0;
    var homeHiddenSubpanelWarmMax = 60;
    var homeMiniShortcutBadgeLabels = ["AI神器", "AI编程", "AI办公", "AI创作", "排行", "设计", "热门", "精选", "AI", "效率"];
    var homeMiniShortcutTitleLimit = 8;
    var siteLogoFallbackUrl = "/template/pc/skin/wogaosuni/image/open-source-logo.svg";
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
    var collapsedSidebarDockRaf = 0;
    var collapsedSidebarDockPendingPointer = null;
    var collapsedSidebarDockLastFrameTime = 0;
    var topbarCategoryCloseTimer = 0;
    var fastTooltipNode = null;
    var fastTooltipTarget = null;
    var customShortcutEditMode = false;
    var customShortcutPickerItems = [];
    var customShortcutPendingSlotIndex = -1;
    var customShortcutActiveMode = "picker";
    var customShortcutClearConfirmTimer = 0;
    var sideAccordionRefreshTimer = 0;
    var homeToolGridLimitTimer = 0;
    var topbarDensityFrame = 0;

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
      if (!document.getElementById("fastTooltipPlacementStyle")) {
        var fastTooltipStyle = document.createElement("style");
        fastTooltipStyle.id = "fastTooltipPlacementStyle";
        fastTooltipStyle.textContent = '.fast-ui-tooltip[data-placement="right"]::after{left:-5px;top:50%;transform:translateY(-50%) rotate(135deg)}';
        document.head.appendChild(fastTooltipStyle);
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
      var isSidebarToggle = target.matches && target.matches(sidebarToggleSelector) && isDesktopSidebar();
      var left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      var top = targetRect.top - tooltipRect.height - gap;
      var placement = "top";
      var minLeft = 8;
      var maxLeft = Math.max(minLeft, viewportWidth - tooltipRect.width - 8);
      if (isSidebarToggle) {
        var sidebarRect = sidebar ? sidebar.getBoundingClientRect() : null;
        var sidebarRight = sidebarRect ? sidebarRect.right : targetRect.right;
        left = Math.max(targetRect.right + gap, sidebarRight + 8);
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        placement = "right";
      } else if (top < 8 && targetRect.bottom + tooltipRect.height + gap < viewportHeight - 8) {
        top = targetRect.bottom + gap;
        placement = "bottom";
      }
      left = Math.max(minLeft, Math.min(maxLeft, left));
      tooltip.style.left = Math.round(left) + "px";
      tooltip.style.top = Math.round(Math.max(8, Math.min(viewportHeight - tooltipRect.height - 8, top))) + "px";
      var arrowLeft = Math.round(targetRect.left + (targetRect.width / 2) - left);
      arrowLeft = Math.max(8, Math.min(tooltipRect.width - 8, arrowLeft));
      tooltip.style.setProperty("--fast-tooltip-arrow-left", arrowLeft + "px");
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

    function animateRankingStats() {
      if (!rankingStatNumbers.length) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(function () {
          callback(Date.now());
        }, 16);
      };
      var reduceMotion = false;
      try {
        reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      } catch (error) {
        reduceMotion = false;
      }
      var formatter = null;
      try {
        formatter = new Intl.NumberFormat("zh-CN");
      } catch (error) {
        formatter = null;
      }
      function formatCount(value) {
        var safeValue = Math.max(0, Math.round(value));
        return formatter ? formatter.format(safeValue) : String(safeValue);
      }
      for (var rsi = 0; rsi < rankingStatNumbers.length; rsi++) {
        (function (node, index) {
          if (node.getAttribute("data-ranking-animated") === "1") {
            return;
          }
          node.setAttribute("data-ranking-animated", "1");
          var originalText = (node.textContent || "").trim();
          var rawTarget = node.getAttribute("data-count-to") || originalText;
          var target = parseInt(String(rawTarget).replace(/[^\d]/g, ""), 10);
          if (!isFinite(target) || target < 0) {
            return;
          }
          var suffix = originalText.replace(/[\d,\s,，]/g, "");
          var finalText = formatCount(target) + suffix;
          if (reduceMotion || target === 0) {
            node.textContent = finalText;
            return;
          }
          var start = 0;
          var lastValue = 0;
          var duration = 680 + index * 90;
          var seed = Math.max(8, Math.round(target * (0.16 + index * 0.04)));
          node.textContent = "0" + suffix;
          raf(function tick(timestamp) {
            if (!start) {
              start = timestamp;
            }
            var progress = Math.min(1, (timestamp - start) / duration);
            var easing = 1 - Math.pow(1 - progress, 3);
            var jitter = progress < 0.7 ? Math.round(Math.sin(timestamp / 16 + index * 1.7) * seed * (1 - progress)) : 0;
            var current = Math.max(lastValue, Math.min(target, Math.round(target * easing + jitter)));
            lastValue = current;
            node.textContent = formatCount(current) + suffix;
            if (progress < 1) {
              raf(tick);
            } else {
              node.textContent = finalText;
            }
          });
        })(rankingStatNumbers[rsi], rsi);
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
      document.documentElement.classList.toggle("is-sidebar-open", open);
      if (toggle) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }
      if (sidebarCollapseToggle) {
        sidebarCollapseToggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (!isDesktopSidebar()) {
          sidebarCollapseToggle.classList.toggle("is-active", !!open);
          sidebarCollapseToggle.setAttribute("aria-pressed", open ? "true" : "false");
          sidebarCollapseToggle.setAttribute("data-state", open ? "expanded" : "collapsed");
          setFastTooltip(sidebarCollapseToggle, open ? "关闭分类导航" : "打开分类导航");
        }
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

    function syncTopbarDensity() {
      if (!document.body) {
        return;
      }
      var topbar = document.querySelector(topbarRootSelector);
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      var isDesktopTopbar = viewportWidth >= 961;
      if (!topbar || !isDesktopTopbar) {
        document.body.classList.remove("is-topbar-condensed", "is-topbar-core", "is-topbar-minimal");
        if (topbar) {
          topbar.removeAttribute("data-topbar-width");
        }
        return;
      }
      var inner = topbar.querySelector(topbarInnerSelector);
      var topbarRect = topbar.getBoundingClientRect();
      var innerRect = inner ? inner.getBoundingClientRect() : topbarRect;
      var availableWidth = Math.max(0, innerRect.width || topbarRect.width || viewportWidth);
      var sidebarExpanded = !document.body.classList.contains("is-sidebar-collapsed");
      document.body.classList.toggle("is-topbar-condensed", sidebarExpanded || availableWidth < 1180);
      document.body.classList.toggle("is-topbar-core", availableWidth < 980);
      document.body.classList.toggle("is-topbar-minimal", availableWidth < 850);
      topbar.setAttribute("data-topbar-width", String(Math.round(availableWidth)));
    }

    function queueTopbarDensitySync() {
      if (topbarDensityFrame) {
        return;
      }
      topbarDensityFrame = window.requestAnimationFrame(function () {
        topbarDensityFrame = 0;
        syncTopbarDensity();
      });
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
      var link = item.querySelector(sidebarRowLinkSelector);
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

    function normalizeSidebarId(value) {
      var normalized = String(value || "").replace(/[^\d]/g, "");
      return normalized === "0" ? "" : normalized;
    }

    function getCurrentSidebarState() {
      var body = document.body || {};
      var currentTid = normalizeSidebarId(body.getAttribute ? body.getAttribute("data-current-typeid") : "");
      var currentTopTid = normalizeSidebarId(body.getAttribute ? body.getAttribute("data-current-topid") : "");
      var currentChannel = normalizeSidebarId(body.getAttribute ? body.getAttribute("data-current-channel") : "");
      if (!currentTid) {
        try {
          currentTid = normalizeSidebarId(new URLSearchParams(window.location.search || "").get("tid") || "");
        } catch (error) {
        }
      }
      if (!currentTopTid) {
        currentTopTid = currentTid;
      }
      return {
        channel: currentChannel,
        typeid: currentTid,
        topid: currentTopTid
      };
    }

    function getSidebarLinkInfo(link) {
      if (!link) {
        return null;
      }
      var role = link.getAttribute("data-sidebar-role") || "";
      var typeid = normalizeSidebarId(link.getAttribute("data-sidebar-typeid") || link.getAttribute("data-typeid") || "");
      var parentid = normalizeSidebarId(link.getAttribute("data-sidebar-parentid") || "");
      var channel = normalizeSidebarId(link.getAttribute("data-sidebar-channel") || "");
      if (!parentid && (role === "parent" || role === "all")) {
        parentid = typeid;
      }
      return {
        role: role,
        typeid: typeid,
        parentid: parentid,
        channel: channel,
        href: link.getAttribute("href") || "",
        item: getSideNavItem(link)
      };
    }

    function scrollToSidebarTarget(target) {
      if (!target || !target.getBoundingClientRect) {
        return;
      }
      var topbar = document.querySelector(topbarRootSelector);
      var topbarRect = topbar ? topbar.getBoundingClientRect() : null;
      var offset = Math.max(72, (topbarRect ? topbarRect.height : 0) + 18);
      var top = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - offset;
      try {
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } catch (error) {
        window.scrollTo(0, Math.max(0, top));
      }
    }

    function updateSidebarActiveState(info) {
      if (!info || !info.typeid) {
        return;
      }
      var links = sidebar ? sidebar.querySelectorAll("[data-sidebar-typeid]") : [];
      for (var i = 0; i < links.length; i++) {
        var linkInfo = getSidebarLinkInfo(links[i]);
        var active = !!(linkInfo && linkInfo.typeid === info.typeid);
        links[i].classList.toggle("is-active", active);
      }
      var items = sidebar ? sidebar.querySelectorAll(sidebarItemSelector) : [];
      for (var j = 0; j < items.length; j++) {
        var itemTypeid = normalizeSidebarId(items[j].getAttribute("data-sidebar-typeid") || "");
        var itemChannel = normalizeSidebarId(items[j].getAttribute("data-sidebar-channel") || "");
        var itemActive = !!(itemTypeid && itemTypeid === (info.parentid || info.typeid) && (!info.channel || !itemChannel || itemChannel === info.channel));
        items[j].classList.toggle("is-active", itemActive);
      }
    }

    function findCurrentSideNavItem() {
      if (!sidebar) {
        return null;
      }
      var current = getCurrentSidebarState();
      if (!current.typeid && !current.topid) {
        return null;
      }
      var childSelector = current.typeid ? '[data-sidebar-typeid="' + cssEscapeValue(current.typeid) + '"]' : "";
      var childLink = childSelector ? sidebar.querySelector(childSelector) : null;
      var childInfo = getSidebarLinkInfo(childLink);
      if (childInfo && childInfo.item && childInfo.role !== "utility") {
        updateSidebarActiveState(childInfo);
        return childInfo.item;
      }
      var parentId = current.topid || current.typeid;
      var parentSelector = parentId ? sidebarBranchSelector + '[data-sidebar-typeid="' + cssEscapeValue(parentId) + '"]' : "";
      var parentItem = parentSelector ? sidebar.querySelector(parentSelector) : null;
      if (parentItem) {
        updateSidebarActiveState({
          typeid: current.typeid || parentId,
          parentid: parentId,
          channel: current.channel
        });
      }
      return parentItem;
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
      var sideNavItems = document.querySelectorAll(sidebarBranchSelector);
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
      document.body.classList.toggle("is-sidebar-collapsed", active);
      document.documentElement.classList.toggle("is-sidebar-collapsed-html", active);
      if (!active) {
        closeCollapsedSidebarFlyouts(null);
      }
      if (isDesktopSidebar()) {
        var sidebarWidthNumber = active ? desktopSidebarCollapsedWidth : desktopSidebarExpandedWidth;
        var isHomePage = document.body.classList.contains("is-home");
        var isSingleArticleNews = document.body.classList.contains("is-single-article-news");
        var articleLeftGap = isSingleArticleNews ? (active ? 22 : 18) : 0;
        var sidebarWidth = sidebarWidthNumber + "px";
        var mainOffsetNumber = sidebarWidthNumber + articleLeftGap;
        var mainRightGap = active ? (desktopMainCollapsedRightGap + articleLeftGap) : desktopMainExpandedRightGap;
        var mainWidth = "calc(100vw - " + (mainOffsetNumber + mainRightGap) + "px)";
        if (active) {
          var collapsedMainGutter = isHomePage ? 0 : (isSingleArticleNews ? articleLeftGap : desktopMainCollapsedRightGap);
          var viewportWidthNumber = window.innerWidth || document.documentElement.clientWidth || 0;
          var availableMainWidthNumber = Math.max(0, viewportWidthNumber - sidebarWidthNumber);
          var maxMainWidthNumber = 0;
          if (siteMain) {
            var computedMainMaxWidth = window.getComputedStyle(siteMain).maxWidth;
            maxMainWidthNumber = computedMainMaxWidth && computedMainMaxWidth !== "none" ? (parseFloat(computedMainMaxWidth) || 0) : 0;
          }
          var collapsedMainRightGap = isHomePage ? desktopMainCollapsedRightGap : collapsedMainGutter;
          var preferredMainWidthNumber = Math.max(0, availableMainWidthNumber - collapsedMainGutter - collapsedMainRightGap);
          var renderedMainWidthNumber = maxMainWidthNumber > 0 ? Math.min(preferredMainWidthNumber, maxMainWidthNumber) : preferredMainWidthNumber;
          var centeredMainGapNumber = isHomePage ? 0 : Math.max(collapsedMainGutter, (availableMainWidthNumber - renderedMainWidthNumber) / 2);
          mainOffsetNumber = sidebarWidthNumber + centeredMainGapNumber;
          mainWidth = (Math.round(renderedMainWidthNumber * 100) / 100) + "px";
        }
        var mainOffset = (Math.round(mainOffsetNumber * 100) / 100) + "px";
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
      }
      if (sidebarCollapseToggle) {
        if (isDesktopSidebar()) {
          sidebarCollapseToggle.classList.toggle("is-active", active);
          sidebarCollapseToggle.setAttribute("aria-pressed", active ? "true" : "false");
          sidebarCollapseToggle.setAttribute("data-state", active ? "collapsed" : "expanded");
          setFastTooltip(sidebarCollapseToggle, active ? "展开分类导航" : "收起分类导航");
        } else {
          var mobileOpen = !!(sidebar && sidebar.classList.contains("is-open"));
          sidebarCollapseToggle.classList.toggle("is-active", mobileOpen);
          sidebarCollapseToggle.setAttribute("aria-pressed", mobileOpen ? "true" : "false");
          sidebarCollapseToggle.setAttribute("data-state", mobileOpen ? "expanded" : "collapsed");
          setFastTooltip(sidebarCollapseToggle, mobileOpen ? "关闭分类导航" : "打开分类导航");
        }
      }
      if (persist !== false) {
        writeCollapsedState(!!collapsed);
      }
      queueTopbarDensitySync();
      if (document.body.classList.contains("is-single-article-news")) {
        window.dispatchEvent(new CustomEvent("aiph:article-layout-change"));
      }
    }

    function finishSidebarBoot() {
      if (!document.body) {
        return;
      }
      window.setTimeout(function () {
        document.body.classList.remove("is-sidebar-booting");
        document.documentElement.classList.remove("is-sidebar-booting-html");
      }, 40);
    }

    function closeCollapsedSidebarFlyouts(exceptItem) {
      if (!sidebar) {
        return;
      }
      var items = sidebar.querySelectorAll(sidebarItemSelector);
      for (var csi = 0; csi < items.length; csi++) {
        if (items[csi] !== exceptItem) {
          items[csi].classList.remove("is-flyout-open");
          items[csi].classList.remove("is-flyout-pinned-bottom");
          items[csi].style.removeProperty("--sidebar-flyout-top");
        }
      }
    }

    function positionCollapsedSidebarFlyout(item) {
      if (!item || !document.body.classList.contains("is-sidebar-collapsed")) {
        return;
      }
      var flyout = item.querySelector(sidebarChildrenSelector);
      if (!flyout) {
        return;
      }
      item.classList.remove("is-flyout-pinned-bottom");
      item.style.removeProperty("--sidebar-flyout-top");
      flyout.style.removeProperty("max-height");
      flyout.style.removeProperty("overflow-x");
      flyout.style.removeProperty("overflow-y");
      var itemRect = item.getBoundingClientRect();
      var flyoutRect = flyout.getBoundingClientRect();
      var viewportPad = 18;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 720;
      var flyoutHeight = flyoutRect.height || flyout.scrollHeight || flyout.offsetHeight || 0;
      var topbar = document.querySelector(topbarRootSelector);
      var topbarRect = topbar ? topbar.getBoundingClientRect() : null;
      var safeTop = Math.max(viewportPad, topbarRect ? topbarRect.bottom + 8 : 78);
      var openDownTop = itemRect.top - 10;
      var openUpTop = itemRect.bottom - flyoutHeight + 10;
      var nextTop = openDownTop;
      if (openDownTop + flyoutHeight > viewportHeight - viewportPad) {
        var fitTop = viewportHeight - flyoutHeight - viewportPad;
        nextTop = Math.max(safeTop, Math.min(openUpTop, fitTop));
      }
      nextTop = Math.max(safeTop, nextTop);
      item.style.setProperty("--sidebar-flyout-top", (nextTop - itemRect.top) + "px");
      item.classList.toggle("is-flyout-pinned-bottom", nextTop === openUpTop);
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

    function clearCollapsedSidebarDockItem(item) {
      if (!item) {
        return;
      }
      if (item.__collapsedSidebarDockState) {
        item.__collapsedSidebarDockState.current = 0;
        item.__collapsedSidebarDockState.target = 0;
        item.__collapsedSidebarDockState.velocity = 0;
      }
      item.classList.remove("is-dock-active");
      item.style.removeProperty("--sidebar-dock-scale");
      item.style.removeProperty("--sidebar-dock-icon-scale");
      item.style.removeProperty("--sidebar-dock-glyph-scale");
      item.style.removeProperty("--sidebar-dock-lift");
      item.style.removeProperty("--sidebar-dock-shadow-alpha");
      item.style.removeProperty("--sidebar-dock-shadow-y");
      item.style.removeProperty("--sidebar-dock-glow-opacity");
      item.style.removeProperty("--sidebar-dock-glow-scale");
      item.style.removeProperty("--sidebar-dock-saturation");
      item.style.removeProperty("--sidebar-dock-brightness");
      item.style.removeProperty("--sidebar-dock-z");
    }

    function applyCollapsedSidebarDockStrength(item, strength) {
      if (!item) {
        return;
      }
      if (strength <= 0.001) {
        clearCollapsedSidebarDockItem(item);
        return;
      }
      var clamped = Math.max(0, Math.min(strength, 1.08));
      var eased = 1 - Math.pow(1 - Math.min(clamped, 1), 2.35);
      var overshoot = Math.max(0, clamped - 1);
      eased += overshoot * 0.32;
      var scale = 1 + (eased * 0.38);
      var iconScale = 1 + (eased * 0.17);
      var glyphScale = 1 + (eased * 0.10);
      var lift = eased * 8.4;
      var shadowAlpha = 0.05 + (eased * 0.17);
      var glowOpacity = 0.06 + (eased * 0.44);
      var glowScale = 0.015 + (eased * 0.16);
      var saturation = eased * 0.16;
      var brightness = eased * 0.05;
      item.classList.add("is-dock-active");
      item.style.setProperty("--sidebar-dock-scale", scale.toFixed(3));
      item.style.setProperty("--sidebar-dock-icon-scale", iconScale.toFixed(3));
      item.style.setProperty("--sidebar-dock-glyph-scale", glyphScale.toFixed(3));
      item.style.setProperty("--sidebar-dock-lift", lift.toFixed(2) + "px");
      item.style.setProperty("--sidebar-dock-shadow-alpha", shadowAlpha.toFixed(3));
      item.style.setProperty("--sidebar-dock-shadow-y", (18 + eased * 18).toFixed(2) + "px");
      item.style.setProperty("--sidebar-dock-glow-opacity", glowOpacity.toFixed(3));
      item.style.setProperty("--sidebar-dock-glow-scale", glowScale.toFixed(3));
      item.style.setProperty("--sidebar-dock-saturation", saturation.toFixed(3));
      item.style.setProperty("--sidebar-dock-brightness", brightness.toFixed(3));
      item.style.setProperty("--sidebar-dock-z", String(10 + Math.round(eased * 32)));
    }

    function releaseCollapsedSidebarDock() {
      if (!sidebar) {
        return;
      }
      if (collapsedSidebarDockPendingPointer) {
        collapsedSidebarDockPendingPointer.active = false;
      } else {
        collapsedSidebarDockPendingPointer = {
          x: 0,
          y: 0,
          active: false
        };
      }
      if (collapsedSidebarDockRaf) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(function () {
          callback(Date.now());
        }, 16);
      };
      collapsedSidebarDockRaf = raf(function (frameTime) {
        updateCollapsedSidebarDock(0, 0, typeof frameTime === "number" ? frameTime : Date.now());
      });
    }

    function resetCollapsedSidebarDock() {
      if (!sidebar) {
        return;
      }
      var items = sidebar.querySelectorAll(".wn-sidebar-list > .wn-sidebar-item[data-sidebar-item], .wn-sidebar-list > .wn-sidebar-item--utility");
      for (var i = 0; i < items.length; i++) {
        clearCollapsedSidebarDockItem(items[i]);
      }
    }

    function updateCollapsedSidebarDock(pointerX, pointerY, frameTime) {
      if (!sidebar || !document.body.classList.contains("is-sidebar-collapsed") || !isDesktopSidebar()) {
        collapsedSidebarDockRaf = 0;
        collapsedSidebarDockLastFrameTime = 0;
        resetCollapsedSidebarDock();
        return;
      }
      if (collapsedSidebarDockPendingPointer) {
        pointerX = collapsedSidebarDockPendingPointer.x;
        pointerY = collapsedSidebarDockPendingPointer.y;
      }
      var pointerActive = !collapsedSidebarDockPendingPointer || collapsedSidebarDockPendingPointer.active !== false;
      var items = sidebar.querySelectorAll(".wn-sidebar-list > .wn-sidebar-item[data-sidebar-item], .wn-sidebar-list > .wn-sidebar-item--utility");
      if (!items.length) {
        collapsedSidebarDockRaf = 0;
        collapsedSidebarDockLastFrameTime = 0;
        return;
      }
      var maxDistance = 102;
      var previousFrame = collapsedSidebarDockLastFrameTime || frameTime || 0;
      var delta = frameTime && previousFrame ? (frameTime - previousFrame) : 16.667;
      if (!delta || delta < 4) {
        delta = 16.667;
      }
      delta = Math.max(8, Math.min(24, delta));
      collapsedSidebarDockLastFrameTime = frameTime || 0;
      var settleThreshold = 0.0025;
      var springStiffness = pointerActive ? 184 : 152;
      var springDamping = pointerActive ? 18.5 : 16.8;
      var stepCount = Math.max(1, Math.min(3, Math.round(delta / 8)));
      var stepDt = (delta / stepCount) / 1000;
      var anyMoving = false;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var anchor = item.querySelector(sidebarRowLinkSelector);
        if (!anchor) {
          clearCollapsedSidebarDockItem(item);
          continue;
        }
        var rect = anchor.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          clearCollapsedSidebarDockItem(item);
          continue;
        }
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var dx = pointerX - centerX;
        var dy = pointerY - centerY;
        var weightedDx = dx * 0.74;
        var distance = Math.sqrt((weightedDx * weightedDx) + (dy * dy));
        var target = 0;
        if (pointerActive && distance <= maxDistance) {
          var proximity = 1 - Math.min(distance / maxDistance, 1);
          target = Math.pow(proximity, 2.85);
        }
        if (pointerActive && item.classList.contains("is-flyout-open")) {
          var flyout = item.querySelector(sidebarChildrenSelector);
          if (flyout) {
            var flyoutRect = flyout.getBoundingClientRect();
            var laneLeft = rect.right - 10;
            var laneRight = flyoutRect.right + 18;
            var laneTop = Math.min(rect.top, flyoutRect.top) - 14;
            var laneBottom = Math.max(rect.bottom, flyoutRect.bottom) + 14;
            if (pointerX >= laneLeft && pointerX <= laneRight && pointerY >= laneTop && pointerY <= laneBottom) {
              var verticalFactor = 1 - Math.min(Math.abs(pointerY - centerY) / Math.max(rect.height * 1.9, 72), 1);
              var horizontalProgress = Math.min(Math.max((pointerX - laneLeft) / Math.max(laneRight - laneLeft, 1), 0), 1);
              var flyoutHold = 0.60 + (verticalFactor * 0.28) - (horizontalProgress * 0.08);
              target = Math.max(target, flyoutHold);
            }
          }
        }
        if (!item.__collapsedSidebarDockState) {
          item.__collapsedSidebarDockState = {
            current: 0,
            target: 0,
            velocity: 0
          };
        }
        var dockState = item.__collapsedSidebarDockState;
        dockState.target = target;
        var current = dockState.current || 0;
        var velocity = dockState.velocity || 0;
        // Use a lightly underdamped spring so the collapsed dock feels closer to the floating-dock reference.
        for (var step = 0; step < stepCount; step++) {
          var springForce = (target - current) * springStiffness;
          var dampingForce = velocity * springDamping;
          velocity += (springForce - dampingForce) * stepDt;
          current += velocity * stepDt;
        }
        if (target <= settleThreshold && current <= settleThreshold && Math.abs(velocity) <= 0.01) {
          current = 0;
          velocity = 0;
        }
        dockState.current = current;
        dockState.velocity = velocity;
        if (target > settleThreshold || current > settleThreshold || Math.abs(velocity) > 0.01) {
          anyMoving = true;
        }
        applyCollapsedSidebarDockStrength(item, current);
      }
      if (!anyMoving) {
        collapsedSidebarDockRaf = 0;
        collapsedSidebarDockLastFrameTime = 0;
        if (collapsedSidebarDockPendingPointer && collapsedSidebarDockPendingPointer.active === false) {
          collapsedSidebarDockPendingPointer = null;
        }
        resetCollapsedSidebarDock();
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(function () {
          callback(Date.now());
        }, 16);
      };
      collapsedSidebarDockRaf = raf(function (nextFrame) {
        if (!collapsedSidebarDockPendingPointer) {
          collapsedSidebarDockRaf = 0;
          collapsedSidebarDockLastFrameTime = 0;
          resetCollapsedSidebarDock();
          return;
        }
        updateCollapsedSidebarDock(
          collapsedSidebarDockPendingPointer.x,
          collapsedSidebarDockPendingPointer.y,
          typeof nextFrame === "number" ? nextFrame : Date.now()
        );
      });
    }

    function queueCollapsedSidebarDock(pointerX, pointerY) {
      collapsedSidebarDockPendingPointer = {
        x: pointerX,
        y: pointerY,
        active: true
      };
      if (collapsedSidebarDockRaf) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(function () {
          callback(Date.now());
        }, 16);
      };
      collapsedSidebarDockRaf = raf(function (frameTime) {
        if (!collapsedSidebarDockPendingPointer) {
          collapsedSidebarDockRaf = 0;
          collapsedSidebarDockLastFrameTime = 0;
          resetCollapsedSidebarDock();
          return;
        }
        updateCollapsedSidebarDock(
          collapsedSidebarDockPendingPointer.x,
          collapsedSidebarDockPendingPointer.y,
          typeof frameTime === "number" ? frameTime : Date.now()
        );
      });
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
      if (!sourcePlaceholder || /^切换到.+继续搜索热门内容$/.test(sourcePlaceholder)) {
        sourcePlaceholder = sourceType === "internal" ? "搜索本站工具、教程或网址" : "在" + sourceName + "搜索关键词或 AI 工具";
      }

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
        searchInput.setAttribute("placeholder", sourcePlaceholder || "搜索 AI 工具、教程或网址");
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

    function readMobileSearchHistory() {
      var raw = safeReadStorage(mobileSearchHistoryStorageKey);
      if (!raw) {
        return [];
      }
      try {
        var parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          return [];
        }
        var result = [];
        var seen = {};
        for (var i = 0; i < parsed.length; i++) {
          var value = normalizeFavoriteText(parsed[i]);
          var key = value.toLowerCase();
          if (value && !seen[key]) {
            seen[key] = true;
            result.push(value);
          }
          if (result.length >= 8) {
            break;
          }
        }
        return result;
      } catch (error) {
        return [];
      }
    }

    function writeMobileSearchHistory(items) {
      safeWriteStorage(mobileSearchHistoryStorageKey, JSON.stringify(items.slice(0, 8)));
    }

    function pushMobileSearchHistory(keyword) {
      var value = normalizeFavoriteText(keyword);
      if (!value) {
        return;
      }
      var history = readMobileSearchHistory();
      var next = [value];
      var valueKey = value.toLowerCase();
      for (var i = 0; i < history.length; i++) {
        if (history[i].toLowerCase() !== valueKey) {
          next.push(history[i]);
        }
        if (next.length >= 8) {
          break;
        }
      }
      writeMobileSearchHistory(next);
      renderMobileSearchHistory();
    }

    function renderMobileSearchHistory() {
      if (!mobileSearchHistory || !mobileSearchHistoryList) {
        return;
      }
      var history = readMobileSearchHistory();
      mobileSearchHistory.hidden = !history.length;
      mobileSearchHistoryList.innerHTML = "";
      for (var i = 0; i < history.length; i++) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-mobile-search-value", history[i]);
        button.textContent = history[i];
        mobileSearchHistoryList.appendChild(button);
      }
    }

    function setMobileSearchOpen(open) {
      if (!mobileSearchSheet) {
        return;
      }
      mobileSearchSheet.hidden = !open;
      document.documentElement.classList.toggle("mobile-search-open", !!open);
      document.body.classList.toggle("mobile-search-open", !!open);
      if (mobileSearchOpen) {
        mobileSearchOpen.setAttribute("aria-expanded", open ? "true" : "false");
      }
      if (open) {
        setSidebarState(false);
        renderMobileSearchHistory();
        window.setTimeout(function () {
          if (mobileSearchInput) {
            mobileSearchInput.focus();
          }
        }, 80);
      }
    }

    function submitMobileSearch(keyword) {
      var value = normalizeFavoriteText(keyword || (mobileSearchInput ? mobileSearchInput.value : ""));
      if (!value) {
        if (mobileSearchInput) {
          mobileSearchInput.focus();
        }
        return;
      }
      if (mobileSearchInput) {
        mobileSearchInput.value = value;
      }
      pushMobileSearchHistory(value);
      if (mobileSearchForm) {
        if (typeof mobileSearchForm.requestSubmit === "function") {
          mobileSearchForm.requestSubmit();
        } else {
          mobileSearchForm.submit();
        }
      }
    }

    function submitDesktopSearch(keyword) {
      var value = normalizeFavoriteText(keyword || (desktopSearchInput ? desktopSearchInput.value : ""));
      if (!value) {
        if (desktopSearchInput) {
          desktopSearchInput.focus();
        }
        return;
      }
      if (desktopSearchInput) {
        desktopSearchInput.value = value;
      }
      pushMobileSearchHistory(value);
      if (desktopSearchForm) {
        if (typeof desktopSearchForm.requestSubmit === "function") {
          desktopSearchForm.requestSubmit();
        } else {
          desktopSearchForm.submit();
        }
      }
    }

    function bindSearchKeywordGuards() {
      var forms = document.querySelectorAll(desktopSearchFormSelector + ", form.search-hub-form, [data-mobile-search-form], form#siteSearchForm");
      if (!forms.length) {
        return;
      }
      for (var i = 0; i < forms.length; i++) {
        (function (form) {
          if (!form || form.getAttribute("data-search-keyword-guard-bound") === "1") {
            return;
          }
          var input = form.querySelector('input[name="keywords"]');
          if (!input) {
            return;
          }
          form.setAttribute("data-search-keyword-guard-bound", "1");
          form.addEventListener("submit", function (event) {
            var keyword = normalizeFavoriteText(input.value || "");
            if (!keyword) {
              event.preventDefault();
              input.setAttribute("aria-invalid", "true");
              form.classList.add("is-search-empty");
              input.focus();
              if (typeof showShareToast === "function") {
                showShareToast("请输入关键词再搜索");
              }
              return;
            }
            input.value = keyword;
            input.removeAttribute("aria-invalid");
            form.classList.remove("is-search-empty");
          });
          input.addEventListener("input", function () {
            if (normalizeFavoriteText(input.value || "")) {
              input.removeAttribute("aria-invalid");
              form.classList.remove("is-search-empty");
            }
          });
        })(forms[i]);
      }
    }

    function useMobileSearchSuggestion(value, autoSubmit) {
      var keyword = normalizeFavoriteText(value);
      if (!keyword || !mobileSearchInput) {
        return;
      }
      mobileSearchInput.value = keyword;
      mobileSearchInput.focus();
      if (autoSubmit) {
        submitMobileSearch(keyword);
      }
    }

    function bindMobileSearchSheet() {
      if (!mobileSearchSheet || !mobileSearchOpen || !mobileSearchForm || !mobileSearchInput) {
        return;
      }
      if (document.body && mobileSearchSheet.parentNode !== document.body) {
        document.body.appendChild(mobileSearchSheet);
      }
      renderMobileSearchHistory();
      mobileSearchOpen.addEventListener("click", function () {
        setMobileSearchOpen(true);
      });
      for (var i = 0; i < mobileSearchCloseButtons.length; i++) {
        mobileSearchCloseButtons[i].addEventListener("click", function () {
          setMobileSearchOpen(false);
        });
      }
      mobileSearchForm.addEventListener("submit", function (event) {
        var keyword = normalizeFavoriteText(mobileSearchInput.value || "");
        if (!keyword) {
          event.preventDefault();
          mobileSearchInput.focus();
          return;
        }
        mobileSearchInput.value = keyword;
        pushMobileSearchHistory(keyword);
      });
      mobileSearchSheet.addEventListener("click", function (event) {
        var target = event.target && event.target.closest ? event.target.closest("[data-mobile-search-value]") : null;
        if (!target || !mobileSearchSheet.contains(target)) {
          return;
        }
        useMobileSearchSuggestion(target.getAttribute("data-mobile-search-value") || target.textContent || "", true);
      });
      if (mobileSearchClear) {
        mobileSearchClear.addEventListener("click", function () {
          writeMobileSearchHistory([]);
          renderMobileSearchHistory();
        });
      }
    }
    bindMobileSearchSheet();

    if (toggle && sidebar) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", function () {
        setSidebarState(!sidebar.classList.contains("is-open"));
      });
    }

    if (sidebarCollapseToggle) {
      sidebarCollapseToggle.addEventListener("click", function () {
        if (!isDesktopSidebar()) {
          if (sidebar) {
            setSidebarState(!sidebar.classList.contains("is-open"));
          }
          return;
        }
        var next = !document.body.classList.contains("is-sidebar-collapsed");
        setSidebarCollapsed(next, true);
        scheduleSideAccordionRefresh();
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
          link.getAttribute("href") &&
          !event.defaultPrevented &&
          link.getAttribute("data-sidebar-role") !== "parent"
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
      return node && node.matches && node.matches(sidebarItemSelector) ? node : null;
    }

    function collapseSiblingSideItems(currentItem) {
      if (!currentItem || !currentItem.parentNode) {
        return;
      }
      var siblings = document.querySelectorAll(sidebarBranchSelector);
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
      var toggleButton = item.querySelector(sidebarToggleSelector);
      if (!toggleButton) {
        return;
      }
      var expanded = item.classList.contains("is-expanded");
      toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
      setFastTooltip(toggleButton, expanded ? "收起子分类" : "展开子分类");
    }

    function syncAllSideNavToggleStates() {
      var sideNavItems = document.querySelectorAll(sidebarBranchSelector);
      for (var i = 0; i < sideNavItems.length; i++) {
        syncSideNavToggleState(sideNavItems[i]);
      }
    }

    function collapseSideNavItem(item) {
      if (!item || !item.classList || !item.classList.contains("has-children")) {
        return;
      }
      item.classList.remove("is-expanded");
      if (!document.querySelector(sidebarBranchSelector + ".is-expanded")) {
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
      var sideNavItems = document.querySelectorAll(sidebarBranchSelector);
      if (!sideNavItems.length) {
        return;
      }

      if (document.body.classList.contains("is-sidebar-collapsed")) {
        syncAllSideNavToggleStates();
        return;
      }

      var currentCategoryItem = findCurrentSideNavItem();
      var currentlyExpanded = document.querySelector(sidebarBranchSelector + ".is-expanded");
      if (currentlyExpanded) {
        expandSideNavItem(currentCategoryItem || currentlyExpanded, false);
        return;
      }

      var storedExpandedKey = readSideExpandedKey();
      if (storedExpandedKey === sideAccordionClosedValue) {
        if (currentCategoryItem) {
          expandSideNavItem(currentCategoryItem, false);
        }
        syncAllSideNavToggleStates();
        return;
      }
      var storedExpandedItem = findSideNavItemByKey(storedExpandedKey);
      var defaultExpandedItem = currentCategoryItem || storedExpandedItem || document.querySelector(sidebarBranchSelector + ".is-active") || sideNavItems[0];
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

    function findSidebarSubpanelTrigger(info, context) {
      if (!info || !info.typeid) {
        return null;
      }
      var prefix = context === "archive" ? "archive-section-" : "home-section-";
      var parentId = info.parentid || info.typeid;
      if (!parentId) {
        return null;
      }
      var suffix = info.role === "child" ? info.typeid : "all";
      var targetId = prefix + parentId + "-" + suffix;
      return document.querySelector('[data-subpanel-trigger="' + cssEscapeValue(targetId) + '"]');
    }

    function activateSidebarSubpanel(info, context) {
      var trigger = findSidebarSubpanelTrigger(info, context);
      var shell = trigger && trigger.closest ? trigger.closest("[data-subpanel-shell]") : null;
      var targetId = trigger ? trigger.getAttribute("data-subpanel-trigger") : "";
      if (!trigger || !shell || !targetId) {
        return false;
      }
      setSubpanel(shell, targetId);
      updateSidebarActiveState(info);
      if (info.item) {
        expandSideNavItem(info.item, true);
      }
      if (context === "archive" && info.href && window.history && window.history.pushState) {
        try {
          window.history.pushState({ sidebarTypeid: info.typeid }, "", info.href);
        } catch (error) {
        }
      }
      scrollToSidebarTarget(shell);
      return true;
    }

    function handleSidebarCategoryClick(event, link, info) {
      if (!info || info.role === "utility") {
        return false;
      }
      if (isMobileSidebar()) {
        if (info.role === "parent") {
          event.preventDefault();
          toggleSideNavItem(info.item);
          return true;
        }
        return false;
      }
      if (info.role === "parent") {
        expandSideNavItem(info.item, true);
      }
      if (document.body.classList.contains("is-home")) {
        if (activateSidebarSubpanel(info, "home")) {
          event.preventDefault();
          return true;
        }
        return false;
      }
      var current = getCurrentSidebarState();
      var sameArchiveGroup = !!(
        document.body.classList.contains("category-nav") &&
        current.channel === info.channel &&
        current.topid &&
        (info.parentid || info.typeid) === current.topid
      );
      if (sameArchiveGroup && activateSidebarSubpanel(info, "archive")) {
        event.preventDefault();
        return true;
      }
      return false;
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
          var info = getSidebarLinkInfo(this);
          if (handleSidebarCategoryClick(event, this, info)) {
            return;
          }
          if (!isMobileSidebar()) {
            expandSideNavItem(getSideNavItem(this), true);
          }
        });
      }
    }

    if (sideNavChildLinks.length) {
      for (var scl = 0; scl < sideNavChildLinks.length; scl++) {
        sideNavChildLinks[scl].addEventListener("click", function (event) {
          handleSidebarCategoryClick(event, this, getSidebarLinkInfo(this));
        });
      }
    }

    if (sidebar) {
      var sidebarFlyoutItems = sidebar.querySelectorAll(sidebarItemSelector);
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

      sidebar.addEventListener("pointermove", function (event) {
        if (!document.body.classList.contains("is-sidebar-collapsed") || !isDesktopSidebar()) {
          return;
        }
        queueCollapsedSidebarDock(event.clientX, event.clientY);
      }, { passive: true });

      sidebar.addEventListener("pointerleave", function () {
        releaseCollapsedSidebarDock();
      }, { passive: true });

      sidebar.addEventListener("focusout", function () {
        if (!sidebar.matches(":hover")) {
          releaseCollapsedSidebarDock();
        }
      }, { passive: true });
    }

    function syncTabPanelA11yState(panel, active) {
      if (!panel || !panel.setAttribute) {
        return;
      }
      if (active) {
        panel.removeAttribute("aria-hidden");
        panel.removeAttribute("inert");
      } else {
        panel.setAttribute("aria-hidden", "true");
        panel.setAttribute("inert", "");
      }
    }

    function syncScopedPanelA11yStates(root, selector) {
      if (!root || !root.querySelectorAll) {
        return;
      }
      var panels = root.querySelectorAll(selector);
      for (var i = 0; i < panels.length; i++) {
        syncTabPanelA11yState(panels[i], panels[i].classList.contains("is-active"));
      }
    }

    function isArchiveSubpanelShell(shell) {
      return !!(shell && shell.classList && shell.classList.contains("archive-section--nav"));
    }

    function isArchiveSubpanelPanel(panel) {
      return !!(panel && panel.closest && isArchiveSubpanelShell(panel.closest("[data-subpanel-shell]")));
    }

    function getArchiveShellPagebar(shell) {
      if (!isArchiveSubpanelShell(shell) || !shell.querySelector) {
        return null;
      }
      return shell.querySelector(".wf-nav-pagebar[data-wf-pagebar], [data-wf-pagebar].wf-nav-pagebar, .wf-nav-pagebar");
    }

    function resetArchivePagebarRuntimeState(pagebar) {
      if (!pagebar || !pagebar.querySelectorAll) {
        return;
      }
      pagebar.removeAttribute("data-wf-mobile-pager-ready");
      var pagination = pagebar.querySelector(".pagination");
      if (pagination) {
        pagination.removeAttribute("data-wf-mobile-pagination-built");
        pagination.removeAttribute("data-wf-mobile-compact");
      }
      var boundForms = pagebar.querySelectorAll("[data-wf-page-jump-bound]");
      for (var i = 0; i < boundForms.length; i++) {
        boundForms[i].removeAttribute("data-wf-page-jump-bound");
      }
    }

    function pagebarFromHtml(html) {
      var text = normalizeFavoriteText(html || "");
      if (!text) {
        return null;
      }
      var template = document.createElement("template");
      template.innerHTML = text;
      return template.content ? template.content.querySelector(".wf-nav-pagebar[data-wf-pagebar], [data-wf-pagebar].wf-nav-pagebar, .wf-nav-pagebar") : null;
    }

    function cacheActiveArchivePagebar(shell) {
      if (!isArchiveSubpanelShell(shell)) {
        return;
      }
      var currentPanel = shell.querySelector("[data-subpanel].is-active");
      var pagebar = getArchiveShellPagebar(shell);
      if (currentPanel && pagebar && !currentPanel._wfArchivePagebarHtml) {
        currentPanel._wfArchivePagebarHtml = pagebar.outerHTML;
      }
    }

    function applyArchivePagebarHtml(shell, html) {
      var currentPagebar = getArchiveShellPagebar(shell);
      var nextPagebar = pagebarFromHtml(html);
      if (!currentPagebar || !nextPagebar || !currentPagebar.parentNode) {
        return false;
      }
      resetArchivePagebarRuntimeState(nextPagebar);
      currentPagebar.parentNode.replaceChild(nextPagebar, currentPagebar);
      bindWfPageJump();
      enhanceMobileWfPagination();
      return true;
    }

    function restoreCachedArchivePagebar(shell, targetId) {
      if (!isArchiveSubpanelShell(shell) || !targetId) {
        return;
      }
      var panel = shell.querySelector('[data-subpanel="' + cssEscapeValue(targetId) + '"]');
      if (panel && panel._wfArchivePagebarHtml) {
        applyArchivePagebarHtml(shell, panel._wfArchivePagebarHtml);
      }
    }

    function syncArchiveSubpanelPagebarFromDocument(panel, doc) {
      if (!panel || !doc || !doc.querySelector) {
        return;
      }
      var shell = panel.closest ? panel.closest("[data-subpanel-shell]") : null;
      if (!isArchiveSubpanelShell(shell)) {
        return;
      }
      var sourcePagebar = doc.querySelector(".archive-section--nav .wf-nav-pagebar[data-wf-pagebar], .archive-section--nav [data-wf-pagebar].wf-nav-pagebar, .archive-section--nav .wf-nav-pagebar, .wf-nav-pagebar[data-wf-pagebar]");
      if (!sourcePagebar) {
        return;
      }
      panel._wfArchivePagebarHtml = sourcePagebar.outerHTML;
      if (shell.querySelector("[data-subpanel].is-active") === panel) {
        applyArchivePagebarHtml(shell, panel._wfArchivePagebarHtml);
      }
    }

    function cacheInitialArchiveSubpanelPagebars() {
      var shells = document.querySelectorAll(".archive-section--nav[data-subpanel-shell]");
      for (var i = 0; i < shells.length; i++) {
        cacheActiveArchivePagebar(shells[i]);
      }
    }

    function setDirectoryPanel(targetId) {
      if (!targetId || !directoryPanels.length || !directoryButtons.length) {
        return;
      }
      for (var p = 0; p < directoryPanels.length; p++) {
        var directoryPanel = directoryPanels[p];
        var directoryPanelActive = directoryPanel.getAttribute("data-directory-panel") === targetId;
        directoryPanel.classList.toggle("is-active", directoryPanelActive);
        syncTabPanelA11yState(directoryPanel, directoryPanelActive);
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
      cacheActiveArchivePagebar(shell);
      var triggers = shell.querySelectorAll("[data-subpanel-trigger]");
      var panelsInShell = shell.querySelectorAll("[data-subpanel]");
      var moreLink = shell.querySelector("[data-section-more]");
      for (var sp = 0; sp < panelsInShell.length; sp++) {
        var panelMatched = panelsInShell[sp].getAttribute("data-subpanel") === targetId;
        panelsInShell[sp].classList.toggle("is-active", panelMatched);
        syncTabPanelA11yState(panelsInShell[sp], panelMatched);
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
      var activeTrigger = shell.querySelector('[data-subpanel-trigger="' + cssEscapeValue(targetId) + '"]');
      var activeTypeid = activeTrigger ? normalizeSidebarId(activeTrigger.getAttribute("data-subpanel-typeid") || "") : "";
      if (activeTypeid && document.body) {
        document.body.setAttribute("data-current-typeid", activeTypeid);
        var shellParentId = normalizeSidebarId(shell.getAttribute("data-sidebar-parentid") || "");
        var shellChannel = normalizeSidebarId(shell.getAttribute("data-sidebar-channel") || "");
        if (shellParentId) {
          document.body.setAttribute("data-current-topid", shellParentId);
        }
        if (shellChannel) {
          document.body.setAttribute("data-current-channel", shellChannel);
        }
      }
      restoreCachedArchivePagebar(shell, targetId);
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

    function isHomeCategoryGrid(grid) {
      return !!(grid && grid.closest && grid.closest(".directory-browser--home"));
    }

    function getHomeToolGridRowCount(grid) {
      return isHomeCategoryGrid(grid) ? homeCategoryGridRows : homeToolGridRows;
    }

    function getSubpanelFetchLimit(panel) {
      if (!panel) {
        return 18;
      }
      var configuredLimit = parseInt(panel.getAttribute("data-subpanel-limit") || "", 10);
      if (configuredLimit > 0) {
        return isArchiveSubpanelPanel(panel) ? configuredLimit : Math.min(homeToolGridMaxItems, configuredLimit);
      }
      return panel.getAttribute("data-subpanel-type") === "download" ? 15 : 18;
    }

    function applyHomeToolGridRowLimit(grid) {
      if (!grid || !grid.classList || !grid.classList.contains("tool-grid--browser")) {
        return;
      }
      if (!grid.closest || !grid.closest(".home-recommend__group--aigc, .directory-browser--home")) {
        return;
      }
      if (!isHomeCategoryGrid(grid) && window.matchMedia && !window.matchMedia("(min-width: 961px)").matches) {
        var mobileItems = grid.children;
        for (var mobileIndex = 0; mobileIndex < mobileItems.length; mobileIndex++) {
          mobileItems[mobileIndex].classList.remove("is-home-grid-overflow");
          mobileItems[mobileIndex].removeAttribute("aria-hidden");
        }
        return;
      }
      var columns = getGridColumnCount(grid);
      var rows = getHomeToolGridRowCount(grid);
      var limit = columns > 0 ? Math.min(homeToolGridMaxItems, columns * rows) : homeToolGridMaxItems;
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

    function getSubpanelFetchUrl(panel) {
      if (!panel) {
        return "";
      }
      var panelUrl = normalizeFavoriteText(panel.getAttribute("data-subpanel-url") || "");
      if (panelUrl) {
        return panelUrl;
      }
      var panelId = panel.getAttribute("data-subpanel") || "";
      var shell = panel.closest ? panel.closest("[data-subpanel-shell]") : null;
      var trigger = shell && panelId ? shell.querySelector('[data-subpanel-trigger="' + cssEscapeValue(panelId) + '"]') : null;
      return trigger ? normalizeFavoriteText(trigger.getAttribute("data-subpanel-url") || trigger.getAttribute("href") || "") : "";
    }

    function getSubpanelApiUrl(panel) {
      if (!panel) {
        return "";
      }
      if (panel.getAttribute("data-subpanel-fetch-mode") === "page") {
        return "";
      }
      var tid = normalizeFavoriteText(panel.getAttribute("data-subpanel-tid") || "");
      if (!tid) {
        return "";
      }
      var channel = normalizeFavoriteText(panel.getAttribute("data-subpanel-channel") || (panel.getAttribute("data-subpanel-type") === "download" ? "4" : "2"));
      var region = normalizeFavoriteText(panel.getAttribute("data-subpanel-region") || "");
      var limit = getSubpanelFetchLimit(panel);
      var query = "m=home&c=Ajax&a=home_subpanel_cards&tid=" + encodeURIComponent(tid)
        + "&channel=" + encodeURIComponent(channel || "2")
        + "&limit=" + encodeURIComponent(limit)
        + "&context=home";
      if (region) {
        query += "&region=" + encodeURIComponent(region);
      }
      return "/index.php?" + query;
    }

    function extractSubpanelCardsFromDocument(doc, panelType, limit) {
      if (!doc || !doc.querySelectorAll) {
        return "";
      }
      var selector = panelType === "download" ? ".wn-download-card" : ".nav-card";
      var scope = doc.querySelector(".archive-section--nav [data-subpanel].is-active .tool-grid--archive")
        || doc.querySelector(".archive-section--nav .tool-grid--archive")
        || doc.querySelector(".wn-download-grid--archive")
        || doc.querySelector("main");
      var cards = scope ? scope.querySelectorAll(selector) : doc.querySelectorAll(selector);
      var html = "";
      var max = limit || 18;
      for (var i = 0; i < cards.length && i < max; i++) {
        html += cards[i].outerHTML;
      }
      return html;
    }

    function normalizeFetchedSubpanelHtml(htmlText) {
      var text = String(htmlText || "");
      var trimmed = text.trim();
      if (trimmed.charAt(0) === '"' && trimmed.charAt(trimmed.length - 1) === '"') {
        try {
          var parsed = JSON.parse(trimmed);
          if (typeof parsed === "string") {
            return parsed;
          }
        } catch (error) {}
      }
      return text;
    }

    function loadDirectorySubpanelFromUrl(panel, grid, loadingNode, panelType) {
      var apiUrl = getSubpanelApiUrl(panel);
      var url = apiUrl || getSubpanelFetchUrl(panel);
      if (!url || !window.fetch || !window.DOMParser) {
        panel.setAttribute("data-subpanel-loaded", "1");
        return Promise.resolve(false);
      }
      if (panel.getAttribute("data-subpanel-loading") === "1") {
        return panel._wgnSubpanelPromise || Promise.resolve(false);
      }
      panel.setAttribute("data-subpanel-loading", "1");
      if (loadingNode) {
        loadingNode.hidden = false;
      }
      panel._wgnSubpanelPromise = fetch(url, {
        credentials: "same-origin"
      }).then(function (response) {
        if (!response || !response.ok) {
          throw new Error("subpanel fetch failed");
        }
        return response.text();
      }).then(function (htmlText) {
        var html = "";
        var normalizedText = normalizeFetchedSubpanelHtml(htmlText);
        if (apiUrl) {
          try {
            var payload = JSON.parse(normalizedText);
            html = payload && payload.code ? normalizeFavoriteText(payload.html || "") : "";
          } catch (error) {}
        }
        if (!html) {
          var doc = new DOMParser().parseFromString(normalizedText, "text/html");
          html = extractSubpanelCardsFromDocument(doc, panelType, getSubpanelFetchLimit(panel));
          syncArchiveSubpanelPagebarFromDocument(panel, doc);
        }
        grid.innerHTML = html || '<div class="directory-showcase__loading">该分类内容正在整理中</div>';
        panel.setAttribute("data-subpanel-loaded", "1");
        applyHomeToolGridRowLimit(grid);
        if (panelType !== "download") {
          bindNavCardInteractions(grid.querySelectorAll(".nav-card"));
          syncFavoriteButtons();
          syncRegionWarningDirection();
        }
        try {
          panel.dispatchEvent(new CustomEvent("wgn:subpanel-loaded", { bubbles: true }));
        } catch (error) {}
        return true;
      }).catch(function () {
        var fallbackUrl = apiUrl ? getSubpanelFetchUrl(panel) : "";
        if (fallbackUrl && fallbackUrl !== url && !panel.getAttribute("data-subpanel-region")) {
          panel.removeAttribute("data-subpanel-loading");
          panel.removeAttribute("data-subpanel-tid");
          return loadDirectorySubpanelFromUrl(panel, grid, loadingNode, panelType);
        }
        grid.innerHTML = '<div class="directory-showcase__loading">加载失败，请进入分类页查看</div>';
        return false;
      }).finally(function () {
        panel.removeAttribute("data-subpanel-loading");
        panel._wgnSubpanelPromise = null;
        if (loadingNode) {
          loadingNode.hidden = true;
        }
      });
      return panel._wgnSubpanelPromise;
    }

    function hydrateDirectorySubpanel(panel) {
      if (!panel || panel.getAttribute("data-subpanel-loaded") === "1") {
        return Promise.resolve(false);
      }
      var panelType = normalizeFavoriteText(panel.getAttribute("data-subpanel-type") || "nav");
      var grid = panel.querySelector(".tool-grid--browser, .article-grid");
      var dataNode = panel.querySelector(".directory-subpanel-data");
      var loadingNode = panel.querySelector(".directory-showcase__loading");
      if (!grid) {
        panel.setAttribute("data-subpanel-loaded", "1");
        return Promise.resolve(false);
      }
      if (!dataNode) {
        return loadDirectorySubpanelFromUrl(panel, grid, loadingNode, panelType);
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
      return Promise.resolve(true);
    }

    function requestHomeIdle(callback, timeout) {
      if (window.requestIdleCallback) {
        return window.requestIdleCallback(callback, { timeout: timeout || 1800 });
      }
      return window.setTimeout(function () {
        callback({
          didTimeout: true,
          timeRemaining: function () {
            return 12;
          }
        });
      }, timeout ? Math.min(timeout, 900) : 300);
    }

    function scheduleHomeIdleAfterDelay(callback, delay, timeout) {
      return window.setTimeout(function () {
        requestHomeIdle(callback, timeout || 1800);
      }, Math.max(0, parseInt(delay, 10) || 0));
    }

    function getHomeDeferredPanelPriority(panel) {
      if (!panel) {
        return 9999;
      }
      var value = parseInt(panel.getAttribute("data-home-section-priority") || "", 10);
      if (value > 0) {
        return value;
      }
      var shell = panel.closest ? panel.closest(".directory-showcase--section") : null;
      if (!shell || !shell.parentNode) {
        return 9999;
      }
      var siblings = shell.parentNode.querySelectorAll(".directory-showcase--section");
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] === shell) {
          return i + 1;
        }
      }
      return 9999;
    }

    function isHomeDeferredPanel(panel) {
      return !!(panel && panel.closest && panel.closest(".directory-browser--home") && panel.getAttribute("data-subpanel-loaded") !== "1");
    }

    function isHomeVisibleAllPanel(panel) {
      var id = panel ? panel.getAttribute("data-subpanel") || "" : "";
      return !!(panel && panel.classList && panel.classList.contains("is-active") && /-all$/.test(id));
    }

    function getHomeDeferredReasonPriorityByName(reason) {
      if (reason === "hover" || reason === "focus" || reason === "near-view") {
        return 0;
      }
      if (reason === "initial") {
        return 1;
      }
      if (reason === "idle-all") {
        return 2;
      }
      if (reason === "idle-hidden") {
        return 3;
      }
      return 2;
    }

    function getHomeDeferredReasonPriority(panel) {
      return getHomeDeferredReasonPriorityByName(panel ? panel.getAttribute("data-home-load-reason") || "" : "");
    }

    function compareHomeDeferredPanels(left, right) {
      var leftReason = getHomeDeferredReasonPriority(left);
      var rightReason = getHomeDeferredReasonPriority(right);
      if (leftReason !== rightReason) {
        return leftReason - rightReason;
      }
      var leftAll = isHomeVisibleAllPanel(left) ? 0 : 1;
      var rightAll = isHomeVisibleAllPanel(right) ? 0 : 1;
      if (leftAll !== rightAll) {
        return leftAll - rightAll;
      }
      return getHomeDeferredPanelPriority(left) - getHomeDeferredPanelPriority(right);
    }

    function queueHomeDeferredPanel(panel, reason) {
      if (!isHomeDeferredPanel(panel) || panel.getAttribute("data-subpanel-loading") === "1") {
        return;
      }
      var nextReason = reason || "idle";
      if (homeDeferredLoadQueue.indexOf(panel) === -1) {
        panel.setAttribute("data-home-load-reason", nextReason);
        homeDeferredLoadQueue.push(panel);
      } else if (getHomeDeferredReasonPriorityByName(nextReason) < getHomeDeferredReasonPriority(panel)) {
        panel.setAttribute("data-home-load-reason", nextReason);
      }
      homeDeferredLoadQueue.sort(compareHomeDeferredPanels);
      drainHomeDeferredQueue();
    }

    function drainHomeDeferredQueue() {
      if (homeDeferredLoadRunning || !homeDeferredLoadQueue.length) {
        return;
      }
      var panel = homeDeferredLoadQueue.shift();
      if (!isHomeDeferredPanel(panel)) {
        drainHomeDeferredQueue();
        return;
      }
      homeDeferredLoadRunning = 1;
      Promise.resolve(hydrateDirectorySubpanel(panel)).catch(function () {
        return false;
      }).finally(function () {
        homeDeferredLoadRunning = 0;
        if (homeDeferredLoadQueue.length) {
          requestHomeIdle(drainHomeDeferredQueue, homeDeferredUserMoved ? 900 : 1800);
        }
      });
    }

    function getHomeDeferredAllPanels() {
      var panels = document.querySelectorAll('.directory-browser--home [data-subpanel][data-subpanel-loaded="0"]');
      var result = [];
      for (var i = 0; i < panels.length; i++) {
        if (isHomeVisibleAllPanel(panels[i])) {
          result.push(panels[i]);
        }
      }
      result.sort(compareHomeDeferredPanels);
      return result;
    }

    function warmHomeHiddenSubpanels() {
      if (getHomeDeferredAllPanels().length) {
        scheduleHomeIdleAfterDelay(warmHomeHiddenSubpanels, homeDeferredUserMoved ? 3200 : 5200, 2200);
        return;
      }
      var panels = document.querySelectorAll('.directory-browser--home [data-subpanel][data-subpanel-loaded="0"]:not(.is-active)');
      for (var i = 0; i < panels.length && homeHiddenSubpanelWarmCount < homeHiddenSubpanelWarmMax; i++) {
        if (!isHomeDeferredPanel(panels[i])) {
          continue;
        }
        homeHiddenSubpanelWarmCount += 1;
        queueHomeDeferredPanel(panels[i], "idle-hidden");
        if (homeDeferredLoadQueue.length > 4) {
          break;
        }
      }
      if (homeHiddenSubpanelWarmCount < homeHiddenSubpanelWarmMax) {
        scheduleHomeIdleAfterDelay(warmHomeHiddenSubpanels, homeDeferredUserMoved ? 3600 : 5600, 2200);
      }
    }

    function prefetchNextHomeSections(count) {
      var panels = getHomeDeferredAllPanels();
      var limit = Math.max(0, parseInt(count, 10) || 0);
      for (var i = 0; i < panels.length && i < limit; i++) {
        queueHomeDeferredPanel(panels[i], "initial");
      }
    }

    function initHomeDeferredLoading() {
      var root = document.querySelector(".directory-browser--home");
      if (!root) {
        return;
      }
      var panels = getHomeDeferredAllPanels();
      if (!panels.length) {
        return;
      }

      var markUserMoved = function () {
        homeDeferredUserMoved = true;
      };
      window.addEventListener("scroll", markUserMoved, { passive: true, once: true });
      window.addEventListener("pointerdown", markUserMoved, { passive: true, once: true });
      window.addEventListener("keydown", markUserMoved, { passive: true, once: true });

      if (window.IntersectionObserver) {
        var observer = new IntersectionObserver(function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              observer.unobserve(entries[i].target);
              queueHomeDeferredPanel(entries[i].target, "near-view");
            }
          }
        }, {
          rootMargin: "900px 0px 1200px",
          threshold: 0.01
        });
        for (var p = 0; p < panels.length; p++) {
          observer.observe(panels[p]);
        }
      }

      var afterLoad = function () {
        scheduleHomeIdleAfterDelay(function () {
          prefetchNextHomeSections(homeInitialPrefetchSections);
        }, 700, 1200);
        scheduleHomeIdleAfterDelay(function () {
          var remaining = getHomeDeferredAllPanels();
          for (var i = 0; i < remaining.length && i < 3; i++) {
            queueHomeDeferredPanel(remaining[i], "idle-all");
          }
        }, 2600, 1800);
        scheduleHomeIdleAfterDelay(warmHomeHiddenSubpanels, 12000, 2600);
      };

      if (document.readyState === "complete") {
        afterLoad();
      } else {
        window.addEventListener("load", afterLoad, { once: true });
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
        syncJolyTrackIndicator(track);
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

    function syncJolyTrackIndicator(track) {
      if (!track) {
        return;
      }
      var indicator = track.querySelector(".section-filter__indicator-joly");
      if (!indicator) {
        return;
      }
      var activeTrigger = track.querySelector("[data-home-recommend-tab].is-active, [data-home-recommend-tab][aria-pressed='true'], [data-subpanel-trigger].is-active, a.is-active, button.is-active, button[aria-pressed='true']");
      if (!activeTrigger) {
        indicator.style.setProperty("width", "0px", "important");
        indicator.style.setProperty("opacity", "0", "important");
        return;
      }
      var trackStyles = window.getComputedStyle(track);
      var paddingLeft = parseFloat(trackStyles.paddingLeft || "0") || 0;
      var offsetX = activeTrigger.offsetLeft - paddingLeft;
      indicator.style.setProperty("width", activeTrigger.offsetWidth + "px", "important");
      indicator.style.setProperty("height", activeTrigger.offsetHeight + "px", "important");
      indicator.style.setProperty("transform", "translateX(" + offsetX + "px)", "important");
      indicator.style.setProperty("opacity", "1", "important");
    }

    function syncAllJolyTrackIndicators() {
      var tracks = document.querySelectorAll(".section-filter--subtabs-joly");
      for (var si = 0; si < tracks.length; si++) {
        syncJolyTrackIndicator(tracks[si]);
      }
    }

    function syncAllSegmentedIndicators() {
      var shells = document.querySelectorAll("[data-subpanel-shell]");
      for (var i = 0; i < shells.length; i++) {
        syncScopedPanelA11yStates(shells[i], "[data-subpanel]");
        updateSegmentedIndicator(shells[i]);
      }
      syncAllJolyTrackIndicators();
    }

    cacheInitialArchiveSubpanelPagebars();

    if (subpanelTriggers.length) {
      for (var spt = 0; spt < subpanelTriggers.length; spt++) {
        subpanelTriggers[spt].addEventListener("click", function (event) {
          var target = this.getAttribute("data-subpanel-trigger");
          var shell = this.closest ? this.closest("[data-subpanel-shell]") : null;
          if (!target || !shell) {
            return;
          }
          if (isMobileSidebar() && shell.classList && shell.classList.contains("archive-section--nav")) {
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
          var target = this.getAttribute("data-subpanel-trigger");
          var panel = target ? shell.querySelector('[data-subpanel="' + cssEscapeValue(target) + '"]') : null;
          if (panel && panel.closest && panel.closest(".directory-browser--home")) {
            queueHomeDeferredPanel(panel, "hover");
          }
        });
        subpanelTriggers[spt].addEventListener("focusin", function () {
          var shell = this.closest ? this.closest("[data-subpanel-shell]") : null;
          var target = this.getAttribute("data-subpanel-trigger");
          var panel = shell && target ? shell.querySelector('[data-subpanel="' + cssEscapeValue(target) + '"]') : null;
          if (panel && panel.closest && panel.closest(".directory-browser--home")) {
            queueHomeDeferredPanel(panel, "focus");
          }
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
    initHomeDeferredLoading();

    function closeDropdowns(exceptId) {
      for (var d = 0; d < dropdownTriggers.length; d++) {
        var trigger = dropdownTriggers[d];
        var targetId = trigger.getAttribute("data-dropdown-trigger");
        var panel = targetId ? document.getElementById(targetId) : null;
        var open = targetId === exceptId;
        trigger.classList.toggle("is-open", open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
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
      if (floatPanel && floatPanel.classList.contains("is-open") && !floatPanel.classList.contains("site-float__qr-popover")) {
        active = true;
      }
      document.body.classList.toggle("is-ui-overlay-open", active);
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

    function openTopbarCategoryMenu(menu) {
      cancelTopbarCategoryClose();
      if (!menu || !isDesktopSidebar()) {
        return;
      }
      closeTopbarCategoryMenus(menu);
      setTopbarCategoryMenuOpen(menu, true);
    }

    function scheduleTopbarCategoryClose(menu) {
      cancelTopbarCategoryClose();
      topbarCategoryCloseTimer = window.setTimeout(function () {
        if (!menu || menu.matches(":hover") || menu.contains(document.activeElement)) {
          return;
        }
        setTopbarCategoryMenuOpen(menu, false);
      }, 560);
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
              } else {
                closeTopbarCategoryMenus();
              }
            });
            trigger.addEventListener("mouseenter", function () {
              openTopbarCategoryMenu(menu);
            });
            trigger.addEventListener("focus", function () {
              openTopbarCategoryMenu(menu);
            });
          }
          if (panel) {
            panel.addEventListener("mouseenter", function () {
              openTopbarCategoryMenu(menu);
            });
            panel.addEventListener("mouseleave", function () {
              scheduleTopbarCategoryClose(menu);
            });
            panel.addEventListener("click", function (event) {
              event.stopPropagation();
            });
          }
          menu.addEventListener("mouseenter", function () {
            openTopbarCategoryMenu(menu);
          });
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
          var internalUrl = searchSourceUrl.value || "/index.php?m=home&c=Search&a=lists";
          var separator = internalUrl.indexOf("?") >= 0 ? "&" : "?";
          window.location.href = internalUrl + separator + "keywords=" + encodeURIComponent(keyword);
          return;
        }
        if (searchSourceType.value === "external") {
          event.preventDefault();
          var targetUrl = searchSourceUrl.value || "";
          if (targetUrl.indexOf("{q}") >= 0) {
            window.open(targetUrl.replace(/\{q\}/g, encodeURIComponent(keyword)), "_blank", "noopener,noreferrer");
          } else if (targetUrl) {
            window.open(targetUrl, "_blank", "noopener,noreferrer");
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

    (function bindRankingMatrixInteractions() {
      var matrix = document.querySelector(".ranking-page--matrix");
      if (!matrix) {
        return;
      }
      var tabs = Array.prototype.slice.call(matrix.querySelectorAll(".ranking-page__tab[href^='#']"));
      var panels = Array.prototype.slice.call(matrix.querySelectorAll(".ranking-page__panel[id]"));
      if (!tabs.length || !panels.length) {
        return;
      }
      var tabsWrap = matrix.querySelector(".ranking-page__shell");
      var tabsBox = matrix.querySelector(".ranking-page__tabs");
      var tabsStartTop = 0;
      var activeId = "";
      var syncTabsGeometry = function () {
        if (!tabsBox) {
          return;
        }
        var wasStuck = tabsBox.classList.contains("is-stuck");
        if (wasStuck) {
          tabsBox.classList.remove("is-stuck");
        }
        var rect = tabsBox.getBoundingClientRect();
        tabsStartTop = rect.top + window.pageYOffset;
        tabsBox.style.setProperty("--ranking-tabs-left", rect.left + "px");
        tabsBox.style.setProperty("--ranking-tabs-width", rect.width + "px");
        if (wasStuck) {
          tabsBox.classList.add("is-stuck");
        }
      };
      var updateTabsStuck = function () {
        if (!tabsBox || !tabsWrap) {
          return;
        }
        var offset = window.matchMedia("(max-width: 820px)").matches ? 56 : 66;
        var stuck = window.pageYOffset > tabsStartTop - offset;
        tabsBox.classList.toggle("is-stuck", stuck);
        tabsWrap.classList.toggle("is-tabs-stuck", stuck);
      };
      var setActive = function (id) {
        if (!id || activeId === id) {
          return;
        }
        activeId = id;
        tabs.forEach(function (tab) {
          var isActive = tab.getAttribute("href") === "#" + id;
          tab.classList.toggle("is-active", isActive);
          tab.setAttribute("aria-current", isActive ? "true" : "false");
        });
        panels.forEach(function (panel) {
          panel.classList.toggle("is-inview", panel.id === id);
        });
      };
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function (event) {
          var targetId = (tab.getAttribute("href") || "").replace(/^#/, "");
          var panel = targetId ? document.getElementById(targetId) : null;
          if (!panel) {
            return;
          }
          event.preventDefault();
          setActive(targetId);
          var topbarOffset = window.matchMedia("(max-width: 820px)").matches ? 112 : 132;
          var targetTop = panel.getBoundingClientRect().top + window.pageYOffset - topbarOffset;
          window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
          try {
            history.replaceState(null, "", "#" + targetId);
          } catch (error) {}
        });
      });
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          var best = null;
          entries.forEach(function (entry) {
            if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
              best = entry;
            }
          });
          if (best && best.target && best.target.id) {
            setActive(best.target.id);
          }
        }, { rootMargin: "-32% 0px -58% 0px", threshold: [0.08, 0.2, 0.38] });
        panels.forEach(function (panel) { observer.observe(panel); });
      }
      syncTabsGeometry();
      updateTabsStuck();
      window.addEventListener("scroll", updateTabsStuck, { passive: true });
      window.addEventListener("resize", function () {
        syncTabsGeometry();
        updateTabsStuck();
      });
      setActive((location.hash || "").replace(/^#/, "") || panels[0].id);
    })();

    (function bindRankingDetailAsideAutoFill() {
      var detailPage = document.querySelector(".ranking-page--detail");
      if (!detailPage || window.innerWidth <= 760) {
        return;
      }
      var mainCard = detailPage.querySelector(".ranking-detail__main-card");
      var aside = detailPage.querySelector(".ranking-detail__aside");
      var hotCard = detailPage.querySelector(".ranking-hot");
      var hotList = detailPage.querySelector(".ranking-hot__list");
      var noteCard = detailPage.querySelector(".ranking-detail__note");
      if (!mainCard || !aside || !hotCard || !hotList || !noteCard) {
        return;
      }

      function syncAsideFill() {
        if (window.innerWidth <= 760) {
          hotList.style.removeProperty("max-height");
          hotList.style.removeProperty("overflow");
          var mobileItems = hotList.querySelectorAll(".ranking-hot__item.is-aside-hidden");
          for (var mobileIndex = 0; mobileIndex < mobileItems.length; mobileIndex++) {
            mobileItems[mobileIndex].classList.remove("is-aside-hidden");
          }
          return;
        }

        var hotItems = Array.prototype.slice.call(hotList.querySelectorAll(".ranking-hot__item"));
        if (!hotItems.length) {
          return;
        }

        hotItems.forEach(function (item) {
          item.classList.remove("is-aside-hidden");
        });

        hotList.style.removeProperty("max-height");
        hotList.style.removeProperty("overflow");

        var mainHeight = Math.round(mainCard.getBoundingClientRect().height || 0);
        var asideGap = 16;
        var noteHeight = Math.round(noteCard.getBoundingClientRect().height || 0);
        var hotHead = hotCard.querySelector("h2");
        var hotHeadHeight = hotHead ? Math.round(hotHead.getBoundingClientRect().height || 0) : 0;
        var hotPaddingTop = 18;
        var availableHeight = mainHeight - noteHeight - asideGap - hotPaddingTop - hotHeadHeight;
        if (availableHeight <= 0) {
          return;
        }

        var visibleCount = hotItems.length;
        for (var index = 0; index < hotItems.length; index++) {
          var itemTop = hotItems[index].offsetTop || 0;
          var itemBottom = itemTop + (hotItems[index].offsetHeight || 0);
          if (itemBottom > availableHeight) {
            visibleCount = Math.max(1, index);
            break;
          }
        }

        hotItems.forEach(function (item, index) {
          item.classList.toggle("is-aside-hidden", index >= visibleCount);
        });
      }

      var syncTimer = 0;
      function queueAsideSync() {
        window.clearTimeout(syncTimer);
        syncTimer = window.setTimeout(syncAsideFill, 60);
      }

      syncAsideFill();
      window.addEventListener("load", queueAsideSync);
      window.addEventListener("resize", queueAsideSync);
      window.addEventListener("aiph:article-layout-change", queueAsideSync);
    })();

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

    if (siteFloat && siteFloatCollapse) {
      try {
        setSiteFloatCollapsed(window.localStorage.getItem(siteFloatCollapsedStorageKey) === "1", false);
      } catch (error) {
        setSiteFloatCollapsed(false, false);
      }
      siteFloatCollapse.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        setSiteFloatCollapsed(!siteFloat.classList.contains("is-collapsed"), true);
      });
    }

    if (backToTop) {
      setBackToTopVisible(false);
      backToTop.addEventListener("click", function (event) {
        if (backToTop.disabled) {
          event.preventDefault();
          return;
        }
        scrollPageToTop();
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
      var maxSlots = Math.max(homeCustomMinSlotCount, source.length);
      for (var i = 0; i < maxSlots; i++) {
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
      for (var i = 0; i < slots.length; i++) {
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
      var maxSlots = Math.max(homeCustomMinSlotCount, Array.isArray(slots) ? slots.length : 0);
      for (var i = 0; i < maxSlots; i++) {
        if (!slots[i]) {
          return i;
        }
      }
      return maxSlots;
    }

    function findNextEmptyCustomSlotFrom(slots, startIndex) {
      var start = parseInt(startIndex, 10);
      if (!isFinite(start) || start < 0) {
        start = 0;
      }
      var maxSlots = Math.max(homeCustomMinSlotCount, Array.isArray(slots) ? slots.length : 0, start + 1);
      for (var i = start; i < maxSlots; i++) {
        if (!slots[i]) {
          return i;
        }
      }
      return maxSlots;
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
      var store = readBehaviorStore();
      var slots = normalizeCustomCardSlots(store.customCardSlots, store.customCards);
      for (var i = 0; i < slots.length; i++) {
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
      var displayCount = Math.max(homeCustomMinSlotCount, slots.length);

      for (var slotIndex = 0; slotIndex < displayCount; slotIndex++) {
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
      var maxSlots = Math.max(homeCustomMinSlotCount, normalizedItems.length);
      for (var i = 0; i < maxSlots; i++) {
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
      for (var i = 0; i < slots.length; i++) {
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
      for (var i = 0; i < slots.length; i++) {
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
      for (var s = 0; s < slots.length; s++) {
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
      for (var s = 0; s < slots.length; s++) {
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

    function normalizeLocalFavoriteUrl(value) {
      var url = normalizeFavoriteText(value);
      if (!url || !/^(?:(?:https?):)?\/\//i.test(url)) {
        return url;
      }
      try {
        var parsed = new URL(url.indexOf("//") === 0 ? window.location.protocol + url : url, window.location.href);
        var currentHost = normalizeFavoriteText(window.location.hostname || "").toLowerCase();
        var parsedHost = normalizeFavoriteText(parsed.hostname || "").toLowerCase();
        if (
          parsedHost === currentHost ||
          parsedHost === "127.0.0.1" ||
          parsedHost === "localhost"
        ) {
          return (parsed.pathname || "/") + (parsed.search || "") + (parsed.hash || "");
        }
      } catch (error) {
        return url;
      }
      return url;
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
        value.indexOf("//") === 0
      ) {
        return normalizeLocalFavoriteUrl(value);
      }
      if (
        value.indexOf("./") === 0 ||
        value.indexOf("../") === 0 ||
        value.charAt(0) === "/" ||
        value.charAt(0) === "#" ||
        value.charAt(0) === "?"
      ) {
        return value;
      }
      if (/^(https?|mailto|tel):/i.test(value)) {
        return normalizeLocalFavoriteUrl(value);
      }
      if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i.test(value)) {
        return "https://" + value;
      }
      return "";
    }

    function deriveFavoriteTitleFromUrl(url) {
      var value = sanitizeFavoriteUrl(url);
      if (!value) {
        return "";
      }
      try {
        var parsed = new URL(value, window.location.href);
        var host = normalizeFavoriteText(parsed.hostname || "").replace(/^www\./i, "");
        var currentHost = normalizeFavoriteText(window.location.hostname || "").replace(/^www\./i, "");
        if (host && host !== currentHost) {
          return host;
        }
        var pathParts = normalizeFavoriteText(parsed.pathname || "").replace(/^\/+|\/+$/g, "").split("/");
        var lastPart = pathParts.length ? pathParts[pathParts.length - 1] : "";
        if (lastPart) {
          return decodeURIComponent(lastPart).replace(/[-_]+/g, " ");
        }
        return host || currentHost || "";
      } catch (error) {
        return value.replace(/^https?:\/\//i, "").replace(/[/?#].*$/, "");
      }
    }

    function isPlaceholderDirectUrl(url) {
      var value = sanitizeFavoriteUrl(url);
      if (!value) {
        return false;
      }
      return /^https?:\/\/(?:www\.)?example\.com\/go\/tool-\d+\/?(?:[?#].*)?$/i.test(value)
        || /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/(?:index\.php|go\/tool-)/i.test(value);
    }

    function sanitizeDirectUrl(url) {
      var value = sanitizeFavoriteUrl(url);
      return isPlaceholderDirectUrl(value) ? "" : value;
    }

    function isDetailFallbackDirectUrl(url, detailUrl) {
      var value = sanitizeFavoriteUrl(url);
      var detail = sanitizeFavoriteUrl(detailUrl);
      if (!value) {
        return true;
      }
      if (detail && value === detail) {
        return true;
      }
      return /^\/index\.php\?m=home&c=View&a=index&aid=/i.test(value)
        || /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/index\.php\?m=home&c=View&a=index&aid=/i.test(value);
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
      var directCandidateUrl = sanitizeDirectUrl(item.directUrl || item.link || "");
      var hasDirectUrl = !isDetailFallbackDirectUrl(directCandidateUrl, detailUrl);
      var directUrl = hasDirectUrl ? directCandidateUrl : "";
      var desc = normalizeFavoriteText(item.desc || item.description);
      var subtitle = normalizeFavoriteText(item.subtitle || item.subTitle || item.sub_title || "");
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
        badge = isOverseas ? "国外" : "常用";
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
        hasDirectUrl: hasDirectUrl,
        desc: desc,
        subtitle: subtitle,
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
      return '<img src="' + escapeHtml(getFavoriteLogoUrl(item)) + '" alt="' + escapeHtml(item.title) + '" width="48" height="48" loading="lazy" decoding="async" data-fallback-logo="' + (item && item.logo ? "0" : "1") + '" />';
    }

    function handleImageFallback(event) {
      var target = event && event.target;
      if (!target || !target.tagName || target.tagName.toLowerCase() !== "img") {
        return;
      }
      if (target.getAttribute("data-fallback-applied") === "1") {
        return;
      }
      var articleFallbackUrl = "/template/pc/skin/wogaosuni/image/article-thumb-fallback.webp";
      var isArticleThumb = target.closest && target.closest(".wf-article-card__media, .article-card__media, .zib-like-hot-post__media");
      target.setAttribute("data-fallback-applied", "1");
      target.src = isArticleThumb ? articleFallbackUrl : siteLogoFallbackUrl;
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
        subtitle: card.getAttribute("data-favorite-subtitle") || "",
        logo: card.getAttribute("data-favorite-logo") || "",
        logoText: card.getAttribute("data-favorite-logo-text") || "",
        isOverseas: card.getAttribute("data-favorite-overseas") === "1",
        badge: normalizeFavoriteFlag(card.getAttribute("data-favorite-overseas")) ? "国外" : "",
        contentType: card.getAttribute("data-content-type") || "nav"
      });
    }

    function getDownloadCardFavoriteData(card) {
      if (!card) {
        return null;
      }
      var link = card.querySelector(".wn-download-card__link");
      var titleNode = card.querySelector(".wn-download-card__name strong");
      var categoryNode = card.querySelector(".wn-download-card__name em");
      var descNode = card.querySelector(".wn-download-card__desc");
      var logoNode = card.querySelector(".wn-download-card__icon img");
      var detailUrl = link ? link.getAttribute("href") : "";
      var title = normalizeFavoriteText(titleNode ? titleNode.textContent : "");
      return normalizeQuickFavoriteItem({
        id: "download|" + sanitizeFavoriteUrl(detailUrl),
        title: title,
        detailUrl: detailUrl,
        directUrl: detailUrl,
        desc: descNode ? descNode.textContent : "",
        subtitle: descNode ? descNode.textContent : "",
        logo: logoNode ? logoNode.getAttribute("src") : "",
        logoText: title,
        badge: normalizeFavoriteText(categoryNode ? categoryNode.textContent : "下载"),
        contentType: "download"
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
        subtitle: node.getAttribute("data-favorite-subtitle") || "",
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
        siteQrBox.innerHTML = '<img src="' + escapeHtml(buildQrImageUrl(qrUrl)) + '" alt="手机扫码访问" width="160" height="160" loading="lazy" decoding="async" referrerpolicy="no-referrer" />';
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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(value).catch(function () {
          return fallbackCopyTextToClipboard(value);
        });
      }
      return fallbackCopyTextToClipboard(value);
    }

    function fallbackCopyTextToClipboard(text) {
      return new Promise(function (resolve, reject) {
        var input = document.createElement("textarea");
        input.value = text || window.location.href;
        input.setAttribute("readonly", "readonly");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        input.style.top = "0";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus();
        input.select();
        input.setSelectionRange(0, input.value.length);
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
      if (singleShareButton.hasAttribute("data-wf-share")) {
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

    function bindDownloadPasswordCopy() {
      document.addEventListener("click", function (event) {
        var copyButton = event.target && event.target.closest ? event.target.closest("[data-download-copy]") : null;
        if (!copyButton) {
          return;
        }
        var value = copyButton.getAttribute("data-download-copy") || "";
        var labelName = copyButton.getAttribute("data-download-copy-label") || "密码";
        var label = copyButton.querySelector("[data-download-copy-text]") || copyButton.querySelector("em") || copyButton.querySelector("strong");
        var oldText = label ? label.textContent : copyButton.textContent;
        event.preventDefault();
        event.stopPropagation();
        copyTextToClipboard(value).then(function () {
          if (label) {
            label.textContent = "已复制";
          } else {
            copyButton.textContent = "已复制";
          }
          copyButton.classList.add("is-copied");
          showShareToast(labelName + "已复制");
          window.clearTimeout(copyButton._downloadCopyTimer);
          copyButton._downloadCopyTimer = window.setTimeout(function () {
            if (label) {
              label.textContent = oldText || "密码";
            } else {
              copyButton.textContent = oldText || "密码";
            }
            copyButton.classList.remove("is-copied");
          }, 1400);
        }).catch(function () {
          showShareToast("复制失败，请手动复制");
        });
      });
    }

    function bindGenericCopyActions() {
      document.addEventListener("click", function (event) {
        var copyButton = event.target && event.target.closest ? event.target.closest("[data-copy-value]") : null;
        if (!copyButton) {
          return;
        }
        var value = copyButton.getAttribute("data-copy-value") || "";
        var labelName = copyButton.getAttribute("data-copy-label") || "内容";
        var oldText = copyButton.textContent;
        if (!value) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        copyTextToClipboard(value).then(function () {
          copyButton.textContent = "已复制";
          copyButton.classList.add("is-copied");
          showShareToast(labelName + "已复制");
          window.clearTimeout(copyButton._genericCopyTimer);
          copyButton._genericCopyTimer = window.setTimeout(function () {
            copyButton.textContent = oldText || "复制";
            copyButton.classList.remove("is-copied");
          }, 1400);
        }).catch(function () {
          showShareToast("复制失败，请手动复制");
        });
      });
    }

    function bindEyouDownloadButtons() {
      document.addEventListener("click", function (event) {
        var button = event.target && event.target.closest ? event.target.closest("[data-ey-download-file]") : null;
        if (!button) {
          return;
        }
        var fileId = parseInt(button.getAttribute("data-ey-download-file") || "", 10);
        if (!fileId) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (typeof window.ey_1563185380 === "function") {
          window.ey_1563185380(fileId);
          return;
        }
        var fallback = document.getElementById("ey_file_list_" + fileId);
        if (fallback && fallback.value) {
          window.location.href = fallback.value;
        }
      });
    }

    function syncDownloadCardButtonWidths() {
      var cards = document.querySelectorAll(".wf-entry-action-card--download");
      if (!cards || !cards.length) {
        return;
      }
      for (var cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        var card = cards[cardIndex];
        var copyButtons = card.querySelectorAll(".wf-entry-action-card__button--copy");
        card.style.removeProperty("--wf-download-copy-width");
        if (!copyButtons.length) {
          continue;
        }
        var maxCopyWidth = 0;
        for (var buttonIndex = 0; buttonIndex < copyButtons.length; buttonIndex++) {
          var copyButton = copyButtons[buttonIndex];
          var copyWidth = Math.ceil(copyButton.getBoundingClientRect().width || 0);
          if (copyWidth > maxCopyWidth) {
            maxCopyWidth = copyWidth;
          }
        }
        if (maxCopyWidth > 0) {
          card.style.setProperty("--wf-download-copy-width", maxCopyWidth + "px");
        }
      }
    }

    function bindDownloadHistoryModal() {
      var activeModal = null;
      var activeTrigger = null;

      function setModalOpen(modal, open, trigger) {
        if (!modal) {
          return;
        }
        if (open) {
          if (activeModal && activeModal !== modal) {
            setModalOpen(activeModal, false);
          }
          if (modal.parentNode !== document.body) {
            document.body.appendChild(modal);
          }
          activeModal = modal;
          activeTrigger = trigger || null;
          modal.removeAttribute("hidden");
          document.body.classList.add("is-download-history-modal-open");
          window.setTimeout(function () {
            var closeButton = modal.querySelector("[data-download-history-close]:not(.wf-download-history-modal__backdrop)");
            if (closeButton && closeButton.focus) {
              closeButton.focus();
            }
          }, 0);
        } else {
          modal.setAttribute("hidden", "");
          if (activeModal === modal) {
            activeModal = null;
            document.body.classList.remove("is-download-history-modal-open");
            if (activeTrigger && activeTrigger.focus) {
              activeTrigger.focus();
            }
            activeTrigger = null;
          }
        }
      }

      document.addEventListener("click", function (event) {
        var openButton = event.target && event.target.closest ? event.target.closest("[data-download-history-open]") : null;
        if (openButton) {
          var modalId = openButton.getAttribute("data-download-history-open") || openButton.getAttribute("aria-controls") || "";
          var modal = modalId ? document.getElementById(modalId) : null;
          if (modal) {
            event.preventDefault();
            event.stopPropagation();
            setModalOpen(modal, true, openButton);
          }
          return;
        }

        var closeButton = event.target && event.target.closest ? event.target.closest("[data-download-history-close]") : null;
        if (closeButton) {
          var closeModal = closeButton.closest ? closeButton.closest(".wf-download-history-modal") : activeModal;
          if (closeModal) {
            event.preventDefault();
            event.stopPropagation();
            setModalOpen(closeModal, false);
          }
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && activeModal) {
          event.preventDefault();
          setModalOpen(activeModal, false);
        }
      });
    }

    function bindDownloadInlineHistory() {
      document.addEventListener("click", function (event) {
        var toggle = event.target && event.target.closest ? event.target.closest("[data-download-history-inline-toggle]") : null;
        if (!toggle) {
          return;
        }
        var container = toggle.closest ? toggle.closest("[data-download-history-inline]") : null;
        if (!container) {
          return;
        }
        event.preventDefault();
        var open = !container.classList.contains("is-expanded");
        container.classList.toggle("is-expanded", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        var label = toggle.querySelector("[data-download-history-inline-toggle-text]") || toggle;
        label.textContent = open ? "收起历史版本" : "展开历史版本";
      });
    }

    function bindToolDetailShareCopy() {
      document.addEventListener("click", function (event) {
        var shareButton = event.target && event.target.closest ? event.target.closest("[data-tool-detail-share]") : null;
        if (!shareButton) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        var card = shareButton.closest ? shareButton.closest("[data-tool-article-page], .aiph-single--tool-article") : null;
        var shareUrl = "";
        if (card) {
          shareUrl = card.getAttribute("data-favorite-detail") || "";
        }
        if (!shareUrl) {
          shareUrl = window.location.origin + window.location.pathname;
        }
        if (shareUrl && shareUrl.charAt(0) === "/") {
          shareUrl = window.location.origin + shareUrl;
        }
        copyTextToClipboard(shareUrl).then(function () {
          showShareToast("复制网址分享");
        }).catch(function () {
          showShareToast("复制失败，请手动复制");
        });
      });
    }

    function getCleanCurrentUrl() {
      return window.location.origin + window.location.pathname;
    }

    function syncFeedbackPayload() {
      if (!feedbackModal || !feedbackText) {
        return;
      }
      var selectedButton = feedbackModal.querySelector("[data-feedback-type].is-active");
      var type = normalizeFavoriteText((feedbackSelectedType && feedbackSelectedType.value) || (selectedButton ? selectedButton.getAttribute("data-feedback-type") : "") || "官网打不开");
      var priority = /违规|侵权/.test(type) ? "高" : "普通";
      var aid = normalizeFavoriteText(feedbackModal.getAttribute("data-feedback-aid") || "");
      var directUrl = normalizeFavoriteText(feedbackModal.getAttribute("data-feedback-direct-url") || "");
      var category = normalizeFavoriteText(feedbackModal.getAttribute("data-feedback-category") || "");
      var title = normalizeFavoriteText((feedbackPageTitle && feedbackPageTitle.value) || feedbackModal.getAttribute("data-feedback-title") || document.title || "");
      var url = normalizeFavoriteText((feedbackPageUrl && feedbackPageUrl.value) || getCleanCurrentUrl());
      var note = normalizeFavoriteText(feedbackNote ? feedbackNote.value : "");
      feedbackText.value = "【" + type + "】\n优先级：" + priority + "\n内容ID：" + (aid || "无") + "\n所属分类：" + (category || "无") + "\n页面标题：" + title + "\n页面网址：" + url + "\n官网链接：" + (directUrl || "无") + "\n备注：" + (note || "无");
    }

    function prepareFeedbackModal() {
      if (!feedbackModal) {
        return;
      }
      if (feedbackPageTitle && !normalizeFavoriteText(feedbackPageTitle.value || "")) {
        feedbackPageTitle.value = normalizeFavoriteText(feedbackModal.getAttribute("data-feedback-title") || document.title || "");
      }
      if (feedbackPageUrl) {
        feedbackPageUrl.value = getCleanCurrentUrl();
      }
      syncFeedbackPayload();
    }

    function getFeedbackStorageKey() {
      if (!feedbackModal) {
        return feedbackSubmitStoragePrefix + "global";
      }
      return feedbackSubmitStoragePrefix + (feedbackModal.getAttribute("data-feedback-aid") || getCleanCurrentUrl());
    }

    function getFeedbackSubmitRemainingSeconds() {
      var lastTime = 0;
      try {
        lastTime = parseInt(window.localStorage.getItem(getFeedbackStorageKey()) || "0", 10) || 0;
      } catch (error) {
        lastTime = 0;
      }
      var elapsed = Date.now() - lastTime;
      return elapsed > 0 && elapsed < 60000 ? Math.ceil((60000 - elapsed) / 1000) : 0;
    }

    function updateFeedbackSubmitState() {
      var remaining = getFeedbackSubmitRemainingSeconds();
      if (feedbackSubmitButton) {
        feedbackSubmitButton.disabled = remaining > 0;
        feedbackSubmitButton.textContent = remaining > 0 ? "请 " + remaining + " 秒后再提交" : "提交反馈";
      }
      if (feedbackSubmitHint) {
        feedbackSubmitHint.textContent = remaining > 0 ? "为避免重复提交，同一网址 60 秒内只能提交一次。" : "不填联系方式也可以提交；页面标题和网址会自动带上。";
      }
      return remaining;
    }

    function setFeedbackModal(open) {
      if (!feedbackModal) {
        return;
      }
      if (open) {
        prepareFeedbackModal();
        updateFeedbackSubmitState();
      }
      feedbackModal.hidden = !open;
      document.documentElement.classList.toggle("aiph-feedback-open", !!open);
      document.body.classList.toggle("aiph-feedback-open", !!open);
      if (open && feedbackNote) {
        feedbackNote.focus();
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
          if (feedbackSelectedType) {
            feedbackSelectedType.value = normalizeFavoriteText(this.getAttribute("data-feedback-type") || this.textContent || "官网打不开");
          }
          syncFeedbackPayload();
          if (feedbackNote) {
            feedbackNote.focus();
          }
        });
      }
      if (feedbackNote) {
        feedbackNote.addEventListener("input", syncFeedbackPayload);
      }
      if (feedbackForm && feedbackText) {
        feedbackForm.addEventListener("submit", function (event) {
          syncFeedbackPayload();
          if (updateFeedbackSubmitState() > 0) {
            event.preventDefault();
            return;
          }
          var value = normalizeFavoriteText(feedbackText.value || "");
          if (value.length < 4) {
            event.preventDefault();
            if (feedbackNote) {
              feedbackNote.focus();
            }
            return;
          }
          try {
            window.localStorage.setItem(getFeedbackStorageKey(), String(Date.now()));
          } catch (error) {}
          updateFeedbackSubmitState();
          showShareToast("反馈已提交，感谢补充");
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
          button.setAttribute("data-card-tip", active ? "取消收藏" : "收藏到首页自定义");
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
        singleFavoriteToggle.setAttribute("aria-label", singleActive ? "已加入首页自定义网址，再次点击可取消" : "点击可加入首页自定义网址");
        setFastTooltip(singleFavoriteToggle, singleActive ? "已加入首页自定义网址，再次点击可取消" : "点击可加入首页自定义网址");
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

    function buildCustomShortcutMobileNavCard(item, options) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      if (!normalizedItem || isArticleLikeFavoriteItem(normalizedItem)) {
        return "";
      }
      var settings = options && typeof options === "object" ? options : {};
      var cardDirectUrl = normalizedItem.directUrl || "";
      var cardDetailUrl = normalizedItem.detailUrl || cardDirectUrl;
      var cardHref = cardDirectUrl || cardDetailUrl;
      var logoUrl = getFavoriteLogoUrl(normalizedItem);
      var logoHtml = '<img src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" width="48" height="48" loading="lazy" decoding="async" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var descriptionText = normalizeFavoriteText(settings.desc || normalizedItem.subtitle || normalizedItem.desc || "点击直达网址");
      var hoverText = normalizeFavoriteText(normalizedItem.desc || settings.desc || normalizedItem.subtitle || "");
      if (!hoverText || hoverText === normalizeFavoriteText(normalizedItem.title)) {
        hoverText = "点击直达网址";
      }
      return ''
        + '<article class="nav-card nav-card--chip-visual home-mini-shortcut-card home-mini-shortcut-card--mobile-nav"'
        +   ' data-custom-shortcut-id="' + escapeHtml(normalizedItem.id) + '"'
        +   ' data-favorite-id="' + escapeHtml(normalizedItem.id) + '"'
        +   ' data-favorite-title="' + escapeHtml(normalizedItem.title) + '"'
        +   ' data-favorite-detail="' + escapeHtml(cardDetailUrl) + '"'
        +   ' data-favorite-direct="' + escapeHtml(cardDirectUrl || cardDetailUrl) + '"'
        +   ' data-favorite-desc="' + escapeHtml(normalizedItem.desc || "") + '"'
        +   ' data-favorite-subtitle="' + escapeHtml(normalizedItem.subtitle || "") + '"'
        +   ' data-favorite-logo="' + escapeHtml(normalizedItem.logo || "") + '"'
        +   ' data-favorite-logo-text="' + escapeHtml(normalizedItem.logoText || "") + '"'
        +   ' data-favorite-overseas="' + (normalizedItem.isOverseas ? "1" : "0") + '"'
        +   ' data-favorite-badge="' + escapeHtml(normalizedItem.badge || "常用网址") + '"'
        +   ' data-content-type="nav"'
        +   ' data-card-tip="' + escapeHtml(hoverText) + '">'
        +   '<a class="nav-card__mainlink" href="' + escapeHtml(cardHref) + '" aria-label="访问' + escapeHtml(normalizedItem.title) + '"></a>'
        +   '<div class="nav-card__head">'
        +     '<div class="nav-card__logo" aria-hidden="true">' + logoHtml + '</div>'
        +     '<div class="nav-card__content">'
        +       '<div class="nav-card__title"><div class="nav-card__title-row"><h3>' + escapeHtml(normalizedItem.title) + '</h3></div></div>'
        +       '<div class="nav-card__body"><p class="nav-card__desc">' + escapeHtml(descriptionText) + '</p></div>'
        +     '</div>'
        +   '</div>'
        + '</article>';
    }

    function getCompactMobileFavoriteDesc(item, fallbackText) {
      var normalizedItem = normalizeQuickFavoriteItem(item);
      var fallback = normalizeFavoriteText(fallbackText || "点击直达网址") || "点击直达网址";
      if (!normalizedItem) {
        return fallback;
      }
      var subtitle = normalizeFavoriteText(normalizedItem.subtitle || "");
      var subtitleLength = subtitle ? subtitle.replace(/\s+/g, "").length : 0;
      if (subtitle && subtitleLength > 0 && subtitleLength <= 8) {
        return subtitle;
      }
      return fallback;
    }

    function buildCustomShortcutSlotAddCard(slotIndex) {
      var index = parseInt(slotIndex, 10) || 0;
      return ''
        + '<button class="custom-shortcut-slot-add" type="button" data-custom-shortcut-slot-add="' + escapeHtml(index) + '" aria-label="添加到第' + escapeHtml(index + 1) + '个自定义位置">'
        +   '<span aria-hidden="true">+</span>'
        + '</button>';
    }

    function buildCustomShortcutMobileAddCard(slotIndex, withCopy) {
      var index = parseInt(slotIndex, 10) || 0;
      var label = "\u6dfb\u52a0\u5de5\u5177";
      return ''
        + '<button class="custom-shortcut-mobile-add' + (withCopy ? ' custom-shortcut-mobile-add--with-copy' : '') + '" type="button" data-custom-shortcut-slot-add="' + escapeHtml(index) + '" data-custom-shortcut-mobile-add="1" aria-label="' + escapeHtml(label) + '">'
        +   '<span class="custom-shortcut-mobile-add__icon" aria-hidden="true">+</span>'
        +   (withCopy ? '<span class="custom-shortcut-mobile-add__copy">' + escapeHtml(label) + '</span>' : '')
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
      var logoHtml = '<img src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" width="48" height="48" loading="lazy" decoding="async" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var cardDirectUrl = normalizedItem.directUrl || "";
      var cardDetailUrl = normalizedItem.detailUrl || cardDirectUrl;
      var cardHref = cardDirectUrl || cardDetailUrl;
      var cardTargetAttrs = settings.sameTabDirectOpen ? '' : (cardDirectUrl && /^https?:\/\//i.test(cardDirectUrl) ? ' target="_blank" rel="nofollow noopener noreferrer"' : '');
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
        +     ' data-favorite-subtitle="' + escapeHtml(normalizedItem.subtitle || "") + '"'
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
      var directUrl = normalizedItem.hasDirectUrl ? normalizedItem.directUrl : "";
      var regionLabel = normalizeFavoriteText(settings.regionLabel || "国外");
      var regionWarning = normalizeFavoriteText(settings.regionWarning || "国外网站可能无法直接访问");
      var navLogoUrl = getFavoriteLogoUrl(normalizedItem);
      var logoHtml = '<img src="' + escapeHtml(navLogoUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" width="48" height="48" loading="lazy" decoding="async" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var ghostLogoHtml = '<img src="' + escapeHtml(navLogoUrl) + '" alt="" width="48" height="48" loading="lazy" decoding="async" data-fallback-logo="' + (normalizedItem.logo ? "0" : "1") + '" />';
      var subtitleText = escapeHtml(normalizedItem.subtitle || settings.subtitle || normalizedItem.desc || settings.desc || "点击查看详情");
      var descriptionText = escapeHtml(normalizedItem.desc || settings.desc || normalizedItem.subtitle || settings.subtitle || "点击查看详情");
      var badgeAttribute = badgeText ? escapeHtml(badgeText) : "";

      var ghostClipClass = 'nav-card__watermark-clip nav-card__watermark-clip--image';

      return ''
        + '<article class="nav-card nav-card--chip-visual"'
        +   ' data-favorite-id="' + escapeHtml(normalizedItem.id) + '"'
        +   ' data-favorite-title="' + escapeHtml(normalizedItem.title) + '"'
        +   ' data-favorite-detail="' + escapeHtml(normalizedItem.detailUrl || directUrl) + '"'
        +   ' data-favorite-direct="' + escapeHtml(directUrl || normalizedItem.detailUrl) + '"'
        +   ' data-favorite-desc="' + escapeHtml(normalizedItem.desc || "") + '"'
        +   ' data-favorite-subtitle="' + escapeHtml(normalizedItem.subtitle || "") + '"'
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
        +       '<div class="nav-card__body"><p class="nav-card__desc">' + subtitleText + '</p></div>'
        +     '</div>'
        +     '</div>'
        +   '<div class="nav-card__tooltip"><div class="nav-card__tooltip-arrow"></div><div class="nav-card__tooltip-body">' + descriptionText + '</div></div>'
        +   (directUrl ? '<a class="nav-card__badge-anchor nav-card__badge-anchor--direct" href="' + escapeHtml(directUrl) + '" target="_blank" rel="nofollow noopener noreferrer" aria-label="' + escapeHtml(directLabel + normalizedItem.title) + '" data-card-tip="直达官网">'
        +     '<span class="nav-card__badge-chip nav-card__badge-chip--direct" aria-hidden="true">↗</span>'
        +   '</a>' : '')
        +   '<button class="nav-card__favorite" type="button" data-favorite-toggle aria-pressed="false" aria-label="收藏' + escapeHtml(normalizedItem.title) + '" data-card-tip="收藏到首页自定义">'
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
      var articleFallbackUrl = "/template/pc/skin/wogaosuni/image/article-thumb-fallback.webp";
      var coverHtml = coverUrl
        ? '<img src="' + escapeHtml(coverUrl) + '" alt="' + escapeHtml(normalizedItem.title) + '" width="430" height="240" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + articleFallbackUrl + '\';" />'
        : '<img src="' + articleFallbackUrl + '" alt="' + escapeHtml(normalizedItem.title) + '" width="430" height="240" loading="lazy" decoding="async" />';

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
      var descText = normalizeFavoriteText(settings.desc || normalizedItem.subtitle || normalizedItem.desc || "点击查看详情");
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
        +     ' data-favorite-subtitle="' + escapeHtml(normalizedItem.subtitle || "") + '"'
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

    function excludeRecommendItems(items, excludeGroups) {
      var source = Array.isArray(items) ? items : [];
      var groups = Array.isArray(excludeGroups) ? excludeGroups : [];
      var excluded = {};
      for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
        var group = Array.isArray(groups[groupIndex]) ? groups[groupIndex] : [];
        for (var itemIndex = 0; itemIndex < group.length; itemIndex++) {
          var excludeItem = normalizeQuickFavoriteItem(group[itemIndex] && group[itemIndex].item ? group[itemIndex].item : group[itemIndex]);
          if (!excludeItem) {
            continue;
          }
          excluded[String(excludeItem.id)] = true;
          if (excludeItem._identity) {
            excluded[excludeItem._identity] = true;
          }
        }
      }

      var result = [];
      var seen = {};
      for (var sourceIndex = 0; sourceIndex < source.length; sourceIndex++) {
        var item = normalizeQuickFavoriteItem(source[sourceIndex] && source[sourceIndex].item ? source[sourceIndex].item : source[sourceIndex]);
        if (!item || isArticleLikeFavoriteItem(item)) {
          continue;
        }
        var idKey = String(item.id);
        var identityKey = item._identity || "";
        if (excluded[idKey] || (identityKey && excluded[identityKey]) || seen[idKey] || (identityKey && seen[identityKey])) {
          continue;
        }
        seen[idKey] = true;
        if (identityKey) {
          seen[identityKey] = true;
        }
        delete item._identity;
        result.push(item);
      }
      return result;
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
      var compactMobileLayout = window.matchMedia && window.matchMedia("(max-width: 960px)").matches;
      if (compactMobileLayout) {
        var compactCards = [];
        var compactFirstEmptySlot = -1;
        for (var compactIndex = 0; compactIndex < customSlots.length; compactIndex++) {
          if (customSlots[compactIndex]) {
            compactCards.push(customSlots[compactIndex]);
          } else if (compactFirstEmptySlot < 0) {
            compactFirstEmptySlot = compactIndex;
          }
          if (compactCards.length >= 6) {
            break;
          }
        }
        if (compactFirstEmptySlot < 0) {
          compactFirstEmptySlot = findFirstEmptyCustomSlot(customSlots);
        }
        if (compactFirstEmptySlot < 0) {
          compactFirstEmptySlot = compactCards.length;
        }
        if (!compactCards.length) {
          homeRecommendCustomGrid.classList.remove("is-empty");
          homeRecommendCustomGrid.classList.remove("has-slot-placeholders");
          homeRecommendCustomGrid.classList.add("custom-shortcut-grid--mobile-nav");
          homeRecommendCustomGrid.innerHTML = buildCustomShortcutMobileAddCard(compactFirstEmptySlot, true) + buildCustomShortcutMobileAddCard(findNextEmptyCustomSlotFrom(customSlots, compactFirstEmptySlot + 1), false);
          if (homeRecommendCustomEmpty) {
            homeRecommendCustomEmpty.hidden = true;
          }
          return;
        }
        homeRecommendCustomGrid.classList.remove("is-empty");
        homeRecommendCustomGrid.classList.remove("has-slot-placeholders");
        homeRecommendCustomGrid.classList.add("custom-shortcut-grid--mobile-nav");
        if (homeRecommendCustomEmpty) {
          homeRecommendCustomEmpty.hidden = true;
        }
        var compactHtml = "";
        for (var compactCardIndex = 0; compactCardIndex < compactCards.length; compactCardIndex++) {
          var compactCard = compactCards[compactCardIndex];
          compactHtml += buildCustomShortcutCard(compactCard, {
            meta: getCompactMobileFavoriteDesc(compactCard, "点击直达网址"),
            badgeIndex: compactCardIndex,
            removable: true,
            variant: "mobile"
          });
        }
        if (compactCards.length % 2 !== 0) {
          compactHtml += buildCustomShortcutMobileAddCard(compactFirstEmptySlot, true);
          compactFirstEmptySlot = findNextEmptyCustomSlotFrom(customSlots, compactFirstEmptySlot + 1);
        }
        compactHtml += buildCustomShortcutMobileAddCard(compactFirstEmptySlot, compactCards.length % 2 === 0);
        compactHtml += buildCustomShortcutMobileAddCard(findNextEmptyCustomSlotFrom(customSlots, compactFirstEmptySlot + 1), false);
        homeRecommendCustomGrid.innerHTML = compactHtml;
        hydrateFastTooltips(homeRecommendCustomGrid);
        return;
      }
      homeRecommendCustomGrid.classList.remove("custom-shortcut-grid--mobile-nav");
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
      for (var visibleIndex = customSlots.length - 1; visibleIndex >= 0; visibleIndex--) {
        if (customSlots[visibleIndex]) {
          lastVisibleIndex = visibleIndex;
          break;
        }
      }
      if (introSlotIndex >= 0) {
        lastVisibleIndex = Math.max(lastVisibleIndex, introSlotIndex);
      }
      var visibleSlotCount = Math.max(homeCustomMinSlotCount, Math.ceil((lastVisibleIndex + 1) / homeCustomSlotColumns) * homeCustomSlotColumns);
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
      var compactMobileLayout = window.matchMedia && window.matchMedia("(max-width: 960px)").matches;
      if (!recentItems.length) {
        homeRecommendRecentGrid.classList.remove("custom-shortcut-grid--mobile-nav", "home-recommend__recent-grid--mobile-nav");
        homeRecommendRecentGrid.innerHTML = "";
        if (homeRecommendRecentEmpty) {
          homeRecommendRecentEmpty.hidden = false;
        }
        return;
      }
      if (homeRecommendRecentEmpty) {
        homeRecommendRecentEmpty.hidden = true;
      }
      if (compactMobileLayout) {
        homeRecommendRecentGrid.classList.add("custom-shortcut-grid--mobile-nav", "home-recommend__recent-grid--mobile-nav");
        var compactHtml = "";
        var compactLimit = Math.min(recentItems.length, 6);
        for (var compactIndex = 0; compactIndex < compactLimit; compactIndex++) {
          var recentEntry = recentItems[compactIndex] || {};
          var recentItem = recentEntry.item ? recentEntry.item : recentEntry;
          compactHtml += buildCustomShortcutCard(recentItem, {
            meta: normalizeFavoriteText(
              compactIndex === 0
                ? "刚刚使用"
                : (formatBehaviorTime(recentEntry.timestamp) || "最近使用")
            ),
            badgeIndex: compactIndex,
            removable: false,
            variant: "recent"
          });
        }
        homeRecommendRecentGrid.innerHTML = compactHtml;
        hydrateFastTooltips(homeRecommendRecentGrid);
        return;
      }
      homeRecommendRecentGrid.classList.remove("custom-shortcut-grid--mobile-nav", "home-recommend__recent-grid--mobile-nav");
      var html = "";
      for (var i = 0; i < recentItems.length; i++) {
        var recentItem = recentItems[i] && recentItems[i].item ? recentItems[i].item : recentItems[i];
        html += buildCustomShortcutCard(recentItem, {
          meta: i === 0 ? "刚刚使用" : (formatBehaviorTime(recentItems[i].timestamp) || "最近使用"),
          badgeIndex: i,
          removable: false,
          variant: "recent"
        });
      }
      homeRecommendRecentGrid.innerHTML = html;
      hydrateFastTooltips(homeRecommendRecentGrid);
    }

    function renderHomeRecommendMonthlyHot() {
      var hotItems = excludeRecommendItems(readJsonScript(homeHotFallbackData), [
        readJsonScript(homeRecommendPinnedData),
        readJsonScript(homeRecommendLatestData)
      ]);
      if (!hotItems.length) {
        hotItems = excludeRecommendItems(readJsonScript(rankingPageFallbackData), [
          readJsonScript(homeRecommendPinnedData),
          readJsonScript(homeRecommendLatestData)
        ]);
      }
      renderRecommendCollection(homeRecommendMonthlyHotGrid, homeRecommendMonthlyHotEmpty, hotItems, function (item, index) {
        return {
          mode: "nav",
          badge: index === 0 ? "全站热门" : (item.badge || "热门工具"),
          desc: item.desc || "按全站点击量排序展示，点击量不足时随机补充工具"
        };
      });
    }

    function syncHomeCustomMobileToolbar() {
      if (!homeRecommend || !window.matchMedia || !window.matchMedia("(max-width: 760px)").matches) {
        return;
      }
      var group = homeRecommend.querySelector(".home-recommend__group--user");
      var filterbar = group ? group.querySelector(".directory-showcase__filterbar") : null;
      var tabs = filterbar ? filterbar.querySelector(".home-recommend__tabs") : null;
      var actions = filterbar ? filterbar.querySelector(".home-recommend__group-actions") : null;
      if (!filterbar || !tabs || !actions) {
        return;
      }
      filterbar.style.setProperty("display", "grid", "important");
      filterbar.style.setProperty("grid-template-columns", "minmax(0, 1fr) 100px", "important");
      filterbar.style.setProperty("align-items", "center", "important");
      filterbar.style.setProperty("gap", "8px", "important");
      filterbar.style.setProperty("width", "100%", "important");
      filterbar.style.setProperty("max-width", "100%", "important");
      filterbar.style.setProperty("min-width", "0", "important");
      filterbar.style.setProperty("margin", "0 0 4px", "important");
      filterbar.style.setProperty("padding", "0", "important");
      filterbar.style.setProperty("overflow", "visible", "important");

      tabs.style.setProperty("display", "inline-flex", "important");
      tabs.style.setProperty("justify-self", "start", "important");
      tabs.style.setProperty("align-self", "center", "important");
      tabs.style.setProperty("width", "202px", "important");
      tabs.style.setProperty("max-width", "100%", "important");
      tabs.style.setProperty("min-width", "0", "important");
      tabs.style.setProperty("margin", "0", "important");

      actions.style.setProperty("display", "inline-flex", "important");
      actions.style.setProperty("align-items", "center", "important");
      actions.style.setProperty("justify-content", "flex-end", "important");
      actions.style.setProperty("justify-self", "end", "important");
      actions.style.setProperty("gap", "8px", "important");
      actions.style.setProperty("width", "100px", "important");
      actions.style.setProperty("min-width", "0", "important");
      actions.style.setProperty("margin", "0", "important");
      actions.style.setProperty("position", "static", "important");
      actions.style.setProperty("white-space", "nowrap", "important");
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
        var panelActive = panel.getAttribute("data-home-recommend-panel") === targetId;
        panel.classList.toggle("is-active", panelActive);
        syncTabPanelA11yState(panel, panelActive);
      }
      var activeTrack = document.querySelector("[data-home-recommend-group='" + group + "'] .section-filter--subtabs-joly");
      if (activeTrack) {
        updateTrackHover(activeTrack, null);
        syncJolyTrackIndicator(activeTrack);
      }
      scheduleHomeToolGridRowLimits(document);
      syncHomeCustomMobileToolbar();
    }

    function renderHomeRecommendAll() {
      if (!homeRecommend) {
        return;
      }
      renderHomeRecommendCustom();
      renderHomeRecommendRecent();
      renderHomeRecommendMonthlyHot();
      syncScopedPanelA11yStates(homeRecommend, "[data-home-recommend-panel]");
      applyHomeToolGridRowLimits(document);
      syncFavoriteButtons();
      syncRegionWarningDirection();
      hydrateFastTooltips(homeRecommend);
      syncHomeCustomMobileToolbar();
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
      var directUrl = item.hasDirectUrl ? item.directUrl : "";
      var detailUrl = item.detailUrl || directUrl;
      var rankingLogoUrl = getFavoriteLogoUrl(item);
      var logoHtml = '<img src="' + escapeHtml(rankingLogoUrl) + '" alt="' + escapeHtml(item.title) + '" width="28" height="28" loading="lazy" decoding="async" data-fallback-logo="' + (item.logo ? "0" : "1") + '" />';
      return ''
        + '<article class="ranking-page__item"'
        +   ' data-content-type="nav"'
        +   ' data-favorite-id="' + escapeHtml(item.id) + '"'
        +   ' data-favorite-title="' + escapeHtml(item.title) + '"'
        +   ' data-favorite-detail="' + escapeHtml(detailUrl) + '"'
        +   ' data-favorite-direct="' + escapeHtml(directUrl || detailUrl) + '"'
        +   ' data-favorite-desc="' + escapeHtml(item.desc || "") + '"'
        +   ' data-favorite-subtitle="' + escapeHtml(item.subtitle || "") + '"'
        +   ' data-favorite-logo="' + escapeHtml(item.logo || "") + '"'
        +   ' data-favorite-logo-text="' + escapeHtml(item.logoText || "") + '"'
        +   ' data-favorite-overseas="' + (item.isOverseas ? "1" : "0") + '">'
        +   '<em class="ranking-page__rank">' + escapeHtml(index + 1) + '</em>'
        +   '<a class="ranking-page__main" href="' + escapeHtml(detailUrl) + '">'
        +     '<span class="ranking-page__logo">' + logoHtml + '</span>'
        +     '<span class="ranking-page__copy"><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.desc || "点击查看详情") + '</small></span>'
        +   '</a>'
        +   '<span class="ranking-page__metric"><strong>' + escapeHtml(metricValue) + '</strong><small>' + escapeHtml(metricLabel || "点击") + '</small></span>'
        +   (directUrl ? '<a class="ranking-page__direct" href="' + escapeHtml(directUrl) + '" target="_blank" rel="nofollow noopener noreferrer" aria-label="直达' + escapeHtml(item.title) + '"></a>' : '<a class="ranking-page__direct ranking-page__direct--detail" href="' + escapeHtml(detailUrl) + '" aria-label="查看' + escapeHtml(item.title) + '"></a>')
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
        +   ' data-favorite-subtitle="' + escapeHtml(item.subtitle || "") + '"'
        +   ' data-favorite-logo="' + escapeHtml(item.logo || "") + '"'
        +   ' data-favorite-logo-text="' + escapeHtml(item.logoText || "") + '"'
        +   ' data-favorite-overseas="' + (item.isOverseas ? "1" : "0") + '">'
        +   '<a class="sites-body" href="' + escapeHtml(item.detailUrl || item.directUrl) + '" title="' + escapeHtml(item.title) + '">'
        +     '<div class="item-header">'
        +       '<div class="item-media">'
        +         '<div class="blur-img-bg" style="background-image:url(' + escapeHtml(logoUrl) + ');"></div>'
        +         '<div class="item-image"><img class="fill-cover sites-icon" src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(item.title) + '" width="48" height="48" loading="lazy" decoding="async" data-fallback-logo="' + (item.logo ? "0" : "1") + '" /></div>'
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
      var detail = document.querySelector(".aiph-single--tool, .aiph-single--tool-article, [data-tool-article-page]");
      if (!detail) {
        return null;
      }
      var titleNode = detail.querySelector("h1");
      var directNode = detail.querySelector(".aiph-open-btn[href], [data-tool-direct-link]");
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
      if (!quickFavoritesAddPanel) {
        return;
      }
      var targetParent = document.body;
      if (quickFavoritesAddPanel.parentNode !== targetParent) {
        targetParent.appendChild(quickFavoritesAddPanel);
      }
    }

    function isCompactQuickFavoritesSheet() {
      return !!(window.matchMedia && window.matchMedia("(max-width: 760px)").matches);
    }

    function setCustomShortcutPickerOpen(open) {
      if (!customShortcutPickerBody || !customShortcutPickerToggle) {
        return;
      }
      var compact = isCompactQuickFavoritesSheet();
      var nextOpen = compact ? !!open : true;
      customShortcutPickerBody.hidden = compact ? !nextOpen : false;
      customShortcutPickerToggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      customShortcutPickerToggle.textContent = nextOpen ? "收起站内卡片" : "展开站内卡片";
      if (!compact) {
        customShortcutPickerToggle.hidden = true;
      } else {
        customShortcutPickerToggle.hidden = false;
      }
    }

    function setCustomShortcutEntryMode(mode) {
      var nextMode = mode === "manual" ? "manual" : "picker";
      customShortcutActiveMode = nextMode;
      if (customShortcutEntryMode) {
        var buttons = customShortcutEntryMode.querySelectorAll("[data-custom-shortcut-mode]");
        for (var i = 0; i < buttons.length; i++) {
          var active = buttons[i].getAttribute("data-custom-shortcut-mode") === nextMode;
          buttons[i].classList.toggle("is-active", active);
          buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
        }
      }
      if (quickFavoritesAddPanel) {
        quickFavoritesAddPanel.classList.toggle("is-manual-mode", nextMode === "manual");
      }
      if (nextMode === "manual") {
        setCustomShortcutPickerOpen(false);
        if (!isCompactQuickFavoritesSheet()) {
          window.setTimeout(function () {
            if (quickFavoritesAddTitle) {
              quickFavoritesAddTitle.focus();
              quickFavoritesAddTitle.select();
            }
          }, 0);
        }
      } else {
        setCustomShortcutPickerOpen(true);
      }
    }

    function setQuickFavoritesAddPanel(open) {
      if (!quickFavoritesAddPanel) {
        return;
      }
      var compact = isCompactQuickFavoritesSheet();
      window.clearTimeout(customShortcutClearConfirmTimer);
      if (quickFavoritesAddClearAll) {
        quickFavoritesAddClearAll.classList.remove("is-confirming");
        quickFavoritesAddClearAll.textContent = "一键清空";
      }
      if (open) {
        ensureQuickFavoritesAddPanelLayer();
        if (quickFavoritesAddPanelHost) {
          quickFavoritesAddPanelHost.hidden = false;
          quickFavoritesAddPanelHost.classList.toggle("is-open", compact);
        }
        if (customShortcutPickerSearch) {
          customShortcutPickerSearch.value = "";
        }
        if (customShortcutCategoryFilter) {
          customShortcutCategoryFilter.value = "";
        }
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
        setCustomShortcutEntryMode("picker");
        renderCustomShortcutPicker();
        if (quickFavoritesAddPanel.scrollTo) {
          quickFavoritesAddPanel.scrollTo(0, 0);
        } else {
          quickFavoritesAddPanel.scrollTop = 0;
        }
        if (customShortcutPickerList) {
          customShortcutPickerList.scrollTop = 0;
        }
        if (quickFavorites) {
          quickFavorites.classList.add("is-adding");
        }
        if (quickFavoritesAdd) {
          quickFavoritesAdd.setAttribute("aria-expanded", "true");
        }
        document.body.classList.toggle("is-custom-shortcut-modal-open", !compact);
        if (!compact) {
          window.setTimeout(function () {
            if (quickFavoritesAddTitle) {
              quickFavoritesAddTitle.focus();
              quickFavoritesAddTitle.select();
            }
          }, 30);
        }
      } else {
        quickFavoritesAddPanel.hidden = true;
        customShortcutPendingSlotIndex = -1;
        setCustomShortcutEntryMode("picker");
        if (quickFavoritesAddPanelHost) {
          quickFavoritesAddPanelHost.classList.remove("is-open");
          quickFavoritesAddPanelHost.hidden = true;
        }
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
      customShortcutPendingSlotIndex = isFinite(parsedSlotIndex) && parsedSlotIndex >= 0 ? parsedSlotIndex : -1;
      var compact = isCompactQuickFavoritesSheet();
      var preservedScrollY = compact ? (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) : 0;
      if (!compact && homeRecommend && homeRecommend.scrollIntoView) {
        window.setTimeout(function () {
          homeRecommend.scrollIntoView({
            block: "start",
            behavior: "smooth"
          });
        }, 20);
      }
      setQuickFavoritesAddPanel(true);
      if (compact && window.scrollTo) {
        if (quickFavoritesAdd && document.activeElement === quickFavoritesAdd) {
          quickFavoritesAdd.blur();
        }
        window.scrollTo(0, preservedScrollY);
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(function () {
            window.scrollTo(0, preservedScrollY);
          });
        }
        window.setTimeout(function () {
          window.scrollTo(0, preservedScrollY);
        }, 0);
        window.setTimeout(function () {
          window.scrollTo(0, preservedScrollY);
        }, 80);
        window.setTimeout(function () {
          window.scrollTo(0, preservedScrollY);
        }, 240);
      }
    }

    function clearHomeCustomShortcuts(clearFavorites) {
      var store = readBehaviorStore();
      store.customCards = [];
      store.customCardSlots = [];
      if (clearFavorites) {
        store.favorites = [];
      }
      store.customFavoritesLinked = true;
      writeBehaviorStore(store, clearFavorites ? "custom-cards-and-favorites-clear" : "custom-cards-clear");
      renderQuickFavorites();
      renderHomeRecommendCustom();
      syncFavoriteButtons(store.favorites);
    }

    function submitQuickFavoriteForm() {
      var candidate = getCurrentPageFavoriteCandidate();
      var rawUrl = quickFavoritesAddUrl ? quickFavoritesAddUrl.value : "";
      var url = sanitizeFavoriteUrl(rawUrl);
      var title = normalizeFavoriteText(quickFavoritesAddTitle ? quickFavoritesAddTitle.value : "");
      if (!title && candidate) {
        title = getFavoriteShortName(candidate) || normalizeFavoriteText(candidate.title);
      }
      if (!title && url) {
        title = deriveFavoriteTitleFromUrl(url);
      }
      if (!url) {
        if (quickFavoritesAddUrl) {
          quickFavoritesAddUrl.focus();
        }
        return;
      }
      if (!title) {
        title = url.replace(/^https?:\/\//i, "").replace(/[/?#].*$/, "");
      }
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
      setCustomShortcutEntryMode("picker");
      setQuickFavoritesAddPanel(false);
    }

    function readCustomShortcutPickerItems() {
      var result = [];
      var seen = {};
      var nonNavCategoryPattern = /下载|教程资讯|教程|资讯|文章|新闻|合作|提交|排行|榜单|标签|商务|广告|友链|公告|指南|关于/;
      var nonNavUrlPattern = /\/(?:ai-)?download(?:\/|\.html|$)|\/ai-guides-news\/|\/business\/|\/submit-tool\/|\/ranking\/|\/tags(?:\/|$)/i;

      function shouldIncludeCustomShortcutPickerItem(rawItem, category, sourceNode) {
        if (sourceNode) {
          if (sourceNode.classList && sourceNode.classList.contains("wn-download-card")) {
            return false;
          }
          var nodeContentType = normalizeFavoriteText(sourceNode.getAttribute ? sourceNode.getAttribute("data-content-type") : "");
          if (nodeContentType && nodeContentType !== "nav") {
            return false;
          }
        }
        var rawContentType = normalizeFavoriteText(rawItem.contentType || rawItem.type || rawItem.kind || "");
        if (/^(article|post|news|download)$/i.test(rawContentType)) {
          return false;
        }
        var categoryText = normalizeFavoriteText(category || rawItem.category || rawItem.categoryName || rawItem.cate || rawItem.topic || "");
        var sourceText = [
          categoryText,
          rawContentType,
          normalizeFavoriteText(rawItem.badge || ""),
          normalizeFavoriteText(rawItem.id || ""),
          normalizeFavoriteText(rawItem.detailUrl || rawItem.url || rawItem.href || ""),
          normalizeFavoriteText(rawItem.directUrl || rawItem.link || "")
        ].join(" ");
        return !nonNavCategoryPattern.test(sourceText) && !nonNavUrlPattern.test(sourceText);
      }

      function addItem(item, category, sourceNode) {
        if (!item || !shouldIncludeCustomShortcutPickerItem(item, category, sourceNode)) {
          return;
        }
        var normalized = normalizeQuickFavoriteItem(item);
        if (!normalized || !normalized.id || normalized.contentType !== "nav" || isArticleLikeFavoriteItem(normalized) || seen[normalized.id]) {
          return;
        }
        normalized.category = normalizeFavoriteText(category || item.category || "推荐");
        seen[normalized.id] = true;
        result.push(normalized);
      }

      function addJsonItems(node, category, maxItems) {
        var items = readJsonScript(node);
        var limit = parseInt(maxItems, 10) || items.length;
        for (var j = 0; j < items.length && j < limit; j++) {
          addItem(items[j], category || items[j].category || items[j].categoryName || "推荐", null);
        }
      }

      var sections = document.querySelectorAll(".directory-browser--home .directory-showcase--section");
      for (var s = 0; s < sections.length && result.length < 640; s++) {
        var sectionTitleNode = sections[s].querySelector(".directory-showcase__copy h2");
        var sectionTitle = normalizeFavoriteText(sectionTitleNode ? sectionTitleNode.textContent : "分类");
        var sectionCards = sections[s].querySelectorAll(".directory-showcase__panel[data-subpanel-type=\"nav\"] .nav-card[data-content-type=\"nav\"]");
        for (var sc = 0; sc < sectionCards.length && sc < 36 && result.length < 640; sc++) {
          addItem(getCardFavoriteData(sectionCards[sc]), sectionTitle, sectionCards[sc]);
        }
      }

      var cards = document.querySelectorAll(".home-recommend__tool-grid .nav-card");
      for (var i = 0; i < cards.length; i++) {
        var section = cards[i].closest ? cards[i].closest(".directory-showcase--section, .home-recommend__group") : null;
        var categoryNode = section ? section.querySelector(".directory-showcase__copy h2") : null;
        addItem(getCardFavoriteData(cards[i]), normalizeFavoriteText(categoryNode ? categoryNode.textContent : "推荐"), cards[i]);
        if (result.length >= 640) {
          break;
        }
      }

      addJsonItems(homeRecommendPinnedData, "精选工具", 80);
      addJsonItems(homeRecommendLatestData, "最新收录", 80);
      addJsonItems(homeHotFallbackData, "热门工具", 80);
      addJsonItems(rankingPageFallbackData, "热门工具", 80);
      addJsonItems(quickFavoritesDefaults, "常用网址", 80);

      for (var ds = 0; ds < sections.length && result.length < 640; ds++) {
        var dataSectionTitleNode = sections[ds].querySelector(".directory-showcase__copy h2");
        var dataSectionTitle = normalizeFavoriteText(dataSectionTitleNode ? dataSectionTitleNode.textContent : "分类");
        var panels = sections[ds].querySelectorAll('.directory-showcase__panel[data-subpanel-type="nav"]');
        for (var p = 0; p < panels.length && result.length < 640; p++) {
          var dataNode = panels[p].querySelector(".directory-subpanel-data");
          var items = dataNode ? readJsonScript(dataNode) : [];
          for (var it = 0; it < items.length && result.length < 640; it++) {
            addItem(items[it], dataSectionTitle, null);
          }
        }
      }
      return result;
    }

    function buildCustomShortcutPickerItem(item) {
      var logoHtml = item.logo
        ? '<img src="' + escapeHtml(item.logo) + '" alt="" width="32" height="32" loading="lazy" decoding="async" />'
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
      var keyword = customShortcutPickerSearch ? normalizeFavoriteText(customShortcutPickerSearch.value).toLowerCase() : "";
      var html = "";
      var categories = {};
      var categoryNames = [];
      for (var i = 0; i < customShortcutPickerItems.length; i++) {
        var item = customShortcutPickerItems[i];
        var itemCategory = item.category || "推荐";
        if (!categories[itemCategory]) {
          categories[itemCategory] = true;
          categoryNames.push(itemCategory);
        }
        if (category && item.category !== category) {
          continue;
        }
        if (keyword) {
          var haystack = [
            item.title,
            item.category,
            item.desc,
            item.badge,
            item.detailUrl,
            item.directUrl
          ].join(" ").toLowerCase();
          if (haystack.indexOf(keyword) < 0) {
            continue;
          }
        }
        html += buildCustomShortcutPickerItem(item);
      }
      customShortcutPickerList.innerHTML = html || '<p class="custom-shortcut-picker__empty">' + (keyword ? '没有找到匹配卡片，换个关键词试试' : '当前分类暂无可选卡片') + '</p>';
      if (customShortcutCategoryFilter) {
        var previousValue = customShortcutCategoryFilter.value;
        var options = '<option value="">全部分类</option>';
        categoryNames.sort(function (a, b) {
          return a.localeCompare(b, "zh-Hans-CN");
        });
        for (var c = 0; c < categoryNames.length; c++) {
          options += '<option value="' + escapeHtml(categoryNames[c]) + '">' + escapeHtml(categoryNames[c]) + '</option>';
        }
        customShortcutCategoryFilter.innerHTML = options;
        if (previousValue && categories[previousValue]) {
          customShortcutCategoryFilter.value = previousValue;
        }
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

    document.addEventListener("error", handleImageFallback, true);

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

    if (customShortcutPickerSearch) {
      customShortcutPickerSearch.addEventListener("input", renderCustomShortcutPicker);
    }

    if (customShortcutPickerToggle) {
      customShortcutPickerToggle.addEventListener("click", function (event) {
        event.preventDefault();
        if (!customShortcutPickerBody) {
          return;
        }
        var nextOpen = customShortcutPickerBody.hidden;
        setCustomShortcutPickerOpen(nextOpen);
      });
    }

    if (customShortcutEntryMode) {
      customShortcutEntryMode.addEventListener("click", function (event) {
        var button = event.target && event.target.closest ? event.target.closest("[data-custom-shortcut-mode]") : null;
        if (!button) {
          return;
        }
        event.preventDefault();
        setCustomShortcutEntryMode(button.getAttribute("data-custom-shortcut-mode"));
      });
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

    if (quickFavoritesAddClearAll) {
      quickFavoritesAddClearAll.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!quickFavoritesAddClearAll.classList.contains("is-confirming")) {
          quickFavoritesAddClearAll.classList.add("is-confirming");
          quickFavoritesAddClearAll.textContent = "再次点击清空";
          window.clearTimeout(customShortcutClearConfirmTimer);
          customShortcutClearConfirmTimer = window.setTimeout(function () {
            quickFavoritesAddClearAll.classList.remove("is-confirming");
            quickFavoritesAddClearAll.textContent = "一键清空";
          }, 2600);
          return;
        }
        window.clearTimeout(customShortcutClearConfirmTimer);
        clearHomeCustomShortcuts(true);
        customShortcutPendingSlotIndex = -1;
        quickFavoritesAddClearAll.classList.remove("is-confirming");
        quickFavoritesAddClearAll.textContent = "已清空";
        window.setTimeout(function () {
          if (quickFavoritesAddClearAll) {
            quickFavoritesAddClearAll.textContent = "一键清空";
          }
        }, 1200);
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
        syncHomeCustomMobileToolbar();
      });
    }

    applyQuickFavoritesDockMode(readQuickFavoritesDockMode(), false);
    setCustomShortcutEntryMode("picker");

    if (homeRecommendTabs.length) {
      for (var hrt = 0; hrt < homeRecommendTabs.length; hrt++) {
        homeRecommendTabs[hrt].addEventListener("click", function () {
          var group = this.getAttribute("data-home-recommend-group-target");
          var targetId = this.getAttribute("data-home-recommend-tab");
          setHomeRecommendPanel(
            group,
            targetId
          );
          var track = this.closest ? this.closest(".section-filter--subtabs-joly") : null;
          updateTrackHover(track, null);
          syncJolyTrackIndicator(track);
          if (homeRecommendMore && group === "aigc") {
            var nextUrl = targetId === "monthly-hot" ? "#categories" : "";
            homeRecommendMore.setAttribute("href", nextUrl ? nextUrl : "/");
          }
          syncHomeCustomMobileToolbar();
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
          if (event.__wogaosuniDirectHandled) {
            return;
          }
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

    function refreshBehaviorDrivenViews() {
      renderHomeRecommendAll();
      renderRankingPage();
      refreshSidebarRankingCards();
      syncFavoriteButtons();
    }

    document.addEventListener("wogaosuni:user-data-change", function (event) {
      if (event && event.detail && event.detail.reason === "init") {
        return;
      }
      refreshBehaviorDrivenViews();
    });

    window.addEventListener("storage", function (event) {
      if (!event || (event.key !== behaviorStoreStorageKey && event.key !== quickFavoritesStorageKey)) {
        return;
      }
      refreshBehaviorDrivenViews();
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
              event.__wogaosuniDirectHandled = true;
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
        setMobileSearchOpen(false);
        setSidebarState(false);
        closeDropdowns("");
        closeTopbarCategoryMenus(null);
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

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        collapsedSidebarDockPendingPointer = null;
        resetCollapsedSidebarDock();
      }
    });

    window.addEventListener("resize", function () {
      if (!isMobileSidebar()) {
        setSidebarState(false);
      }
      setSidebarCollapsed(readCollapsedState(), false);
      collapsedSidebarDockPendingPointer = null;
      resetCollapsedSidebarDock();
      initSideAccordion();
      syncRegionWarningDirection();
      scheduleHomeToolGridRowLimits(document);
      renderHomeRecommendCustom();
      renderHomeRecommendRecent();
      queueTopbarDensitySync();
      closeDropdowns("");
      for (var activeSourceIndex = 0; activeSourceIndex < searchSourceButtons.length; activeSourceIndex++) {
        if (searchSourceButtons[activeSourceIndex].classList.contains("is-active")) {
          updateSearchSourceArrow(searchSourceButtons[activeSourceIndex]);
          break;
        }
      }
      queueSiteFloatFooterOffset(true);
      queueBackToTopState();
    });
    window.addEventListener("scroll", function () {
      queueSiteFloatFooterOffset(false);
      queueBackToTopState();
    }, { passive: true });
    window.addEventListener("load", function () {
      queueSiteFloatFooterOffset(true);
      queueBackToTopState();
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", function () {
        queueSiteFloatFooterOffset(true);
        queueBackToTopState();
      });
      window.visualViewport.addEventListener("scroll", function () {
        queueSiteFloatFooterOffset(false);
        queueBackToTopState();
      }, { passive: true });
    }

    setSidebarState(false);
    setSidebarCollapsed(readCollapsedState(), false);
    queueTopbarDensitySync();
    finishSidebarBoot();
    initSideAccordion();
    queueSiteFloatFooterOffset(true);
    queueBackToTopState();
    if (searchCategoryButtons.length) {
      var defaultSearchCategory = "site";
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
    setCustomShortcutPickerOpen(true);
    renderRankingPage();
    bindSidebarRankingCards();
    animateHomeStats();
    animateRankingStats();
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
        var initialDetailPanel = "product-info";
        if (!getDetailAnchor(initialDetailPanel) && detailTabs[0]) {
          initialDetailPanel = detailTabs[0].getAttribute("data-detail-tab") || initialDetailPanel;
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

    function enhanceArticleRichtext() {
      var pageRoot = document.querySelector(".aiph-single--article");
      var pageType = "article";
      if (!pageRoot) {
        pageRoot = document.querySelector(".aiph-single--tool, .aiph-single--tool-article, [data-tool-article-page]");
        pageType = pageRoot ? "tool" : "";
      }
      var richtext = pageRoot ? pageRoot.querySelector(".wf-product-main-card .aiph-richtext, .aiph-richtext") : null;
      if (!richtext) {
        return [];
      }

      function wrapResponsiveTables(root) {
        var tables = root ? root.querySelectorAll("table") : [];
        for (var tableIndex = 0; tableIndex < tables.length; tableIndex++) {
          var table = tables[tableIndex];
          if (!table || !table.parentNode || (table.closest && table.closest(".wgn-table-scroll"))) {
            continue;
          }
          var wrapper = document.createElement("div");
          wrapper.className = "wgn-table-scroll";
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      }

      wrapResponsiveTables(richtext);

      if (richtext.getAttribute("data-aiph-richtext-enhanced") === "1") {
        var hasPendingEnhancement = richtext.querySelector("pre:not([data-aiph-code-block]):not([data-aiph-pretext]), h2:not([data-aiph-outline-heading]), h3:not([data-aiph-outline-heading])");
        if (!hasPendingEnhancement) {
          return Array.prototype.slice.call(richtext.querySelectorAll("[data-aiph-outline-heading]"));
        }
      }

      function normalizeText(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
      }

      function cnNumberToInt(value) {
        var map = {
          "一": 1,
          "二": 2,
          "三": 3,
          "四": 4,
          "五": 5,
          "六": 6,
          "七": 7,
          "八": 8,
          "九": 9,
          "十": 10
        };
        return map[value] || parseInt(value, 10) || 0;
      }

      function parsePrimaryHeading(text, index) {
        var clean = normalizeText(text);
        var match = clean.match(/^段落\s*([0-9一二三四五六七八九十]+)[\s:：、.．-]*(.*)$/);
        if (match) {
          var titleFromParagraph = normalizeText(match[2]);
          return {
            label: String(cnNumberToInt(match[1]) || match[1]).padStart(2, "0"),
            title: titleFromParagraph || ("第 " + String(cnNumberToInt(match[1]) || match[1]) + " 节")
          };
        }
        match = clean.match(/^([0-9一二三四五六七八九十]+)[、.．]\s*(.*)$/);
        if (match) {
          return {
            label: String(cnNumberToInt(match[1]) || index).padStart(2, "0"),
            title: normalizeText(match[2]) || clean
          };
        }
        return {
          label: String(index).padStart(2, "0"),
          title: clean
        };
      }

      function cleanSectionHeading(text) {
        var clean = normalizeText(text);
        var match = clean.match(/^段落\s*([0-9一二三四五六七八九十]+)[\s:：、.．-]*(.*)$/);
        if (match) {
          return normalizeText(match[2]) || ("第 " + String(cnNumberToInt(match[1]) || match[1]) + " 节");
        }
        return clean;
      }

      function getBeastName(order) {
        var names = ["qinglong", "baihu", "zhuque", "xuanwu"];
        var normalizedOrder = parseInt(order, 10) || 1;
        return names[(normalizedOrder - 1) % names.length];
      }

      function resetHeading(node, className, label, title, order, beastName) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        if (node.classList && !node.classList.contains(className)) {
          node.classList.add(className);
        } else if (!node.className) {
          node.className = className;
        }
        node.setAttribute("data-aiph-outline-heading", "1");
        node.setAttribute("data-aiph-section-label", label || "");
        node.setAttribute("data-aiph-section-order", String(order || ""));
        if (beastName) {
          node.setAttribute("data-aiph-beast", beastName);
        }
        var strong = document.createElement("strong");
        strong.textContent = title;
        node.appendChild(strong);
      }

      function ensureHeadingId(node, index, prefix) {
        if (!node.id) {
          node.id = (prefix || "article") + "-section-" + index;
        }
      }

      function getCodeLineCount(text) {
        var normalized = String(text || "").replace(/\r\n?/g, "\n").replace(/\n$/, "");
        return normalized ? normalized.split("\n").length : 0;
      }

      function escapeCodeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (char) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
          }[char] || char;
        });
      }

      function isCodeLanguageOneOf(languageKey, list) {
        if (!languageKey || !list || !list.length) {
          return false;
        }
        for (var index = 0; index < list.length; index++) {
          if (list[index] === languageKey) {
            return true;
          }
        }
        return false;
      }

      function stashCodeHighlight(source, pattern, tokens, resolver) {
        return String(source || "").replace(pattern, function () {
          var key = "%%AIPH_CODE_TOKEN_" + tokens.length + "%%";
          var html = resolver ? resolver.apply(null, arguments) : arguments[0];
          tokens.push({
            key: key,
            html: html
          });
          return key;
        });
      }

      function wrapCodeToken(className, content) {
        return '<span class="' + className + '">' + content + "</span>";
      }

      function restoreCodeHighlights(source, tokens) {
        var output = String(source || "");
        for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
          output = output.replace(tokens[tokenIndex].key, tokens[tokenIndex].html);
        }
        return output;
      }

      function getCodeRawText(codeNode) {
        if (!codeNode) {
          return "";
        }
        var raw = codeNode.getAttribute("data-aiph-code-raw");
        if (raw == null) {
          raw = codeNode.textContent || "";
        }
        return String(raw).replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n").replace(/\n$/, "");
      }

      function buildHighlightedCodeLine(line, languageKey) {
        var escaped = escapeCodeHtml(line);
        var tokens = [];
        if (!escaped) {
          return "&nbsp;";
        }

        escaped = stashCodeHighlight(escaped, /(&lt;!--[\s\S]*?--&gt;)/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--comment", match);
        });
        escaped = stashCodeHighlight(escaped, /(\/\*[\s\S]*?\*\/)/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--comment", match);
        });
        escaped = stashCodeHighlight(escaped, /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--string", match);
        });

        if (isCodeLanguageOneOf(languageKey, ["python", "bash", "shell", "powershell", "yaml", "yml", "toml", "ruby", "perl", "docker", "dockerfile", "makefile"])) {
          escaped = stashCodeHighlight(escaped, /(#[^\n\r<]*)/g, tokens, function (match) {
            return wrapCodeToken("aiph-code-token aiph-code-token--comment", match);
          });
        }

        escaped = stashCodeHighlight(escaped, /(\/\/[^\n\r<]*)/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--comment", match);
        });
        escaped = stashCodeHighlight(escaped, /(--[^\n\r<]*)/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--comment", match);
        });

        if (isCodeLanguageOneOf(languageKey, ["html", "xml", "svg", "markup"])) {
          escaped = stashCodeHighlight(escaped, /(&lt;\/?)([a-zA-Z][\w:-]*)([^&]*?)(\/?&gt;)/g, tokens, function (match, open, tagName, attrs, close) {
            var attrHtml = String(attrs || "").replace(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(\s*=\s*)("[^"]*"|'[^']*')/g, function (attrMatch, attrName, operator, attrValue) {
              return wrapCodeToken("aiph-code-token aiph-code-token--attr", attrName) + wrapCodeToken("aiph-code-token aiph-code-token--operator", operator) + wrapCodeToken("aiph-code-token aiph-code-token--string", attrValue);
            });
            return wrapCodeToken("aiph-code-token aiph-code-token--punctuation", open) + wrapCodeToken("aiph-code-token aiph-code-token--tag", tagName) + attrHtml + wrapCodeToken("aiph-code-token aiph-code-token--punctuation", close);
          });
        }

        if (isCodeLanguageOneOf(languageKey, ["json", "yaml", "yml", "toml"])) {
          escaped = stashCodeHighlight(escaped, /(^|\s)([A-Za-z0-9_.-]+|&quot;[^&]+&quot;)(\s*:)/g, tokens, function (match, lead, key, colon) {
            return (lead || "") + wrapCodeToken("aiph-code-token aiph-code-token--attr", key) + wrapCodeToken("aiph-code-token aiph-code-token--operator", colon);
          });
        }

        escaped = stashCodeHighlight(escaped, /\b(function|return|const|let|var|if|else|for|while|switch|case|break|continue|try|catch|finally|throw|new|class|extends|import|from|export|default|async|await|public|private|protected|static|interface|type|enum|implements|package|namespace|using|def|lambda|yield|elif|pass|then|fi|done|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|VALUES|JOIN|ORDER|GROUP|BY|AND|OR|NOT|IN|AS)\b/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--keyword", match);
        });
        escaped = stashCodeHighlight(escaped, /\b(true|false|null|undefined|None|True|False)\b/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--atom", match);
        });
        escaped = stashCodeHighlight(escaped, /\b(-?(?:0x[a-fA-F0-9]+|\d+(?:\.\d+)?))\b/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--number", match);
        });
        escaped = stashCodeHighlight(escaped, /(\+|\-|\*|\/|=|=>|==|===|!=|!==|<=|>=|\|\||&&)/g, tokens, function (match) {
          return wrapCodeToken("aiph-code-token aiph-code-token--operator", match);
        });

        return restoreCodeHighlights(escaped, tokens);
      }

      function renderCodeBlockPresentation(codeNode, languageKey) {
        if (!codeNode) {
          return;
        }
        var rawText = getCodeRawText(codeNode);
        var lines = rawText ? rawText.split("\n") : [""];
        var html = [];
        codeNode.setAttribute("data-aiph-code-raw", rawText);
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
          html.push(
            '<span class="aiph-code-line"><span class="aiph-code-line__content">' +
            buildHighlightedCodeLine(lines[lineIndex], languageKey) +
            "</span></span>"
          );
        }
        codeNode.innerHTML = html.join("");
        codeNode.setAttribute("data-aiph-code-rendered", "1");
      }

      function hasCodeLikeClassName(node) {
        var className = node && node.className ? String(node.className).toLowerCase() : "";
        return /(language-|lang-|brush:|hljs|prettyprint|linenums|prism)/.test(className);
      }

      function looksLikeCodeText(text) {
        var normalized = String(text || "").replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n").replace(/^\n+|\n+$/g, "");
        var lineCount = getCodeLineCount(normalized);
        if (!normalized) {
          return false;
        }
        if (lineCount >= 3) {
          return true;
        }
        if (/^\s*(npm|pnpm|yarn|npx|git|curl|wget|docker|kubectl|php|python|pip|composer)\s+/im.test(normalized)) {
          return true;
        }
        if (lineCount >= 2 && /(^|\n)\s{2,}\S|[{}[\];=<>()$`]/.test(normalized)) {
          return true;
        }
        if (lineCount === 1 && normalized.length >= 12 && /[{}[\];=<>()$`]/.test(normalized)) {
          return true;
        }
        if (/<[a-z][^>]*>/i.test(normalized) && lineCount >= 1) {
          return true;
        }
        return false;
      }

      function clearCodeBlockMarkers(codeBlock) {
        var attrs = [
          "data-aiph-code-block",
          "data-aiph-code-ui",
          "data-aiph-code-style",
          "data-aiph-code-base-label",
          "data-aiph-code-label",
          "data-aiph-code-lines",
          "data-aiph-code-foldable",
          "data-aiph-code-expanded"
        ];
        if (!codeBlock) {
          return;
        }
        for (var attrIndex = 0; attrIndex < attrs.length; attrIndex++) {
          codeBlock.removeAttribute(attrs[attrIndex]);
        }
        codeBlock.style.removeProperty("--aiph-code-collapsed-height");
        codeBlock.style.removeProperty("--aiph-code-expanded-height");
        codeBlock.style.removeProperty("max-height");
        codeBlock.classList.remove("is-code-expanded");
        codeBlock.classList.remove("is-code-collapsed");
      }

      function ensureCodeBlockNode(codeBlock) {
        var codeNode = codeBlock ? codeBlock.querySelector("code") : null;
        if (!codeBlock) {
          return null;
        }
        if (codeNode) {
          codeBlock.setAttribute("data-aiph-code-block", "1");
          codeBlock.removeAttribute("data-aiph-pretext");
          return codeNode;
        }
        if (!hasCodeLikeClassName(codeBlock) && !looksLikeCodeText(codeBlock.textContent || "")) {
          clearCodeBlockMarkers(codeBlock);
          codeBlock.setAttribute("data-aiph-pretext", "1");
          return null;
        }
        codeNode = document.createElement("code");
        while (codeBlock.firstChild) {
          codeNode.appendChild(codeBlock.firstChild);
        }
        codeBlock.appendChild(codeNode);
        codeBlock.setAttribute("data-aiph-code-block", "1");
        codeBlock.removeAttribute("data-aiph-pretext");
        return codeNode;
      }

      function getCodeLanguageMeta(codeBlock) {
        var codeNode = codeBlock ? codeBlock.querySelector("code") : null;
        var className = ((codeNode && codeNode.className) || codeBlock.className || "").toLowerCase();
        var match = className.match(/language-([a-z0-9#+_-]+)/i);
        var rawName = match && match[1] ? match[1].toLowerCase() : "";
        var aliasMap = {
          js: "javascript",
          jsx: "javascript",
          ts: "typescript",
          tsx: "typescript",
          sh: "bash",
          shell: "bash",
          zsh: "bash",
          ps1: "powershell",
          yml: "yaml",
          md: "markdown",
          py: "python",
          txt: "text",
          plaintext: "text"
        };
        var labelMap = {
          html: "HTML",
          css: "CSS",
          scss: "SCSS",
          javascript: "JavaScript",
          typescript: "TypeScript",
          bash: "Bash",
          powershell: "PowerShell",
          json: "JSON",
          yaml: "YAML",
          markdown: "Markdown",
          php: "PHP",
          python: "Python",
          sql: "SQL",
          xml: "XML",
          text: "文本"
        };
        var languageKey = aliasMap[rawName] || rawName || "text";
        return {
          key: languageKey,
          label: labelMap[languageKey] || (rawName ? rawName.toUpperCase() : "代码")
        };
      }

      function dispatchArticleLayoutChange() {
        if (typeof window.CustomEvent !== "function") {
          return;
        }
        window.dispatchEvent(new window.CustomEvent("aiph:article-layout-change"));
      }

      function bindCodeToggleButton(toggleButton, codeBlock) {
        if (!toggleButton || !codeBlock || toggleButton._aiphToggleBound) {
          return;
        }
        toggleButton.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          var expanded = codeBlock.getAttribute("data-aiph-code-expanded") === "1";
          codeBlock.setAttribute("data-aiph-code-expanded", expanded ? "0" : "1");
          updateCodeBlockLayout(codeBlock);
          dispatchArticleLayoutChange();
        });
        toggleButton._aiphToggleBound = true;
      }

      function ensureCodeAuxiliaryUi(codeBlock) {
        if (!codeBlock) {
          return {
            fadeNode: null,
            toggleButton: null
          };
        }
        var fadeNode = codeBlock.querySelector("[data-aiph-code-fade]");
        var toggleButton = codeBlock.querySelector("[data-aiph-code-toggle]");
        if (!fadeNode) {
          fadeNode = document.createElement("span");
          fadeNode.className = "aiph-code-fade";
          fadeNode.setAttribute("data-aiph-code-fade", "1");
          fadeNode.setAttribute("aria-hidden", "true");
          codeBlock.appendChild(fadeNode);
        }
        if (!toggleButton) {
          toggleButton = document.createElement("button");
          toggleButton.type = "button";
          toggleButton.className = "aiph-code-expand-chip";
          toggleButton.setAttribute("data-aiph-code-toggle", "1");
          toggleButton.textContent = "展开完整代码";
          codeBlock.appendChild(toggleButton);
        }
        bindCodeToggleButton(toggleButton, codeBlock);
        return {
          fadeNode: fadeNode,
          toggleButton: toggleButton
        };
      }

      function removeCodeAuxiliaryUi(codeBlock) {
        if (!codeBlock) {
          return;
        }
        var fadeNode = codeBlock.querySelector("[data-aiph-code-fade]");
        var toggleButton = codeBlock.querySelector("[data-aiph-code-toggle]");
        if (fadeNode && fadeNode.parentNode) {
          fadeNode.parentNode.removeChild(fadeNode);
        }
        if (toggleButton && toggleButton.parentNode) {
          toggleButton.parentNode.removeChild(toggleButton);
        }
      }

      var headings = [];
      var primaryIndex = 0;
      var currentBeastName = "qinglong";
      var allHeadings = richtext.querySelectorAll("h2, h3");
      for (var index = 0; index < allHeadings.length; index++) {
        var heading = allHeadings[index];
        var tagName = heading.tagName ? heading.tagName.toLowerCase() : "";
        var text = normalizeText(heading.textContent);
        if (!text) {
          continue;
        }
        if (tagName === "h2") {
          primaryIndex += 1;
          var parsed = parsePrimaryHeading(text, primaryIndex);
          currentBeastName = getBeastName(primaryIndex);
          resetHeading(heading, "aiph-rich-heading--primary", parsed.label, parsed.title, primaryIndex, currentBeastName);
        } else {
          resetHeading(heading, "aiph-rich-heading--secondary", "", cleanSectionHeading(text), primaryIndex || index + 1, currentBeastName || getBeastName(index + 1));
        }
        ensureHeadingId(heading, index + 1, pageType === "tool" ? "tool" : "article");
        headings.push(heading);
      }

      var codeBlocks = richtext.querySelectorAll("pre");
      var enhancedCodeBlocks = [];
      var codeLayoutRaf = 0;
      var codeLayoutTimer = 0;

      function updateCodeBlockLayout(codeBlock) {
        if (!codeBlock) {
          return;
        }
        var codeNode = codeBlock.querySelector("code");
        if (codeBlock.getAttribute("data-aiph-code-block") !== "1") {
          return;
        }
        var headerLabel = codeBlock.querySelector("[data-aiph-code-header-label]");
        if (!codeNode) {
          return;
        }

        var textValue = getCodeRawText(codeNode);
        var renderedLineNodes = codeNode.querySelectorAll(".aiph-code-line");
        var lineHeight = parseFloat(window.getComputedStyle(codeNode).lineHeight) || 26;
        var blockStyles = window.getComputedStyle(codeBlock);
        var paddingTop = parseFloat(blockStyles.paddingTop) || 52;
        var paddingBottom = parseFloat(blockStyles.paddingBottom) || 18;
        var totalLines = Math.max(getCodeLineCount(textValue), renderedLineNodes.length, Math.round(codeNode.scrollHeight / Math.max(lineHeight, 1)));
        var collapseLines = window.innerWidth <= 820 ? 9 : 11;
        var collapsedHeight = Math.round((lineHeight * collapseLines) + paddingTop + paddingBottom + 6);
        var expandedHeight = Math.ceil(codeNode.scrollHeight + paddingTop + paddingBottom + 8);
        var visibleCodeHeight = Math.round(lineHeight * collapseLines);
        var hiddenCodeHeight = Math.max(0, codeNode.scrollHeight - visibleCodeHeight);
        var canFold = totalLines > collapseLines && hiddenCodeHeight > Math.max(10, Math.round(lineHeight * 0.75)) && (expandedHeight - collapsedHeight) > Math.max(10, Math.round(lineHeight * 0.75));
        var baseLabel = codeBlock.getAttribute("data-aiph-code-base-label") || codeBlock.getAttribute("data-aiph-code-label") || "代码";
        var labelText = baseLabel + " · " + totalLines + " 行";
        var remainLines = Math.max(1, totalLines - collapseLines);
        codeBlock.setAttribute("data-aiph-code-lines", String(totalLines));
        codeBlock.setAttribute("data-aiph-code-label", labelText);
        codeBlock.style.setProperty("--aiph-code-collapsed-height", collapsedHeight + "px");
        codeBlock.style.setProperty("--aiph-code-expanded-height", expandedHeight + "px");
        if (headerLabel) {
          headerLabel.textContent = labelText;
        }

        if (!canFold) {
          codeBlock.setAttribute("data-aiph-code-foldable", "0");
          codeBlock.setAttribute("data-aiph-code-expanded", "1");
          codeBlock.classList.remove("is-code-collapsed");
          codeBlock.classList.add("is-code-expanded");
          codeBlock.style.maxHeight = "none";
          removeCodeAuxiliaryUi(codeBlock);
          return;
        }

        var codeUi = ensureCodeAuxiliaryUi(codeBlock);
        var toggleButton = codeUi.toggleButton;
        var fadeNode = codeUi.fadeNode;
        var expanded = codeBlock.getAttribute("data-aiph-code-expanded") === "1";
        codeBlock.setAttribute("data-aiph-code-foldable", "1");
        codeBlock.classList.toggle("is-code-expanded", expanded);
        codeBlock.classList.toggle("is-code-collapsed", !expanded);
        codeBlock.style.maxHeight = (expanded ? expandedHeight : collapsedHeight) + "px";
        if (toggleButton) {
          toggleButton.textContent = expanded ? "收起代码" : ("展开剩余 " + remainLines + " 行");
          toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
          toggleButton.setAttribute("aria-label", expanded ? "收起代码" : ("展开剩余 " + remainLines + " 行代码"));
          toggleButton.setAttribute("title", expanded ? "收起代码" : "展开完整代码");
        }
        if (fadeNode) {
          fadeNode.style.display = expanded ? "none" : "";
        }
      }

      function queueCodeBlockLayout() {
        if (!enhancedCodeBlocks.length) {
          return;
        }
        if (codeLayoutRaf) {
          window.cancelAnimationFrame(codeLayoutRaf);
        }
        window.clearTimeout(codeLayoutTimer);
        codeLayoutRaf = window.requestAnimationFrame(function () {
          codeLayoutRaf = 0;
          for (var blockIndex = 0; blockIndex < enhancedCodeBlocks.length; blockIndex++) {
            updateCodeBlockLayout(enhancedCodeBlocks[blockIndex]);
          }
        });
        codeLayoutTimer = window.setTimeout(function () {
          for (var blockIndex = 0; blockIndex < enhancedCodeBlocks.length; blockIndex++) {
            updateCodeBlockLayout(enhancedCodeBlocks[blockIndex]);
          }
        }, 120);
      }

      for (var codeIndex = 0; codeIndex < codeBlocks.length; codeIndex++) {
        var codeBlock = codeBlocks[codeIndex];
        var codeNode = ensureCodeBlockNode(codeBlock);
        if (!codeNode) {
          continue;
        }
        var languageMeta = getCodeLanguageMeta(codeBlock);
        var existingLabel = codeBlock.getAttribute("data-aiph-code-label") || "";
        var labelBase = existingLabel && existingLabel !== "示例代码" ? existingLabel : languageMeta.label;
        codeBlock.setAttribute("data-aiph-code-block", "1");
        codeBlock.setAttribute("data-aiph-code-base-label", labelBase);
        codeBlock.setAttribute("data-aiph-code-label", labelBase);
        codeBlock.setAttribute("data-aiph-code-style", "docs");
        if (codeNode) {
          codeNode.setAttribute("data-aiph-code-language", languageMeta.key);
        }
        if (pageType === "article" && codeNode.getAttribute("data-aiph-code-rendered") !== "1") {
          renderCodeBlockPresentation(codeNode, languageMeta.key);
        }
        if (pageType !== "article" || codeBlock.getAttribute("data-aiph-code-ui") === "1" || !codeNode) {
          continue;
        }
        codeBlock.setAttribute("data-aiph-code-ui", "1");
        codeBlock.setAttribute("data-aiph-code-expanded", "0");

        var header = document.createElement("span");
        header.className = "aiph-code-header";
        header.setAttribute("data-aiph-code-header", "1");

        var headerLabel = document.createElement("span");
        headerLabel.className = "aiph-code-header__label";
        headerLabel.setAttribute("data-aiph-code-header-label", "1");
        headerLabel.textContent = labelBase;
        header.appendChild(headerLabel);

        codeBlock.appendChild(header);

        var toolbar = document.createElement("span");
        toolbar.className = "aiph-code-toolbar";
        toolbar.setAttribute("data-aiph-code-toolbar", "1");

        var copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "aiph-code-toolbar__button aiph-code-toolbar__button--copy";
        copyButton.setAttribute("data-aiph-code-copy", "1");
        copyButton.setAttribute("aria-label", "复制代码");
        copyButton.setAttribute("title", "复制代码");
        copyButton.textContent = "复制";
        toolbar.appendChild(copyButton);

        codeBlock.appendChild(toolbar);

        copyButton.addEventListener("click", (function (button, block, node) {
          return function (event) {
            event.preventDefault();
            event.stopPropagation();
            copyTextToClipboard(node.getAttribute("data-aiph-code-raw") || node.textContent || "").then(function () {
              button.textContent = "已复制";
              button.classList.add("is-copied");
              showShareToast("代码已复制");
              window.clearTimeout(button._aiphCopyTimer);
              button._aiphCopyTimer = window.setTimeout(function () {
                button.textContent = "复制";
                button.classList.remove("is-copied");
              }, 1600);
            }).catch(function () {
              showShareToast("复制失败，请手动复制");
            });
          };
        })(copyButton, codeBlock, codeNode));

        enhancedCodeBlocks.push(codeBlock);
      }

      if (pageType === "article" && enhancedCodeBlocks.length) {
        queueCodeBlockLayout();
        window.addEventListener("load", queueCodeBlockLayout);
        window.addEventListener("resize", queueCodeBlockLayout);
        window.addEventListener("aiph:article-layout-change", queueCodeBlockLayout);
      }

      richtext.setAttribute("data-aiph-richtext-enhanced", "1");
      richtext.setAttribute("data-aiph-richtext-page", pageType || "");
      if (pageType === "tool") {
        richtext.setAttribute("data-aiph-beast-richtext", "1");
      }
      return headings;
    }

    function bindArticleOutline() {
      var outline = document.querySelector("[data-aiph-outline]");
      var readerOutline = document.querySelector("[data-aiph-outline-reader]");
      if (!outline && !readerOutline) {
        return;
      }
      var outlineCards = [];
      if (outline) {
        outlineCards.push(outline);
      }
      if (readerOutline && readerOutline !== outline) {
        outlineCards.push(readerOutline);
      }
      var enhancedHeadings = enhanceArticleRichtext();
      var layoutRaf = 0;
      var layoutTimer = 0;

      function fillOutlineNav(card) {
        var nav = card ? card.querySelector(".aiph-outline-card__nav") : null;
        if (!nav || !enhancedHeadings.length) {
          return;
        }
        if (card && document.body && document.body.classList && (document.body.classList.contains("is-single-tool-article") || document.body.classList.contains("is-single-download-news"))) {
          card.classList.add("is-shared-reader-outline");
        }
        var seenOutlineKeys = {};
        var seenOutlineIds = {};
        var fragment = document.createDocumentFragment();
        for (var headingIndex = 0; headingIndex < enhancedHeadings.length; headingIndex++) {
          var heading = enhancedHeadings[headingIndex];
          var link = document.createElement("a");
          var pill = document.createElement("span");
          var indexText = document.createElement("span");
          var text = document.createElement("span");
          var levelClass = heading.tagName && heading.tagName.toLowerCase() === "h3" ? "is-level-3" : "is-level-2";
          var outlineLabel = heading.querySelector("strong") ? heading.querySelector("strong").textContent : heading.textContent;
          var normalizedLabel = String(outlineLabel || "").replace(/\s+/g, " ").trim();
          var outlineKey = (heading.id || "") + "::" + normalizedLabel;
          if (!normalizedLabel || !heading.id || seenOutlineIds[heading.id] || seenOutlineKeys[outlineKey]) {
            continue;
          }
          seenOutlineIds[heading.id] = true;
          seenOutlineKeys[outlineKey] = true;
          link.className = "aiph-outline-card__link " + levelClass + (headingIndex === 0 ? " is-active" : "");
          link.href = "#" + heading.id;
          link.setAttribute("data-outline-link", heading.id);
          link.setAttribute("data-outline-label", normalizedLabel);
          link.setAttribute("data-outline-index", String(headingIndex + 1).padStart(2, "0"));
          link.setAttribute("aria-label", normalizedLabel);
          pill.className = "aiph-outline-card__pill";
          indexText.className = "aiph-outline-card__index";
          indexText.textContent = String(headingIndex + 1).padStart(2, "0");
          text.className = "aiph-outline-card__text";
          text.textContent = normalizedLabel;
          pill.appendChild(indexText);
          pill.appendChild(text);
          link.appendChild(pill);
          fragment.appendChild(link);
        }
        while (nav.firstChild) {
          nav.removeChild(nav.firstChild);
        }
        nav.appendChild(fragment);
      }

      for (var fillIndex = 0; fillIndex < outlineCards.length; fillIndex++) {
        fillOutlineNav(outlineCards[fillIndex]);
      }

      var links = document.querySelectorAll("[data-aiph-outline] [data-outline-link], [data-aiph-outline-reader] [data-outline-link]");
      if (!links.length) {
        return;
      }

      var sections = [];
      var seenSectionIds = {};
      var lastActiveOutlineId = "";
      var lastActiveOutlineTop = -1;
      var outlineScrollTicking = false;
      var reducedMotion = false;
      try {
        reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (error) {
      }
      for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
        var targetId = links[linkIndex].getAttribute("data-outline-link") || "";
        var targetNode = targetId ? document.getElementById(targetId) : null;
        if (targetNode && !seenSectionIds[targetId]) {
          seenSectionIds[targetId] = true;
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

      function scrollActiveOutlineIntoView(targetId, force) {
        var outlineNavs = document.querySelectorAll(".aiph-outline-card__nav");
        for (var navIndex = 0; navIndex < outlineNavs.length; navIndex++) {
          var nav = outlineNavs[navIndex];
          var navLinks = nav.querySelectorAll("[data-outline-link]");
          var activeLink = null;
          for (var navLinkIndex = 0; navLinkIndex < navLinks.length; navLinkIndex++) {
            if ((navLinks[navLinkIndex].getAttribute("data-outline-link") || "") === targetId) {
              activeLink = navLinks[navLinkIndex];
              break;
            }
          }
          if (!activeLink) {
            continue;
          }
          var currentTop = nav.scrollTop || 0;
          var linkTop = activeLink.offsetTop || 0;
          var linkHeight = activeLink.offsetHeight || 30;
          var viewportHeight = nav.clientHeight || 0;
          var cushion = activeLink.classList.contains("is-level-3") ? 18 : 22;
          var upperBand = currentTop + cushion;
          var lowerBand = currentTop + Math.max(cushion + linkHeight, viewportHeight - cushion - linkHeight);
          var nextTop = currentTop;
          if (force || linkTop < upperBand) {
            nextTop = Math.max(0, linkTop - cushion);
          } else if ((linkTop + linkHeight) > lowerBand) {
            nextTop = Math.max(0, linkTop - Math.max(18, Math.round((viewportHeight - linkHeight) * 0.42)));
          }
          if (Math.abs(nextTop - currentTop) > 14) {
            if (typeof nav.scrollTo === "function") {
              nav.scrollTo({
                top: nextTop,
                behavior: (force && !reducedMotion) ? "smooth" : "auto"
              });
            } else {
              nav.scrollTop = nextTop;
            }
          }
        }
      }

      function setActiveOutline(targetId, forceScroll) {
        var syncedHeadings = {};
        for (var index = 0; index < sections.length; index++) {
          sections[index].link.classList.toggle("is-active", sections[index].id === targetId);
          if (sections[index].node && !syncedHeadings[sections[index].id]) {
            syncedHeadings[sections[index].id] = true;
            sections[index].node.classList.toggle("is-aiph-heading-active", sections[index].id === targetId);
          }
        }
        syncOutlineActiveBars();
        updateOutlineProgress();
        if (forceScroll || targetId !== lastActiveOutlineId) {
          scrollActiveOutlineIntoView(targetId, !!forceScroll);
        }
        lastActiveOutlineId = targetId;
      }

      function syncOutlineActiveBars() {
        var outlineNavs = document.querySelectorAll(".aiph-outline-card__nav");
        for (var navIndex = 0; navIndex < outlineNavs.length; navIndex++) {
          var nav = outlineNavs[navIndex];
          var navLinks = nav.querySelectorAll("[data-outline-link]");
          if (navLinks.length) {
            var firstLink = navLinks[0];
            var lastLink = navLinks[navLinks.length - 1];
            var trackTop = (firstLink.offsetTop || 0) + 4;
            var trackBottom = (lastLink.offsetTop || 0) + (lastLink.offsetHeight || 34) - 4;
            nav.style.setProperty("--aiph-outline-track-top", Math.round(trackTop) + "px");
            nav.style.setProperty("--aiph-outline-track-height", Math.round(Math.max(2, trackBottom - trackTop)) + "px");
          } else {
            nav.style.removeProperty("--aiph-outline-track-top");
            nav.style.removeProperty("--aiph-outline-track-height");
          }
          var activeLink = nav.querySelector("[data-outline-link].is-active");
          if (!activeLink) {
            nav.style.removeProperty("--aiph-outline-active-top");
            nav.style.removeProperty("--aiph-outline-active-height");
            continue;
          }
          var top = activeLink.offsetTop || 0;
          var height = activeLink.offsetHeight || 34;
          nav.style.setProperty("--aiph-outline-active-top", Math.round(top) + "px");
          nav.style.setProperty("--aiph-outline-active-height", Math.round(height) + "px");
        }
      }

      function updateOutlineProgress() {
        var progressBars = document.querySelectorAll("[data-aiph-outline-progress]");
        if (!progressBars.length) {
          return;
        }
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        var contentNode = document.querySelector(".aiph-richtext") || document.getElementById("article-content");
        var contentTop = contentNode ? contentNode.getBoundingClientRect().top + scrollTop : 0;
        var contentBottom = contentNode ? contentTop + contentNode.offsetHeight : document.documentElement.scrollHeight;
        var viewportBottom = scrollTop + window.innerHeight;
        var range = Math.max(1, contentBottom - contentTop);
        var progress = Math.max(0, Math.min(1, (viewportBottom - contentTop) / range));
        var progressPercent = Math.round(progress * 100);
        var outlineNavs = document.querySelectorAll(".aiph-outline-card__nav");
        for (var navProgressIndex = 0; navProgressIndex < outlineNavs.length; navProgressIndex++) {
          var navProgressTrack = Math.max(0, (outlineNavs[navProgressIndex].scrollHeight || outlineNavs[navProgressIndex].offsetHeight || 0) - 24);
          outlineNavs[navProgressIndex].style.setProperty("--aiph-outline-progress-height", Math.round(navProgressTrack * progress) + "px");
        }
        for (var progressIndex = 0; progressIndex < progressBars.length; progressIndex++) {
          progressBars[progressIndex].style.width = progressPercent + "%";
          progressBars[progressIndex].textContent = progressPercent + "%";
        }
      }

      function syncReaderOutline() {
        if (!readerOutline) {
          return;
        }
        var body = document.body;
        var sidebar = readerOutline.closest ? readerOutline.closest(".aiph-sidebar") : null;
        var followStack = sidebar ? sidebar.querySelector("[data-aiph-sidebar-follow-stack]") : null;
        var isSharedDetailReader = !!(body && body.classList && (body.classList.contains("is-single-download-reader") || body.classList.contains("is-single-tool-reader") || body.classList.contains("is-single-download-news") || body.classList.contains("is-single-tool-article")));
        var forcedReaderWidth = window.innerWidth >= 1451 ? 260 : (window.innerWidth >= 1280 ? 230 : 0);
        var isDesktop = window.innerWidth >= 1280;
        if (!isDesktop) {
          readerOutline.classList.remove("is-reader-ready", "is-reader-floating");
          readerOutline.style.removeProperty("--aiph-reader-left");
          readerOutline.style.removeProperty("--aiph-reader-width");
          readerOutline.style.removeProperty("--aiph-reader-top");
          if (sidebar) {
            sidebar.classList.remove("is-reader-rail-floating");
            sidebar.style.removeProperty("--aiph-reader-left");
            sidebar.style.removeProperty("--aiph-reader-width");
            sidebar.style.removeProperty("--aiph-reader-top");
            sidebar.style.removeProperty("--aiph-reader-reserve");
            sidebar.style.removeProperty("--aiph-reader-stack-top");
            sidebar.style.removeProperty("--aiph-reader-stack-height");
          }
          if (followStack) {
            followStack.classList.remove("is-reader-stack-floating");
          }
          return;
        }
        var children = sidebar ? Array.prototype.slice.call(sidebar.children) : [];
        var previous = null;
        for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
          if (children[childIndex] !== readerOutline) {
            previous = children[childIndex];
            break;
          }
        }
        var previousRect = previous ? previous.getBoundingClientRect() : null;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        var topbarNode = document.querySelector(topbarRootSelector);
        var topbarRect = topbarNode ? topbarNode.getBoundingClientRect() : null;
        var topbarHeight = topbarRect ? Math.round(topbarRect.height || 0) : 0;
        var stickyTop = Math.max(112, topbarHeight + 48);
        var isFirstReaderCard = !!(sidebar && children.length && children[0] === readerOutline);
        var ready = isFirstReaderCard || !previous || previousRect.bottom <= stickyTop + 8;
        var sidebarRect = sidebar ? sidebar.getBoundingClientRect() : null;
        var bodyNode = readerOutline.closest ? readerOutline.closest(".aiph-body") : null;
        var isPlainArticleReader = !!(body && body.classList && body.classList.contains("is-single-article-news") && !isSharedDetailReader);
        if (isPlainArticleReader || isSharedDetailReader) {
          bodyNode = document.querySelector(".aiph-single--article .wf-article-main-card.article-reader-card:not(.wf-entry-action-card)") || document.querySelector(".aiph-single--article .wf-article-main-card.article-reader-card") || document.querySelector(".aiph-single--article .aiph-main") || bodyNode;
        }
        var bodyRect = bodyNode ? bodyNode.getBoundingClientRect() : null;
        var readerNaturalRect = readerOutline.getBoundingClientRect();
        var readerHeight = readerOutline.offsetHeight || readerOutline.getBoundingClientRect().height || 0;
        var flowTop = readerOutline.classList.contains("is-reader-floating") && bodyRect ? bodyRect.top : (readerNaturalRect ? readerNaturalRect.top : stickyTop);
        if (isSharedDetailReader) {
          flowTop = stickyTop;
        }
        var desiredTop = Math.max(stickyTop, Math.round(flowTop || stickyTop));
        /* Shared detail readers should keep the same safe topbar offset as plain articles.
           Let the boundary-room check decide when floating ends instead of pushing the TOC
           upward into the fixed topbar area near the bottom of the reader. */
        var safeTop = (bodyRect && !(isPlainArticleReader || isSharedDetailReader)) ? Math.min(desiredTop, bodyRect.bottom - readerHeight - 18) : desiredTop;
        safeTop = Math.max(12, safeTop);
        var stackTopEstimate = Math.round(safeTop + readerHeight + 14);
        var viewportStackHeight = Math.max(160, Math.round(viewportHeight - stackTopEstimate - 18));
        var bodyStackHeight = bodyRect ? Math.round(bodyRect.bottom - stackTopEstimate - 18) : viewportStackHeight;
        var stackHeightLimit = (isPlainArticleReader || isSharedDetailReader) ? viewportStackHeight : Math.max(120, Math.min(viewportStackHeight, bodyStackHeight));
        var readerBottomLimit = stickyTop + Math.min(readerHeight, Math.max(180, viewportHeight - stickyTop - 18)) - 24;
        /* Plain articles should keep the right TOC/follow cards visible until the reader card is almost out of view,
           instead of collapsing early just because the TOC card is taller than the remaining article area. */
        var pinnedReaderBottomLimit = stickyTop + Math.max(72, Math.min(120, Math.round(viewportHeight * 0.12)));
        var hasBoundaryRoom = bodyRect ? ((isPlainArticleReader || isSharedDetailReader) ? bodyRect.bottom > pinnedReaderBottomLimit : bodyRect.bottom > stackTopEstimate + 140) : true;
        var shouldFloat = !!(ready && sidebarRect && bodyRect && hasBoundaryRoom && sidebarRect.width > 0 && viewportHeight > readerHeight + 120);
        readerOutline.classList.toggle("is-reader-ready", ready);
        readerOutline.classList.toggle("is-reader-floating", shouldFloat);
        if (sidebar) {
          sidebar.classList.toggle("is-reader-rail-floating", shouldFloat);
        }
        if (followStack) {
          followStack.classList.toggle("is-reader-stack-floating", shouldFloat);
        }
        if (shouldFloat && sidebarRect) {
          var anchorRect = sidebarRect;
          if ((isSharedDetailReader || isPlainArticleReader) && body) {
            readerOutline.classList.remove("is-reader-floating");
            if (followStack) {
              followStack.classList.remove("is-reader-stack-floating");
            }
            sidebar.classList.remove("is-reader-rail-floating");
            void sidebar.offsetWidth;
            anchorRect = sidebar.getBoundingClientRect();
            readerOutline.classList.add("is-reader-floating");
            if (followStack) {
              followStack.classList.add("is-reader-stack-floating");
            }
            sidebar.classList.add("is-reader-rail-floating");
          } else if ((body && body.classList && (body.classList.contains("is-single-tool-article") || body.classList.contains("is-single-download-news"))) || (body && body.classList && body.classList.contains("is-single-article-news"))) {
            var contentBodyRect = bodyRect;
            var columnWidth = Math.round(sidebarRect.width || readerOutline.offsetWidth || 300);
            if (contentBodyRect && columnWidth > 0 && (sidebarRect.left < 0 || sidebarRect.left + columnWidth > window.innerWidth - 12 || sidebarRect.width <= 0)) {
              var viewportWidth = document.documentElement.clientWidth || window.innerWidth || 0;
              var desiredLeft = Math.round(contentBodyRect.right - columnWidth);
              var maxLeft = Math.max(12, Math.round(viewportWidth - columnWidth - 24));
              anchorRect = {
                left: Math.max(12, Math.min(desiredLeft, maxLeft)),
                width: columnWidth
              };
            }
          }
          var anchorWidth = Math.round(anchorRect.width || readerOutline.offsetWidth || forcedReaderWidth || 300);
          if ((isSharedDetailReader || isPlainArticleReader) && forcedReaderWidth > 0) {
            anchorWidth = forcedReaderWidth;
          }
          var anchorLeft = Math.round(anchorRect.left || 0);
          if ((isSharedDetailReader || isPlainArticleReader) && bodyRect && anchorWidth > 0) {
            var viewportWidth = document.documentElement.clientWidth || window.innerWidth || 0;
            var desiredReaderLeft = Math.round(bodyRect.right + 18);
            var maxReaderLeft = Math.max(12, Math.round(viewportWidth - anchorWidth - 24));
            anchorLeft = Math.max(12, Math.min(desiredReaderLeft, maxReaderLeft));
          }
          var readerLeft = anchorLeft + "px";
          var readerWidth = anchorWidth + "px";
          var readerTop = Math.round(safeTop) + "px";
          var readerReserve = Math.round(readerHeight + 14) + "px";
          var stackTopNumber = stackTopEstimate;
          var stackHeightNumber = stackHeightLimit;
          var stackTop = stackTopNumber + "px";
          var stackHeight = stackHeightNumber + "px";
          readerOutline.style.setProperty("--aiph-reader-left", readerLeft);
          readerOutline.style.setProperty("--aiph-reader-width", readerWidth);
          readerOutline.style.setProperty("--aiph-reader-top", readerTop);
          if (sidebar) {
            sidebar.style.setProperty("--aiph-reader-left", readerLeft);
            sidebar.style.setProperty("--aiph-reader-width", readerWidth);
            sidebar.style.setProperty("--aiph-reader-top", readerTop);
            sidebar.style.setProperty("--aiph-reader-reserve", readerReserve);
            sidebar.style.setProperty("--aiph-reader-stack-top", stackTop);
            sidebar.style.setProperty("--aiph-reader-stack-height", stackHeight);
            if (isSharedDetailReader && forcedReaderWidth > 0) {
              sidebar.style.width = readerWidth;
              sidebar.style.minWidth = readerWidth;
              sidebar.style.maxWidth = readerWidth;
            }
          }
        } else {
          readerOutline.style.removeProperty("--aiph-reader-left");
          readerOutline.style.removeProperty("--aiph-reader-width");
          readerOutline.style.removeProperty("--aiph-reader-top");
          if (sidebar) {
            sidebar.style.removeProperty("--aiph-reader-left");
            sidebar.style.removeProperty("--aiph-reader-width");
            sidebar.style.removeProperty("--aiph-reader-top");
            sidebar.style.removeProperty("--aiph-reader-reserve");
            sidebar.style.removeProperty("--aiph-reader-stack-top");
            sidebar.style.removeProperty("--aiph-reader-stack-height");
            if (isSharedDetailReader) {
              sidebar.style.removeProperty("width");
              sidebar.style.removeProperty("min-width");
              sidebar.style.removeProperty("max-width");
            }
          }
          if (followStack) {
            followStack.classList.remove("is-reader-stack-floating");
          }
        }
      }

      function getArticleAnchorOffset() {
        var topbarNode = document.querySelector(topbarRootSelector);
        var topbarRect = topbarNode ? topbarNode.getBoundingClientRect() : null;
        var topbarHeight = topbarRect ? Math.round(topbarRect.height || 0) : 64;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        if (window.innerWidth < 768) {
          return Math.max(84, topbarHeight + 18);
        }
        if (viewportHeight < 720) {
          return Math.max(102, topbarHeight + 30);
        }
        return Math.max(116, topbarHeight + 42);
      }

      function scrollToArticleHeading(targetNode) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        var targetTop = targetNode.getBoundingClientRect().top + scrollTop;
        var maxScroll = Math.max(0, document.documentElement.scrollHeight - (window.innerHeight || document.documentElement.clientHeight || 0));
        var targetScroll = Math.max(0, Math.min(maxScroll, Math.round(targetTop - getArticleAnchorOffset())));
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth"
        });
      }

      function updateActiveOutline() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        var threshold = scrollTop + getArticleAnchorOffset() + 18;
        var activeId = sections[0].id;
        var activeTop = sections[0].node.getBoundingClientRect().top + scrollTop;
        for (var index = 0; index < sections.length; index++) {
          var rectTop = sections[index].node.getBoundingClientRect().top + scrollTop;
          if (rectTop <= threshold) {
            activeId = sections[index].id;
            activeTop = rectTop;
          } else {
            break;
          }
        }
        if (lastActiveOutlineId && activeId !== lastActiveOutlineId && Math.abs(threshold - activeTop) < 26) {
          activeId = lastActiveOutlineId;
        }
        setActiveOutline(activeId, false);
        lastActiveOutlineTop = activeTop;
        updateOutlineProgress();
        syncOutlineActiveBars();
        syncReaderOutline();
      }

      function queueArticleOutlineSync() {
        if (outlineScrollTicking) {
          return;
        }
        outlineScrollTicking = true;
        if (layoutRaf) {
          window.cancelAnimationFrame(layoutRaf);
        }
        layoutRaf = window.requestAnimationFrame(function () {
          layoutRaf = 0;
          outlineScrollTicking = false;
          updateActiveOutline();
        });
        if (layoutTimer) {
          window.clearTimeout(layoutTimer);
        }
        layoutTimer = window.setTimeout(function () {
          outlineScrollTicking = false;
          updateActiveOutline();
        }, 220);
      }

      function handleOutlineClick(event) {
        var link = event.target && event.target.closest ? event.target.closest("[data-outline-link]") : null;
        var owner = link && link.closest ? link.closest("[data-aiph-outline], [data-aiph-outline-reader]") : null;
        if (!link || !owner) {
          return;
        }
        var targetId = link.getAttribute("data-outline-link") || "";
        var targetNode = targetId ? document.getElementById(targetId) : null;
        if (!targetNode) {
          return;
        }
        event.preventDefault();
        link.classList.add("is-outline-clicking");
        window.setTimeout(function () {
          link.classList.remove("is-outline-clicking");
        }, 260);
        setActiveOutline(targetId, true);
        scrollToArticleHeading(targetNode);
      }

      for (var bindIndex = 0; bindIndex < outlineCards.length; bindIndex++) {
        outlineCards[bindIndex].addEventListener("click", handleOutlineClick);
      }

      updateActiveOutline();
      window.setTimeout(updateActiveOutline, 120);
      window.setTimeout(updateActiveOutline, 420);
      window.addEventListener("load", queueArticleOutlineSync);
      window.addEventListener("scroll", queueArticleOutlineSync, { passive: true });
      window.addEventListener("resize", queueArticleOutlineSync);
      window.addEventListener("aiph:article-layout-change", queueArticleOutlineSync);
    }

    function bindArticleDynamicCodeBlocks() {
      var pageRoot = document.querySelector(".aiph-single--article");
      var richtext = pageRoot ? pageRoot.querySelector(".wf-product-main-card .aiph-richtext, .aiph-richtext") : null;
      if (!richtext || richtext._aiphCodeObserverBound) {
        return;
      }

      var rerunTimer = 0;
      var scheduleEnhancement = function () {
        window.clearTimeout(rerunTimer);
        rerunTimer = window.setTimeout(function () {
          enhanceArticleRichtext();
          if (typeof window.CustomEvent === "function") {
            window.dispatchEvent(new window.CustomEvent("aiph:article-layout-change"));
          }
        }, 40);
      };

      var observer = new MutationObserver(function (mutations) {
        for (var mutationIndex = 0; mutationIndex < mutations.length; mutationIndex++) {
          var addedNodes = mutations[mutationIndex].addedNodes || [];
          for (var nodeIndex = 0; nodeIndex < addedNodes.length; nodeIndex++) {
            var node = addedNodes[nodeIndex];
            if (!node || node.nodeType !== 1) {
              continue;
            }
            var isPendingPre = node.matches && node.matches("pre:not([data-aiph-code-block]):not([data-aiph-pretext])");
            var containsPendingPre = node.querySelector && node.querySelector("pre:not([data-aiph-code-block]):not([data-aiph-pretext])");
            if (isPendingPre || containsPendingPre) {
              scheduleEnhancement();
              return;
            }
          }
        }
      });

      observer.observe(richtext, { childList: true, subtree: true });
      richtext._aiphCodeObserverBound = true;
      richtext._aiphCodeObserver = observer;
    }

    function bindArticleTagCloudDepth() {
      var cards = document.querySelectorAll("[data-tag-cloud]");
      cards = Array.prototype.slice.call(cards);
      cards = cards.filter(function (card) {
        return !(card && card.closest && card.closest(".nav-theme.nav-theme-v2.single.article .aiph-left-rail--article"));
      });
      if (!cards.length) {
        return;
      }
      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 16);
      };
      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function setupCloud(card) {
        var list = card.querySelector("[data-tag-cloud-list]");
        var items = list ? Array.prototype.slice.call(list.querySelectorAll(".zib-like-tag-cloud__item")) : [];
        if (!list || !items.length) {
          return;
        }

        var hues = [216, 164, 32, 258, 344, 190, 142, 24, 224, 292];
        var depths = [0.92, 0.58, 0.38, 0.74, 0.48, 0.86, 0.42, 0.66, 0.54, 0.78];
        var meta = [];
        var currentX = 0;
        var currentY = 0;
        var targetX = 0;
        var targetY = 0;
        var frame = 0;

        for (var index = 0; index < items.length; index++) {
          var item = items[index];
          var depth = depths[index % depths.length];
          var feature = index === 0 ? 2 : (index % 5 === 0 ? 1 : 0);
          var hue = hues[index % hues.length];
          var scale = 0.985 + depth * 0.035 + feature * 0.012;
          var height = feature === 2 ? 30 : (feature === 1 ? 29 : 28);
          var fontSize = feature === 2 ? 12.4 : (feature === 1 ? 11.8 : 11.5);

          item.style.setProperty("--tag-hue", String(hue));
          item.style.setProperty("--tag-light", (33 + depth * 8).toFixed(1) + "%");
          item.style.setProperty("--tag-bg-alpha", (0.66 + depth * 0.18).toFixed(3));
          item.style.setProperty("--tag-border-alpha", (0.2 + depth * 0.18).toFixed(3));
          item.style.setProperty("--tag-shadow-alpha", (0.035 + depth * 0.045).toFixed(3));
          item.style.setProperty("--tag-shadow-y", (6 + depth * 8).toFixed(1) + "px");
          item.style.setProperty("--tag-shadow-blur", (13 + depth * 10).toFixed(1) + "px");
          item.style.setProperty("--tag-z", (depth * 10).toFixed(1) + "px");
          item.style.setProperty("--tag-layer", String(Math.round(depth * 20) + 1));
          item.style.setProperty("--tag-span", feature === 2 && items.length > 10 ? "2" : "1");
          item.style.setProperty("--tag-scale", scale.toFixed(3));
          item.style.setProperty("--tag-hover-scale", (scale + 0.02).toFixed(3));
          item.style.setProperty("--tag-height", height + "px");
          item.style.setProperty("--tag-pad", (feature === 2 ? 12 : 9) + "px");
          item.style.setProperty("--tag-font-size", fontSize + "px");
          item.style.setProperty("--tag-font-weight", feature === 2 ? "840" : (feature === 1 ? "800" : "760"));
          meta.push({ node: item, depth: depth });
        }

        function applyTransform() {
          frame = 0;
          currentX += (targetX - currentX) * 0.16;
          currentY += (targetY - currentY) * 0.16;
          list.style.setProperty("--cloud-tilt-x", (-currentY * 4.2).toFixed(2) + "deg");
          list.style.setProperty("--cloud-tilt-y", (currentX * 5.4).toFixed(2) + "deg");

          for (var index = 0; index < meta.length; index++) {
            var layer = meta[index];
            var shiftX = currentX * (3 + layer.depth * 9);
            var shiftY = currentY * (2 + layer.depth * 7);
            layer.node.style.setProperty("--tag-shift-x", shiftX.toFixed(2) + "px");
            layer.node.style.setProperty("--tag-shift-y", shiftY.toFixed(2) + "px");
          }

          if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
            frame = raf(applyTransform);
          }
        }

        function queueTransform() {
          if (!frame) {
            frame = raf(applyTransform);
          }
        }

        function setTargetFromPointer(event) {
          if (reducedMotion) {
            return;
          }
          var rect = list.getBoundingClientRect();
          if (!rect.width || !rect.height) {
            return;
          }
          targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
          targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
          queueTransform();
        }

        function resetTarget() {
          targetX = 0;
          targetY = 0;
          queueTransform();
        }

        card.classList.add("is-tag-cloud-ready");
        list.addEventListener("pointerenter", setTargetFromPointer, { passive: true });
        list.addEventListener("pointermove", setTargetFromPointer, { passive: true });
        list.addEventListener("pointerleave", resetTarget, { passive: true });
        window.addEventListener("resize", resetTarget, { passive: true });
      }

      for (var index = 0; index < cards.length; index++) {
        setupCloud(cards[index]);
      }
    }

    function bindWeightedTagCloudScatter() {
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-aiph-tag-sphere]"));
      if (!cards.length) {
        return;
      }

      var raf = window.requestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 16);
      };
      var caf = window.cancelAnimationFrame || window.clearTimeout;
      var desktopQuery = null;
      var reducedMotion = false;
      try {
        desktopQuery = window.matchMedia ? window.matchMedia("(min-width: 961px)") : null;
        reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (error) {
      }

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function fibonacciPoint(index, total) {
        var golden = Math.PI * (3 - Math.sqrt(5));
        var y = 1 - (index / Math.max(1, total - 1)) * 2;
        var radius = Math.sqrt(Math.max(0, 1 - y * y));
        var theta = golden * index;
        return {
          x: Math.cos(theta) * radius,
          y: y,
          z: Math.sin(theta) * radius
        };
      }

      function clearDesktopLayout(card) {
        if (!card) {
          return;
        }
        var scene = card.querySelector("[data-aiph-tag-sphere-scene]");
        if (!scene) {
          return;
        }
        scene.style.removeProperty("--sphere-size");
        scene.style.removeProperty("--sphere-radius");
        scene.style.removeProperty("--sphere-center-x");
        scene.style.removeProperty("--sphere-center-y");
        var items = scene.querySelectorAll(".aiph-iowen-tag-cloud__item--weighted");
        for (var index = 0; index < items.length; index++) {
          var item = items[index];
          item.style.removeProperty("--tag-x");
          item.style.removeProperty("--tag-y");
          item.style.removeProperty("--tag-z");
          item.style.removeProperty("--tag-depth-ratio");
          item.style.removeProperty("--tag-scale");
          item.style.removeProperty("--tag-alpha");
          item.style.removeProperty("--tag-layer");
        }
      }

      function setupCard(card) {
        if (!card || card._aiphTagSphereBound) {
          return;
        }
        card._aiphTagSphereBound = true;
        var sphereMode = String(card.getAttribute("data-aiph-tag-sphere-mode") || "").toLowerCase();
        var isClassicAutoSphere = sphereMode === "classic";
        var scene = card.querySelector("[data-aiph-tag-sphere-scene]");
        if (!scene) {
          return;
        }
        var items = Array.prototype.slice.call(scene.querySelectorAll(".aiph-iowen-tag-cloud__item--weighted"));
        if (!items.length) {
          return;
        }

        var frame = 0;
        var relayoutTimer = 0;
        var idleVX = isClassicAutoSphere ? 0.0054 : 0.0021;
        var idleVY = isClassicAutoSphere ? -0.0018 : -0.0008;
        var pointerMaxVX = 0.046;
        var pointerMaxVY = 0.035;
        var pointerReachRatioX = 0.84;
        var pointerReachRatioY = 0.8;
        var pointerDeadZone = 0.065;
        var targetVX = idleVX;
        var targetVY = idleVY;
        var velocityX = idleVX;
        var velocityY = idleVY;
        var rotateX = -0.24;
        var rotateY = 0.62;
        var pointerInside = false;
        var dragState = null;
        var lastSignature = "";
        var lastPointer = null;
        var classicHoverPause = false;

        card._aiphTagSphereState = {
          get targetVX() { return targetVX; },
          get targetVY() { return targetVY; },
          get velocityX() { return velocityX; },
          get velocityY() { return velocityY; },
          get pointerInside() { return pointerInside; },
          get lastPointer() { return lastPointer; }
        };

        var meta = items.map(function (item, index) {
          var link = item.querySelector(".aiph-iowen-tag--weighted");
          var weight = parseInt(link && link.getAttribute("data-weight") || "4", 10);
          var point = fibonacciPoint(index + 1, items.length + 2);
          return {
            item: item,
            link: link,
            weight: isFinite(weight) ? weight : 4,
            point: point
          };
        });

        function updateSignature() {
          var nextSignature = (scene.clientWidth || 0) + ":" + meta.length;
          if (nextSignature !== lastSignature && typeof window.CustomEvent === "function") {
            lastSignature = nextSignature;
            window.dispatchEvent(new window.CustomEvent("aiph:article-layout-change"));
          } else {
            lastSignature = nextSignature;
          }
        }

        function layoutSphere() {
          if (desktopQuery && !desktopQuery.matches) {
            clearDesktopLayout(card);
            updateSignature();
            return;
          }
          var width = Math.max(scene.clientWidth || 0, 280);
          var compact = width <= 324;
          var configuredMin = parseFloat(card.getAttribute("data-sphere-min-size") || "");
          var configuredMax = parseFloat(card.getAttribute("data-sphere-max-size") || "");
          var radiusRatio = parseFloat(card.getAttribute("data-sphere-radius-ratio") || "");
          var minSize = isFinite(configuredMin) && configuredMin > 0 ? configuredMin : (compact ? 276 : 320);
          var maxSize = isFinite(configuredMax) && configuredMax > 0 ? configuredMax : (compact ? 314 : 360);
          if (maxSize < minSize) {
            var swap = maxSize;
            maxSize = minSize;
            minSize = swap;
          }
          var size = compact ? Math.min(width - 10, maxSize) : Math.min(width - 8, maxSize);
          size = Math.max(minSize, size);
          var radius = size * (isFinite(radiusRatio) && radiusRatio > 0 ? radiusRatio : 0.405);
          var centerX = width * 0.5;
          var centerY = compact ? size * 0.515 : size * 0.495;
          scene.style.setProperty("--sphere-size", size.toFixed(2) + "px");
          scene.style.setProperty("--sphere-radius", radius.toFixed(2) + "px");
          scene.style.setProperty("--sphere-center-x", centerX.toFixed(2) + "px");
          scene.style.setProperty("--sphere-center-y", centerY.toFixed(2) + "px");
          updateSignature();
          renderSphere();
        }

        function projectPoint(point) {
          var cosY = Math.cos(rotateY);
          var sinY = Math.sin(rotateY);
          var x1 = point.x * cosY + point.z * sinY;
          var z1 = point.z * cosY - point.x * sinY;
          var cosX = Math.cos(rotateX);
          var sinX = Math.sin(rotateX);
          var y2 = point.y * cosX - z1 * sinX;
          var z2 = z1 * cosX + point.y * sinX;
          return {
            x: x1,
            y: y2,
            z: z2
          };
        }

        function renderSphere() {
          if (desktopQuery && !desktopQuery.matches) {
            return;
          }
          var radius = parseFloat(scene.style.getPropertyValue("--sphere-radius") || "120");
          var centerX = parseFloat(scene.style.getPropertyValue("--sphere-center-x") || "160");
          var centerY = parseFloat(scene.style.getPropertyValue("--sphere-center-y") || "160");

          for (var index = 0; index < meta.length; index++) {
            var entry = meta[index];
            var projected = projectPoint(entry.point);
            var depth = (projected.z + 1) / 2;
            var scale = 0.69 + depth * 0.66 + (entry.weight >= 8 ? 0.08 : (entry.weight >= 6 ? 0.04 : 0));
            var alpha = 0.42 + depth * 0.58;
            var x = centerX + projected.x * radius;
            var y = centerY + projected.y * radius * 0.88;
            entry.item.style.setProperty("--tag-x", x.toFixed(2) + "px");
            entry.item.style.setProperty("--tag-y", y.toFixed(2) + "px");
            entry.item.style.setProperty("--tag-z", (projected.z * radius * 0.88).toFixed(2) + "px");
            entry.item.style.setProperty("--tag-depth-ratio", depth.toFixed(4));
            entry.item.style.setProperty("--tag-scale", scale.toFixed(3));
            entry.item.style.setProperty("--tag-alpha", alpha.toFixed(3));
            entry.item.style.setProperty("--tag-layer", String(Math.round(depth * 100) + 10));
          }
        }

        function tick() {
          frame = 0;
          if (desktopQuery && !desktopQuery.matches) {
            return;
          }
          if (isClassicAutoSphere && classicHoverPause) {
            frame = raf(tick);
            return;
          }
          if (isClassicAutoSphere) {
            targetVX = idleVX;
            targetVY = idleVY;
          }
          velocityX += (targetVX - velocityX) * (pointerInside ? 0.28 : 0.072);
          velocityY += (targetVY - velocityY) * (pointerInside ? 0.28 : 0.072);
          rotateY += velocityX;
          rotateX = clamp(rotateX + velocityY, -0.9, 0.9);
          if (!isClassicAutoSphere && !pointerInside && !dragState) {
            targetVX = idleVX;
            targetVY = idleVY;
          }
          renderSphere();
          frame = raf(tick);
        }

        function queueTick() {
          if (!frame) {
            frame = raf(tick);
          }
        }

        function queueRelayout() {
          window.clearTimeout(relayoutTimer);
          relayoutTimer = window.setTimeout(layoutSphere, 40);
        }

        function applyPointerVelocity(offsetX, offsetY) {
          var sphereSize = parseFloat(scene.style.getPropertyValue("--sphere-size") || String(Math.max(scene.clientWidth || 0, 320)));
          var sphereRadius = parseFloat(scene.style.getPropertyValue("--sphere-radius") || String(sphereSize * 0.405));
          var reachX = Math.max(sphereRadius * 1.66, sphereSize * pointerReachRatioX, 240);
          var reachY = Math.max(sphereRadius * 1.52, sphereSize * pointerReachRatioY, 220);
          var nx = clamp(offsetX / reachX, -1, 1);
          var ny = clamp(offsetY / reachY, -1, 1);
          var distance = clamp(Math.sqrt(nx * nx + ny * ny), 0, 1);
          if (distance <= pointerDeadZone) {
            targetVX = 0;
            targetVY = 0;
            return;
          }
          targetVX = clamp(nx * pointerMaxVX, -pointerMaxVX, pointerMaxVX);
          targetVY = clamp(ny * pointerMaxVY, -pointerMaxVY, pointerMaxVY);
        }

        function setTargetFromPointer(event) {
          if (reducedMotion || !scene || dragState) {
            return;
          }
          lastPointer = {
            x: event.clientX,
            y: event.clientY
          };
          var rect = scene.getBoundingClientRect();
          var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
          var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
          if (!rect.width || !rect.height || !viewportWidth || !viewportHeight) {
            return;
          }
          pointerInside = true;
          var centerX = parseFloat(scene.style.getPropertyValue("--sphere-center-x") || String(rect.width * 0.5));
          var centerY = parseFloat(scene.style.getPropertyValue("--sphere-center-y") || String(rect.height * 0.5));
          var centerViewportX = rect.left + centerX;
          var centerViewportY = rect.top + centerY;
          var offsetX = event.clientX - centerViewportX;
          var offsetY = event.clientY - centerViewportY;
          applyPointerVelocity(offsetX, offsetY);
          queueTick();
        }

        function resetPointer() {
          pointerInside = false;
          lastPointer = null;
          targetVX = idleVX;
          targetVY = idleVY;
          queueTick();
        }

        function startDrag(event) {
          if (desktopQuery && !desktopQuery.matches) {
            return;
          }
          dragState = {
            x: event.clientX,
            y: event.clientY
          };
          pointerInside = true;
          scene.classList.add("is-dragging");
        }

        function moveDrag(event) {
          if (!dragState) {
            return;
          }
          var dx = event.clientX - dragState.x;
          var dy = event.clientY - dragState.y;
          dragState.x = event.clientX;
          dragState.y = event.clientY;
          rotateY += dx * 0.0085;
          rotateX = clamp(rotateX + dy * 0.007, -1.0, 1.0);
          targetVX = clamp(dx * 0.0011, -pointerMaxVX, pointerMaxVX);
          targetVY = clamp(dy * 0.00092, -pointerMaxVY, pointerMaxVY);
          queueTick();
        }

        function endDrag() {
          if (!dragState) {
            return;
          }
          dragState = null;
          scene.classList.remove("is-dragging");
          if (lastPointer && !reducedMotion) {
            setTargetFromPointer({
              clientX: lastPointer.x,
              clientY: lastPointer.y
            });
          } else {
            resetPointer();
          }
        }

        layoutSphere();
        queueTick();
        if (isClassicAutoSphere) {
          scene.addEventListener("mouseenter", function () {
            classicHoverPause = true;
          });
          scene.addEventListener("mouseleave", function () {
            classicHoverPause = false;
            queueTick();
          });
        } else {
          scene.addEventListener("pointerdown", startDrag);
          window.addEventListener("mousemove", setTargetFromPointer, { passive: true });
          window.addEventListener("pointermove", setTargetFromPointer, { passive: true });
          window.addEventListener("pointermove", moveDrag, { passive: true });
          window.addEventListener("pointerup", endDrag, { passive: true });
          window.addEventListener("blur", resetPointer);
          document.addEventListener("mouseout", function (event) {
            if (!event.relatedTarget && !event.toElement) {
              resetPointer();
            }
          }, { passive: true });
        }
        window.addEventListener("resize", queueRelayout, { passive: true });
        window.addEventListener("load", layoutSphere);
        window.addEventListener("aiph:article-layout-change", queueRelayout);
      }

      for (var index = 0; index < cards.length; index++) {
        setupCard(cards[index]);
      }
    }

    function bindSidebarGlassHover() {
      var cards = Array.prototype.slice.call(document.querySelectorAll(
        ".nav-theme.nav-theme-v2.single.article .aiph-side-widget--article-switcher .aiph-side-article-card, " +
        ".nav-theme.nav-theme-v2.single.article .aiph-side-widget--tool-switcher .aiph-side-tool-card, " +
        ".nav-theme.nav-theme-v2.single.article .aiph-side-widget--tag-cloud.aiph-side-widget--tag-chip-list .aiph-hot-tag-list__item"
      ));
      if (document.body && document.body.matches(".nav-theme.nav-theme-v2.single.article.is-single-article-news.is-single-download-news, .nav-theme.nav-theme-v2.single.article.is-single-article-news.is-single-tool-article")) {
        cards.forEach(function (card) {
          card.classList.remove("is-glass-tilt-card", "is-glass-hovering");
          card.removeAttribute("data-aiph-glass-bound");
          resetCard(card, false);
        });
        return;
      }
      if (document.body && document.body.matches(".nav-theme.nav-theme-v2.single.article.is-single-article-news:not(.is-single-download-news):not(.is-single-tool-article)")) {
        cards = cards.filter(function (card) {
          return !card.closest(".aiph-left-rail--article") && !card.closest(".aiph-sidebar--article-outline");
        });
      }
      if (!cards.length) {
        return;
      }

      var desktopQuery = null;
      var reducedMotion = false;
      try {
        desktopQuery = window.matchMedia ? window.matchMedia("(min-width: 961px)") : null;
        reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (error) {
      }

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function isDesktopActive() {
        return !(desktopQuery && !desktopQuery.matches);
      }

      function getGlassProfile(card) {
        var isTag = card && card.classList.contains("aiph-hot-tag-list__item");
        var isArticle = card && card.classList.contains("aiph-side-article-card");
        var isTool = card && card.classList.contains("aiph-side-tool-card");
        if (isTag) {
          return {
            shadowY: 14,
            shadowScale: 1.18,
            glowOpacity: 0.56,
            shadowOpacity: 0.38,
            tiltXStrength: 6.8,
            tiltYStrength: 10.4,
            sheenTravelX: 22,
            sheenTravelY: 12,
            shadowTravelX: 12
          };
        }
        if (isArticle) {
          return {
            shadowY: 16,
            shadowScale: 1.22,
            glowOpacity: 0.54,
            shadowOpacity: 0.44,
            tiltXStrength: 7.6,
            tiltYStrength: 11.6,
            sheenTravelX: 26,
            sheenTravelY: 14,
            shadowTravelX: 16
          };
        }
        if (isTool) {
          return {
            shadowY: 13,
            shadowScale: 1.18,
            glowOpacity: 0.52,
            shadowOpacity: 0.40,
            tiltXStrength: 6.9,
            tiltYStrength: 10.8,
            sheenTravelX: 24,
            sheenTravelY: 13,
            shadowTravelX: 14
          };
        }
        return {
          shadowY: 12,
          shadowScale: 1.15,
          glowOpacity: 0.54,
          shadowOpacity: 0.38,
          tiltXStrength: 6.8,
          tiltYStrength: 10.6,
          sheenTravelX: 24,
          sheenTravelY: 13,
          shadowTravelX: 13
        };
      }

      function resetCard(card, keepHovering) {
        if (!card) {
          return;
        }
        var profile = getGlassProfile(card);
        if (!keepHovering) {
          card.classList.remove("is-glass-hovering");
        }
        card.style.setProperty("--glass-tilt-x-offset", "0deg");
        card.style.setProperty("--glass-tilt-y-offset", "0deg");
        card.style.setProperty("--glass-sheen-x", "0px");
        card.style.setProperty("--glass-sheen-y", "0px");
        card.style.setProperty("--glass-shadow-x", "0px");
        card.style.setProperty("--glass-shadow-y", profile.shadowY + "px");
        card.style.setProperty("--glass-shadow-scale", profile.shadowScale.toFixed(3));
        card.style.setProperty("--glass-glow-opacity", profile.glowOpacity.toFixed(3));
        card.style.setProperty("--glass-shadow-opacity", profile.shadowOpacity.toFixed(3));
      }

      function applyVector(card, clientX, clientY) {
        if (!card || !isDesktopActive()) {
          return;
        }
        var rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return;
        }

        var px = clamp((clientX - rect.left) / rect.width, 0, 1);
        var py = clamp((clientY - rect.top) / rect.height, 0, 1);
        var nx = px * 2 - 1;
        var ny = py * 2 - 1;
        var profile = getGlassProfile(card);

        card.style.setProperty("--glass-tilt-x-offset", ((-ny) * profile.tiltXStrength).toFixed(2) + "deg");
        card.style.setProperty("--glass-tilt-y-offset", (nx * profile.tiltYStrength).toFixed(2) + "deg");
        card.style.setProperty("--glass-sheen-x", ((px - 0.5) * profile.sheenTravelX).toFixed(2) + "px");
        card.style.setProperty("--glass-sheen-y", ((py - 0.34) * profile.sheenTravelY).toFixed(2) + "px");
        card.style.setProperty("--glass-shadow-x", (nx * profile.shadowTravelX).toFixed(2) + "px");
        card.style.setProperty("--glass-shadow-y", (profile.shadowY + (1 - py) * 11).toFixed(2) + "px");
        card.style.setProperty("--glass-shadow-scale", (profile.shadowScale + Math.abs(nx) * 0.12 + Math.max(0, -ny) * 0.10).toFixed(3));
        card.style.setProperty("--glass-glow-opacity", (profile.glowOpacity + Math.max(0, -ny) * 0.08).toFixed(3));
        card.style.setProperty("--glass-shadow-opacity", (profile.shadowOpacity + Math.abs(nx) * 0.08 + Math.max(0, -ny) * 0.10).toFixed(3));
      }

      function setCardActive(card, event) {
        if (!card) {
          return;
        }
        card.classList.add("is-glass-hovering");
        if (reducedMotion || !isDesktopActive()) {
          return;
        }
        if (event && typeof event.clientX === "number" && typeof event.clientY === "number") {
          applyVector(card, event.clientX, event.clientY);
          return;
        }
        var rect = card.getBoundingClientRect();
        applyVector(card, rect.left + rect.width * 0.5, rect.top + rect.height * 0.34);
      }

      for (var index = 0; index < cards.length; index++) {
        (function (card) {
          if (!card || card.getAttribute("data-aiph-glass-bound") === "1") {
            return;
          }
          card.setAttribute("data-aiph-glass-bound", "1");
          card.classList.add("is-glass-tilt-card");
          resetCard(card, true);

          card.addEventListener("pointerenter", function (event) {
            setCardActive(card, event);
          }, { passive: true });

          card.addEventListener("pointermove", function (event) {
            if (reducedMotion || !isDesktopActive()) {
              return;
            }
            setCardActive(card, event);
          }, { passive: true });

          card.addEventListener("pointerleave", function () {
            resetCard(card, false);
          }, { passive: true });

          card.addEventListener("pointercancel", function () {
            resetCard(card, false);
          }, { passive: true });

          card.addEventListener("focus", function () {
            setCardActive(card);
          }, { passive: true });

          card.addEventListener("blur", function () {
            resetCard(card, false);
          }, { passive: true });
        })(cards[index]);
      }

      window.addEventListener("resize", function () {
        for (var index = 0; index < cards.length; index++) {
          if (!isDesktopActive()) {
            resetCard(cards[index], false);
          } else if (!cards[index].classList.contains("is-glass-hovering")) {
            resetCard(cards[index], true);
          }
        }
      }, { passive: true });
    }

    function bindTagLogoCloud() {
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-tag-logo-cloud]"));
      if (!cards.length) {
        return;
      }

      var desktopQuery = null;
      try {
        desktopQuery = window.matchMedia ? window.matchMedia("(min-width: 961px)") : null;
      } catch (error) {
      }

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function clearDesktopLayout(card) {
        if (!card) {
          return;
        }
        var stage = card.querySelector(".tag-index-logo-cloud__stage");
        var scene = card.querySelector("[data-tag-logo-cloud-scene]");
        if (stage) {
          stage.style.removeProperty("--logo-stage-height");
          stage.removeAttribute("data-cloud-ready");
        }
        if (!scene) {
          return;
        }
        var items = scene.querySelectorAll(".tag-index-logo-cloud__item");
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          item.style.removeProperty("--tag-x");
          item.style.removeProperty("--tag-y");
          item.style.removeProperty("--tag-angle");
          item.style.removeProperty("--tag-scale");
          item.style.removeProperty("--tag-layer");
          item.style.removeProperty("--tag-opacity");
          item.style.removeProperty("--tag-accent-alpha");
        }
      }

      function buildHeartProfile(width, height) {
        var w = Math.max(1, width);
        var h = Math.max(1, height);
        return {
          width: w,
          height: h,
          centerX: w * 0.5,
          centerY: h * 0.5,
          inside: function (x, y) {
            var nx = (x - this.centerX) / (w * 0.42);
            var ny = (y - h * 0.5) / (h * 0.42);
            var value = Math.pow(nx * nx + ny * ny - 1, 3) - (nx * nx * Math.pow(-ny, 3));
            return value <= 0;
          },
          hollow: function () {
            return false;
          }
        };
      }

      function intersects(a, b, gap) {
        return !(
          (a.x + a.width + gap) <= b.x ||
          (b.x + b.width + gap) <= a.x ||
          (a.y + a.height + gap) <= b.y ||
          (b.y + b.height + gap) <= a.y
        );
      }

      function canPlace(mask, rect, placed, gap) {
        var samplePoints = [
          [0.5, 0.5],
          [0.15, 0.5],
          [0.85, 0.5],
          [0.5, 0.15],
          [0.5, 0.85]
        ];
        for (var p = 0; p < samplePoints.length; p++) {
          var point = samplePoints[p];
          var px = rect.x + rect.width * point[0];
          var py = rect.y + rect.height * point[1];
          if (!mask.inside(px, py) || mask.hollow(px, py)) {
            return false;
          }
        }
        for (var i = 0; i < placed.length; i++) {
          if (intersects(rect, placed[i], gap)) {
            return false;
          }
        }
        return true;
      }

      function buildHeartCells(mask, itemsCount) {
        var cells = [];
        var rows = 34;
        var maxCells = Math.max(itemsCount * 3, 720);
        for (var row = 0; row < rows; row++) {
          var yRatio = rows === 1 ? 0.5 : row / (rows - 1);
          var y = mask.height * (0.06 + yRatio * 0.88);
          var cols = 44;
          var rowCells = [];
          for (var col = 0; col < cols; col++) {
            var xRatio = cols === 1 ? 0.5 : col / (cols - 1);
            var x = mask.width * (0.04 + xRatio * 0.92);
            if (!mask.inside(x, y)) {
              continue;
            }
            var nx = (x - mask.centerX) / (mask.width * 0.5);
            var ny = (y - mask.centerY) / (mask.height * 0.5);
            var distance = Math.sqrt(nx * nx + ny * ny);
            rowCells.push({
              x: clamp(x + (((row + col) % 2 === 0 ? -1 : 1) * 3), 0, mask.width),
              y: clamp(y + (((col % 3) - 1) * 2), 0, mask.height),
              boxWidth: 30 + Math.max(0, 1 - distance) * 42,
              boxHeight: 12 + Math.max(0, 1 - distance) * 14,
              distance: distance,
              priority: distance,
              order: row * 100 + col
            });
          }
          if (row % 2 === 1) {
            rowCells.reverse();
          }
          cells = cells.concat(rowCells);
        }
        cells.sort(function (a, b) {
          if (Math.abs(a.priority - b.priority) > 0.03) {
            return a.priority - b.priority;
          }
          return ((a.order * 37) % 113) - ((b.order * 37) % 113);
        });
        return cells.slice(0, maxCells);
      }

      function setupCard(card) {
        if (!card || card._tagLogoCloudBound) {
          return;
        }
        card._tagLogoCloudBound = true;

        var stage = card.querySelector(".tag-index-logo-cloud__stage");
        var scene = card.querySelector("[data-tag-logo-cloud-scene]");
        if (!stage || !scene) {
          return;
        }
        var items = Array.prototype.slice.call(scene.querySelectorAll(".tag-index-logo-cloud__item"));
        if (!items.length) {
          return;
        }

        function layoutCard() {
          if (desktopQuery && !desktopQuery.matches) {
            clearDesktopLayout(card);
            return;
          }

          var stageWidth = Math.max(stage.clientWidth || 0, 640);
          var stageHeight = clamp(Math.round(stageWidth * 0.58), 520, 710);
          var maskWidth = Math.round(stageWidth * 0.82);
          var maskHeight = Math.round(stageHeight * 0.92);
          var offsetX = Math.round((stageWidth - maskWidth) * 0.5);
          var offsetY = Math.round((stageHeight - maskHeight) * 0.28);
          var mask = buildHeartProfile(maskWidth, maskHeight);
          var cells = buildHeartCells(mask, items.length);

          stage.style.setProperty("--logo-stage-height", stageHeight + "px");

          var layoutItems = items.map(function (item, index) {
            var link = item.querySelector(".tag-index-logo-cloud__tag");
            item.style.setProperty("--tag-opacity", "0");
            var weight = parseInt(link && link.getAttribute("data-weight") || "4", 10) || 4;
            var rank = parseInt(link && link.getAttribute("data-rank-index") || String(index), 10) || index;
            var text = (link ? link.textContent : item.textContent || "").trim();
            return {
              item: item,
              link: link,
              weight: weight,
              rank: rank,
              index: index,
              text: text,
              length: text ? text.length : 0,
              tone: 0.18 + (weight / 9) * 0.62,
              size: parseFloat((item.style && item.style.getPropertyValue("--tag-size")) || "10") || 10
            };
          });

          layoutItems.sort(function (a, b) {
            if (b.size !== a.size) {
              return b.size - a.size;
            }
            if (b.weight !== a.weight) {
              return b.weight - a.weight;
            }
            if (b.length !== a.length) {
              return b.length - a.length;
            }
            return a.rank - b.rank;
          });

          for (var index = 0; index < layoutItems.length; index++) {
            var entry = layoutItems[index];
            var linkNode = entry.link;
            if (!linkNode) {
              continue;
            }

            var boxWidth = Math.ceil(linkNode.offsetWidth || linkNode.getBoundingClientRect().width || 42);
            var boxHeight = Math.ceil(linkNode.offsetHeight || linkNode.getBoundingClientRect().height || 10);
            var isVertical = false;
            var rectWidth = boxWidth;
            var rectHeight = boxHeight;
            var placedCell = null;
            var fitScale = 1;
            for (var c = 0; c < cells.length; c++) {
              var cell = cells[c];
              isVertical = false;
              rectWidth = boxWidth;
              rectHeight = boxHeight;
              fitScale = Math.min(cell.boxWidth / Math.max(1, rectWidth), cell.boxHeight / Math.max(1, rectHeight), 1);
              if (entry.weight >= 8 && fitScale < 0.76) {
                continue;
              }
              if (entry.weight >= 6 && fitScale < 0.62) {
                continue;
              }
              if (fitScale < 0.45) {
                continue;
              }
              placedCell = cell;
              cells.splice(c, 1);
              if (isVertical) {
                fitScale = Math.min(fitScale, 0.94);
              }
              break;
            }

            if (!placedCell) {
              for (var fallbackIndex = 0; fallbackIndex < cells.length; fallbackIndex++) {
                var fallbackCell = cells[fallbackIndex];
                isVertical = false;
                rectWidth = boxWidth;
                rectHeight = boxHeight;
                fitScale = Math.min(fallbackCell.boxWidth / Math.max(1, rectWidth), fallbackCell.boxHeight / Math.max(1, rectHeight), 1);
                if (fitScale < 0.38) {
                  continue;
                }
                placedCell = fallbackCell;
                cells.splice(fallbackIndex, 1);
                break;
              }
            }

            if (!placedCell) {
              continue;
            }

            var absoluteX = offsetX + placedCell.x;
            var absoluteY = offsetY + placedCell.y;
            var depthX = (absoluteX - stageWidth * 0.5) / Math.max(1, stageWidth * 0.5);
            var depthY = (absoluteY - stageHeight * 0.5) / Math.max(1, stageHeight * 0.5);
            var depthDistance = Math.sqrt(depthX * depthX + depthY * depthY);
            var scale = clamp(0.9 - depthDistance * 0.03 + (entry.weight >= 8 ? 0.03 : 0), 0.7, 1);
            var anglePalette = [-28, -20, -13, -7, 0, 6, 11, 17, 24, 31];
            var angle = entry.weight >= 8 ? (entry.index % 2 === 0 ? -4 : 3) : anglePalette[(entry.index + Math.round(depthDistance * 10)) % anglePalette.length];
            var inkAlpha = clamp(entry.tone - depthDistance * 0.04, 0.26, 0.9);
            var finalScale = clamp(scale * fitScale, 0.34, 1);

            entry.item.style.setProperty("--tag-x", absoluteX.toFixed(2) + "px");
            entry.item.style.setProperty("--tag-y", absoluteY.toFixed(2) + "px");
            entry.item.style.setProperty("--tag-angle", angle.toFixed(2) + "deg");
            entry.item.style.setProperty("--tag-scale", finalScale.toFixed(3));
            entry.item.style.setProperty("--tag-fit-scale", fitScale.toFixed(3));
            entry.item.style.setProperty("--tag-layer", String(80 - Math.round(depthDistance * 22) + entry.weight));
            entry.item.style.setProperty("--tag-opacity", "1");
            entry.item.style.setProperty("--tag-ink-alpha", inkAlpha.toFixed(3));
          }

          stage.setAttribute("data-cloud-ready", "1");
        }

        var relayoutTimer = 0;
        function queueLayout() {
          window.clearTimeout(relayoutTimer);
          relayoutTimer = window.setTimeout(layoutCard, 36);
        }

        layoutCard();
        window.addEventListener("resize", queueLayout, { passive: true });
        window.addEventListener("load", queueLayout);
      }

      for (var i = 0; i < cards.length; i++) {
        setupCard(cards[i]);
      }
    }

    function bindTagHeartCloud() {
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-tag-logo-cloud]"));
      if (!cards.length) {
        return;
      }

      var desktopQuery = null;
      try {
        desktopQuery = window.matchMedia ? window.matchMedia("(min-width: 961px)") : null;
      } catch (error) {
      }

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function clearLayout(card) {
        var stage = card.querySelector(".tag-index-logo-cloud__stage");
        var scene = card.querySelector("[data-tag-logo-cloud-scene]");
        if (stage) {
          stage.style.removeProperty("--logo-stage-height");
          stage.removeAttribute("data-cloud-ready");
        }
        if (!scene) {
          return;
        }
        var items = scene.querySelectorAll(".tag-index-logo-cloud__item");
        for (var i = 0; i < items.length; i++) {
          items[i].style.removeProperty("--tag-x");
          items[i].style.removeProperty("--tag-y");
          items[i].style.removeProperty("--tag-angle");
          items[i].style.removeProperty("--tag-scale");
          items[i].style.removeProperty("--tag-layer");
          items[i].style.removeProperty("--tag-opacity");
          items[i].style.removeProperty("--tag-fit-scale");
          items[i].style.removeProperty("--tag-ink-alpha");
        }
      }

      function buildHeartRows(stageWidth, stageHeight) {
        var heartWidth = Math.min(stageWidth * 0.84, 960);
        var heartHeight = Math.min(stageHeight * 0.78, 560);
        var centerX = stageWidth * 0.5;
        var topY = stageHeight * 0.13;
          var rows = [];
          var rowCount = 27;
        for (var row = 0; row < rowCount; row++) {
          var ratio = rowCount === 1 ? 0.5 : row / (rowCount - 1);
          var spanRatio = 0;
          if (ratio < 0.11) {
            spanRatio = 0.22 + ratio * 3.5;
          } else if (ratio < 0.24) {
            spanRatio = 0.46 + Math.sin((ratio - 0.11) / 0.13 * Math.PI) * 0.46;
          } else if (ratio < 0.47) {
            spanRatio = 0.92 + Math.sin((ratio - 0.24) / 0.23 * Math.PI) * 0.08;
          } else {
            spanRatio = Math.max(0.06, 1 - Math.pow((ratio - 0.47) / 0.53, 1.36));
          }
          var topCleft = ratio < 0.2 ? (1 - ratio / 0.2) * heartWidth * 0.1 : 0;
          var span = heartWidth * spanRatio - topCleft;
          rows.push({
            index: row,
            ratio: ratio,
            y: topY + ratio * heartHeight,
            left: centerX - span * 0.5,
            right: centerX + span * 0.5,
            priority: Math.abs(ratio - 0.52)
          });
        }
        return rows;
      }

      function setupCard(card) {
        if (!card || card._tagHeartCloudBound) {
          return;
        }
        card._tagHeartCloudBound = true;
        var stage = card.querySelector(".tag-index-logo-cloud__stage");
        var scene = card.querySelector("[data-tag-logo-cloud-scene]");
        if (!stage || !scene) {
          return;
        }
        var nodes = Array.prototype.slice.call(scene.querySelectorAll(".tag-index-logo-cloud__item"));
        if (!nodes.length) {
          return;
        }

        function layout() {
          if (desktopQuery && !desktopQuery.matches) {
            clearLayout(card);
            return;
          }
          var stageWidth = Math.max(stage.clientWidth || 0, 680);
          var stageHeight = clamp(Math.round(stageWidth * 0.56), 560, 700);
          stage.style.setProperty("--logo-stage-height", stageHeight + "px");

          var items = nodes.map(function (item, index) {
            var link = item.querySelector(".tag-index-logo-cloud__tag");
            var weight = parseInt(link && link.getAttribute("data-weight") || "4", 10) || 4;
            var size = parseFloat((item.style && item.style.getPropertyValue("--tag-size")) || "14") || 14;
            var text = (link ? link.textContent : item.textContent || "").trim();
            item.style.setProperty("--tag-opacity", "0");
            return {
              item: item,
              link: link,
              index: index,
              weight: weight,
              size: size,
              text: text,
              width: Math.ceil(link && (link.offsetWidth || link.getBoundingClientRect().width) || 48)
            };
          }).filter(function (entry) {
            return !!entry.link;
          });

          items.sort(function (a, b) {
            if (b.weight !== a.weight) {
              return b.weight - a.weight;
            }
            if (b.size !== a.size) {
              return b.size - a.size;
            }
            return a.index - b.index;
          });

          var rows = buildHeartRows(stageWidth, stageHeight);

          var itemCursor = 0;
          var angleSet = [-18, -12, -7, -3, 0, 4, 8, 13, 18];
          for (var rowIndex = 0; rowIndex < rows.length && itemCursor < items.length; rowIndex++) {
            var row = rows[rowIndex];
            var available = Math.max(80, row.right - row.left);
            var x = row.left;
            var slots = [];
            while (itemCursor < items.length && x < row.right - 8) {
              var entry = items[itemCursor];
              var central = row.ratio > 0.35 && row.ratio < 0.68;
              var scale = central && entry.weight >= 8 ? 1.08 : (entry.weight <= 3 ? 0.88 : 0.96);
              var wordWidth = entry.width * scale;
              var gap = clamp(7 - row.ratio * 3 + ((slots.length + row.index) % 3), 3, 8);
              if (slots.length > 0 && x + wordWidth > row.right) {
                break;
              }
              slots.push({
                entry: entry,
                x: x + wordWidth * 0.5,
                y: row.y + (((slots.length + row.index) % 3) - 1) * 3,
                scale: scale,
                angle: central && entry.weight >= 8 ? 0 : angleSet[(row.index * 5 + slots.length * 3) % angleSet.length],
                layer: 120 - Math.abs(Math.round((row.ratio - 0.52) * 80))
              });
              x += wordWidth + gap;
              itemCursor++;
            }
            var rowWidth = slots.length ? (slots[slots.length - 1].x - slots[0].x) : 0;
            var offset = (available - rowWidth) * 0.5 - (slots.length ? (slots[0].x - row.left) : 0);
            if (row.index % 2 === 1) {
              slots.reverse();
            }
            for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
              var slot = slots[slotIndex];
              var alpha = clamp(0.64 + slot.entry.weight * 0.04, 0.7, 1);
              slot.entry.item.style.setProperty("--tag-x", (slot.x + offset).toFixed(2) + "px");
              slot.entry.item.style.setProperty("--tag-y", slot.y.toFixed(2) + "px");
              slot.entry.item.style.setProperty("--tag-angle", slot.angle.toFixed(2) + "deg");
              slot.entry.item.style.setProperty("--tag-scale", clamp(slot.scale, 0.76, 1.12).toFixed(3));
              slot.entry.item.style.setProperty("--tag-layer", String(slot.layer + slot.entry.weight));
              slot.entry.item.style.setProperty("--tag-opacity", "1");
              slot.entry.item.style.setProperty("--tag-ink-alpha", alpha.toFixed(3));
            }
          }

          stage.setAttribute("data-cloud-ready", "1");
        }

        var timer = 0;
        function queueLayout() {
          window.clearTimeout(timer);
          timer = window.setTimeout(layout, 40);
        }

        layout();
        window.addEventListener("resize", queueLayout, { passive: true });
        window.addEventListener("load", queueLayout);
      }

      for (var i = 0; i < cards.length; i++) {
        setupCard(cards[i]);
      }
    }

    function bindWfArticleArchive() {
      var filter = document.querySelector("[data-wf-article-filter]");
      var grid = document.querySelector(".wf-article-grid");
      var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll(".wf-article-card")) : [];
      var params = new URLSearchParams(window.location.search || "");
      var sort = params.get("sort") || "new";
      var syncMediaPriority = function () {
        if (!grid) {
          return;
        }
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        var images = Array.prototype.slice.call(grid.querySelectorAll(".wf-article-card__media img"));
        var promoted = 0;
        images.forEach(function (img) {
          var rect = img.getBoundingClientRect();
          var visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < viewportHeight + 80;
          if (visible && promoted < 3) {
            img.setAttribute("loading", "eager");
            if (!String(img.getAttribute("fetchpriority") || "").toLowerCase()) {
              img.setAttribute("fetchpriority", "high");
            }
            promoted += 1;
          } else {
            img.setAttribute("loading", "lazy");
            if (String(img.getAttribute("fetchpriority") || "").toLowerCase() === "high") {
              img.removeAttribute("fetchpriority");
            }
          }
        });
      };
      if (filter) {
        var sortLinks = filter.querySelectorAll("[data-wf-sort]");
        for (var sortIndex = 0; sortIndex < sortLinks.length; sortIndex++) {
          var linkSort = sortLinks[sortIndex].getAttribute("data-wf-sort") || "default";
          sortLinks[sortIndex].classList.toggle("is-active", linkSort === sort);
          sortLinks[sortIndex].addEventListener("click", function (event) {
            var nextSort = this.getAttribute("data-wf-sort") || "default";
            var url = new URL(window.location.href);
            if (nextSort === "default") {
              url.searchParams.delete("sort");
            } else {
              url.searchParams.set("sort", nextSort);
            }
            url.searchParams.delete("page");
            event.preventDefault();
            window.location.href = url.toString();
          });
        }
      }
      if (grid && cards.length && sort !== "default" && sort !== "elite") {
        var sorted = cards.slice();
        if (sort === "hot") {
          sorted.sort(function (a, b) {
            return (parseInt(b.getAttribute("data-wf-click") || "0", 10) || 0) - (parseInt(a.getAttribute("data-wf-click") || "0", 10) || 0);
          });
        } else if (sort === "new") {
          sorted.sort(function (a, b) {
            return (parseInt(b.getAttribute("data-wf-date") || "0", 10) || 0) - (parseInt(a.getAttribute("data-wf-date") || "0", 10) || 0);
          });
        } else if (sort === "random") {
          sorted.sort(function () {
            return Math.random() - 0.5;
          });
        }
        for (var cardIndex = 0; cardIndex < sorted.length; cardIndex++) {
          grid.appendChild(sorted[cardIndex]);
        }
      }
      if (grid && cards.length) {
        syncMediaPriority();
        window.setTimeout(syncMediaPriority, 120);
        window.addEventListener("load", syncMediaPriority);
      }
    }

    function bindWfArticleTilt3d() {
      if (!window.matchMedia || !window.requestAnimationFrame) {
        return;
      }
      var desktopQuery = window.matchMedia("(min-width: 961px)");
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-wf-article-tilt]"));
      if (document.body && document.body.matches(".nav-theme.nav-theme-v2.single.article.is-single-article-news:not(.is-single-download-news):not(.is-single-tool-article)")) {
        cards = cards.filter(function (card) {
          return !card.closest(".aiph-left-rail--article");
        });
      }
      if (!cards.length) {
        return;
      }
      var reducedMotion = false;
      try {
        reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (error) {
      }

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function lerp(start, end, alpha) {
        return start + (end - start) * alpha;
      }

      function isDesktopActive() {
        return !!(desktopQuery && desktopQuery.matches);
      }

      function createRestState(itemCount) {
        var itemStates = [];
        for (var i = 0; i < itemCount; i++) {
          itemStates.push({
            z: 0,
            scale: 1,
            shiftX: 0,
            shiftY: 0,
            tiltX: 0,
            tiltY: 0
          });
        }
        return {
          active: false,
          tiltX: 0,
          tiltY: 0,
          scale: 1,
          glareX: 50,
          glareY: 32,
          glareOpacity: 0,
          shadowOpacity: 0,
          shadowShiftX: 0,
          shadowShiftY: 18,
          itemStates: itemStates
        };
      }

      function measureStateDistance(currentState, targetState) {
        var delta = Math.max(
          Math.abs(currentState.tiltX - targetState.tiltX),
          Math.abs(currentState.tiltY - targetState.tiltY),
          Math.abs(currentState.scale - targetState.scale),
          Math.abs(currentState.glareX - targetState.glareX),
          Math.abs(currentState.glareY - targetState.glareY),
          Math.abs(currentState.glareOpacity - targetState.glareOpacity),
          Math.abs(currentState.shadowOpacity - targetState.shadowOpacity),
          Math.abs(currentState.shadowShiftX - targetState.shadowShiftX),
          Math.abs(currentState.shadowShiftY - targetState.shadowShiftY)
        );
        for (var i = 0; i < currentState.itemStates.length; i++) {
          var currentItem = currentState.itemStates[i];
          var targetItem = targetState.itemStates[i];
          if (!currentItem || !targetItem) {
            continue;
          }
          delta = Math.max(
            delta,
            Math.abs(currentItem.z - targetItem.z),
            Math.abs(currentItem.scale - targetItem.scale),
            Math.abs(currentItem.shiftX - targetItem.shiftX),
            Math.abs(currentItem.shiftY - targetItem.shiftY),
            Math.abs(currentItem.tiltX - targetItem.tiltX),
            Math.abs(currentItem.tiltY - targetItem.tiltY)
          );
        }
        return delta;
      }

      function applyState(card, items, state) {
        if (state.active) {
          card.classList.add("is-tilt-active");
        } else {
          card.classList.remove("is-tilt-active");
        }
        card.style.setProperty("--wf-article-tilt-x", state.tiltX.toFixed(2) + "deg");
        card.style.setProperty("--wf-article-tilt-y", state.tiltY.toFixed(2) + "deg");
        card.style.setProperty("--wf-article-tilt-scale", state.scale.toFixed(4));
        card.style.setProperty("--wf-article-glare-x", state.glareX.toFixed(1) + "%");
        card.style.setProperty("--wf-article-glare-y", state.glareY.toFixed(1) + "%");
        card.style.setProperty("--wf-article-glare-opacity", state.glareOpacity.toFixed(3));
        card.style.setProperty("--wf-article-shadow-opacity", state.shadowOpacity.toFixed(3));
        card.style.setProperty("--wf-article-shadow-shift-x", state.shadowShiftX.toFixed(2) + "px");
        card.style.setProperty("--wf-article-shadow-shift-y", state.shadowShiftY.toFixed(2) + "px");
        for (var i = 0; i < items.length; i++) {
          var itemState = state.itemStates[i];
          if (!itemState) {
            continue;
          }
          items[i].style.setProperty("--wf-article-item-z", itemState.z.toFixed(2) + "px");
          items[i].style.setProperty("--wf-article-item-scale", itemState.scale.toFixed(4));
          items[i].style.setProperty("--wf-article-item-shift-x", itemState.shiftX.toFixed(2) + "px");
          items[i].style.setProperty("--wf-article-item-shift-y", itemState.shiftY.toFixed(2) + "px");
          items[i].style.setProperty("--wf-article-item-tilt-x", itemState.tiltX.toFixed(2) + "deg");
          items[i].style.setProperty("--wf-article-item-tilt-y", itemState.tiltY.toFixed(2) + "deg");
        }
      }

      function buildTargetState(card, items, event) {
        var state = createRestState(items.length);
        if (!event || typeof event.clientX !== "number" || typeof event.clientY !== "number") {
          return state;
        }
        var rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return state;
        }
        var x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        var y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        var xFromCenter = x - 0.5;
        var yFromCenter = y - 0.5;
        state.active = true;
        state.tiltY = xFromCenter * 14;
        state.tiltX = -yFromCenter * 10;
        state.scale = 1.012 + Math.abs(xFromCenter) * 0.006 + Math.max(0, -yFromCenter) * 0.004;
        state.glareX = x * 100;
        state.glareY = y * 100;
        state.glareOpacity = 0.72 + Math.max(0, -yFromCenter) * 0.16;
        state.shadowOpacity = 1;
        state.shadowShiftX = xFromCenter * 70;
        state.shadowShiftY = 34 + Math.abs(yFromCenter) * 32;
        for (var i = 0; i < items.length; i++) {
          var baseDepth = parseFloat(items[i].getAttribute("data-wf-article-tilt-item") || "0") || 0;
          var depth = baseDepth * 1.42;
          var horizontalBoost = 1;
          if (items[i].classList.contains("wf-article-card__headline-row")) {
            horizontalBoost = 1.4;
          } else if (items[i].classList.contains("wf-article-card__summary")) {
            horizontalBoost = 1.28;
          }
          state.itemStates[i].z = depth;
          state.itemStates[i].scale = 1 + depth / 2400;
          state.itemStates[i].shiftX = xFromCenter * (depth / 3.2) * horizontalBoost;
          state.itemStates[i].shiftY = yFromCenter * (depth / 4.4);
          state.itemStates[i].tiltY = xFromCenter * (depth / 150);
          state.itemStates[i].tiltX = -yFromCenter * (depth / 170);
        }
        return state;
      }

      function resetCard(card) {
        card.classList.remove("is-tilt-active");
        card.style.setProperty("--wf-article-tilt-x", "0deg");
        card.style.setProperty("--wf-article-tilt-y", "0deg");
        card.style.setProperty("--wf-article-tilt-scale", "1");
        card.style.setProperty("--wf-article-glare-opacity", "0");
        card.style.setProperty("--wf-article-shadow-opacity", "0");
        card.style.setProperty("--wf-article-shadow-shift-x", "0px");
        card.style.setProperty("--wf-article-shadow-shift-y", "18px");
        var items = card.querySelectorAll("[data-wf-article-tilt-item]");
        for (var i = 0; i < items.length; i++) {
          items[i].style.setProperty("--wf-article-item-z", "0px");
          items[i].style.setProperty("--wf-article-item-scale", "1");
          items[i].style.setProperty("--wf-article-item-shift-x", "0px");
          items[i].style.setProperty("--wf-article-item-shift-y", "0px");
          items[i].style.setProperty("--wf-article-item-tilt-x", "0deg");
          items[i].style.setProperty("--wf-article-item-tilt-y", "0deg");
        }
      }

      function bindCard(card) {
        var rafId = 0;
        var hovering = false;
        var items = Array.prototype.slice.call(card.querySelectorAll("[data-wf-article-tilt-item]"));
        var currentState = createRestState(items.length);
        var targetState = createRestState(items.length);

        function queueRender() {
          if (!rafId) {
            rafId = window.requestAnimationFrame(render);
          }
        }

        function render() {
          rafId = 0;
          var follow = hovering ? 0.18 : 0.14;
          currentState.tiltX = lerp(currentState.tiltX, targetState.tiltX, follow);
          currentState.tiltY = lerp(currentState.tiltY, targetState.tiltY, follow);
          currentState.scale = lerp(currentState.scale, targetState.scale, follow);
          currentState.glareX = lerp(currentState.glareX, targetState.glareX, follow);
          currentState.glareY = lerp(currentState.glareY, targetState.glareY, follow);
          currentState.glareOpacity = lerp(currentState.glareOpacity, targetState.glareOpacity, follow);
          currentState.shadowOpacity = lerp(currentState.shadowOpacity, targetState.shadowOpacity, follow);
          currentState.shadowShiftX = lerp(currentState.shadowShiftX, targetState.shadowShiftX, follow);
          currentState.shadowShiftY = lerp(currentState.shadowShiftY, targetState.shadowShiftY, follow);
          for (var i = 0; i < items.length; i++) {
            var currentItem = currentState.itemStates[i];
            var targetItem = targetState.itemStates[i];
            if (!currentItem || !targetItem) {
              continue;
            }
            currentItem.z = lerp(currentItem.z, targetItem.z, follow);
            currentItem.scale = lerp(currentItem.scale, targetItem.scale, follow);
            currentItem.shiftX = lerp(currentItem.shiftX, targetItem.shiftX, follow);
            currentItem.shiftY = lerp(currentItem.shiftY, targetItem.shiftY, follow);
            currentItem.tiltX = lerp(currentItem.tiltX, targetItem.tiltX, follow);
            currentItem.tiltY = lerp(currentItem.tiltY, targetItem.tiltY, follow);
          }
          var delta = measureStateDistance(currentState, targetState);
          currentState.active = hovering || delta > 0.03;
          applyState(card, items, currentState);
          if (delta > 0.03) {
            queueRender();
          } else if (!hovering) {
            currentState = createRestState(items.length);
            targetState = createRestState(items.length);
            resetCard(card);
          }
        }

        function activateFromEvent(event) {
          if (!isDesktopActive()) {
            resetCard(card);
            return;
          }
          hovering = true;
          targetState = buildTargetState(card, items, event);
          queueRender();
        }

        function settleCard() {
          hovering = false;
          targetState = createRestState(items.length);
          queueRender();
        }

        card.addEventListener("mousemove", function (event) {
          activateFromEvent(event);
        });
        card.addEventListener("mouseenter", function (event) {
          activateFromEvent(event);
        });
        card.addEventListener("mouseleave", function () {
          settleCard();
        });
        card.addEventListener("focus", function () {
          if (!isDesktopActive()) {
            return;
          }
          var rect = card.getBoundingClientRect();
          activateFromEvent({
            clientX: rect.left + rect.width * 0.5,
            clientY: rect.top + rect.height * 0.34
          });
        });
        card.addEventListener("blur", function () {
          settleCard();
        }, true);
        resetCard(card);
      }

      for (var i = 0; i < cards.length; i++) {
        bindCard(cards[i]);
      }

      window.addEventListener("resize", function () {
        if (isDesktopActive()) {
          return;
        }
        for (var i = 0; i < cards.length; i++) {
          resetCard(cards[i]);
        }
      }, { passive: true });
    }

    function buildWfPageJumpUrl(form, page) {
      var mode = (form.getAttribute("data-wf-page-mode") || "query").toLowerCase();
      if (mode === "path") {
        var base = (form.getAttribute("data-wf-page-base") || "").trim();
        if (!base) {
          base = window.location.pathname.replace(/_\d+$/, "");
        }
        base = base.replace(/\/+$/, "");
        if (!base) {
          base = "/";
        }
        return page <= 1 ? base : (base + "_" + page);
      }
      var pagebar = form.closest("[data-wf-pagebar]") || form.closest(".pagebar");
      if (pagebar) {
        if (page <= 1) {
          var firstPageLink = null;
          var numberedLinks = pagebar.querySelectorAll(".pagination a[href]");
          for (var n = 0; n < numberedLinks.length; n++) {
            if ((numberedLinks[n].textContent || "").trim() === "1") {
              firstPageLink = numberedLinks[n].getAttribute("href") || "";
              break;
            }
          }
          if (firstPageLink) {
            try {
              return new URL(firstPageLink, window.location.origin).toString();
            } catch (error) {
            }
          }
        }
        var paginationLinks = pagebar.querySelectorAll(".pagination a[href]");
        if (paginationLinks.length) {
          var candidate = null;
          for (var i = 0; i < paginationLinks.length; i++) {
            var href = paginationLinks[i].getAttribute("href") || "";
            if (/([?&]page=|_\d+(?:\/|$|[?#])|\/page\/\d+(?:\/|$|[?#]))/i.test(href)) {
              candidate = href;
              break;
            }
          }
          if (!candidate) {
            candidate = paginationLinks[paginationLinks.length - 1].getAttribute("href") || "";
          }
          if (candidate) {
            try {
              var candidateUrl = new URL(candidate, window.location.origin);
              if (candidateUrl.searchParams.has("page")) {
                if (page <= 1) {
                  candidateUrl.searchParams.delete("page");
                } else {
                  candidateUrl.searchParams.set("page", String(page));
                }
                return candidateUrl.toString();
              }
            } catch (error) {
            }
            if (/_\d+(?:\/|$|[?#])/i.test(candidate)) {
              var hashIndex = candidate.indexOf("#");
              var hash = "";
              if (hashIndex >= 0) {
                hash = candidate.slice(hashIndex);
                candidate = candidate.slice(0, hashIndex);
              }
              var queryIndex = candidate.indexOf("?");
              var query = "";
              if (queryIndex >= 0) {
                query = candidate.slice(queryIndex);
                candidate = candidate.slice(0, queryIndex);
              }
              var eyouListMatch = candidate.match(/^(.*\/)list_(\d+)_(\d+)(\/?)$/i);
              if (eyouListMatch) {
                return (page <= 1 ? eyouListMatch[1] : (eyouListMatch[1] + "list_" + eyouListMatch[2] + "_" + page + (eyouListMatch[4] || "/"))) + query + hash;
              }
              var underscoreMatch = candidate.match(/^(.*_)(\d+)(\/?$)/i);
              if (underscoreMatch) {
                return (page <= 1 ? underscoreMatch[1].replace(/_$/i, "") : (underscoreMatch[1] + page + (underscoreMatch[3] || ""))) + query + hash;
              }
            }
            if (/\/page\/\d+(?:\/|$|[?#])/i.test(candidate)) {
              var pathHashIndex = candidate.indexOf("#");
              var pathHash = "";
              if (pathHashIndex >= 0) {
                pathHash = candidate.slice(pathHashIndex);
                candidate = candidate.slice(0, pathHashIndex);
              }
              var pathQueryIndex = candidate.indexOf("?");
              var pathQuery = "";
              if (pathQueryIndex >= 0) {
                pathQuery = candidate.slice(pathQueryIndex);
                candidate = candidate.slice(0, pathQueryIndex);
              }
              var pagePathMatch = candidate.match(/^(.*\/page\/)(\d+)(\/?$)/i);
              if (pagePathMatch) {
                return (page <= 1 ? pagePathMatch[1].replace(/page\/$/i, "") : (pagePathMatch[1] + page + (pagePathMatch[3] || ""))) + pathQuery + pathHash;
              }
            }
          }
        }
      }
      var paramName = (form.getAttribute("data-wf-page-param") || "page").trim() || "page";
      var url = new URL(window.location.href);
      if (page <= 1) {
        url.searchParams.delete(paramName);
      } else {
        url.searchParams.set(paramName, String(page));
      }
      return url.toString();
    }

    function bindWfPageJump() {
      var forms = document.querySelectorAll("[data-wf-page-jump]");
      if (!forms.length) {
        return;
      }
      for (var i = 0; i < forms.length; i++) {
        (function (form) {
          if (form.getAttribute("data-wf-page-jump-bound") === "1") {
            return;
          }
          form.setAttribute("data-wf-page-jump-bound", "1");
          form.addEventListener("submit", function (event) {
            event.preventDefault();
            var input = form.querySelector("input");
            var page = input ? parseInt(input.value || "1", 10) : 1;
            if (!page || page < 1) {
              page = 1;
            }
            window.location.href = buildWfPageJumpUrl(form, page);
          });
        })(forms[i]);
      }
    }

    function enhanceMobileWfPagination() {
      var isNarrow = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
      if (!isNarrow) {
        return;
      }
      var pagers = document.querySelectorAll("[data-wf-pagebar]");
      if (!pagers.length) {
        return;
      }
      for (var i = 0; i < pagers.length; i++) {
        var pager = pagers[i];
        if (pager.getAttribute("data-wf-mobile-pager-ready") === "1") {
          continue;
        }
        pager.setAttribute("data-wf-mobile-pager-ready", "1");
        var pagination = pager.querySelector(".pagination");
        if (!pagination) {
          continue;
        }
        var jumpForm = pager.querySelector("[data-wf-page-jump]");
        var inferPageNumberFromHref = function (href) {
          var value = String(href || "");
          if (!value) {
            return 0;
          }
          var queryMatch = value.match(/[?&]page=(\d+)/i);
          if (queryMatch) {
            return parseInt(queryMatch[1], 10) || 0;
          }
          var pathMatch = value.match(/\/page\/(\d+)(?:\/|$|[?#])/i);
          if (pathMatch) {
            return parseInt(pathMatch[1], 10) || 0;
          }
          var underscoreMatch = value.match(/_(\d+)(?:\/|$|[?#])/i);
          if (underscoreMatch) {
            return parseInt(underscoreMatch[1], 10) || 0;
          }
          return 0;
        };
        var inferTotalPages = function () {
          var explicitTotal = parseInt(pager.getAttribute("data-wf-total-pages") || "0", 10) || 0;
          if (explicitTotal > 0) {
            return explicitTotal;
          }
          var jumpInput = jumpForm ? jumpForm.querySelector("input[max]") : null;
          var inputTotal = jumpInput ? (parseInt(jumpInput.getAttribute("max") || "0", 10) || 0) : 0;
          if (inputTotal > 0) {
            return inputTotal;
          }
          var maxTextPage = 0;
          var rawItems = pagination.querySelectorAll("a, span, strong");
          for (var rawIndex = 0; rawIndex < rawItems.length; rawIndex++) {
            var rawText = (rawItems[rawIndex].textContent || "").replace(/[^\d]/g, "");
            var rawPage = parseInt(rawText || "0", 10) || 0;
            if (rawPage > maxTextPage) {
              maxTextPage = rawPage;
            }
          }
          var edgeLink = pagination.querySelector("a.end[href], a[href].end");
          var edgePage = edgeLink ? inferPageNumberFromHref(edgeLink.getAttribute("href") || "") : 0;
          return Math.max(maxTextPage, edgePage);
        };
        var items = pagination.querySelectorAll("a, span, strong");
        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          var text = (item.textContent || "").replace(/\s+/g, "").trim();
          if (!text) {
            continue;
          }
          if (text === "上一页" || text === "下一页" || text === "<" || text === ">") {
            item.classList.add("wf-page-item--nav");
          }
          if (text === "首页" || text === "末页") {
            item.classList.add("wf-page-item--edge");
          }
        }
        var current = pagination.querySelector(".now-page, .active a, .thisclass, .is-current, strong");
        var totalPages = inferTotalPages();
        var currentIndex = -1;
        var currentPage = 1;
        if (jumpForm) {
          var jumpInputSync = jumpForm.querySelector("input");
          if (jumpInputSync && totalPages > 0) {
            jumpInputSync.setAttribute("max", String(totalPages));
          }
        }
        if (current) {
          currentPage = parseInt((current.textContent || "").replace(/[^\d]/g, ""), 10) || 1;
          var currentLi = current.closest ? current.closest("li") : null;
          if (currentLi) {
            var allLis = pagination.querySelectorAll("li");
            for (var liIndex = 0; liIndex < allLis.length; liIndex++) {
              if (allLis[liIndex] === currentLi) {
                currentIndex = liIndex;
                break;
              }
            }
          }
        }
        var listItems = pagination.querySelectorAll("li");
        for (var itemIndex = 0; itemIndex < listItems.length; itemIndex++) {
          listItems[itemIndex].classList.remove("wf-page-item--compact-hidden");
        }
        if (currentIndex >= 0 && listItems.length > 7) {
          if (pagination.getAttribute("data-wf-mobile-pagination-built") !== "1" && totalPages > 1) {
            var navPrev = null;
            var navNext = null;
            for (var navIndex = 0; navIndex < listItems.length; navIndex++) {
              var navText = (listItems[navIndex].textContent || "").replace(/\s+/g, "").trim();
              if (!navPrev && (navText === "上一页" || navText === "<")) {
                navPrev = listItems[navIndex];
              } else if (!navNext && (navText === "下一页" || navText === ">")) {
                navNext = listItems[navIndex];
              }
            }
            var makeEllipsis = function () {
              var li = document.createElement("li");
              li.className = "wf-page-item--ellipsis";
              li.innerHTML = '<span class="wf-page-item--ellipsis-text">…</span>';
              return li;
            };
            var pageHrefMap = {};
            var pageRelMap = {};
            var normalizeGeneratedPagerRel = function (rel, href) {
              var relValue = String(rel || "").trim();
              var hrefValue = String(href || "");
              var body = document.body;
              var isSearchLikePage = !!(body && (body.classList.contains("is-search-results") || body.classList.contains("is-tag-search-results")));
              var needsNofollow = isSearchLikePage && hrefValue && hrefValue !== "#" && (hrefValue.indexOf("?") !== -1 || /\/search\.html\?/i.test(hrefValue));
              if (needsNofollow && !/(^|\s)nofollow(\s|$)/i.test(relValue)) {
                relValue = (relValue ? relValue + " " : "") + "nofollow";
              }
              return relValue;
            };
            var buildPageItem = function (pageNumber) {
              var li = document.createElement("li");
              if (pageNumber === currentPage) {
                li.innerHTML = '<span class="now-page">' + pageNumber + '</span>';
                return li;
              }
              var href = pageHrefMap[pageNumber] || "#";
              var anchor = document.createElement("a");
              anchor.setAttribute("href", href);
              anchor.textContent = String(pageNumber);
              var rel = normalizeGeneratedPagerRel(pageRelMap[pageNumber], href);
              if (rel) {
                anchor.setAttribute("rel", rel);
              }
              li.appendChild(anchor);
              return li;
            };
            var desiredPages = [];
            if (totalPages <= 5) {
              for (var fullPage = 1; fullPage <= totalPages; fullPage++) {
                desiredPages.push(fullPage);
              }
            } else if (currentPage <= 3) {
              desiredPages = [1, 2, 3, 4, totalPages];
            } else if (currentPage >= totalPages - 2) {
              desiredPages = [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
              desiredPages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
            }
            var uniquePages = [];
            for (var pageIndex = 0; pageIndex < desiredPages.length; pageIndex++) {
              var pageValue = desiredPages[pageIndex];
              if (pageValue < 1 || pageValue > totalPages) {
                continue;
              }
              if (uniquePages.indexOf(pageValue) === -1) {
                uniquePages.push(pageValue);
              }
            }
            uniquePages.sort(function (a, b) { return a - b; });
            var sourcePageLinks = pagination.querySelectorAll("a[href]");
            for (var sourceLinkIndex = 0; sourceLinkIndex < sourcePageLinks.length; sourceLinkIndex++) {
              var sourceLink = sourcePageLinks[sourceLinkIndex];
              var sourcePage = inferPageNumberFromHref(sourceLink.getAttribute("href") || "");
              if (!sourcePage) {
                sourcePage = parseInt((sourceLink.textContent || "").replace(/[^\d]/g, ""), 10) || 0;
              }
              if (!sourcePage) {
                continue;
              }
              pageHrefMap[sourcePage] = pageHrefMap[sourcePage] || sourceLink.getAttribute("href") || "";
              var sourceRel = (sourceLink.getAttribute("rel") || "").trim();
              if (sourceRel) {
                pageRelMap[sourcePage] = sourceRel;
              }
            }
            for (var hrefIndex = 0; hrefIndex < uniquePages.length; hrefIndex++) {
              var targetPage = uniquePages[hrefIndex];
              if (targetPage !== currentPage && jumpForm) {
                pageHrefMap[targetPage] = buildWfPageJumpUrl(jumpForm, targetPage);
              }
            }
            pagination.innerHTML = "";
            if (navPrev) {
              pagination.appendChild(navPrev);
            }
            for (var pageCursor = 0; pageCursor < uniquePages.length; pageCursor++) {
              if (pageCursor > 0 && uniquePages[pageCursor] - uniquePages[pageCursor - 1] > 1) {
                pagination.appendChild(makeEllipsis());
              }
              pagination.appendChild(buildPageItem(uniquePages[pageCursor]));
            }
            if (navNext && navNext !== navPrev) {
              pagination.appendChild(navNext);
            }
            pagination.setAttribute("data-wf-mobile-pagination-built", "1");
          } else {
            for (var compactIndex = 0; compactIndex < listItems.length; compactIndex++) {
              var compactItem = listItems[compactIndex];
              var compactControl = compactItem.querySelector(".wf-page-item--nav, .wf-page-item--edge");
              if (compactIndex === 0 || compactIndex === listItems.length - 1) {
                continue;
              }
              if (compactControl && compactControl.classList.contains("wf-page-item--nav")) {
                continue;
              }
              if (Math.abs(compactIndex - currentIndex) > 2) {
                compactItem.classList.add("wf-page-item--compact-hidden");
              }
            }
          }
        }
        if (current) {
          pagination.setAttribute("data-wf-mobile-compact", "1");
        }
      }
    }

    function bindMobileArchiveFilters() {
      var filters = document.querySelectorAll(".wf-archive-filter.wf-nav-filter");
      if (!filters.length) {
        return;
      }
      var mobileQuery = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;

      var isMobile = function () {
        return !!(mobileQuery && mobileQuery.matches);
      };

      var setExpanded = function (filter, expanded) {
        filter.classList.toggle("is-mobile-filter-expanded", !!expanded);
        var toggleButton = filter.querySelector(".wf-archive-filter__mobile-toggle");
        if (toggleButton) {
          toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
          toggleButton.setAttribute("aria-label", expanded ? "收起筛选" : "展开筛选");
        }
      };

      var applyFilterMode = function (filter) {
        var mobile = isMobile();
        filter.classList.toggle("is-mobile-filter-collapsible", mobile);
        if (!mobile) {
          filter.classList.remove("is-mobile-filter-expanded");
        }
        var toggleButton = filter.querySelector(".wf-archive-filter__mobile-toggle");
        if (toggleButton) {
          toggleButton.hidden = !mobile;
          toggleButton.setAttribute("aria-expanded", mobile && filter.classList.contains("is-mobile-filter-expanded") ? "true" : "false");
          toggleButton.setAttribute("aria-label", mobile && filter.classList.contains("is-mobile-filter-expanded") ? "收起筛选" : "展开筛选");
        }
      };

      for (var i = 0; i < filters.length; i++) {
        (function (filter) {
          var rows = filter.querySelectorAll(".wf-archive-filter__row");
          if (!rows.length) {
            return;
          }
          var firstRow = rows[0];
          var firstLinks = firstRow.querySelector(".wf-archive-filter__links");
          if (!firstLinks) {
            return;
          }
          var shouldCollapse = rows.length > 1 || firstLinks.children.length > 3;
          if (!shouldCollapse) {
            return;
          }
          var toggleButton = firstRow.querySelector(".wf-archive-filter__mobile-toggle");
          if (!toggleButton) {
            toggleButton = document.createElement("button");
            toggleButton.className = "wf-archive-filter__mobile-toggle";
            toggleButton.type = "button";
            toggleButton.hidden = true;
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.setAttribute("aria-label", "展开筛选");
            toggleButton.innerHTML = '<span class="wf-archive-filter__mobile-toggle-icon" aria-hidden="true"></span>';
            firstRow.appendChild(toggleButton);
          }
          if (toggleButton.getAttribute("data-wf-mobile-filter-bound") !== "1") {
            toggleButton.setAttribute("data-wf-mobile-filter-bound", "1");
            toggleButton.addEventListener("click", function () {
              setExpanded(filter, !filter.classList.contains("is-mobile-filter-expanded"));
            });
          }
          applyFilterMode(filter);
        })(filters[i]);
      }

      var refreshAll = function () {
        for (var j = 0; j < filters.length; j++) {
          applyFilterMode(filters[j]);
        }
      };
      if (mobileQuery) {
        if (mobileQuery.addEventListener) {
          mobileQuery.addEventListener("change", refreshAll);
        } else if (mobileQuery.addListener) {
          mobileQuery.addListener(refreshAll);
        }
      }
    }

    function bindHomeMobileFilters() {
      var shells = document.querySelectorAll(".directory-browser--home .directory-showcase[data-subpanel-shell]");
      if (!shells.length) {
        return;
      }
      var mobileQuery = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;

      var isMobile = function () {
        return !!(mobileQuery && mobileQuery.matches);
      };

      var setExpanded = function (shell, expanded) {
        if (!shell || !shell.classList) {
          return;
        }
        shell.classList.toggle("is-home-mobile-filter-expanded", !!expanded);
        var toggleButton = shell.querySelector("[data-home-mobile-filter-toggle]");
        if (toggleButton) {
          toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
          toggleButton.setAttribute("aria-label", expanded ? "收起分类" : "展开分类");
        }
      };

      var applyShellMode = function (shell) {
        if (!shell || !shell.classList) {
          return;
        }
        var filter = shell.querySelector(".directory-showcase__filterbar > .section-filter--subtabs-joly");
        var actions = shell.querySelector(".directory-showcase__filterbar > .directory-showcase__actions");
        var toggleButton = shell.querySelector("[data-home-mobile-filter-toggle]");
        if (!filter || !actions || !toggleButton) {
          return;
        }
        var links = filter.querySelectorAll("a");
        var mobile = isMobile();
        var shouldCollapse = links.length > 3;
        shell.classList.toggle("is-home-mobile-filter-collapsible", mobile && shouldCollapse);
        if (!mobile || !shouldCollapse) {
          shell.classList.remove("is-home-mobile-filter-expanded");
        }
        toggleButton.hidden = !(mobile && shouldCollapse);
        toggleButton.setAttribute("aria-expanded", mobile && shell.classList.contains("is-home-mobile-filter-expanded") ? "true" : "false");
        toggleButton.setAttribute("aria-label", mobile && shell.classList.contains("is-home-mobile-filter-expanded") ? "收起分类" : "展开分类");
        actions.classList.toggle("has-mobile-filter-toggle", mobile && shouldCollapse);
      };

      for (var i = 0; i < shells.length; i++) {
        (function (shell) {
          var toggleButton = shell.querySelector("[data-home-mobile-filter-toggle]");
          if (!toggleButton) {
            return;
          }
          if (toggleButton.getAttribute("data-home-mobile-filter-bound") !== "1") {
            toggleButton.setAttribute("data-home-mobile-filter-bound", "1");
            toggleButton.addEventListener("click", function () {
              setExpanded(shell, !shell.classList.contains("is-home-mobile-filter-expanded"));
            });
          }
          applyShellMode(shell);
        })(shells[i]);
      }

      var refreshAll = function () {
        for (var j = 0; j < shells.length; j++) {
          applyShellMode(shells[j]);
        }
      };
      if (mobileQuery) {
        if (mobileQuery.addEventListener) {
          mobileQuery.addEventListener("change", refreshAll);
        } else if (mobileQuery.addListener) {
          mobileQuery.addListener(refreshAll);
        }
      }
    }

    function bindWfArticleActions() {
      var likeButton = document.querySelector("[data-wf-like]");
      var favoriteButton = document.querySelector("[data-wf-favorite]");
      var shareWrap = document.querySelector("[data-wf-share-wrap]");
      var shareButton = shareWrap ? shareWrap.querySelector("[data-wf-share]") : document.querySelector("[data-wf-share]");
      var sharePopover = shareWrap ? shareWrap.querySelector("[data-wf-share-popover]") : null;
      if (likeButton) {
        var likeKey = likeButton.getAttribute("data-wf-like-key") || ("article:" + window.location.pathname + window.location.search);
        var likeStorageKey = "wogaosuni_article_like_" + likeKey;
        var savedLike = false;
        try {
          savedLike = window.localStorage.getItem(likeStorageKey) === "1";
        } catch (error) {
        }
        likeButton.classList.toggle("is-active", savedLike);
        var initialCountNode = likeButton.querySelector("em");
        if (initialCountNode && savedLike) {
          initialCountNode.textContent = String(Math.max(1, parseInt(initialCountNode.textContent || "0", 10) || 0));
        }
        likeButton.addEventListener("click", function () {
          var countNode = likeButton.querySelector("em");
          var count = countNode ? parseInt(countNode.textContent || "0", 10) || 0 : 0;
          likeButton.classList.toggle("is-active");
          try {
            window.localStorage.setItem(likeStorageKey, likeButton.classList.contains("is-active") ? "1" : "0");
          } catch (error) {
          }
          if (countNode) {
            countNode.textContent = String(Math.max(0, count + (likeButton.classList.contains("is-active") ? 1 : -1)));
          }
          showShareToast(likeButton.classList.contains("is-active") ? "已点赞" : "已取消点赞");
        });
      }
      if (shareButton && sharePopover) {
        var shareTitle = document.title || "";
        var shareUrl = shareButton.getAttribute("data-share-url") || window.location.href;
        if (!/^https?:\/\//i.test(shareUrl)) {
          try {
            shareUrl = new URL(shareUrl, window.location.origin).href;
          } catch (error) {
            shareUrl = window.location.href;
          }
        }
        var encodedUrl = encodeURIComponent(shareUrl);
        var encodedTitle = encodeURIComponent(shareTitle);
        var qzone = sharePopover.querySelector('[data-share-platform="qzone"]');
        var weibo = sharePopover.querySelector('[data-share-platform="weibo"]');
        var qq = sharePopover.querySelector('[data-share-platform="qq"]');
        var copyButton = sharePopover.querySelector("[data-share-copy]");
        if (qzone) {
          qzone.href = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodedUrl + "&title=" + encodedTitle;
        }
        if (weibo) {
          weibo.href = "https://service.weibo.com/share/share.php?url=" + encodedUrl + "&title=" + encodedTitle;
        }
        if (qq) {
          qq.href = "https://connect.qq.com/widget/shareqq/index.html?url=" + encodedUrl + "&title=" + encodedTitle;
        }
        function setShareOpen(open) {
          shareWrap.classList.toggle("is-open", !!open);
          shareButton.setAttribute("aria-expanded", open ? "true" : "false");
        }
        shareButton.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          setShareOpen(!shareWrap.classList.contains("is-open"));
        });
        if (copyButton) {
          copyButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            copyTextToClipboard(shareUrl).then(function () {
              showShareToast("链接已复制");
            }).catch(function () {
              showShareToast("复制失败，请手动复制");
            });
          });
        }
        sharePopover.addEventListener("click", function (event) {
          event.stopPropagation();
        });
        document.addEventListener("click", function (event) {
          if (!shareWrap.contains(event.target)) {
            setShareOpen(false);
          }
        });
      }
      if (favoriteButton) {
        favoriteButton.addEventListener("click", function (event) {
          event.preventDefault();
          favoriteButton.classList.toggle("is-active");
          showShareToast("CTRL+D快速添加浏览器收藏");
        });
      }
    }

    function fitArticleHeroTitle() {
      if (!document.body || !document.body.classList.contains("is-single-article-news") || document.body.classList.contains("is-single-tool-article") || document.body.classList.contains("is-single-download-news")) {
        return;
      }
      var titles = document.querySelectorAll(".wf-article-main-card.article-reader-card .aiph-article-headline h1");
      for (var i = 0; i < titles.length; i++) {
        var title = titles[i];
        var wrap = title.closest ? title.closest(".aiph-article-headline") : title.parentNode;
        if (!wrap) {
          continue;
        }
        title.classList.remove("is-title-fit-wrapped");
        title.style.removeProperty("--wf-article-title-fit-size");
        var previousWhiteSpace = title.style.getPropertyValue("white-space");
        var previousWhiteSpacePriority = title.style.getPropertyPriority("white-space");
        var previousTextWrap = title.style.getPropertyValue("text-wrap");
        var previousTextWrapPriority = title.style.getPropertyPriority("text-wrap");
        var previousOverflowWrap = title.style.getPropertyValue("overflow-wrap");
        var previousOverflowWrapPriority = title.style.getPropertyPriority("overflow-wrap");
        title.style.setProperty("white-space", "nowrap", "important");
        title.style.setProperty("text-wrap", "nowrap", "important");
        title.style.setProperty("overflow-wrap", "normal", "important");
        var wrapWidth = Math.floor(wrap.clientWidth || wrap.getBoundingClientRect().width || 0);
        if (!wrapWidth) {
          if (previousWhiteSpace) {
            title.style.setProperty("white-space", previousWhiteSpace, previousWhiteSpacePriority || "");
          } else {
            title.style.removeProperty("white-space");
          }
          if (previousTextWrap) {
            title.style.setProperty("text-wrap", previousTextWrap, previousTextWrapPriority || "");
          } else {
            title.style.removeProperty("text-wrap");
          }
          if (previousOverflowWrap) {
            title.style.setProperty("overflow-wrap", previousOverflowWrap, previousOverflowWrapPriority || "");
          } else {
            title.style.removeProperty("overflow-wrap");
          }
          continue;
        }
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
        var maxSize = viewportWidth <= 767 ? 30 : (viewportWidth < 1280 ? 34 : 38);
        var minSize = viewportWidth <= 390 ? 21 : (viewportWidth <= 767 ? 22 : (viewportWidth < 1280 ? 26 : 23));
        var fitted = maxSize;
        title.style.setProperty("--wf-article-title-fit-size", fitted + "px");
        for (var step = 0; step < 18 && title.scrollWidth > wrapWidth + 1 && fitted > minSize; step++) {
          fitted -= 1;
          title.style.setProperty("--wf-article-title-fit-size", fitted + "px");
        }
        if (title.scrollWidth > wrapWidth + 1) {
          if (previousWhiteSpace) {
            title.style.setProperty("white-space", previousWhiteSpace, previousWhiteSpacePriority || "");
          } else {
            title.style.removeProperty("white-space");
          }
          if (previousTextWrap) {
            title.style.setProperty("text-wrap", previousTextWrap, previousTextWrapPriority || "");
          } else {
            title.style.removeProperty("text-wrap");
          }
          if (previousOverflowWrap) {
            title.style.setProperty("overflow-wrap", previousOverflowWrap, previousOverflowWrapPriority || "");
          } else {
            title.style.removeProperty("overflow-wrap");
          }
          title.classList.add("is-title-fit-wrapped");
        }
      }
    }

    enhanceArticleRichtext();
    bindArticleGuessCard();
    bindArticleOutline();
    bindArticleDynamicCodeBlocks();
    bindArticleTagCloudDepth();
    bindWeightedTagCloudScatter();
    bindSidebarGlassHover();
    bindWfArticleArchive();
    bindWfArticleTilt3d();
    bindWfPageJump();
    enhanceMobileWfPagination();
    bindMobileArchiveFilters();
    bindHomeMobileFilters();
    bindWfArticleActions();
    fitArticleHeroTitle();
    bindDownloadPasswordCopy();
    bindGenericCopyActions();
    bindEyouDownloadButtons();
    bindDownloadInlineHistory();
    bindDownloadHistoryModal();
    syncDownloadCardButtonWidths();
    bindToolDetailShareCopy();
    bindSearchKeywordGuards();
    bindFastTooltipEvents();
    syncHomeCustomMobileToolbar();
    window.addEventListener("resize", fitArticleHeroTitle, { passive: true });
    window.addEventListener("load", fitArticleHeroTitle, { passive: true });
    window.addEventListener("resize", syncHomeCustomMobileToolbar, { passive: true });
    window.addEventListener("load", syncHomeCustomMobileToolbar, { passive: true });
    window.addEventListener("aiph:article-layout-change", fitArticleHeroTitle);
    window.addEventListener("resize", syncDownloadCardButtonWidths, { passive: true });
    hydrateFastTooltips(document);
  });
})();
