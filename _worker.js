// src/render.gen.js
var __m = (function() {
  "use strict";
  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c) {
      return ESC[c];
    });
  }
  function safeJson(o) {
    return JSON.stringify(o).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  function L(o, lang) {
    if (!o) return "";
    if (typeof o === "string") return o;
    return o[lang] || o.tr || o.en || "";
  }
  function fmtNum(n) {
    var v = Number(n);
    if (!isFinite(v)) return "";
    return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(v);
  }
  function fmtPrice(n) {
    return fmtNum(n) + "\xA0\u20BA";
  }
  var DAYS = { tr: ["Pazartesi", "Sal\u0131", "\xC7ar\u015Famba", "Per\u015Fembe", "Cuma", "Cumartesi", "Pazar"], en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] };
  var TAGS = { popular: { tr: "\xC7ok sevilen", en: "Favourite" }, "new": { tr: "Yeni", en: "New" }, vegetarian: { tr: "Vejetaryen", en: "Vegetarian" }, vegan: { tr: "Vegan", en: "Vegan" }, glutenFree: { tr: "Glutensiz", en: "Gluten-free" } };
  var ALLERGENS = { gluten: { tr: "Gluten", en: "Gluten" }, milk: { tr: "S\xFCt", en: "Milk" }, eggs: { tr: "Yumurta", en: "Eggs" }, nuts: { tr: "Sert kabuklu yemi\u015Fler", en: "Tree nuts" }, peanuts: { tr: "Yer f\u0131st\u0131\u011F\u0131", en: "Peanuts" }, soy: { tr: "Soya", en: "Soy" }, sesame: { tr: "Susam", en: "Sesame" }, mustard: { tr: "Hardal", en: "Mustard" }, celery: { tr: "Kereviz", en: "Celery" }, sulphites: { tr: "S\xFClfit", en: "Sulphites" }, fish: { tr: "Bal\u0131k", en: "Fish" }, crustaceans: { tr: "Kabuklu deniz \xFCr\xFCnleri", en: "Crustaceans" }, molluscs: { tr: "Yumu\u015Fak\xE7alar", en: "Molluscs" }, lupin: { tr: "Ac\u0131 bakla", en: "Lupin" } };
  var T2 = {
    tr: {
      skip: "Men\xFCye ge\xE7",
      lang: "Dil",
      toDark: "Koyu temaya ge\xE7",
      toLight: "A\xE7\u0131k temaya ge\xE7",
      categories: "Kategoriler",
      search: "Men\xFCde ara",
      searchPh: "Kahve, tost, tatl\u0131",
      close: "Kapat",
      noResults: function(q) {
        return "\u201C" + q + "\u201D i\xE7in sonu\xE7 yok.";
      },
      soldOut: "T\xFCkendi",
      openNow: function(t) {
        return "\u015Eu an a\xE7\u0131k. Kapan\u0131\u015F " + t;
      },
      closedNow: function(w, t) {
        return "\u015Eu an kapal\u0131. A\xE7\u0131l\u0131\u015F " + w + " " + t;
      },
      today: "bug\xFCn",
      tomorrow: "yar\u0131n",
      visit: "Bize u\u011Fray\u0131n",
      directions: "Yol tarifi",
      call: "Ara",
      hours: "\xC7al\u0131\u015Fma saatleri",
      closedDay: "Kapal\u0131",
      wifi: "Wi-Fi",
      vat: "Fiyatlara KDV dahildir.",
      allergy: "Alerjiniz varsa sipari\u015Ften \xF6nce l\xFCtfen bize s\xF6yleyin.",
      updated: function(d) {
        return "Son g\xFCncelleme: " + d;
      },
      manage: "Men\xFCy\xFC y\xF6net",
      allergens: "Alerjenler",
      noAllergens: "Bu \xFCr\xFCn i\xE7in alerjen bilgisi girilmemi\u015F. L\xFCtfen bize sorun.",
      menuTitle: "Men\xFC",
      adminTitle: "Men\xFC y\xF6netimi",
      tabMenu: "Men\xFC",
      tabInfo: "\u0130\u015Fletme",
      tabData: "Yedek",
      back: "Men\xFCye d\xF6n",
      estimated: "Fiyatlar \u015Fimdilik tahmini. Her fiyat\u0131 kontrol edin, sonra bu kutuyu i\u015Faretleyin.",
      confirmPrices: "Fiyatlar\u0131 kontrol ettim",
      addItem: "\xDCr\xFCn ekle",
      addCat: "Kategori ekle",
      editItem: "\xDCr\xFCn\xFC d\xFCzenle",
      newItem: "Yeni \xFCr\xFCn",
      editCat: "Kategoriyi d\xFCzenle",
      newCat: "Yeni kategori",
      moveUp: "Yukar\u0131 ta\u015F\u0131",
      moveDown: "A\u015Fa\u011F\u0131 ta\u015F\u0131",
      edit: "D\xFCzenle",
      del: "Sil",
      available: "Sat\u0131\u015Fta",
      sizes: function(n) {
        return n + " boyut";
      },
      emptyCat: "Bu kategoride hen\xFCz \xFCr\xFCn yok.",
      fName: "Ad",
      fDesc: "A\xE7\u0131klama",
      fPrice: "Fiyat (\u20BA)",
      fSizes: "Boyutlar",
      fSizesHint: "Boyutlar\u0131n fiyat\u0131 farkl\u0131ysa ekleyin. Liste bo\u015Fsa tek fiyat kullan\u0131l\u0131r.",
      addSize: "Boyut ekle",
      sizeTr: "Boyut (TR)",
      sizeEn: "Size (EN)",
      fCat: "Kategori",
      fPhoto: "Foto\u011Fraf",
      choosePhoto: "Foto\u011Fraf se\xE7",
      changePhoto: "De\u011Fi\u015Ftir",
      removePhoto: "Kald\u0131r",
      fTags: "Etiketler",
      fAllergens: "Alerjenler",
      fNote: "Kategori notu",
      fNoteHint: "Ba\u015Fl\u0131\u011F\u0131n alt\u0131nda g\xF6sterilir, \xF6rne\u011Fin bitkisel s\xFCt \xFCcreti.",
      position: "S\u0131ra",
      cancel: "Vazge\xE7",
      done: "Tamam",
      remove: "Kald\u0131r",
      errName: "En az bir dilde ad girin.",
      errPrice: "Ge\xE7erli bir fiyat girin.",
      errSize: "Her boyut i\xE7in ad ve fiyat girin.",
      confirmDelItem: function(n) {
        return "\u201C" + n + "\u201D silinsin mi?";
      },
      confirmDelCat: function(n, c) {
        return c ? "\u201C" + n + "\u201D kategorisi ve i\xE7indeki " + c + " \xFCr\xFCn silinsin mi?" : "\u201C" + n + "\u201D kategorisi silinsin mi?";
      },
      unsaved: "Yay\u0131nlanmad\u0131",
      discard: "Geri al",
      confirmDiscard: "Yay\u0131nlanmam\u0131\u015F t\xFCm de\u011Fi\u015Fiklikler silinsin mi?",
      publish: "Yay\u0131nla",
      publishing: "Yay\u0131nlan\u0131yor\u2026",
      published: "Yay\u0131nland\u0131",
      conflict: "Men\xFC bu sayfa a\xE7\u0131ld\u0131ktan sonra g\xFCncellenmi\u015F. Birka\xE7 dakika bekleyip sayfay\u0131 yenileyin, de\u011Fi\u015Fiklikleriniz taslak olarak sakland\u0131.",
      tooLarge: "Sayfa \xE7ok b\xFCy\xFCk. Birka\xE7 foto\u011Fraf\u0131 kald\u0131r\u0131p tekrar deneyin.",
      rateLimited: "GitHub istek s\u0131n\u0131r\u0131na ula\u015F\u0131ld\u0131. Birka\xE7 dakika sonra tekrar deneyin.",
      failed: "Yay\u0131nlanamad\u0131. Ba\u011Flant\u0131n\u0131z\u0131 kontrol edip tekrar deneyin.",
      publishedGh: "Yay\u0131nland\u0131. Men\xFC hemen g\xFCncellendi.",
      sessionOut: "Oturumunuz sona erdi. Tekrar giri\u015F yap\u0131n.",
      offline: "Ba\u011Flant\u0131 yok. De\u011Fi\u015Fiklikleriniz taslak olarak sakland\u0131.",
      draftFound: "\xD6nceki oturumdan yay\u0131nlanmam\u0131\u015F de\u011Fi\u015Fiklikler bulundu.",
      restore: "Geri y\xFCkle",
      dismiss: "Sil",
      business: "\u0130\u015Fletme bilgileri",
      bizName: "\u0130\u015Fletme ad\u0131",
      tagline: "Alt ba\u015Fl\u0131k",
      address: "Adres",
      phone: "Telefon",
      maps: "Google Maps ba\u011Flant\u0131s\u0131",
      insta: "Instagram kullan\u0131c\u0131 ad\u0131",
      instaHint: "@ i\u015Fareti olmadan. Bo\u015F b\u0131rak\u0131l\u0131rsa g\xF6sterilmez.",
      wifiF: "Wi-Fi bilgisi",
      wifiHint: "\xD6rne\u011Fin: A\u011F Cuginos, \u015Fifre kahve2026. Bo\u015F b\u0131rak\u0131l\u0131rsa g\xF6sterilmez.",
      hoursF: "\xC7al\u0131\u015Fma saatleri",
      closedF: "Kapal\u0131",
      annF: "Duyuru",
      annHint: "Men\xFCn\xFCn en \xFCst\xFCnde g\xF6sterilir. Bo\u015F b\u0131rak\u0131l\u0131rsa gizlenir.",
      dataTitle: "Yedek ve aktar\u0131m",
      dataHint: "Men\xFCn\xFCn tamam\u0131n\u0131 JSON olarak saklay\u0131n veya ba\u015Fka bir yere ta\u015F\u0131y\u0131n.",
      exportJson: "JSON indir",
      copyJson: "JSON kopyala",
      copied: "Kopyaland\u0131",
      copyFail: "Kopyalanamad\u0131. A\u015Fa\u011F\u0131daki metni elle se\xE7ip kopyalay\u0131n.",
      importTitle: "Yedekten geri y\xFCkle",
      importHint: "Bir men\xFC yede\u011Fini buraya yap\u0131\u015Ft\u0131r\u0131n. Mevcut tasla\u011F\u0131n yerini al\u0131r.",
      importBtn: "\u0130\xE7e aktar",
      importBad: "Bu ge\xE7erli bir men\xFC yede\u011Fi de\u011Fil.",
      imported: "\u0130\xE7e aktar\u0131ld\u0131. Kontrol edip yay\u0131nlay\u0131n.",
      stats: function(c, i, kb) {
        return c + " kategori, " + i + " \xFCr\xFCn. Men\xFC verisi yakla\u015F\u0131k " + kb + " KB, s\u0131n\u0131r 4 MB.";
      },
      photoFail: "Foto\u011Fraf okunamad\u0131. JPG veya PNG deneyin.",
      loginLead: "Devam etmek i\xE7in giri\u015F yap\u0131n.",
      username: "Kullan\u0131c\u0131 ad\u0131",
      password: "\u015Eifre",
      show: "\u015Eifreyi g\xF6ster",
      hide: "\u015Eifreyi gizle",
      signIn: "Giri\u015F yap",
      checking: "Kontrol ediliyor\u2026",
      loginErr: "Kullan\u0131c\u0131 ad\u0131 veya \u015Fifre hatal\u0131.",
      locked: function(n) {
        return "\xC7ok fazla hatal\u0131 deneme. " + Math.ceil(n / 60) + " dakika sonra tekrar deneyin.";
      },
      logout: "\xC7\u0131k\u0131\u015F yap",
      creds: "Giri\u015F bilgileri",
      credsHint: "De\u011Fi\u015Fiklik hemen ge\xE7erli olur ve di\u011Fer cihazlar\u0131n oturumunu kapat\u0131r.",
      curPw: "Mevcut \u015Fifre",
      newUser: "Kullan\u0131c\u0131 ad\u0131",
      newPw: "Yeni \u015Fifre",
      newPw2: "Yeni \u015Fifre (tekrar)",
      updateCreds: "Giri\u015F bilgilerini g\xFCncelle",
      errCur: "Mevcut \u015Fifre hatal\u0131.",
      errShort: "Yeni \u015Fifre en az 10 karakter olmal\u0131.",
      errMatch: "Yeni \u015Fifreler e\u015Fle\u015Fmiyor.",
      errUser: "Kullan\u0131c\u0131 ad\u0131 girin.",
      credsUpdated: "Giri\u015F bilgileri g\xFCncellendi.",
      saveUnavailable: "\u0130ndirme burada kullan\u0131lam\u0131yor. JSON kopyala se\xE7ene\u011Fini kullan\u0131n."
    },
    en: {
      skip: "Skip to menu",
      lang: "Language",
      toDark: "Switch to dark theme",
      toLight: "Switch to light theme",
      categories: "Categories",
      search: "Search the menu",
      searchPh: "Coffee, toastie, cake",
      close: "Close",
      noResults: function(q) {
        return "Nothing matches \u201C" + q + "\u201D.";
      },
      soldOut: "Sold out",
      openNow: function(t) {
        return "Open now. Closes " + t;
      },
      closedNow: function(w, t) {
        return "Closed now. Opens " + w + " " + t;
      },
      today: "today",
      tomorrow: "tomorrow",
      visit: "Visit us",
      directions: "Directions",
      call: "Call",
      hours: "Opening hours",
      closedDay: "Closed",
      wifi: "Wi-Fi",
      vat: "Prices include VAT.",
      allergy: "If you have an allergy, please tell us before you order.",
      updated: function(d) {
        return "Last updated " + d;
      },
      manage: "Manage menu",
      allergens: "Allergens",
      noAllergens: "No allergen info is listed for this item. Please ask us.",
      menuTitle: "Menu",
      adminTitle: "Manage menu",
      tabMenu: "Menu",
      tabInfo: "Business",
      tabData: "Backup",
      back: "Back to menu",
      estimated: "Prices are estimates for now. Check every price, then tick this box.",
      confirmPrices: "I've checked the prices",
      addItem: "Add item",
      addCat: "Add category",
      editItem: "Edit item",
      newItem: "New item",
      editCat: "Edit category",
      newCat: "New category",
      moveUp: "Move up",
      moveDown: "Move down",
      edit: "Edit",
      del: "Delete",
      available: "Available",
      sizes: function(n) {
        return n + " sizes";
      },
      emptyCat: "No items in this category yet.",
      fName: "Name",
      fDesc: "Description",
      fPrice: "Price (\u20BA)",
      fSizes: "Sizes",
      fSizesHint: "Add sizes if they're priced differently. With no sizes, the single price is used.",
      addSize: "Add size",
      sizeTr: "Size (TR)",
      sizeEn: "Size (EN)",
      fCat: "Category",
      fPhoto: "Photo",
      choosePhoto: "Choose photo",
      changePhoto: "Change",
      removePhoto: "Remove",
      fTags: "Labels",
      fAllergens: "Allergens",
      fNote: "Category note",
      fNoteHint: "Shown under the heading, for example a plant milk charge.",
      position: "Position",
      cancel: "Cancel",
      done: "Done",
      remove: "Remove",
      errName: "Enter a name in at least one language.",
      errPrice: "Enter a valid price.",
      errSize: "Enter a name and price for every size.",
      confirmDelItem: function(n) {
        return "Delete \u201C" + n + "\u201D?";
      },
      confirmDelCat: function(n, c) {
        return c ? "Delete \u201C" + n + "\u201D and its " + c + " items?" : "Delete \u201C" + n + "\u201D?";
      },
      unsaved: "Not published",
      discard: "Discard",
      confirmDiscard: "Discard all unpublished changes?",
      publish: "Publish",
      publishing: "Publishing\u2026",
      published: "Published",
      conflict: "The menu was updated after this page opened. Wait a few minutes and reload; your changes are kept as a draft.",
      tooLarge: "The page is too large. Remove a few photos and try again.",
      rateLimited: "GitHub rate limit reached. Try again in a few minutes.",
      failed: "Couldn't publish. Check your connection and try again.",
      publishedGh: "Published. The menu is live now.",
      sessionOut: "Your session expired. Sign in again.",
      offline: "No connection. Your changes are kept as a draft.",
      draftFound: "Unpublished changes from an earlier session were found.",
      restore: "Restore",
      dismiss: "Delete",
      business: "Business details",
      bizName: "Business name",
      tagline: "Tagline",
      address: "Address",
      phone: "Phone",
      maps: "Google Maps link",
      insta: "Instagram username",
      instaHint: "Without the @. Hidden when empty.",
      wifiF: "Wi-Fi details",
      wifiHint: "For example: network Cuginos, password coffee2026. Hidden when empty.",
      hoursF: "Opening hours",
      closedF: "Closed",
      annF: "Announcement",
      annHint: "Shown at the top of the menu. Hidden when empty.",
      dataTitle: "Backup and transfer",
      dataHint: "Keep a copy of the whole menu as JSON, or move it somewhere else.",
      exportJson: "Download JSON",
      copyJson: "Copy JSON",
      copied: "Copied",
      copyFail: "Couldn't copy. Select the text below and copy it manually.",
      importTitle: "Restore from backup",
      importHint: "Paste a menu backup here. It replaces the current draft.",
      importBtn: "Import",
      importBad: "This isn't a valid menu backup.",
      imported: "Imported. Review it, then publish.",
      stats: function(c, i, kb) {
        return c + " categories, " + i + " items. Menu data is about " + kb + " KB, limit 4 MB.";
      },
      photoFail: "Couldn't read that photo. Try a JPG or PNG.",
      loginLead: "Sign in to continue.",
      username: "Username",
      password: "Password",
      show: "Show password",
      hide: "Hide password",
      signIn: "Sign in",
      checking: "Checking\u2026",
      loginErr: "Wrong username or password.",
      locked: function(n) {
        return "Too many failed attempts. Try again in " + Math.ceil(n / 60) + " minutes.";
      },
      logout: "Sign out",
      creds: "Sign-in details",
      credsHint: "The change applies at once and signs other devices out.",
      curPw: "Current password",
      newUser: "Username",
      newPw: "New password",
      newPw2: "Repeat new password",
      updateCreds: "Update sign-in details",
      errCur: "Current password is wrong.",
      errShort: "New password must be at least 10 characters.",
      errMatch: "New passwords don't match.",
      errUser: "Enter a username.",
      credsUpdated: "Sign-in details updated.",
      saveUnavailable: "Downloads aren't available here. Use Copy JSON instead."
    }
  };
  var I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
    insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'
  };
  var LOGO = '<svg viewBox="0 0 786 308" aria-hidden="true" focusable="false"><g transform="translate(346 0)"><path class="s" fill-rule="evenodd" d="M49.1 142.7C47.9 142.2 47.4 141.0 46.7 137.3C45.1 128.9 46.7 121.9 51.7 115.1C55.3 110.3 63.2 103.3 65.1 103.3C66.1 103.3 66.1 103.3 65.9 104.8C65.7 106.5 62.9 112.6 61.0 115.5C57.6 120.8 54.7 131.4 54.7 138.7C54.7 142.1 54.2 142.7 51.6 142.9C50.6 142.9 49.5 142.9 49.1 142.7ZM18.4 142.2C17.2 141.6 12.5 136.2 10.6 133.4C8.6 130.2 6.4 124.8 5.9 121.3C5.4 117.8 6.0 108.1 7.0 104.1C7.9 100.4 9.6 97.0 11.0 96.1C12.3 95.2 12.5 95.2 13.2 95.9C13.7 96.4 13.7 97.0 13.5 101.1C13.0 109.1 13.3 114.9 14.3 119.3C15.3 123.2 17.5 129.7 18.5 131.7C19.4 133.4 22.0 140.5 22.0 141.2C22.0 142.6 20.1 143.2 18.4 142.2ZM36.8 136.9C33.6 134.1 33.4 117.7 36.4 109.2C40.4 98.0 47.9 89.7 68.3 74.3C70.6 72.6 73.4 70.5 74.5 69.6C77.1 67.6 78.1 66.5 80.7 62.6C85.3 55.8 88.9 47.6 89.7 42.0C90.1 38.8 90.4 38.1 91.3 37.8C94.0 37.0 96.4 43.0 96.4 50.7C96.5 61.6 94.3 68.0 87.4 77.3C82.1 84.3 71.2 94.7 63.2 100.3C57.1 104.5 51.1 110.5 47.4 116.0C44.8 120.0 42.6 125.8 41.2 132.4C40.1 137.6 39.0 138.8 36.8 136.9ZM22.1 122.7C21.2 122.2 19.3 116.7 19.0 113.8C18.3 108.0 18.8 101.0 20.2 95.9C21.6 90.8 27.3 79.4 30.9 74.6C33.2 71.6 44.7 59.9 47.5 57.8C50.3 55.8 57.4 48.8 60.2 45.3C62.5 42.6 66.6 36.2 67.5 34.1C69.8 28.8 71.2 21.0 71.5 11.9C71.8 4.6 71.9 4.3 73.9 4.3C75.5 4.3 76.4 5.4 78.0 9.5C81.2 17.7 81.8 21.5 81.6 30.6C81.4 38.3 80.9 40.6 78.3 46.8C77.1 49.6 75.9 51.8 74.3 54.0C73.0 55.7 71.3 58.1 70.5 59.2C69.7 60.3 67.3 63.1 65.1 65.5C61.3 69.7 58.7 72.0 49.7 79.3C45.5 82.6 40.0 87.6 36.9 90.8C31.1 96.8 27.1 105.8 25.8 116.0C25.6 118.3 25.2 120.7 25.0 121.3C24.5 122.7 23.2 123.4 22.1 122.7Z"/></g><path class="w" fill-rule="evenodd" transform="translate(0 154)" d="M728.3 147.8C718.8 146.7 709.3 144.5 700.5 141.3C692.6 138.3 693.2 139.5 693.6 126.0C693.8 120.4 694.0 113.6 694.1 110.9C694.2 104.7 694.5 104.2 697.6 104.1C701.2 103.9 701.8 104.5 706.2 112.7C710.0 119.8 712.0 122.4 717.8 127.6C723.3 132.5 733.4 134.9 740.3 133.0C747.1 131.1 751.0 127.4 753.2 120.7C754.4 117.3 754.5 111.3 753.4 108.1C751.4 101.9 746.2 96.7 736.2 90.8C728.8 86.5 726.6 85.3 723.2 83.5C701.6 72.1 692.4 55.2 697.4 36.1C699.7 26.9 707.3 18.3 717.2 13.5C718.6 12.8 722.0 11.7 725.4 10.9C733.6 8.8 739.1 8.4 748.1 9.1C755.1 9.7 757.1 10.1 766.6 12.5C772.8 14.1 774.1 14.7 774.6 16.4C775.0 18.2 774.4 40.7 773.9 43.7C773.2 47.0 772.7 47.4 769.4 47.3C766.3 47.1 766.0 46.8 763.0 40.7C756.9 28.3 751.8 24.2 742.0 23.8C734.2 23.4 728.5 26.4 725.6 32.2C724.5 34.5 724.5 34.6 724.5 39.0L724.5 43.5L725.9 46.5C727.1 49.0 727.8 49.9 730.4 52.5C734.7 56.8 738.5 59.2 751.0 65.8C761.7 71.4 768.2 76.1 774.5 82.5C777.7 85.8 778.2 86.5 779.9 89.8C782.9 96.1 783.5 99.1 783.5 107.8C783.5 113.9 783.4 115.5 782.9 117.3C778.8 131.6 770.2 140.6 755.9 145.5C749.1 147.8 737.1 148.8 728.3 147.8ZM62.8 146.8C62.3 146.7 60.7 146.5 59.3 146.3C52.2 145.4 38.4 139.3 31.8 134.3C26.9 130.5 21.3 123.8 18.2 117.8C16.2 114.0 13.4 107.8 12.7 105.3C12.6 104.7 11.9 102.5 11.4 100.6C9.9 95.6 9.3 90.5 9.3 82.5C9.3 72.5 9.9 68.7 12.9 57.3C13.4 55.4 17.2 45.7 18.2 43.5C23.0 34.0 34.2 22.4 44.1 16.7C55.0 10.4 66.7 7.8 81.7 8.1C85.8 8.2 90.3 8.5 92.2 8.8C94.0 9.1 97.3 9.5 99.5 9.8C101.7 10.1 105.3 10.8 107.5 11.3C114.4 13.0 114.2 12.5 114.1 24.5C114.0 29.6 113.9 36.7 113.8 40.2L113.6 46.5L112.5 47.6C111.5 48.6 111.2 48.7 109.4 48.7C107.0 48.7 106.1 47.9 105.1 44.9C104.4 42.6 101.9 37.6 100.3 35.2C96.4 29.5 92.5 26.4 86.5 24.3C83.6 23.3 83.3 23.2 78.5 23.2C74.1 23.2 73.1 23.3 70.2 24.1C61.8 26.3 55.1 31.4 49.8 39.5C44.0 48.4 40.9 62.8 41.5 77.9C41.8 87.2 42.7 92.4 45.4 101.0C48.4 110.5 53.6 118.2 60.8 123.8C64.3 126.5 64.7 126.7 67.8 127.9C75.2 130.7 82.0 130.7 90.8 127.8C97.5 125.6 104.3 120.6 110.0 113.8C115.8 106.8 115.9 106.7 119.5 110.5C124.0 115.1 123.8 116.7 117.2 124.4C115.7 126.1 113.7 128.5 112.7 129.7C108.8 134.5 99.3 140.9 92.1 143.5C89.3 144.5 83.6 145.9 80.5 146.3C78.0 146.7 64.5 147.0 62.8 146.8ZM586.7 137.7C575.8 137.3 570.7 135.5 561.0 128.7C556.8 125.8 555.6 124.6 553.4 121.6C552.4 120.1 551.0 118.6 550.3 118.1C549.4 117.5 549.0 117.0 549.0 116.4C549.0 116.0 548.5 114.8 547.9 113.8C541.2 103.5 538.0 91.4 538.0 77.1C538.0 63.6 540.9 52.1 546.8 41.7C548.2 39.4 549.0 37.6 549.0 37.0C549.0 36.4 549.1 36.0 549.3 36.0C550.0 36.0 551.8 34.1 553.4 31.7C557.7 25.3 566.0 19.6 576.0 16.1L580.5 14.6L588.8 14.3C593.4 14.1 599.0 14.0 601.3 14.1C616.0 14.7 629.2 21.2 640.0 33.1C653.4 47.9 657.9 77.7 650.1 100.9C646.3 112.4 640.6 120.5 631.3 127.4C619.8 136.0 608.9 138.5 586.7 137.7ZM177.3 137.0C168.2 136.1 162.9 134.5 156.4 130.7C150.3 127.2 144.7 120.0 142.4 113.0C142.0 111.8 141.3 108.9 140.8 106.5L139.9 102.2L139.7 65.7L139.5 29.2L138.5 27.4C137.6 25.7 135.8 23.9 133.2 21.9C132.0 21.0 131.9 20.8 132.1 19.5C132.4 17.6 133.4 16.8 135.9 16.5C138.6 16.3 174.4 16.5 175.0 16.8C176.2 17.3 176.7 20.0 176.0 21.4C175.8 21.7 174.8 22.6 173.7 23.3C171.5 24.7 169.9 26.4 169.1 28.2C168.5 29.4 168.5 31.9 168.4 61.7C168.2 102.0 168.4 104.5 171.7 111.2C175.1 118.4 181.1 122.0 189.3 122.0C197.2 122.0 202.7 119.3 206.4 113.7C210.6 107.5 210.7 106.0 210.6 63.5C210.5 33.7 210.4 30.3 209.9 28.8C209.1 26.3 207.6 24.5 205.0 22.9C202.6 21.3 202.3 20.9 202.3 19.2C202.3 17.6 203.3 16.8 205.5 16.5C206.5 16.4 213.2 16.3 220.6 16.4C235.5 16.5 235.0 16.4 235.5 18.9C235.8 20.8 235.2 22.1 233.1 23.6C232.0 24.3 230.6 25.8 229.8 26.8C228.6 28.6 228.5 28.9 228.2 32.3C228.1 34.2 228.0 48.3 228.0 63.6C228.0 80.2 227.9 92.7 227.7 94.9C227.5 96.9 227.2 100.0 227.0 101.9C226.5 107.4 224.6 113.8 222.2 118.7C220.2 122.6 213.7 129.0 209.3 131.4C205.3 133.6 199.3 135.6 194.3 136.5C190.6 137.1 181.4 137.4 177.3 137.0ZM289.2 136.5C287.7 136.2 285.9 136.0 285.1 136.0C283.1 136.0 275.2 133.2 271.7 131.3C263.9 126.9 257.1 120.6 252.4 113.1C249.0 107.7 245.5 97.8 243.8 88.6C243.1 84.8 243.0 73.1 243.6 67.5C244.8 56.9 249.0 45.1 254.4 36.7C256.9 33.0 262.8 26.8 266.7 23.9C271.3 20.4 278.8 16.8 284.0 15.6C289.8 14.1 300.4 12.9 304.0 13.2C304.8 13.3 307.5 13.5 310.0 13.7C319.5 14.4 331.1 17.1 335.2 19.5C337.5 20.8 337.5 20.8 337.2 34.6C337.0 50.2 337.0 50.3 332.6 50.3C329.5 50.3 329.0 49.9 326.5 45.1C322.5 37.3 318.6 32.6 314.2 30.0C308.0 26.4 298.3 26.4 291.3 30.1C288.2 31.6 284.1 35.3 281.8 38.5C278.9 42.6 276.4 50.5 274.6 61.2C273.6 67.4 273.5 82.8 274.5 89.0C275.6 96.4 277.8 104.2 280.0 108.8C283.4 115.9 288.9 121.0 295.0 122.8C299.7 124.2 307.4 123.1 311.2 120.6C314.0 118.7 313.8 119.7 313.7 101.0L313.6 84.5L312.8 82.7C311.8 80.7 310.8 80.0 306.0 78.1C302.5 76.7 301.7 75.8 301.7 73.5C301.7 71.7 302.6 70.5 304.4 69.9C306.5 69.3 345.4 69.6 346.9 70.2C348.5 70.8 349.1 72.0 348.9 73.9C348.8 75.3 348.5 75.7 346.9 77.2C345.5 78.4 344.7 79.5 343.9 81.2L342.8 83.5L342.9 101.7C342.9 119.5 342.9 119.9 343.6 121.8C344.4 124.0 344.5 125.9 343.9 126.8C343.7 127.1 341.8 127.9 339.6 128.6C337.5 129.3 335.5 130.1 335.1 130.2C331.6 132.1 319.3 135.4 312.9 136.3C307.3 137.1 293.6 137.2 289.2 136.5ZM362.9 133.8C362.5 133.6 362.0 133.0 361.9 132.2C361.4 130.4 362.2 129.0 364.5 127.7C366.9 126.3 367.7 125.2 368.8 122.0C370.2 117.7 370.4 110.4 370.2 68.7C370.1 39.0 369.9 32.5 369.5 30.6C368.7 26.8 367.3 24.8 364.4 23.4C362.4 22.4 361.6 21.1 361.8 19.6C362.0 18.0 362.8 16.7 363.9 16.3C364.5 16.1 371.6 16.0 384.3 16.1C403.1 16.2 403.9 16.2 405.2 16.8C406.2 17.4 406.6 17.8 406.8 18.7C407.3 20.6 406.6 21.8 404.3 23.3C401.9 25.0 400.5 26.7 399.6 29.0C398.3 32.6 398.1 113.8 399.5 119.8C400.1 122.6 401.5 124.8 404.0 127.0C407.8 130.3 408.1 133.3 404.6 133.8C401.8 134.2 363.6 134.2 362.9 133.8ZM423.4 134.1C422.5 133.9 421.1 132.3 420.8 131.1C420.5 130.0 421.4 128.8 423.8 127.3C426.2 125.6 427.6 122.9 428.0 118.7C428.2 116.9 428.3 98.9 428.3 72.5C428.2 23.6 428.4 28.2 425.4 25.2C424.5 24.2 423.3 23.0 422.6 22.4C421.3 21.2 420.9 19.8 421.4 18.4C422.0 16.6 422.5 16.5 437.7 16.5C453.1 16.5 453.0 16.5 454.5 18.8C455.1 19.5 457.4 22.9 459.8 26.2C465.2 33.5 465.8 34.4 468.4 38.2C469.5 39.8 470.9 41.8 471.5 42.5C472.1 43.2 473.2 44.7 473.9 45.7C474.6 46.7 477.1 50.2 479.5 53.4C481.9 56.6 484.6 60.3 485.5 61.7C486.3 63.0 488.4 66.0 490.1 68.3C491.7 70.6 494.3 74.4 495.8 76.7C498.6 80.9 500.6 83.3 501.3 83.3C502.3 83.3 502.4 81.5 502.2 56.2C502.1 38.7 501.9 30.3 501.6 29.0C501.2 27.2 499.8 25.5 495.9 22.1C494.8 21.2 494.7 20.9 494.7 19.6C494.7 16.5 495.1 16.4 509.7 16.4C525.3 16.4 526.7 16.6 527.2 19.2C527.5 20.9 526.9 21.8 524.9 23.1C522.7 24.5 521.2 26.3 520.2 28.3C519.3 30.5 519.0 46.0 519.1 94.2L519.2 132.6L518.4 133.4C517.7 134.1 517.4 134.2 510.9 134.3C507.2 134.3 503.7 134.3 503.1 134.2C501.4 133.9 499.6 132.0 496.6 127.5C495.1 125.3 493.4 122.9 492.8 122.2C492.2 121.4 490.2 118.6 488.3 115.8C486.4 113.1 483.6 109.0 482.0 106.9C480.5 104.7 478.5 101.9 477.7 100.7C476.8 99.5 474.5 96.2 472.5 93.5C470.4 90.8 467.8 87.0 466.5 85.2C465.2 83.3 463.1 80.4 461.8 78.7C460.5 76.9 458.9 74.6 458.3 73.5C457.7 72.4 456.0 69.8 454.5 67.7C453.1 65.6 451.0 62.5 449.9 60.9C447.9 57.9 446.9 57.2 446.2 58.1C445.5 59.0 445.3 71.6 445.5 95.3C445.7 118.8 445.7 118.7 446.8 121.7C448.1 125.0 449.2 126.6 450.8 127.5C454.3 129.5 454.8 132.8 451.7 133.7C450.5 134.0 424.9 134.5 423.4 134.1ZM600.8 125.3C606.6 124.4 612.5 119.6 615.5 113.5C617.8 108.7 618.6 106.6 619.5 102.7C621.7 93.4 622.1 89.3 622.1 75.3C622.2 63.8 622.2 63.8 621.1 58.0C618.5 43.8 614.3 34.9 608.0 30.7C603.2 27.4 600.8 26.6 596.8 27.0C589.9 27.7 588.4 28.8 586.6 34.3C586.1 35.7 584.8 38.7 583.6 41.0C579.8 48.4 579.1 51.1 577.0 64.7C576.0 71.5 576.0 71.7 576.1 81.9L576.2 92.2L577.4 97.9C578.8 104.2 582.5 115.7 584.1 118.8C586.9 124.0 593.4 126.5 600.8 125.3ZM665.4 52.7C664.1 51.8 663.2 50.0 663.5 48.5C663.7 47.3 664.6 46.4 668.6 43.3C671.3 41.3 673.7 38.2 673.7 36.7C673.7 35.5 673.3 35.2 669.2 33.0C665.7 31.1 664.5 29.9 663.2 26.9C659.0 17.6 664.5 8.4 675.0 7.2C682.8 6.2 689.2 11.9 690.1 20.5C690.6 25.2 689.8 31.6 688.3 35.0C683.8 45.4 670.3 55.8 665.4 52.7Z"/></svg>';
  function itemPrices(it) {
    return it.variants && it.variants.length ? it.variants.map(function(v) {
      return Number(v.price);
    }) : [Number(it.price)];
  }
  function renderItem(it, lang, withPhotos) {
    var t = T2[lang], name = L(it.name, lang), desc = L(it.desc, lang), sold = it.available === false, has = it.variants && it.variants.length;
    var price = sold ? t.soldOut : has ? fmtPrice(Math.min.apply(null, itemPrices(it))) : fmtPrice(it.price);
    var h = '<li class="item' + (sold ? " soldout" : "") + '" data-id="' + esc(it.id) + '"><button type="button" class="item-btn" aria-haspopup="dialog"><span class="item-main"><span class="item-line"><span class="item-name">' + esc(name) + '</span><span class="leader" aria-hidden="true"></span><span class="price">' + esc(price) + "</span></span>";
    if (desc) h += '<span class="item-desc">' + esc(desc) + "</span>";
    if (has && !sold) h += '<span class="variants">' + it.variants.map(function(v) {
      return "<span>" + esc(L(v.label, lang)) + " " + esc(fmtPrice(v.price)) + "</span>";
    }).join("") + "</span>";
    var tags = (it.tags || []).filter(function(k) {
      return TAGS[k];
    });
    if (tags.length) h += '<span class="tags">' + tags.map(function(k) {
      return '<span class="tag ' + esc(k) + '">' + esc(TAGS[k][lang]) + "</span>";
    }).join("") + "</span>";
    h += "</span>";
    if (it.photo) h += withPhotos ? '<img class="thumb" src="' + esc(it.photo) + '" alt="" width="76" height="76" loading="lazy" decoding="async">' : '<img class="thumb" data-photo="' + esc(it.id) + '" alt="" width="76" height="76">';
    return h + "</button></li>";
  }
  function renderSections(D, lang, withPhotos) {
    return D.categories.map(function(c) {
      var note = L(c.note, lang);
      return '<section class="section" id="c-' + esc(c.id) + '" aria-labelledby="h-' + esc(c.id) + '"><h2 id="h-' + esc(c.id) + '">' + esc(L(c.name, lang)) + "</h2>" + (note ? '<p class="note">' + esc(note) + "</p>" : "") + '<ul class="items">' + c.items.map(function(it) {
        return renderItem(it, lang, withPhotos);
      }).join("") + "</ul></section>";
    }).join("");
  }
  function renderChips(D, lang) {
    return D.categories.map(function(c, i) {
      return '<a class="chip" href="#c-' + esc(c.id) + '"' + (i === 0 ? ' aria-current="true"' : "") + ">" + esc(L(c.name, lang)) + "</a>";
    }).join("");
  }
  function fmtDate(iso, lang) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(d);
  }
  function renderVisit(D, lang) {
    var t = T2[lang], f = D.info, h = '<section class="visit" aria-labelledby="visit-h"><h2 id="visit-h">' + esc(t.visit) + '</h2><div class="visit-card">';
    if (f.address) h += '<a class="row" href="' + esc(f.mapsUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(f.address)) + '" target="_blank" rel="noopener">' + I.pin + "<span>" + esc(f.address) + '</span><span class="go">' + esc(t.directions) + "</span></a>";
    if (f.phone) h += '<a class="row" href="tel:' + esc(f.phone.replace(/[^+\d]/g, "")) + '">' + I.phone + "<span>" + esc(f.phone) + '</span><span class="go">' + esc(t.call) + "</span></a>";
    if (f.instagram) h += '<a class="row" href="https://www.instagram.com/' + esc(f.instagram.replace(/^@/, "")) + '/" target="_blank" rel="noopener">' + I.insta + "<span>@" + esc(f.instagram.replace(/^@/, "")) + '</span><span class="go">Instagram</span></a>';
    if (f.wifi) h += '<div class="row">' + I.wifi + "<span>" + esc(f.wifi) + '</span><span class="go">' + esc(t.wifi) + "</span></div>";
    h += '<div class="row" style="display:block"><table class="hours"><caption class="sr">' + esc(t.hours) + "</caption><tbody>";
    (f.hours || []).forEach(function(d, i) {
      h += '<tr data-day="' + i + '"><td>' + esc(DAYS[lang][i]) + "</td><td>" + (d ? esc(d[0]) + "\u2013" + esc(d[1]) : esc(t.closedDay)) + "</td></tr>";
    });
    h += '</tbody></table></div></div><p class="fine">' + esc(t.vat) + " " + esc(t.allergy) + (D.updatedAt ? "<br>" + esc(t.updated(fmtDate(D.updatedAt, lang))) : "") + '</p><p class="fine"><button type="button" class="manage-link" data-act="open-admin">' + esc(t.manage) + "</button></p></section>";
    return h;
  }
  function renderSite(D, lang, withPhotos) {
    var t = T2[lang], ann = L(D.info.announcement, lang);
    return '<a class="skip" href="#menu">' + esc(t.skip) + '</a><header class="sign"><div class="sign-bar"><div class="seg" role="group" aria-label="' + esc(t.lang) + '"><button type="button" data-lang="tr" lang="tr" aria-pressed="' + (lang === "tr") + '">TR</button><button type="button" data-lang="en" lang="en" aria-pressed="' + (lang === "en") + '">EN</button></div><button type="button" class="icon-btn" data-act="theme" aria-label="' + esc(t.toDark) + '">' + I.moon + '</button></div><h1 class="logo">' + LOGO + '<span class="sr">' + esc(D.info.name) + '</span></h1><p class="tagline">' + esc(L(D.info.tagline, lang)) + '</p><p class="status" id="status" role="status"></p></header>' + (ann ? '<div class="notice"><p>' + esc(ann) + "</p></div>" : "") + '<nav class="catnav" aria-label="' + esc(t.categories) + '"><div class="catnav-inner" id="navrow"><button type="button" class="search-btn" data-act="search" aria-label="' + esc(t.search) + '">' + I.search + '</button><div class="chips" id="chips">' + renderChips(D, lang) + '</div></div><div class="searchbar" id="searchbar" hidden><label class="sr" for="q">' + esc(t.search) + '</label><input id="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(t.searchPh) + '"><button type="button" class="text-btn" data-act="search-close">' + esc(t.close) + '</button></div></nav><main id="menu" tabindex="-1">' + renderSections(D, lang, withPhotos) + '<p class="empty" id="empty" hidden></p></main>' + renderVisit(D, lang);
  }
  var DOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  function jsonLd(D) {
    var f = D.info, diet = { vegan: "https://schema.org/VeganDiet", vegetarian: "https://schema.org/VegetarianDiet", glutenFree: "https://schema.org/GlutenFreeDiet" };
    var o = {
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      name: f.name,
      address: { "@type": "PostalAddress", streetAddress: f.address, addressLocality: "Antalya", addressCountry: "TR" },
      telephone: f.phone || void 0,
      openingHoursSpecification: (f.hours || []).map(function(d, i) {
        return d ? { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + DOW[i], opens: d[0], closes: d[1] } : null;
      }).filter(Boolean),
      hasMenu: { "@type": "Menu", name: "Men\xFC", inLanguage: ["tr", "en"], hasMenuSection: D.categories.map(function(c) {
        return { "@type": "MenuSection", name: L(c.name, "tr"), hasMenuItem: c.items.map(function(it) {
          var m = { "@type": "MenuItem", name: L(it.name, "tr") };
          var d = L(it.desc, "tr");
          if (d) m.description = d;
          m.offers = itemPrices(it).map(function(p) {
            return { "@type": "Offer", price: String(p), priceCurrency: f.currency || "TRY", availability: it.available === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock" };
          });
          var sd = (it.tags || []).filter(function(k) {
            return diet[k];
          }).map(function(k) {
            return diet[k];
          });
          if (sd.length) m.suitableForDiet = sd;
          return m;
        }) };
      }) }
    };
    if (f.instagram) o.sameAs = ["https://www.instagram.com/" + f.instagram.replace(/^@/, "") + "/"];
    return o;
  }
  function renderDocument2(D, opts) {
    opts = opts || {};
    var f = D.info, title = f.name + " | Men\xFC", desc = L(f.tagline, "tr") + ". Men\xFC ve fiyatlar, \xE7al\u0131\u015Fma saatleri ve adres.";
    return '<!doctype html>\n<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>' + esc(title) + '</title><meta name="description" content="' + esc(desc) + '"><meta name="color-scheme" content="light dark"><meta name="theme-color" content="#1F3A26" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#10201A" media="(prefers-color-scheme: dark)"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E%E2%98%95%3C/text%3E%3C/svg%3E">' + (D.site && D.site.url ? '<link rel="canonical" href="' + esc(D.site.url) + '"><meta property="og:url" content="' + esc(D.site.url) + '">' : "") + '<meta property="og:type" content="website"><meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '"><meta property="og:locale" content="tr_TR"><meta property="og:locale:alternate" content="en_GB"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Marcellus&display=swap">' + (opts.cssHref ? '<link rel="stylesheet" href="' + esc(opts.cssHref) + '">' : '<style id="styles">' + (opts.css || "") + "</style>") + '<script type="application/ld+json">' + safeJson(jsonLd(D)) + '<\/script></head><body><div id="site">' + renderSite(D, "tr", false) + '</div><dialog class="sheet" id="sheet" aria-labelledby="sheet-title"></dialog><div class="admin" id="admin" hidden></div><div class="toast" id="toast" role="status" aria-live="polite" hidden></div><script type="application/json" id="menu-data">' + safeJson(D) + "<\/script>" + (opts.jsHref ? '<script src="' + esc(opts.jsHref) + '" defer><\/script>' : '<script id="app">' + (opts.js || "") + "<\/script>") + "</body></html>";
  }
  var shared = { renderDocument: renderDocument2, T: T2 };
  return { renderDocument: renderDocument2, T: T2 };
})();
var renderDocument = __m.renderDocument;
var T = __m.T;

// src/assets.gen.js
var CSS_V = "4c5916eec7";
var JS_V = "7a6e3478ed";

// functions/_lib/auth.js
var enc = new TextEncoder();
var KV_MENU = "menu";
var KV_AUTH = "auth";
var KV_SKEY = "skey";
var COOKIE = "cg_session";
var SESSION_TTL = 60 * 60 * 12;
var ITER = 21e4;
function hex(bytes) {
  return Array.prototype.map.call(new Uint8Array(bytes), function(b) {
    return ("0" + b.toString(16)).slice(-2);
  }).join("");
}
function unhex(s) {
  const out = new Uint8Array(s.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(s.substr(i * 2, 2), 16);
  return out;
}
function randomHex(n) {
  return hex(crypto.getRandomValues(new Uint8Array(n)));
}
async function safeEqual(a, b) {
  const key = crypto.getRandomValues(new Uint8Array(32));
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const da = new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(String(a))));
  const db = new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(String(b))));
  let diff = 0;
  for (let i = 0; i < da.length; i++) diff |= da[i] ^ db[i];
  return diff === 0;
}
async function derive(password, salt, iter) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: enc.encode(salt), iterations: iter },
    key,
    256
  );
  return hex(bits);
}
async function makeAuthRecord(user, password, ver) {
  const salt = randomHex(16);
  return {
    alg: "pbkdf2-sha256",
    user: String(user || "").trim().toLowerCase(),
    salt,
    iter: ITER,
    hash: await derive(password, salt, ITER),
    ver: ver || 1
  };
}
async function getAuth(env) {
  const raw = await env.MENU_KV.get(KV_AUTH);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
    }
  }
  if (!env.ADMIN_PASSWORD) return null;
  const rec = await makeAuthRecord(env.ADMIN_USER || "cuginos", env.ADMIN_PASSWORD, 1);
  await env.MENU_KV.put(KV_AUTH, JSON.stringify(rec));
  return rec;
}
async function checkPassword(env, user, password) {
  const rec = await getAuth(env);
  if (!rec || typeof password !== "string" || !password) return null;
  const got = await derive(password, rec.salt, rec.iter);
  const okPass = await safeEqual(got, rec.hash);
  const okUser = await safeEqual(String(user || "").trim().toLowerCase(), rec.user || "");
  return okPass && okUser ? rec : null;
}
async function sessionKey(env) {
  let k = await env.MENU_KV.get(KV_SKEY);
  if (!k) {
    k = randomHex(32);
    await env.MENU_KV.put(KV_SKEY, k);
  }
  return crypto.subtle.importKey("raw", unhex(k), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}
async function issueSession(env, ver) {
  const payload = Date.now() + SESSION_TTL * 1e3 + "." + (ver || 1);
  const sig = hex(await crypto.subtle.sign("HMAC", await sessionKey(env), enc.encode(payload)));
  return { value: payload + "." + sig, maxAge: SESSION_TTL };
}
async function readSession(request, env) {
  const raw = (request.headers.get("Cookie") || "").split(/;\s*/).map(function(p) {
    return /^([^=]+)=(.*)$/.exec(p);
  }).filter(function(m) {
    return m && m[1] === COOKIE;
  })[0];
  if (!raw) return false;
  const parts = raw[2].split(".");
  if (parts.length !== 3) return false;
  const expected = hex(await crypto.subtle.sign("HMAC", await sessionKey(env), enc.encode(parts[0] + "." + parts[1])));
  if (!await safeEqual(parts[2], expected)) return false;
  if (!(Number(parts[0]) > Date.now())) return false;
  const rec = await getAuth(env);
  return !!rec && String(rec.ver || 1) === parts[1];
}
function cookieHeader(value, maxAge) {
  return COOKIE + "=" + value + "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=" + maxAge;
}
function json(body, status, extra) {
  const h = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
  if (extra) for (const k in extra) h[k] = extra[k];
  return new Response(JSON.stringify(body), { status: status || 200, headers: h });
}
async function rateLimit(request, env, bucket, limit, windowSec) {
  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  const key = "rl:" + bucket + ":" + ip;
  const n = Number(await env.MENU_KV.get(key) || 0) + 1;
  await env.MENU_KV.put(key, String(n), { expirationTtl: Math.max(60, windowSec) });
  return { blocked: n > limit, retryAfter: windowSec };
}
async function clearRate(request, env, bucket) {
  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  await env.MENU_KV.delete("rl:" + bucket + ":" + ip);
}

// functions/api/login.js
async function onRequestPost({ request, env }) {
  const limit = await rateLimit(request, env, "login", Number(env.LOGIN_ATTEMPTS) || 8, 900);
  if (limit.blocked) return json({ error: "rate_limited", retryAfter: limit.retryAfter }, 429);
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "bad_request" }, 400);
  }
  const rec = await checkPassword(env, body && body.username, body && body.password);
  if (!rec) return json({ error: "bad_credentials" }, 401);
  await clearRate(request, env, "login");
  const s = await issueSession(env, rec.ver);
  return json({ ok: true }, 200, { "Set-Cookie": cookieHeader(s.value, s.maxAge) });
}

// functions/api/logout.js
async function onRequestPost2() {
  return json({ ok: true }, 200, { "Set-Cookie": cookieHeader("", 0) });
}

// functions/api/session.js
async function onRequestGet({ request, env }) {
  return json({ authed: await readSession(request, env) });
}

// functions/api/password.js
async function onRequestPost3({ request, env }) {
  if (!await readSession(request, env)) return json({ error: "unauthorized" }, 401);
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "bad_request" }, 400);
  }
  const next = body && body.next;
  const user = body && body.user || "";
  if (typeof next !== "string" || next.length < 10) return json({ error: "too_short" }, 400);
  const rec = await checkPassword(env, body && body.currentUser, body && body.current);
  if (!rec) return json({ error: "bad_credentials" }, 401);
  const updated = await makeAuthRecord(user || rec.user, next, (rec.ver || 1) + 1);
  await env.MENU_KV.put(KV_AUTH, JSON.stringify(updated));
  const s = await issueSession(env, updated.ver);
  return json({ ok: true }, 200, { "Set-Cookie": cookieHeader(s.value, s.maxAge) });
}

// src/seed.gen.js
var seed_gen_default = {
  "version": 0,
  "estimatedPrices": true,
  "updatedAt": "",
  "info": {
    "name": "Cugino's Coffee & Toast",
    "tagline": {
      "tr": "Kahve ve tost, Bah\xE7elievler",
      "en": "Coffee and toast, Bah\xE7elievler"
    },
    "address": "Bah\xE7elievler, Piri Reis Cd. No: 8 D:C, 07050 Muratpa\u015Fa/Antalya",
    "phone": "+90 535 655 61 32",
    "instagram": "",
    "wifi": "",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Cugino%E2%80%99s%20Coffee%20%26%20Toast&query_place_id=ChIJoTY9-0uRwxQRXYIoxzRnykw",
    "currency": "TRY",
    "hours": [
      [
        "09:00",
        "22:00"
      ],
      [
        "09:00",
        "22:00"
      ],
      [
        "09:00",
        "22:00"
      ],
      [
        "09:00",
        "22:00"
      ],
      [
        "09:00",
        "22:00"
      ],
      [
        "09:00",
        "22:00"
      ],
      null
    ],
    "announcement": {
      "tr": "",
      "en": ""
    }
  },
  "categories": [
    {
      "id": "sicak-kahve",
      "name": {
        "tr": "S\u0131cak kahveler",
        "en": "Hot coffee"
      },
      "note": {
        "tr": "\xC7ekirdeklerimizi kendimiz kavuruyoruz. Yulaf veya badem s\xFCt\xFC +25 \u20BA",
        "en": "We roast our own beans. Oat or almond milk +25 \u20BA"
      },
      "items": [
        {
          "id": "espresso",
          "name": {
            "tr": "Espresso",
            "en": "Espresso"
          },
          "desc": {
            "tr": "Tek veya duble shot.",
            "en": "Single or double shot."
          },
          "price": 110,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": "data:image/jpeg;base64,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nFC9KTbVAx1FFFAxpGaQA0+igVgooooGFFFFABRRRQAUUUUuZAFFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKXMgCiiimAUUUUAFFFFABRRRQAUgGKWigAopM84paACiiigAooooAKKKKACiiigAooooAKKKKACiiikkAUUUUwCiiigAooooAKKKQnFAC0U1adS5kAUUUUwCiiik0AU0ntTqbtoSEzD164a30yREOJJ8Qp9ZOCfwGTXMooRAijAUACr+uz+fqUVsOVtY/MP/AF0k4H5D+dUKuMRklFNB7GnVQpBUlR0UDJKbuptFAElFNWnUAf/R/YHBpdtOpcGtAI8Gl20/BowaAGbacB2FO20uBQA0DNd94MvMwz6c55iPmR/7rdfyP864UDNaGmXX9nalBd9EB8uT/cbg/l1rMD2OikBz0paACiiigBhBzRg0+igBB0paKKACiiigAooooAKKKKACiikPIoAM84paavWnUAFFFFABRRRnFABRSA5paACiikJxQAtFJuFLQAUUUUAFFFFABTTmnUUANGadRRQAUUUUAFFFFABRRRQAUUUUAFFFFJIApAc0HkUi9aYDqKKKACiiigAooooAKKKKACmc+9PooAKKKKAGYNPoopJAFFFFMAooooAKKKKACiiigAoopu00AOopBwKWgAooooAKKKKACiiigAooooAKKKKAEAxS0UUAFFFFABRRRQAVFJIkUbSucKgJJ9hUtcz4kuNtqlkh+a6fYf8ArmOW/wAPxoA5uGRpzJdyDD3DGQ+wP3R+AxU1NHAwOKUdK0FIWpKjooGSUU0HsadQTKIUUUUFBRRRQB//0v2Iop+BRgVoAyipKKAGYNOwKWlAzQAlBUMCp6HinbacB2FLlQHpPhu/N7pqLIcy2/7qT8Oh/EV0deXeH742OpqrnEV1+7b0Dfwn+leo1MgCiiikAUUUUAFFFFABRRRQAh4FAOaD0pFoAdRRRQAUUUZFABRRkUUAFJnnFLRQAUhGaWigBAtLRRQAUhGaD0poz2oAdtFLRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFIelAC0UwZ7U+gSYUUUUDCiiigAooooAKKKKACiiilIAooopbgFFFFUAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFIelNGe1AD6KKKACiiigAooooAKKKKACiiilIAooopgFFFFABXnd7c/bdRmuQcxxfuYvov3j+J/lXVa3fGysXaM/vpP3UX+83f8BzXGxIsUaxr0UYqoxFIkpy02lHWqGPopq06gAooooAkpoPY02igCSiiigD//0/2O20badRWgDdtLgU7BowaAG4FOwaXbS4FADcGl206lwaAGMu5cA4PY+h7V6jouof2jYRzt/rF+SUejr1/PrXmeBWz4fvfsOoiJziG7wp9BIPun8elTID0yiiipAKKKKACiiigAooooAKKKKACiiigAph60+mkd6AG09elNAzTgMUALRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUuZAFFFFMAooooAKKKKACiiilzIAooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFQ0AUUUVSdwCiiimAUUUUAFFFFABRRRQAUUUUAFFFFLmQBRRRTAKTcKWk2igABzS0gGKWgAooooAKKKKACiisfWb/wDs+yeVeZX+SIernp+XWgDmNXu/t2psFOYbTMY95D94/h0/Oqi1DFGIowmc46n1J6mpK0AkooooJ5mOWnU1adQEgooooHEKKKKBhRRRQB//1P2TwKMCnYNGDWguVDcClopcGgYlLg0u2lwKAE206ilwaAEpGTepGcehHY9jT9tOoFzI9F0LUf7SsVdz++i/dyj/AGx3/HrW3Xl2lX/9m36zMcQzYjl9vRvwP6V6gDnpUSiMWiiikAUh6UtFADOfenDpS0UAFFFFABRRRQAUUUUAJjnNLRRQAUUUUAFFFFADWpMmlam0ASZFIc9qaOtPoAZz70+iigAooooAKKKKACiiigAooooAKKKQDFAC0UUUkgCiiimAUUUUAFFFFADDnvSj3p1I3SgBciio6kHSgAooooAKKKKACiiigAoyKa3Wm0ASZFFR09elAC0UUUAFFFFABRRRS5UAUUUUwCikAxS0mgCiiimAUUUUAFFFFABRRRSSAKKKKYBRRRQAUUUUAFFFFABRRRQAV57qd5/aGoMynMFrmNPQt/E39BXRa9ftZ2nkwHFxcfJH7Du34CuQjjWJFjXooxVRiKQ+iilHWqGOHSloooMwpwPY02lHWgvlQ+iiigIhRRRQMKKKKAP/1f2XwKWilwa0AbgUtLg0lAuVBS4NLtp1AbDdtLgUtFAuYKUDNKB3NLgUEiFQylWGQetdn4b1Fri3NjO2ZrccE/xJ2P4dDXHU+GaW1uI7y3/1kRzj+8p6r+NKUS0z1miqlpdQ3lvHcwHKSDI/wq1kVAxaKM5ooAKKKTIoAWijOaKUQCiikJxTAWikyKWgBCcU3JpxGabg0APooooAKKKKADGaTApaKAEwKWkyKWgAooooAKKKKACm7jTqKAEBzS0UUAFFFFABRSZFLQAUUUVLYDdxpQc0tFUAUUUmRSkAtFJkUZFEQGkmlHPWm0UwH4FLUdSDpQAUUUUAFN3GnUUANBzQCSadTQCDQApGaMClooATApDx0pcimk5oAATT6aB3pcilEBaKM5opgFFFFABRSE4oyKAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBCcVEzrGhkc7VUEknsBU1cb4ivvNcaVCeDhpz7dl/Hv7UAY0902o3b378KflhB7IP8etJRgDpSgZrQBKcB3NLgUtBMpBRSgZp2BQUNwacBilooJ5gooooHEKKKKBhRRRQB//W/ZyilwaMGtAG4FLRS4NAuVCUUuDRg0ByoMGlA7mnUUDCiiigXKgpwHc06igP7pq6FqH9n3X2WU4t7g/L6LKf6P8Azrv68rZBIhRuhrsdB1NrqI2d0f8ASIB1/wCei9m/xqZDOmXpS0i9KWo5UAU3bTqKYCAYpaKKACkIzS0UAIBiloopNAFFFFEQCiikJxTAWikBzS0AFFFFADB1p9JgUtABRRRQAUUUUAFFFFABRRRQAUh6UtFAEdPHSjApaW4BRRRTAKKKKACmHrT6TAoAaBml20oGKWgBu2jbTqKAG7adRRQAUUUUuZAFFFFMAooooAKKKKAG7aNtOooAbntTafgUygB69KWkXpQelJMBaKZk0ZNMBxGaTbQCSadQKwUUUUDCiiik2AUUUUcqAKKKQnFHMgFopmTT6TYBRRRTiAUUUUwCiiigAooqKR0iQySEKqjJJ7AUAZ+p6gunWhmxukb5Yk/vOen/ANeuFiRxueVt8shLO3qxqzc3T6ndG7bIiXKwKey/3vqf5U2tIxAbtp1FLg0C5UJS4NPooGIBilopcGgXKhKKKKA5UKOtLtp1FASkN206iigXMN20badRQHMz/9f9nwMUtFFaE8wmBSbadRQPmQgGKWiigYUUUUALg04DFGBS0CkFKBmgdacOlKUgjEAMUB5oJUurY4miOV9/UH2NLRTGeiadfxajarcRcZ4ZT1Vh1BrQrzSxvn0q6+0oC0MmBMo9P7wHqP5V6LHJHNGssbBkcZBHQg1DjYCaiiikAUZxRTWoAdRSDpS0AFJkUtMPWgBwOaWmr1p1ABSN0paRulAAvSlpF6UtKQDAM0+imk9hQncGOopAc0tMAooooAKKQEmloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKADOKKa1KOlDQARmkAIp1FArBRRRQMKKKKACiiigApmDT6KAEAxQelLRQAwjFGDStSjpQAgBBp1FFABRRRQAUUUUAFFITigHNAXFpCM0tFADMGn0UUuVAFFFFMAooopcyAKKZuNLuoiK46uJ1y++2THTYD+5jP78j+I9k+nrWprWqNaqLS0P+kyjr/zzXux/pXLxQrEgReg/Mn1PvVxiEh2OKXBp2BS1QxAMUtFLg0AJRS4NLtoATBpdtLgUtApSCm7adRQLmCiiigoKKKKCZBRRRQSf//Q/aEdaSpKTAq5SAZRUlR0xcqFHWl206iplIY3bQtOoo5gCiiiqAKkpq06pkAUUUo61QC/71aejan/AGbKLSdv9Flb5Sf+WTHt9D+lZi0MiupRxlT1BoA9SorjdD1Qxsum3jZzxBIe4/uk+o7V2VQ0AUYzRRSAKKQ8ik2mgB1JgUtFADSMcijLU6igBuWoGT1p1FABjFFFFABSYFLRQAUUUUAFFFFJKwBRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKADGaKKKACiiigAooooAKKKKACiiigAooooAKKKKADGaKKKACiiigAooooAKKKKADAowKKKACiiigAooooAKKKKACiiigArJ1TUU063343yv8sUf95v8AAd6sXt7BYWzXM5wo4A7sT0A9zXEs013cNfXX+tYYRe0a+g/rTjECNFkLPPO3mTSnMjf0HsO1SU/AowKsBuDRg0+igBMCjApaXBoFyoSilwaMGgYlFLg0YNACUUuDSUAFLg0+kwKBcyGUVJUdWoXGFFFFVyID/9H9olp1FFVIBrU2pKjpxActOpv3aXtSkAtFFFSAUUUV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"
        },
        {
          "id": "americano",
          "name": {
            "tr": "Americano",
            "en": "Americano"
          },
          "desc": {
            "tr": "Espresso ve s\u0131cak su.",
            "en": "Espresso topped with hot water."
          },
          "price": 140,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "filtre",
          "name": {
            "tr": "Filtre kahve",
            "en": "Filter coffee"
          },
          "desc": {
            "tr": "G\xFCn\xFCn demlemesi.",
            "en": "Today's brew."
          },
          "price": 130,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "cortado",
          "name": {
            "tr": "Cortado",
            "en": "Cortado"
          },
          "desc": {
            "tr": "E\u015Fit oranda espresso ve s\u0131cak s\xFCt.",
            "en": "Equal parts espresso and steamed milk."
          },
          "price": 150,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "flat-white",
          "name": {
            "tr": "Flat white",
            "en": "Flat white"
          },
          "desc": {
            "tr": "Duble ristretto, ince k\xF6p\xFCkl\xFC s\xFCt.",
            "en": "Double ristretto, silky microfoam."
          },
          "price": 170,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "cappuccino",
          "name": {
            "tr": "Cappuccino",
            "en": "Cappuccino"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 165,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "latte",
          "name": {
            "tr": "Latte",
            "en": "Latte"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 170,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": "",
          "variants": [
            {
              "label": {
                "tr": "Orta",
                "en": "Medium"
              },
              "price": 170
            },
            {
              "label": {
                "tr": "B\xFCy\xFCk",
                "en": "Large"
              },
              "price": 195
            }
          ]
        },
        {
          "id": "mocha",
          "name": {
            "tr": "Mocha",
            "en": "Mocha"
          },
          "desc": {
            "tr": "Espresso, \xE7ikolata ve s\xFCt.",
            "en": "Espresso, chocolate and milk."
          },
          "price": 190,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "beyaz-mocha",
          "name": {
            "tr": "Beyaz \xE7ikolatal\u0131 mocha",
            "en": "White chocolate mocha"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 195,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "turk-kahvesi",
          "name": {
            "tr": "T\xFCrk kahvesi",
            "en": "Turkish coffee"
          },
          "desc": {
            "tr": "Lokum ile.",
            "en": "Served with Turkish delight."
          },
          "price": 110,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        }
      ]
    },
    {
      "id": "soguk-kahve",
      "name": {
        "tr": "So\u011Fuk kahveler",
        "en": "Iced coffee"
      },
      "note": {
        "tr": "",
        "en": ""
      },
      "items": [
        {
          "id": "iced-americano",
          "name": {
            "tr": "Iced americano",
            "en": "Iced americano"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 150,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "iced-latte",
          "name": {
            "tr": "Iced latte",
            "en": "Iced latte"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 180,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "cold-brew",
          "name": {
            "tr": "Cold brew",
            "en": "Cold brew"
          },
          "desc": {
            "tr": "18 saat so\u011Fuk demleme.",
            "en": "Steeped cold for 18 hours."
          },
          "price": 170,
          "tags": [
            "new"
          ],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "iced-mocha",
          "name": {
            "tr": "Iced mocha",
            "en": "Iced mocha"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 200,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "affogato",
          "name": {
            "tr": "Affogato",
            "en": "Affogato"
          },
          "desc": {
            "tr": "Vanilyal\u0131 dondurma \xFCzerine espresso.",
            "en": "Espresso poured over vanilla ice cream."
          },
          "price": 190,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "milk",
            "eggs"
          ],
          "available": true,
          "photo": ""
        }
      ]
    },
    {
      "id": "cay-ve-diger",
      "name": {
        "tr": "\xC7ay ve di\u011Fer i\xE7ecekler",
        "en": "Tea and other drinks"
      },
      "note": {
        "tr": "",
        "en": ""
      },
      "items": [
        {
          "id": "cay",
          "name": {
            "tr": "\xC7ay",
            "en": "Turkish tea"
          },
          "desc": {
            "tr": "\u0130nce belli bardakta.",
            "en": "In a tulip glass."
          },
          "price": 40,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "bitki-cayi",
          "name": {
            "tr": "Bitki \xE7ay\u0131",
            "en": "Herbal tea"
          },
          "desc": {
            "tr": "Ihlamur, ada\xE7ay\u0131 veya papatya.",
            "en": "Linden, sage or chamomile."
          },
          "price": 110,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "chai-latte",
          "name": {
            "tr": "Chai tea latte",
            "en": "Chai tea latte"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 180,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "sicak-cikolata",
          "name": {
            "tr": "S\u0131cak \xE7ikolata",
            "en": "Hot chocolate"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 175,
          "tags": [],
          "allergens": [
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "limonata",
          "name": {
            "tr": "Ev yap\u0131m\u0131 limonata",
            "en": "Homemade lemonade"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 150,
          "tags": [
            "vegan"
          ],
          "allergens": [],
          "available": true,
          "photo": ""
        }
      ]
    },
    {
      "id": "tostlar",
      "name": {
        "tr": "Tostlar",
        "en": "Toasties"
      },
      "note": {
        "tr": "Tostlar\u0131m\u0131z ayran veya \xE7ay ile servis edilebilir.",
        "en": "Add ayran or tea to any toastie."
      },
      "items": [
        {
          "id": "karisik-bazlama",
          "name": {
            "tr": "Kar\u0131\u015F\u0131k bazlama tost",
            "en": "Mixed bazlama toastie"
          },
          "desc": {
            "tr": "Bazlama ekme\u011Finde sucuk, ka\u015Far, domates ve biber.",
            "en": "Flatbread with sucuk, kashkaval, tomato and pepper."
          },
          "price": 280,
          "tags": [
            "popular"
          ],
          "allergens": [
            "gluten",
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "kasarli-tost",
          "name": {
            "tr": "Ka\u015Farl\u0131 tost",
            "en": "Cheese toastie"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 190,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "sucuklu-kasarli",
          "name": {
            "tr": "Sucuklu ka\u015Farl\u0131 tost",
            "en": "Sucuk and cheese toastie"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 240,
          "tags": [],
          "allergens": [
            "gluten",
            "milk"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "hellimli",
          "name": {
            "tr": "Hellimli domatesli tost",
            "en": "Halloumi and tomato toastie"
          },
          "desc": {
            "tr": "Hellim, domates, roka ve pesto.",
            "en": "Halloumi, tomato, rocket and pesto."
          },
          "price": 260,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk",
            "nuts"
          ],
          "available": true,
          "photo": ""
        }
      ]
    },
    {
      "id": "firindan",
      "name": {
        "tr": "F\u0131r\u0131ndan",
        "en": "From the oven"
      },
      "note": {
        "tr": "Kruvasanlar\u0131m\u0131z her sabah taze pi\u015Fer.",
        "en": "Our croissants are baked fresh every morning."
      },
      "items": [
        {
          "id": "kruvasan",
          "name": {
            "tr": "Tereya\u011Fl\u0131 kruvasan",
            "en": "Butter croissant"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 150,
          "tags": [
            "popular",
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk",
            "eggs"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "cikolatali-kruvasan",
          "name": {
            "tr": "\xC7ikolatal\u0131 kruvasan",
            "en": "Chocolate croissant"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 170,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk",
            "eggs",
            "soy"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "peynirli-kruvasan",
          "name": {
            "tr": "Peynirli kruvasan",
            "en": "Cheese croissant"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 185,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk",
            "eggs"
          ],
          "available": true,
          "photo": ""
        }
      ]
    },
    {
      "id": "tatlilar",
      "name": {
        "tr": "Tatl\u0131lar",
        "en": "Desserts"
      },
      "note": {
        "tr": "",
        "en": ""
      },
      "items": [
        {
          "id": "san-sebastian",
          "name": {
            "tr": "San Sebastian cheesecake",
            "en": "San Sebastian cheesecake"
          },
          "desc": {
            "tr": "Yan\u0131k y\xFCzeyli, ak\u0131\u015Fkan ortal\u0131.",
            "en": "Burnt top, creamy centre."
          },
          "price": 230,
          "tags": [
            "popular",
            "vegetarian"
          ],
          "allergens": [
            "milk",
            "eggs",
            "gluten"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "brownie",
          "name": {
            "tr": "Brownie",
            "en": "Brownie"
          },
          "desc": {
            "tr": "",
            "en": ""
          },
          "price": 170,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk",
            "eggs",
            "nuts"
          ],
          "available": true,
          "photo": ""
        },
        {
          "id": "gunun-keki",
          "name": {
            "tr": "G\xFCn\xFCn keki",
            "en": "Cake of the day"
          },
          "desc": {
            "tr": "Vitrine g\xF6z at\u0131n.",
            "en": "Ask what's in the case today."
          },
          "price": 140,
          "tags": [
            "vegetarian"
          ],
          "allergens": [
            "gluten",
            "milk",
            "eggs"
          ],
          "available": true,
          "photo": ""
        }
      ]
    },
    {
      "id": "cekirdek",
      "name": {
        "tr": "Eve kahve",
        "en": "Coffee to take home"
      },
      "note": {
        "tr": "\xC7ekirdek veya \xF6\u011F\xFCt\xFClm\xFC\u015F, demleme y\xF6nteminize g\xF6re.",
        "en": "Whole bean or ground for your brew method."
      },
      "items": [
        {
          "id": "ev-harmani",
          "name": {
            "tr": "Evin harman\u0131, 250 g",
            "en": "House blend, 250 g"
          },
          "desc": {
            "tr": "Taze kavrulmu\u015F.",
            "en": "Freshly roasted."
          },
          "price": 650,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        },
        {
          "id": "tek-orijin",
          "name": {
            "tr": "Tek orijin, 250 g",
            "en": "Single origin, 250 g"
          },
          "desc": {
            "tr": "D\xF6nemin \xE7ekirde\u011Fini sorun.",
            "en": "Ask about the current origin."
          },
          "price": 850,
          "tags": [],
          "allergens": [],
          "available": true,
          "photo": ""
        }
      ]
    }
  ]
};

// functions/api/menu.js
var MAX_BYTES = 4 * 1024 * 1024;
async function loadMenu(env) {
  const raw = await env.MENU_KV.get(KV_MENU);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
    }
  }
  return seed_gen_default;
}
function valid(d) {
  if (!d || typeof d !== "object" || !Array.isArray(d.categories) || !d.info) return false;
  if (!Array.isArray(d.info.hours) || d.info.hours.length !== 7) return false;
  return d.categories.every(function(c) {
    return c && typeof c.id === "string" && c.name && Array.isArray(c.items) && c.items.every(function(i) {
      return i && typeof i.id === "string" && i.name;
    });
  });
}
async function onRequestGet2({ env }) {
  return json(await loadMenu(env));
}
async function onRequestPut({ request, env }) {
  if (!await readSession(request, env)) return json({ error: "unauthorized" }, 401);
  const text = await request.text();
  if (text.length > MAX_BYTES) return json({ error: "too_large" }, 413);
  let next;
  try {
    next = JSON.parse(text);
  } catch (e) {
    return json({ error: "bad_request" }, 400);
  }
  if (!valid(next)) return json({ error: "bad_request" }, 400);
  const current = await loadMenu(env);
  const expected = request.headers.get("If-Match");
  if (expected && current.updatedAt && expected !== current.updatedAt) {
    return json({ error: "conflict", updatedAt: current.updatedAt }, 409);
  }
  delete next.auth;
  delete next.github;
  next.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  next.version = (Number(current.version) || 0) + 1;
  await env.MENU_KV.put(KV_MENU, JSON.stringify(next));
  return json({ ok: true, updatedAt: next.updatedAt, version: next.version });
}

// worker.src.js
var ROUTES = {
  "/api/login": { POST: onRequestPost },
  "/api/logout": { POST: onRequestPost2 },
  "/api/session": { GET: onRequestGet },
  "/api/password": { POST: onRequestPost3 },
  "/api/menu": { GET: onRequestGet2, PUT: onRequestPut }
};
async function page(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const menu = await loadMenu(env);
  menu.site = { url: new URL(request.url).origin + "/" };
  const etag = '"' + (menu.updatedAt || "seed") + "-" + JS_V + '"';
  const base = {
    "Cache-Control": "public, max-age=0, must-revalidate",
    ETag: etag,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
  if (request.headers.get("If-None-Match") === etag) return new Response(null, { status: 304, headers: base });
  const html = renderDocument(menu, { cssHref: "/styles.css?v=" + CSS_V, jsHref: "/app.js?v=" + JS_V });
  base["Content-Type"] = "text/html; charset=utf-8";
  return new Response(request.method === "HEAD" ? null : html, { headers: base });
}
var worker_src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    if (!env.MENU_KV) {
      return new Response(
        "MENU_KV is not bound. Add the KV binding in the Pages project settings, then redeploy.",
        { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }
    const route = ROUTES[path];
    if (route) {
      const handler = route[request.method];
      if (!handler) {
        return new Response("Method not allowed", { status: 405, headers: { Allow: Object.keys(route).join(", ") } });
      }
      return handler({ request, env });
    }
    if (path === "/" || path === "/index.html") return page(request, env);
    const asset = await env.ASSETS.fetch(request);
    if (asset.ok && (path === "/app.js" || path === "/styles.css")) {
      const out = new Response(asset.body, asset);
      out.headers.set("Cache-Control", "public, max-age=31536000, immutable");
      out.headers.set("X-Content-Type-Options", "nosniff");
      return out;
    }
    return asset;
  }
};
export {
  worker_src_default as default
};
