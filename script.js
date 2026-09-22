/* ============================================================
   Signature (Standard) Wedding Invitation — behaviour
   All content comes from INVITE_CONFIG (config.js).

   1. Envelope intro               7. Countdown (+ today mode)
   2. Theme + text hydration       8. Background music
   3. Name fitting / hero photo    9. RSVP form (+ petal burst)
   4. Story timeline (+ gold fill) 10. Share
   5. Event cards (icons, chips)   11. Petals / parallax / reveals
   6. Gallery + lightbox
   ============================================================ */
(function () {
  "use strict";

  // Top-level `const` in config.js creates a global lexical binding, not a
  // window property — so read the binding directly and only fall back to window.
  var cfg = typeof INVITE_CONFIG !== "undefined" ? INVITE_CONFIG : window.INVITE_CONFIG;
  if (!cfg) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ============ 1. Envelope intro ============
     A wax-sealed envelope over the page; tapping the seal opens the
     flap, lifts the card and fades away — then the hero entrance runs
     (html.is-open gates the .anim animations in styles.css). */
  (function initIntro() {
    var enabled = !(cfg.intro && cfg.intro.enabled === false);
    if (!enabled) {
      document.documentElement.classList.add("is-open");
      return;
    }

    var initials = esc(cfg.couple.initials || "");
    var names = esc(cfg.couple.name1 + " & " + cfg.couple.name2);
    var dateShort = esc(cfg.dateDisplay || "");
    var hint = esc((cfg.intro && cfg.intro.hint) || "Tap the seal to open");

    document.body.classList.add("intro-active");

    var intro = document.createElement("div");
    intro.className = "intro";
    intro.innerHTML =
      '<div class="intro__envelope">' +
      '<div class="intro__card">' +
      '<span class="intro__card-seal"><span>' + initials + "</span></span>" +
      '<p class="intro__card-names">' + names + "</p>" +
      '<p class="intro__card-date">' + dateShort + "</p>" +
      "</div>" +
      '<div class="intro__pocket" aria-hidden="true"></div>' +
      '<div class="intro__flap" aria-hidden="true">' +
      '<span class="intro__flap-face intro__flap-face--front"></span>' +
      '<span class="intro__flap-face intro__flap-face--back"></span>' +
      "</div>" +
      '<button class="intro__seal" type="button"><span>' + initials + "</span></button>" +
      "</div>" +
      '<p class="intro__hint">' + hint + "</p>";
    document.body.appendChild(intro);

    var opened = false;
    intro.querySelector(".intro__seal").addEventListener("click", function () {
      if (opened) return;
      opened = true;
      intro.classList.add("is-opening");
      setTimeout(function () { intro.classList.add("is-lifting"); }, 680);
      setTimeout(function () {
        intro.classList.add("is-done");
        document.documentElement.classList.add("is-open");
        document.body.classList.remove("intro-active");
      }, 1420);
      setTimeout(function () { intro.remove(); }, 2150);
    });
  })();

  /* ============ 2. Theme + text hydration ============ */
  if (cfg.theme) document.documentElement.setAttribute("data-theme", cfg.theme);

  var slots = {
    "data-initials": cfg.couple.initials,
    "data-name1": cfg.couple.name1,
    "data-name2": cfg.couple.name2,
    "data-date-display": cfg.dateDisplay,
    "data-city": cfg.city,
    "data-blessing": cfg.blessing,
    "data-welcome-eyebrow": cfg.welcome.eyebrow,
    "data-parents1": cfg.welcome.parents1,
    "data-parents2": cfg.welcome.parents2,
    "data-invite-line": cfg.welcome.inviteLine,
    "data-countdown-note": cfg.countdownNote,
    "data-venue-name": cfg.venue.name,
    "data-venue-address": (cfg.venue.address || ""),
    "data-closing": cfg.closing,
    "data-footer-names": cfg.couple.name1 + " & " + cfg.couple.name2,
    "data-footer-date": formatDateShort() + " \u00B7 " + cfg.city.replace(", Bangladesh", "").replace(/,.*/, ""),
    "data-hashtag": cfg.couple.hashtag,
    "data-credit": cfg.credit,
  };

  Object.keys(slots).forEach(function (attr) {
    var el = $("[" + attr + "]");
    if (el) el.textContent = slots[attr];
  });

  // Document title & social meta follow the couple.
  var title = cfg.couple.name1 + " & " + cfg.couple.name2 + " \u2014 Wedding Invitation";
  document.title = title;
  var ogTitle = $('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", title);
  var twTitle = $('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute("content", title);
  if (cfg.ogImage) {
    $$('meta[property="og:image"], meta[name="twitter:image"]').forEach(function (m) {
      m.setAttribute("content", cfg.ogImage);
    });
  }

  function formatDateShort() {
    // "12 · 02 · 2027" from weddingDateTime (venue-local via manual parse).
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(cfg.weddingDateTime);
    return m ? m[3] + " \u00B7 " + m[2] + " \u00B7 " + m[1] : "";
  }

  /* Keep each name on a single line: shrink the script font until it fits
     the arch. Below 18px, give up and allow wrapping (very long names). */
  function fitNames() {
    $$(".hero__name").forEach(function (el) {
      el.style.whiteSpace = "nowrap";
      el.style.fontSize = "";
      var max = el.parentElement.clientWidth;
      var size = parseFloat(window.getComputedStyle(el).fontSize);
      var guard = 30;
      while (size > 18 && el.scrollWidth > max && guard-- > 0) {
        size -= 1;
        el.style.fontSize = size + "px";
      }
      if (el.scrollWidth > max) el.style.whiteSpace = "";
    });
  }
  fitNames();
  window.addEventListener("resize", fitNames);

  /* Optional couple photo behind the arch content (config.heroPhoto). */
  (function initHeroPhoto() {
    var el = $("#heroPhoto");
    if (!el || !cfg.heroPhoto || !cfg.heroPhoto.src) return;
    el.hidden = false;
    el.innerHTML =
      '<img src="' + esc(cfg.heroPhoto.src) + '" alt="' + esc(cfg.heroPhoto.alt || "") + '" />';
    el.style.setProperty("--tint", cfg.heroPhoto.tint != null ? cfg.heroPhoto.tint : 0.55);
    var arch = $(".hero__arch");
    if (arch) arch.classList.add("has-photo");
    // Photo can change how much room the names have — re-fit.
    fitNames();
  })();

  /* ============ 3. Story timeline (+ gold fill) ============ */
  var storyList = $("#storyList");
  if (storyList && cfg.story && cfg.story.chapters && cfg.story.chapters.length) {
    var storyHead = {
      eyebrow: $(".story .eyebrow"),
      title: $(".story .section-title"),
    };
    if (storyHead.eyebrow) storyHead.eyebrow.textContent = cfg.story.eyebrow;
    if (storyHead.title) {
      storyHead.title.innerHTML =
        esc(cfg.story.title || "Our") + " <em>" + esc(cfg.story.titleAccent || "Story") + "</em>";
    }
    storyList.innerHTML = cfg.story.chapters.map(function (ch) {
      return (
        '<article class="chapter reveal">' +
        '<span class="chapter__dot" aria-hidden="true"></span>' +
        (ch.label ? '<p class="chapter__label">' + esc(ch.label) + "</p>" : "") +
        '<h3 class="chapter__title">' + esc(ch.title) + "</h3>" +
        '<p class="chapter__text">' + esc(ch.text) + "</p>" +
        "</article>"
      );
    }).join("");
  }

  /* Gold thread that fills as the guest scrolls through the chapters. */
  (function initStoryFill() {
    var tl = $(".story__timeline");
    if (!tl) return;
    var fill = document.createElement("span");
    fill.className = "story__fill";
    fill.setAttribute("aria-hidden", "true");
    tl.appendChild(fill);

    var ticking = false;
    function update() {
      ticking = false;
      var r = tl.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var focus = window.innerHeight * 0.62;
      var p = Math.max(0, Math.min(1, (focus - r.top) / r.height));
      fill.style.height = (p * 100).toFixed(1) + "%";
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();

  /* ============ 4. Event cards ============ */
  var ICONS = {
    date: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
    time: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 13.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  /* Medallion icons — one per event kind (chosen in config.js) */
  var EVENT_ICONS = {
    // henna-adorned hand
    mehendi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 21v-3.6L6 12.6c-.6-1.4.5-2.7 1.8-2.3.7.2 1.2.8 1.5 1.5l.9 2.2V5.9c0-1 .7-1.9 1.7-1.9s1.7.9 1.7 1.9v5l3.3-1.2c1.2-.4 2.4.5 2.2 1.8l-.6 4.1c-.2 1.5-.9 2.8-2 3.8l-1.5 1.4"/><circle cx="10.7" cy="7.5" r=".45" fill="currentColor" stroke="none"/><circle cx="13.4" cy="9.6" r=".45" fill="currentColor" stroke="none"/><circle cx="10.4" cy="11.4" r=".45" fill="currentColor" stroke="none"/></svg>',
    // interlocked wedding rings
    rings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9.2" cy="14.2" r="5.2"/><circle cx="14.8" cy="14.2" r="5.2"/><path d="M14.8 3.6 17 6.2l-2.2 2.6-2.2-2.6Z"/></svg>',
    // crescent moon and star
    crescent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.8 3.6A9 9 0 1 0 20.4 14 7.2 7.2 0 0 1 14.8 3.6Z"/><path d="M17.8 4.2l.55 1.45L19.8 6.2l-1.45.55-.55 1.45-.55-1.45-1.45-.55 1.45-.55Z"/></svg>',
    // fallback sprig
    floral: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9"/><path d="M12 15c-3.2-.4-5-2.4-5-5 3.2.4 5 2.4 5 5Z"/><path d="M12 15c3.2-.4 5-2.4 5-5-3.2.4-5 2.4-5 5Z"/><path d="M12 9c-2.3-.6-3.5-2.2-3.5-4.6C10.8 5 12 6.6 12 9Z"/><path d="M12 9c2.3-.6 3.5-2.2 3.5-4.6C13.2 5 12 6.6 12 9Z"/><circle cx="12" cy="4.2" r=".5" fill="currentColor" stroke="none"/></svg>',
  };

  var DETAIL_ICONS = {
    dress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3.5 12 6l2.5-2.5"/><path d="M12 6c-2 3.4-6 4.6-6 8.2 0 3.2 2.7 5.3 6 5.3s6-2.1 6-5.3c0-3.6-4-4.8-6-8.2Z"/><path d="M9 14.5c.8 1.4 1.8 2.2 3 2.4"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M4 10h16M12 10v10"/><path d="M12 10c-3 0-4.6-1.4-4.1-2.9S11 4.3 12 8c1-3.7 4.6-4.4 4.1-1-0.4 1.5-1.1 3-4.1 3Z"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.8 3.6A9 9 0 1 0 20.4 14 7.2 7.2 0 0 1 14.8 3.6Z"/></svg>',
    ring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14.5" r="5.6"/><path d="M12 3.6 14.6 6.7 12 9.8 9.4 6.7Z"/></svg>',
    floral: EVENT_ICONS.floral,
  };

  var list = $("#eventList");
  if (list && cfg.events && cfg.events.length) {
    list.innerHTML = cfg.events.map(renderEvent).join("");
  }

  function renderEvent(ev) {
    var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.mapQuery || ev.venue || "");
    var calUrl = buildCalendarUrl(ev);
    var icon = EVENT_ICONS[ev.icon] || EVENT_ICONS.floral;
    var chip = chipLabel(ev);
    return (
      '<article class="event-card reveal">' +
      '<span class="event-card__icon" aria-hidden="true">' + icon + "</span>" +
      (chip ? '<span class="event-card__chip">' + esc(chip) + "</span>" : "") +
      '<p class="event-card__tag">' + esc(ev.tag) + "</p>" +
      '<h3 class="event-card__name">' + esc(ev.name) + "</h3>" +
      (ev.tagline ? '<p class="event-card__tagline">' + esc(ev.tagline) + "</p>" : "") +
      '<div class="event-card__divider" aria-hidden="true"></div>' +
      '<dl class="event-card__rows">' +
      row(ICONS.date, "Date", ev.date) +
      row(ICONS.time, "Time", ev.time) +
      row(ICONS.pin, "Venue", ev.venue) +
      (ev.address ? row('<span class="row__dot" aria-hidden="true"></span>', "Address", ev.address) : "") +
      "</dl>" +
      '<div class="event-card__actions">' +
      '<a class="link-btn" href="' + mapUrl + '" target="_blank" rel="noopener">View on Map \u2197</a>' +
      (calUrl ? '<a class="link-btn link-btn--calendar" href="' + calUrl + '" target="_blank" rel="noopener">Add to Calendar \u2197</a>' : "") +
      "</div></article>"
    );
  }

  /* "Thu · 11 Feb" style ticket chip — explicit ev.chip wins, else derive
     from calDate. Returns "" when neither is available. */
  function chipLabel(ev) {
    if (ev.chip) return ev.chip;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ev.calDate || "");
    if (!m) return "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
    return days[d.getUTCDay()] + " \u00B7 " + (+m[3]) + " " + months[+m[2] - 1];
  }

  function row(icon, label, value) {
    return '<div class="row"><dt>' + icon + "<span>" + label + "</span></dt><dd>" + esc(value) + "</dd></div>";
  }

  function buildCalendarUrl(ev) {
    if (!ev.calDate || !ev.calStart || !ev.calEnd) return "";
    var start = ev.calDate.replace(/-/g, "") + "T" + ev.calStart.replace(":", "") + "00";
    var end = ev.calDate.replace(/-/g, "") + "T" + ev.calEnd.replace(":", "") + "00";
    var params = {
      action: "TEMPLATE",
      text: cfg.couple.name1 + " & " + cfg.couple.name2 + " \u2014 " + ev.name,
      dates: start + "/" + end,
      details: "We would be honoured by your presence. " + cfg.couple.hashtag,
      location: [ev.venue, ev.address].filter(Boolean).join(", "),
    };
    if (ev.calTz) params.ctz = ev.calTz;
    return "https://calendar.google.com/calendar/render?" + Object.keys(params)
      .map(function (k) { return k + "=" + encodeURIComponent(params[k]); })
      .join("&");
  }

  /* ============ 5. Gallery + lightbox ============ */
  var galleryGrid = $("#galleryGrid");
  var photos = (cfg.gallery && cfg.gallery.photos) || [];

  if (galleryGrid && photos.length) {
    var gHead = { eyebrow: $(".gallery .eyebrow"), title: $(".gallery .section-title") };
    if (gHead.eyebrow) gHead.eyebrow.textContent = cfg.gallery.eyebrow;
    if (gHead.title) {
      gHead.title.innerHTML =
        esc(cfg.gallery.title || "Our") + " <em>" + esc(cfg.gallery.titleAccent || "Gallery") + "</em>";
    }
    // Square tiles alternate between flat and arched tops
    // (unless a photo opts in/out with arched: true/false).
    var sq = 0;
    galleryGrid.innerHTML = photos.map(function (p, i) {
      var arch = p.arched != null
        ? !!p.arched
        : (!p.wide && (sq++ % 2) === 1);
      return (
        '<button class="g-photo reveal' + (p.wide ? " g-photo--wide" : "") + (arch ? " g-photo--arch" : "") + '" type="button" ' +
        'data-index="' + i + '" aria-label="View photo: ' + esc(p.alt || p.caption || "photo") + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy" decoding="async" />' +
        (p.caption ? '<span class="g-photo__cap">' + esc(p.caption) + "</span>" : "") +
        "</button>"
      );
    }).join("");
  }

  (function initLightbox() {
    var lb = $("#lightbox");
    if (!lb || !photos.length) return;

    var img = $("#lbImg"), cap = $("#lbCaption"), count = $("#lbCount");
    var current = 0;
    var lastFocus = null;

    function render() {
      var p = photos[current] || {};
      img.src = p.src || "";
      img.alt = p.alt || "";
      cap.textContent = p.caption || "";
      count.textContent = (current + 1) + " / " + photos.length;
      // restart the Ken Burns drift for the new photo
      img.classList.remove("is-zoom");
      void img.offsetWidth;
      img.classList.add("is-zoom");
    }

    function open(i) {
      current = i;
      render();
      lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      // force a frame so the fade transition runs
      void lb.offsetWidth;
      lb.classList.add("is-open");
      $("#lbClose").focus();
    }

    function close() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { lb.hidden = true; }, 300);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function step(d) {
      current = (current + d + photos.length) % photos.length;
      render();
    }

    $$(".g-photo").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(parseInt(btn.getAttribute("data-index"), 10) || 0);
      });
    });

    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", function () { step(-1); });
    $("#lbNext").addEventListener("click", function () { step(1); });

    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lightbox__stage")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    // Touch swipe
    var touchX = null;
    lb.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) step(dx > 0 ? -1 : 1);
      touchX = null;
    }, { passive: true });
  })();

  /* ============ 6. Map ============ */
  var mapFrame = $("#venueMap");
  if (mapFrame && cfg.venue.mapQuery) {
    var zoom = cfg.venue.mapZoom || 15;
    mapFrame.src =
      "https://maps.google.com/maps?q=" + encodeURIComponent(cfg.venue.mapQuery) +
      "&z=" + zoom + "&output=embed";
  }
  $$("[data-directions]").forEach(function (a) {
    if (cfg.venue.mapQuery) {
      a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(cfg.venue.mapQuery);
    }
  });

  /* ============ 6b. Good-to-know cards (dress code, gifts…) ============ */
  (function initDetails() {
    var section = $("#details");
    if (!section) return;
    var d = cfg.details;
    if (!d || !d.cards || !d.cards.length) return;

    var eyebrow = $("[data-details-eyebrow]");
    if (eyebrow && d.eyebrow) eyebrow.textContent = d.eyebrow;
    var titleEl = $(".details .section-title");
    if (titleEl) {
      titleEl.innerHTML =
        esc(d.title || "The") + " <em>" + esc(d.titleAccent || "Details") + "</em>";
    }

    $("#detailsCards").innerHTML = d.cards.map(function (c) {
      var icon = DETAIL_ICONS[c.icon] || DETAIL_ICONS.floral;
      return (
        '<article class="details-card reveal">' +
        '<span class="details-card__icon" aria-hidden="true">' + icon + "</span>" +
        '<h3 class="details-card__title">' + esc(c.title) + "</h3>" +
        (c.text ? '<p class="details-card__text">' + esc(c.text) + "</p>" : "") +
        (c.swatches && c.swatches.length
          ? '<div class="details-card__swatches" aria-hidden="true">' +
            c.swatches.map(function (hex) {
              return '<span class="swatch" style="--c:' + esc(hex) + '"></span>';
            }).join("") + "</div>"
          : "") +
        "</article>"
      );
    }).join("");

    section.hidden = false;
  })();

  /* ============ 7. Countdown (tick pulse + today mode) ============ */
  var target = new Date(cfg.weddingDateTime).getTime();
  var cd = {
    d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMinutes"), s: $("#cdSeconds"),
  };

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function setNum(el, val) {
    if (!el || el.textContent === val) return;
    el.textContent = val;
    el.classList.remove("is-tick");
    void el.offsetWidth; // restart the pulse animation
    el.classList.add("is-tick");
  }

  var cdTimer = null;
  var todayShown = false;

  function showToday() {
    todayShown = true;
    var grid = $(".countdown__grid");
    var note = $("#cdToday");
    if (grid) grid.style.display = "none";
    if (note) {
      if (cfg.countdownToday) note.textContent = cfg.countdownToday;
      note.hidden = false;
    }
    if (cdTimer) { clearInterval(cdTimer); cdTimer = null; }
  }

  function tick() {
    var diff = target - Date.now();
    if (isNaN(target)) return;
    if (diff <= 0) {
      if (!todayShown) showToday();
      return;
    }
    setNum(cd.d, pad(Math.floor(diff / 864e5)));
    setNum(cd.h, pad(Math.floor(diff / 36e5) % 24));
    setNum(cd.m, pad(Math.floor(diff / 6e4) % 60));
    setNum(cd.s, pad(Math.floor(diff / 1e3) % 60));
  }
  tick();
  if (!todayShown) cdTimer = setInterval(tick, 1000);

  /* ============ 8. Background music ============ */
  (function initMusic() {
    var btn = $("#musicBtn");
    if (!btn || !cfg.music || !cfg.music.enabled || !cfg.music.src) return;

    var audio = new Audio(cfg.music.src);
    audio.loop = true;
    audio.preload = "auto";

    var fading = null;

    function fadeTo(vol, done) {
      if (fading) clearInterval(fading);
      var from = audio.volume, t = 0, steps = 20, dur = 700;
      fading = setInterval(function () {
        t += 1;
        audio.volume = Math.min(1, Math.max(0, from + (vol - from) * (t / steps)));
        if (t >= steps) {
          clearInterval(fading);
          fading = null;
          if (done) done();
        }
      }, dur / steps);
    }

    function play() {
      var p = audio.play();
      if (p && p.catch) p.catch(function () { /* still blocked; user can tap the button */ });
      audio.volume = 0;
      fadeTo(0.55);
      btn.classList.add("is-playing");
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Pause background music");
    }

    function pause() {
      fadeTo(0, function () { audio.pause(); });
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Play background music");
    }

    // Only reveal the control once we know the track loads.
    audio.addEventListener("canplaythrough", function () { btn.hidden = false; }, { once: true });
    audio.addEventListener("error", function () { btn.hidden = true; }, { once: true });
    audio.load();

    btn.addEventListener("click", function () {
      if (audio.paused) play();
      else pause();
    });

    // Browsers block silent autoplay — start on the guest's first gesture.
    if (cfg.music.autoplay) {
      var startOnce = function () {
        if (audio.paused) play();
        window.removeEventListener("pointerdown", startOnce);
        window.removeEventListener("keydown", startOnce);
      };
      window.addEventListener("pointerdown", startOnce);
      window.addEventListener("keydown", startOnce);
    }

    // Pause politely when the tab is hidden.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && !audio.paused) pause();
    });
  })();

  /* ============ 9. RSVP ============ */

  /* Shower of petals from an element — used to celebrate a sent RSVP. */
  function petalBurst(originEl) {
    var r = originEl
      ? originEl.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    var x = r.left + (r.width || 0) / 2;
    var y = r.top + (r.height || 0) / 2;
    var layer = document.createElement("div");
    layer.className = "burst-layer";
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 18; i++) {
      var s = document.createElement("span");
      var ang = Math.random() * Math.PI * 2;
      var dist = 90 + Math.random() * 150;
      s.className = "burst-petal";
      s.style.setProperty("--x", x.toFixed(0) + "px");
      s.style.setProperty("--y", y.toFixed(0) + "px");
      s.style.setProperty("--bx", (Math.cos(ang) * dist).toFixed(0) + "px");
      s.style.setProperty("--by", (Math.sin(ang) * dist * 0.7 - 60).toFixed(0) + "px");
      s.style.setProperty("--br", (Math.random() * 320 - 160).toFixed(0) + "deg");
      s.style.setProperty("--s", (Math.random() * 7 + 7).toFixed(0) + "px");
      s.style.setProperty("--dl", (Math.random() * 0.18).toFixed(2) + "s");
      frag.appendChild(s);
    }
    layer.appendChild(frag);
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 1900);
  }

  (function initRsvp() {
    var section = $(".rsvp");
    var form = $("#rsvpForm");
    var done = $("#rsvpDone");
    if (!form) return;
    if (!cfg.rsvp || !cfg.rsvp.enabled) {
      if (section) section.style.display = "none";
      return;
    }

    var noteEl = $("[data-rsvp-note]");
    if (noteEl && cfg.rsvp.note) {
      noteEl.textContent = String(cfg.rsvp.note).replace("{deadline}", cfg.rsvp.deadline || "");
    }
    var successEl = $("[data-rsvp-success]");
    if (successEl && cfg.rsvp.successNote) successEl.textContent = cfg.rsvp.successNote;

    // Event checkboxes from the same config that renders the cards.
    var eventsWrap = $("#rsvpEvents");
    if (eventsWrap && cfg.events && cfg.events.length) {
      eventsWrap.innerHTML = cfg.events.map(function (ev, i) {
        return (
          '<label class="choice__opt">' +
          '<input type="checkbox" name="events" value="' + esc(ev.name) + '" ' + (i === 0 ? "" : "checked") + ' />' +
          "<span>" + esc(ev.name) + "</span>" +
          "</label>"
        );
      }).join("");
    }

    var guestsWrap = $("#rsvpGuestsWrap");
    var eventsWrapField = $("#rsvpEventsWrap");

    function syncAttendance() {
      var attending = (form.querySelector('input[name="attending"]:checked') || {}).value === "yes";
      if (guestsWrap) guestsWrap.hidden = !attending;
      if (eventsWrapField) eventsWrapField.hidden = !attending;
    }
    $$('input[name="attending"]', form).forEach(function (r) {
      r.addEventListener("change", syncAttendance);
    });
    syncAttendance();

    function collect() {
      var data = {
        couple: cfg.couple.name1 + " & " + cfg.couple.name2,
        name: ($("#rsvpName") || {}).value || "",
        attending: (form.querySelector('input[name="attending"]:checked') || {}).value || "yes",
        guests: ($("#rsvpGuests") || {}).value || "",
        events: $$('input[name="events"]:checked', form).map(function (c) { return c.value; }),
        message: ($("#rsvpMessage") || {}).value || "",
      };
      return data;
    }

    function whatsappUrl(data) {
      var lines = [
        "RSVP \u2014 " + data.couple,
        "Name: " + data.name,
        data.attending === "yes"
          ? "Attending: Joyfully, yes (" + data.guests + " guest" + (data.guests === "1" ? "" : "s") + ")"
          : "Attending: Regretfully, no",
      ];
      if (data.attending === "yes" && data.events.length) {
        lines.push("Events: " + data.events.join(", "));
      }
      if (data.message.trim()) lines.push("Message: " + data.message.trim());
      return "https://wa.me/" + cfg.rsvp.whatsapp.replace(/[^\d]/g, "") +
        "?text=" + encodeURIComponent(lines.join("\n"));
    }

    function showDone(msg) {
      if (successEl && msg) successEl.textContent = msg;
      form.hidden = true;
      done.hidden = false;
      done.classList.add("reveal", "is-in");
      petalBurst(done);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = $("#rsvpName");
      if (!nameEl.value.trim()) {
        nameEl.focus();
        nameEl.reportValidity && nameEl.reportValidity();
        return;
      }

      var data = collect();
      var submitBtn = $("#rsvpSubmit");
      if (submitBtn) submitBtn.disabled = true;

      var finish = function (msg) {
        if (submitBtn) submitBtn.disabled = false;
        showDone(msg);
      };

      if (cfg.rsvp.endpoint) {
        fetch(cfg.rsvp.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data),
        })
          .then(function (r) {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.json ? r.json() : {};
          })
          .then(function () { finish(cfg.rsvp.successNote); })
          .catch(function () {
            if (cfg.rsvp.whatsapp) {
              window.open(whatsappUrl(data), "_blank", "noopener");
              finish("We opened WhatsApp with your answers \u2014 just press send.");
            } else {
              finish("Something went wrong sending your RSVP \u2014 please try again.");
            }
          });
        return;
      }

      if (cfg.rsvp.whatsapp) {
        window.open(whatsappUrl(data), "_blank", "noopener");
        finish("We opened WhatsApp with your answers \u2014 just press send.");
        return;
      }

      finish(cfg.rsvp.successNote);
    });
  })();

  /* ============ 10. Share ============ */
  var toast = $("#toast");
  var toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2600);
  }

  function share() {
    var data = {
      title: document.title,
      text: "You\u2019re invited \u2014 " + cfg.couple.name1 + " & " + cfg.couple.name2 +
        " \u00B7 " + cfg.dateDisplay + " \u00B7 " + cfg.city,
      url: location.origin === "null" || location.protocol === "file:"
        ? "https://your-invite-link.example"
        : location.href,
    };
    if (navigator.share) {
      navigator.share(data).catch(function () { /* user dismissed */ });
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data.url).then(
        function () { showToast("Link copied to clipboard"); },
        function () { fallbackCopy(data.url); }
      );
      return;
    }
    fallbackCopy(data.url);
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Link copied to clipboard");
    } catch (e) {
      showToast(text);
    }
    document.body.removeChild(ta);
  }

  ["#shareBtn", "#shareFab"].forEach(function (sel) {
    var btn = $(sel);
    if (btn) btn.addEventListener("click", share);
  });

  /* Floating share pill appears after hero */
  var fab = $("#shareFab");
  var hero = $(".hero");
  if (fab && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        fab.classList.toggle("is-visible", !e.isIntersecting);
      });
    }, { rootMargin: "-72px 0px 0px 0px" }).observe(hero);
  } else if (fab) {
    fab.classList.add("is-visible");
  }

  /* ============ 11. Petals, parallax, reveals ============ */

  // Drifting rose petals in the hero.
  (function initPetals() {
    var wrap = $("#heroPetals");
    if (!wrap) return;
    var count = window.innerWidth < 560 ? 9 : 14;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      p.style.setProperty("--x", (Math.random() * 96 + 2).toFixed(1) + "%");
      p.style.setProperty("--s", (Math.random() * 8 + 7).toFixed(1) + "px");
      p.style.setProperty("--t", (Math.random() * 8 + 10).toFixed(1) + "s");
      p.style.setProperty("--d", "-" + (Math.random() * 14).toFixed(1) + "s");
      p.style.setProperty("--dx", (Math.random() * 120 - 60).toFixed(0) + "px");
      p.style.setProperty("--r", (Math.random() * 280 - 140).toFixed(0) + "deg");
      p.style.setProperty("--o", (Math.random() * 0.3 + 0.35).toFixed(2));
      frag.appendChild(p);
    }
    wrap.appendChild(frag);

    // Gusts — the whole petal field drifts with scroll velocity, then
    // settles back to a calm fall.
    var wind = 0, targetWind = 0, lastY = window.scrollY || 0, rafId = null, calm = null;
    window.addEventListener("scroll", function () {
      var y = window.scrollY || 0;
      var v = y - lastY;
      lastY = y;
      targetWind = Math.max(-64, Math.min(64, -v * 5));
      clearTimeout(calm);
      calm = setTimeout(function () { targetWind = 0; }, 140);
      if (!rafId) rafId = requestAnimationFrame(loop);
    }, { passive: true });
    function loop() {
      wind += (targetWind - wind) * 0.07;
      wrap.style.transform = "translate3d(" + wind.toFixed(1) + "px,0,0)";
      if (Math.abs(targetWind - wind) > 0.4 || targetWind !== 0) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
        wrap.style.transform = "";
      }
    }
  })();

  // Gentle parallax on the hero texture + garlands.
  (function initParallax() {
    var pattern = $(".hero__pattern");
    var garlands = $$(".hero__garland");
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || 0;
      if (y > window.innerHeight * 1.5) return;
      if (pattern) pattern.style.transform = "translate3d(0," + (y * 0.12).toFixed(1) + "px,0)";
      garlands.forEach(function (g, i) {
        var flip = g.classList.contains("hero__garland--r") ? " scaleX(-1)" : "";
        g.style.transform = "translate3d(0," + (y * (i ? 0.07 : 0.05)).toFixed(1) + "px,0)" + flip;
      });
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  })();

  // Staggered reveal-on-scroll.
  (function initReveals() {
    var selectors = [
      ".welcome", ".countdown__panel", ".chapter", ".event-card",
      ".g-photo", ".details-card", ".venue__info", ".venue__frame", ".rsvp__panel",
    ];
    if ("IntersectionObserver" in window) {
      selectors.forEach(function (sel) {
        $$(sel).forEach(function (el) { el.classList.add("reveal"); });
      });
      // Stagger siblings inside each group (chapters, cards, photos).
      [".chapter", ".event-card", ".g-photo"].forEach(function (sel) {
        $$(sel).forEach(function (el, i) {
          el.style.transitionDelay = Math.min(i % 4, 3) * 90 + "ms";
        });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      $$(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
    }
  })();
})();
