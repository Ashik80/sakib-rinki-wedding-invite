/* ============================================================
   SIGNATURE (STANDARD) TEMPLATE — CLIENT CONFIG
   ------------------------------------------------------------
   Everything a client personalises lives in this one object.
   Fill it in, save, deploy. No other file needs editing.
   ============================================================ */

const INVITE_CONFIG = {
  /* ---------- Theme (Signature-tier personalisation) ----------
     One word recolours the whole invitation:
       "rosewood"  — burgundy & rose-gold on blush  (default)
       "midnight"  — deep navy & champagne on ivory
       "sage"      — sage green & copper on warm white   */
  theme: "rosewood",

  /* ---------- Language (English ⇄ বাংলা) ----------
     Adds a floating toggle so guests can read the invitation in either
     language. "default" is shown first (a ?lang=bn link or the guest's
     saved choice wins). Each labels entry describes the OTHER language —
     i.e. what the button shows while that language is active.          */
  localization: {
    enabled: true,
    default: "bn",              // "en" | "bn"
    labels: {
      en: { short: "বাংলা", aria: "Switch the invitation to Bangla" },
      bn: { short: "English", aria: "Switch the invitation to English" },
    },
  },

  /* ---------- Social share preview ---------- */
  // 1200×630 image shown when the link is shared on WhatsApp/Facebook.
  // Replace assets/og-cover.png with a branded photo/monogram per client.
  ogImage: "https://sakib-rinki-spondora.netlify.app/assets/og-cover.png",

  /* ---------- Envelope intro ---------- */
  // A wax-sealed envelope the guest taps to open — the page then reveals
  // with the staggered hero entrance. Set enabled:false to skip it.
  intro: {
    enabled: true,
    hint: "Tap the seal to open",
  },

  /* ---------- Hero photo (optional) ---------- */
  // Put a couple photo behind the names, inside the hero arch.
  // Portrait ~900×1200px works best. Leave src "" for the plain arch.
  heroPhoto: {
    src: "",
    alt: "The happy couple",
    tint: 0.55,          // 0–1, strength of the wine tint over the photo
  },

  /* ---------- Couple ---------- */
  couple: {
    name1: "Md. Sakibur Rahman",
    name2: "Mst. Rinki Akter",
    initials: "S&R",            // shown in the monogram seal
    hashtag: "#SakiburAndRinki",
  },

  /* ---------- Ceremony / occasion ---------- */
  // Wedding datetime — local time. Countdown, calendar links and the
  // displayed date all derive from this one value.
  weddingDateTime: "2026-10-17T13:30:00+06:00",
  dateDisplay: "Saturday, 17 October 2026",
  city: "Dhaka, Bangladesh",

  /* ---------- Opening blessing ---------- */
  // Any one-line blessing, or replace with a quote. Leave "" to hide.
  blessing: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",

  /* ---------- Families / welcome ---------- */
  welcome: {
    eyebrow: "Together with their families",
    parents1: "Son of Md. Omar Faruk & Mrs. Beauty Akhter",
    parents2: "Daughter of Habibur Rahman & Mrs. Lily Akter",
    inviteLine:
      "invite you to share in their joy as two hearts become one, bound by love, faith and forever.",
  },

  /* ---------- Countdown ---------- */
  countdownNote: "until our forever begins — In Shaa Allah",
  // Shown in place of the numbers once the wedding day arrives.
  countdownToday: "Today is the day — Alhamdulillah!",

  /* ---------- Our Story (timeline) ---------- */
  // Each chapter becomes one milestone on the timeline.
  story: {
    eyebrow: "How It Began",
    title: "Our",
    titleAccent: "Story",
    chapters: [
      {
        label: "March 2021",
        title: "A Chance Meeting",
        text: "A family dinner, a crowded room, and one conversation that refused to end. Rinki says Sakibur talked about books for an hour; Sakibur says he would have talked forever.",
      },
      {
        label: "December 2022",
        title: "The First Promise",
        text: "Coffee turned into evening walks, walks into phone calls that outlasted the night. Somewhere between Cox's Bazar sunsets and Dhaka rain, forever stopped feeling like a long time.",
      },
      {
        label: "June 2025",
        title: "She Said Yes",
        text: "Under a sky full of fireworks on her birthday, Sakibur asked the question he had been practising for a year. Rinki said yes before he finished the sentence.",
      },
      {
        label: "October 2026",
        title: "Forever Begins",
        text: "And now we invite you — the people who loved us first — to witness the beginning of our greatest chapter.",
      },
    ],
  },

  /* ---------- Events ---------- */
  // Each event becomes one card. Add or remove entries freely.
  // "mapQuery" is what gets searched on Google Maps (name or lat,lng).
  // For the calendar button to work, each event needs date (YYYY-MM-DD),
  // start/end (HH:MM, 24h, venue local time) and a timezone.
  events: [
    {
      tag: "Wedding Day",
      name: "Wedding Reception",
      icon: "rings",              // mehendi | rings | crescent | floral
      tagline: "lunch, blessings & celebrations",
      date: "Saturday, 17 October 2026",
      time: "1:30 PM onwards",
      venue: "Master Convention Hall",
      address: "Savar, Dhaka (Near Savar Model Police Station)",
      mapQuery: "R6QW+PM2 Master Community Center, Ceramics Rd, Savar",
      mapUrl: "https://maps.app.goo.gl/7zKpXTjnGjEWcWPk6?g_st=aw",
      calDate: "2026-10-17",
      calStart: "13:30",
      calEnd: "17:30",
      calTz: "Asia/Dhaka",
    },
  ],

  /* ---------- Good to know (dress code, gifts…) ---------- */
  // Each entry becomes an info card after the gallery.
  // icon: "dress" | "gift" | "moon" | "ring" | "floral"
  // "swatches" (optional) draws a row of dress-code colour dots.
  details: {
    eyebrow: "Good to Know",
    title: "The",
    titleAccent: "Details",
    cards: [
      {
        icon: "dress",
        title: "Dress Code",
        text: "Garden formal — soft pastels, flowing fabrics and festive colour. We can't wait to see the palette you bring.",
        swatches: ["#5B1C2E", "#B76E79", "#E9C8CD", "#F2E5DC"],
      },
      {
        icon: "gift",
        title: "Your Presence Is the Gift",
        text: "Should you still wish to bless us, a small contribution towards our honeymoon fund would mean the world.",
      },
    ],
  },

  /* ---------- Venue / map ---------- */
  // Shown in the map section (usually your main event).
  venue: {
    name: "Master Convention Hall",
    address: "Savar, Dhaka (Near Savar Model Police Station)",
    mapQuery: "R6QW+PM2 Master Community Center, Ceramics Rd, Savar",
    mapUrl: "https://maps.app.goo.gl/7zKpXTjnGjEWcWPk6?g_st=aw",
    mapZoom: 16,
  },

  /* ---------- Photo gallery ---------- */
  // Drop photos into assets/photos/ (webp/jpg, ~1200px wide is plenty)
  // and list them here. "wide: true" makes a tile span two columns.
  gallery: {
    eyebrow: "Captured Moments",
    title: "Our",
    titleAccent: "Gallery",
    photos: [
      { src: "assets/photos/photo-1.svg", alt: "Sakibur and Rinki monogram", caption: "Two rings, one promise", wide: false },
      { src: "assets/photos/photo-2.svg", alt: "Save the date floral artwork", caption: "Save the date", wide: true },
      { src: "assets/photos/photo-3.svg", alt: "Heart with roses artwork", caption: "Every heartbeat, his name", wide: false },
      { src: "assets/photos/photo-4.svg", alt: "Crescent moon artwork", caption: "Under the same moon", wide: false },
      { src: "assets/photos/photo-5.svg", alt: "Floral garland artwork", caption: "The days in between", wide: true },
      { src: "assets/photos/photo-6.svg", alt: "Bloom artwork", caption: "Where love blooms", wide: false },
    ],
  },

  /* ---------- Background music ---------- */
  // Replace assets/music/theme.mp3 with the client's song (mp3, ≤2 MB is
  // ideal). "autoplay" starts it on the guest's first tap — browsers
  // block silent autoplay, so this is the smoothest allowed behaviour.
  //
  // Default track attribution (keep until replaced by the client's song):
  //   "Indian Folk Classical Flute Music" by MayankSingh33 (Wikimedia
  //   Commons) — soothing bansuri with tanpura drone, trimmed and
  //   normalised for looping. Licensed CC BY-SA 4.0:
  //   commons.wikimedia.org/wiki/File:Indian_Folk_Classical_Flute_Music_(1).wav
  music: {
    enabled: true,
    src: "assets/music/theme.mp3",
    autoplay: true,
  },

  /* ---------- RSVP ---------- */
  // Guests submit the form below. Two delivery options:
  //   endpoint  — a Formspree/formsubmit-style URL (POSTs as JSON).
  //               Leave "" to skip.
  //   whatsapp  — fallback/primary: opens WhatsApp with the answers
  //               pre-typed, sent straight to the couple's number
  //               (international format, digits only, no +).
  // If both are set, the form POSTs to the endpoint and also offers
  // the WhatsApp button.
  rsvp: {
    enabled: true,
    deadline: "10 October 2026",
    note: "Kindly respond by {deadline}. We can't wait to celebrate with you!",
    whatsapp: "8801712345678",
    endpoint: "",
    successNote:
      "JazakAllah Khair! Your response has been noted — we can't wait to see you.",
  },

  /* ---------- Closing ---------- */
  closing: "With love and prayers, we await your presence",
  credit: "Crafted with \u2665 \u2014 Spondora Invites",
};

/* ============================================================
   BANGLA TRANSLATIONS
   ------------------------------------------------------------
   Mirrors the structure above — anything present here replaces
   the English value when the guest switches to বাংলা, and
   anything left out simply keeps its English value (so names,
   the Arabic blessing, map queries, calendar times etc. usually
   stay untouched). Arrays (story, events, cards) are parallel
   lists — keep the same order as the English ones.

   `ui` holds the fixed interface strings (headings, buttons,
   form labels, tooltips…) that don't live in the config above.
   `digits: true` renders numbers as ০১২৩৪৫৬৭৮৯ in Bangla mode.
   ============================================================ */

const INVITE_TRANSLATIONS = {
  bn: {
    metaTitle: "সাকিবুর ও রিংকি — বিবাহ নিমন্ত্রণ",

    /* Names render in Bangla too (hero, footer, title, RSVP message).
       The initials, hashtag and the Arabic blessing stay as-is in
       both languages. */
    couple: {
      name1: "মোঃ সাকিবুর রহমান",
      name2: "মোছাঃ রিংকি আক্তার",
    },

    intro: { hint: "খুলতে সিলে চাপুন" },

    dateDisplay: "শনিবার, ১৭ অক্টোবর ২০২৬",
    city: "ঢাকা, বাংলাদেশ",

    welcome: {
      eyebrow: "দুই পরিবারের সম্মতিক্রমে",
      parents1: "মোঃ ওমর ফারুক ও মিসেস বিউটি আক্তারের পুত্র",
      parents2: "হাবিবুর রহমান ও মিসেস লিলি আক্তারের কন্যা",
      inviteLine:
        "আপনাদের আনন্দে ভাগ বসানোর জন্য আমন্ত্রণ জানাচ্ছি — যেখানে ভালোবাসা, বিশ্বাস আর চিরকালের বন্ধনে দুটি হৃদয় এক হবে।",
    },

    countdownNote: "চিরকাল শুরু হতে বাকি — ইনশাআল্লাহ",
    countdownToday: "আজই সেই দিন — আলহামদুলিল্লাহ!",

    story: {
      eyebrow: "শুরু যেভাবে",
      title: "আমাদের",
      titleAccent: "গল্প",
      chapters: [
        {
          label: "মার্চ ২০২১",
          title: "হঠাৎ দেখা",
          text: "একটি পারিবারিক ডিনার, ভরা ঘর, আর শেষ হতেই চাইছিল না যে কথা। রিংকির মতে সাকিবুর ঘণ্টার পর ঘণ্টা বই নিয়ে কথা বলেছে; সাকিবুরের ভাষায়, চিরকাল কথা বলতেও সে রাজি ছিল।",
        },
        {
          label: "ডিসেম্বর ২০২২",
          title: "প্রথম প্রতিশ্রুতি",
          text: "কফি জমতে জমতে সন্ধ্যার হাঁটা, হাঁটা জমতে জমতে গভীর রাতের ফোনালাপ। কক্সবাজারের সূর্যাস্ত আর ঢাকার বৃষ্টির মাঝে কোথাও, কখন যে চিরকাল আর দূরের কথা মনে হয়নি।",
        },
        {
          label: "জুন ২০২৫",
          title: "রিংকির সম্মতি",
          text: "তার জন্মদিনে আতশবাজিভরা আকাশের নিচে সাকিবুর সেই প্রশ্ন করল, যার উত্তর সে এক বছর ধরে মুখস্থ করছিল। বাক্য শেষ হওয়ার আগেই রিংকি বলে ফেলল — হ্যাঁ।",
        },
        {
          label: "অক্টোবর ২০২৬",
          title: "চিরকালের শুরু",
          text: "আর এখন আমরা আমন্ত্রণ জানাচ্ছি আপনাদের — যাঁরা আমাদের সবার আগে ভালোবেসেছেন — আমাদের জীবনের শ্রেষ্ঠ অধ্যায়ের সূচনা দেখতে।",
        },
      ],
    },

    events: [
      {
        tag: "বিবাহ দিবস",
        name: "বিবাহ সংবর্ধনা",
        tagline: "দুপুরের খাবার, দোয়া আর আনন্দের আয়োজন",
        date: "শনিবার, ১৭ অক্টোবর ২০২৬",
        time: "দুপুর ১:৩০ থেকে",
        venue: "মাস্টার কনভেনশন হল",
        address: "সাভার, ঢাকা (সাভার মডেল থানার কাছে)",
      },
    ],

    details: {
      eyebrow: "জেনে রাখুন",
      title: "সবকিছু",
      titleAccent: "একনজরে",
      cards: [
        {
          title: "পোশাক",
          text: "গার্ডেন ফরমাল — হালকা প্যাস্টেল রং, ঝরঝরে কাপড় আর উৎসবের রং। আপনার পছন্দের রঙে আপনাদের অপেক্ষায় থাকব আমরা।",
        },
        {
          title: "আপনার উপস্থিতিই উপহার",
          text: "তবুও দোয়ার পাশাপাশি উপহার দিতে চাইলে, আমাদের হানিমুন ফান্ডে ছোট্ট একটি অবদান আমাদের কাছে অনেক বড় হয়ে থাকবে।",
        },
      ],
    },

    venue: {
      name: "মাস্টার কনভেনশন হল",
      address: "সাভার, ঢাকা (সাভার মডেল থানার কাছে)",
    },

    gallery: {
      eyebrow: "সংরক্ষিত মুহূর্ত",
      title: "আমাদের",
      titleAccent: "গ্যালারি",
      captions: [
        "দুটি আংটি, এক প্রতিশ্রুতি",
        "তারিখটি রাখুন",
        "প্রতি হৃৎস্পন্দনে তার নাম",
        "একই চাঁদের নিচে",
        "মাঝের সেই দিনগুলো",
        "যেখানে ভালোবাসা ফোটে",
      ],
      alts: [
        "সাকিবুর ও রিংকির মনোগ্রাম",
        "সেভ দ্য ডেট ফ্লোরাল আর্ট",
        "গোলাপসহ হৃদয়ের আর্টওয়ার্ক",
        "বাঁকা চাঁদের আর্টওয়ার্ক",
        "ফুলের মালার আর্টওয়ার্ক",
        "ফোটে ওঠা ফুলের আর্টওয়ার্ক",
      ],
    },

    rsvp: {
      deadline: "১০ অক্টোবর ২০২৬",
      note: "অনুগ্রহ করে {deadline}-এর মধ্যে উত্তর জানান। আপনাদের সাথে উদযাপন করতে আমরা অপেক্ষায় থাকব!",
      successNote:
        "জাযাকাল্লাহু খাইরান! আপনার উত্তর জানা হয়েছে — আবার দেখা হবে ইনশাআল্লাহ।",
    },

    closing: "ভালোবাসা ও দোয়াসহ আপনার আগমনের প্রতীক্ষায়",
    credit: "ভালোবাসা দিয়ে নির্মিত \u2665 \u2014 Spondora Invites",

    /* Fixed interface strings — headings, buttons, form labels… */
    ui: {
      nameJoin: "ও",
      heroEyebrow: "শুভ বিবাহ সংবর্ধনা",
      scroll: "স্ক্রল",
      saveEyebrow: "তারিখটি রাখুন",
      countdownTitle: "গণনা চলছে",
      countdownTitleAccent: "চিরকালের দিকে",
      countdownAria: "বিবাহের বাকি সময়",
      cdDays: "দিন",
      cdHours: "ঘণ্টা",
      cdMinutes: "মিনিট",
      cdSeconds: "সেকেন্ড",
      eventsEyebrow: "কখন ও কোথায়",
      eventsTitle: "বিবাহ",
      eventsTitleAccent: "সংবর্ধনা",
      labelDate: "তারিখ",
      labelTime: "সময়",
      labelVenue: "স্থান",
      labelAddress: "ঠিকানা",
      viewMap: "মানচিত্রে দেখুন \u2197",
      addCalendar: "ক্যালেন্ডারে যোগ করুন \u2197",
      galleryHint: "বড় করে দেখতে ছবিতে চাপ দিন",
      viewPhoto: "ছবি দেখুন: ",
      venueEyebrow: "অনুষ্ঠানস্থল",
      venueTitle: "আমাদের খুঁজুন",
      venueTitleAccent: "মানচিত্রে",
      mapFrameTitle: "বিবাহের স্থানের মানচিত্র",
      openMaps: "গুগল ম্যাপে খুলুন \u2197",
      rsvpEyebrow: "আপনি কি আসছেন?",
      rsvpTitle: "অনুগ্রহ করে",
      rsvpTitleAccent: "উপস্থিতি জানান",
      yourName: "আপনার নাম",
      namePlaceholder: "যেমন: রহিম উদ্দিন ও পরিবার",
      attending: "আপনি কি উপস্থিত থাকবেন?",
      yes: "জি, অবশ্যই আসব",
      no: "দুঃখিত, আসতে পারব না",
      guestsLabel: "অতিথির সংখ্যা",
      guestOptions: [
        "১ জন অতিথি", "২ জন অতিথি", "৩ জন অতিথি",
        "৪ জন অতিথি", "৫ জন অতিথি", "৬+ জন অতিথি",
      ],
      whichEvents: "কোন কোন অনুষ্ঠানে যোগ দেবেন?",
      messageLabel: "দম্পতির জন্য শুভেচ্ছা",
      optional: "(ঐচ্ছিক)",
      messagePlaceholder: "আপনার শুভকামনা, দোয়া ও ভালোবাসা…",
      send: "উত্তর পাঠান",
      shareBtn: "এই নিমন্ত্রণটি শেয়ার করুন",
      share: "শেয়ার",
      copied: "লিংক কপি হয়েছে",
      invitedLine: "আপনি নিমন্ত্রিত",
      lbDialog: "ছবির ভিউয়ার",
      lbClose: "ছবির ভিউয়ার বন্ধ করুন",
      lbPrev: "আগের ছবি",
      lbNext: "পরের ছবি",
      musicPlay: "ব্যাকগ্রাউন্ড সংগীত চালু করুন",
      musicPause: "ব্যাকগ্রাউন্ড সংগীত বন্ধ করুন",
      whatsappOpened: "আপনার উত্তরসহ WhatsApp খোলা হয়েছে — শুধু পাঠিয়ে দিন।",
      rsvpError: "উত্তর পাঠাতে সমস্যা হয়েছে — আবার চেষ্টা করুন।",
      calDetails: "আপনার উপস্থিতিই আমাদের সৌভাগ্য।",
      wa: {
        rsvp: "উত্তর",
        name: "নাম",
        yes: "উপস্থিতি: জি, অবশ্যই আসব",
        no: "উপস্থিতি: দুঃখিত, আসতে পারব না",
        guestWord: "জন অতিথি",
        events: "অনুষ্ঠান",
        message: "বার্তা",
      },
      chipDays: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"],
      chipMonths: ["জানু", "ফেব্রু", "মার্চ", "এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে"],
      digits: true,
    },
  },
};

/* Export for reuse; safe to ignore in the browser. */
if (typeof module !== "undefined") {
  module.exports = { INVITE_CONFIG: INVITE_CONFIG, INVITE_TRANSLATIONS: INVITE_TRANSLATIONS };
}
