/* ============================================================
   Signature (Standard) Wedding Invitation — behaviour
   All content comes from INVITE_CONFIG (config.js).

   1. Theme + text hydration       6. Map
   2. Name fitting                 7. Countdown (with pulse)
   3. Story timeline               8. Background music
   4. Event cards                  9. RSVP form
   5. Gallery + lightbox          10. Share / petals / parallax / reveals
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

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ============ 1. Theme + text hydration ============ */
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

  /* ============ 2. Story timeline ============ */
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

  /* ============ 3. Event cards ============ */
  var ICONS = {
    date: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
    time: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 13.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  var list = $("#eventList");
  if (list && cfg.events && cfg.events.length) {
    list.innerHTML = cfg.events.map(renderEvent).join("");
  }

  function renderEvent(ev) {
    var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.mapQuery || ev.venue || "");
    var calUrl = buildCalendarUrl(ev);
    return (
      '<article class="event-card reveal">' +
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

  /* ============ 4. Gallery + lightbox ============ */
  var galleryGrid = $("#galleryGrid");
  var photos = (cfg.gallery && cfg.gallery.photos) || [];

  if (galleryGrid && photos.length) {
    var gHead = { eyebrow: $(".gallery .eyebrow"), title: $(".gallery .section-title") };
    if (gHead.eyebrow) gHead.eyebrow.textContent = cfg.gallery.eyebrow;
    if (gHead.title) {
      gHead.title.innerHTML =
        esc(cfg.gallery.title || "Our") + " <em>" + esc(cfg.gallery.titleAccent || "Gallery") + "</em>";
    }
    galleryGrid.innerHTML = photos.map(function (p, i) {
      return (
        '<button class="g-photo reveal' + (p.wide ? " g-photo--wide" : "") + '" type="button" ' +
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

  /* ============ 5. Map ============ */
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

  /* ============ 6. Countdown (with tick pulse) ============ */
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

  function tick() {
    var diff = target - Date.now();
    if (isNaN(target)) return;
    setNum(cd.d, diff <= 0 ? "00" : pad(Math.floor(diff / 864e5)));
    setNum(cd.h, diff <= 0 ? "00" : pad(Math.floor(diff / 36e5) % 24));
    setNum(cd.m, diff <= 0 ? "00" : pad(Math.floor(diff / 6e4) % 60));
    setNum(cd.s, diff <= 0 ? "00" : pad(Math.floor(diff / 1e3) % 60));
  }
  tick();
  setInterval(tick, 1000);

  /* ============ 7. Background music ============ */
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
    if (cfg.music.autoplay && !prefersReducedMotion()) {
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

  /* ============ 8. RSVP ============ */
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

  /* ============ 9. Share ============ */
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

  /* ============ 10. Petals, parallax, reveals ============ */

  // Drifting rose petals in the hero.
  (function initPetals() {
    var wrap = $("#heroPetals");
    if (!wrap || prefersReducedMotion()) return;
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
  })();

  // Gentle parallax on the hero texture + garlands.
  (function initParallax() {
    if (prefersReducedMotion()) return;
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
      ".g-photo", ".venue__info", ".venue__frame", ".rsvp__panel",
    ];
    if ("IntersectionObserver" in window && !prefersReducedMotion()) {
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
