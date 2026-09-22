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

  /* ---------- Social share preview ---------- */
  // 1200×630 image shown when the link is shared on WhatsApp/Facebook.
  // Replace assets/og-cover.png with a branded photo/monogram per client.
  ogImage: "assets/og-cover.png",

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
    name1: "Sumaiya Karim",
    name2: "Zayan Ahmed",
    initials: "S&Z",            // shown in the monogram seal
    hashtag: "#SumaiyaAndZayan",
  },

  /* ---------- Ceremony / occasion ---------- */
  // Wedding datetime — local time. Countdown, calendar links and the
  // displayed date all derive from this one value.
  weddingDateTime: "2027-02-12T18:00:00+06:00",
  dateDisplay: "Friday, 12 February 2027",
  city: "Dhaka, Bangladesh",

  /* ---------- Opening blessing ---------- */
  // Any one-line blessing, or replace with a quote. Leave "" to hide.
  blessing: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",

  /* ---------- Families / welcome ---------- */
  welcome: {
    eyebrow: "Together with their families",
    parents1: "Daughter of Mr. Farhan Karim & Mrs. Dilruba Karim",
    parents2: "Son of Mr. Mahbub Ahmed & Mrs. Ruksana Ahmed",
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
        text: "A family dinner, a crowded room, and one conversation that refused to end. Sumaiya says Zayan talked about books for an hour; Zayan says he would have talked forever.",
      },
      {
        label: "December 2022",
        title: "The First Promise",
        text: "Coffee turned into evening walks, walks into phone calls that outlasted the night. Somewhere between Cox's Bazar sunsets and Dhaka rain, forever stopped feeling like a long time.",
      },
      {
        label: "June 2025",
        title: "She Said Yes",
        text: "Under a sky full of fireworks on her birthday, Zayan asked the question he had been practising for a year. Sumaiya said yes before he finished the sentence.",
      },
      {
        label: "February 2027",
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
      tag: "Pre-Wedding",
      name: "Mehendi Night",
      icon: "mehendi",            // mehendi | rings | crescent | floral
      tagline: "an evening of henna, songs & laughter",
      date: "Thursday, 11 February 2027",
      time: "6:30 PM onwards",
      venue: "Karim Residence, The Garden Terrace",
      address: "House 12, Road 55, Gulshan 2, Dhaka 1212",
      mapQuery: "Gulshan 2, Dhaka",
      calDate: "2027-02-11",
      calStart: "18:30",
      calEnd: "22:30",
      calTz: "Asia/Dhaka",
    },
    {
      tag: "Wedding Day",
      name: "Akd Ceremony",
      icon: "rings",
      tagline: "the blessed union, followed by dinner",
      date: "Friday, 12 February 2027",
      time: "6:00 PM onwards",
      venue: "Crystal Hall, Radisson Blu Dhaka Water Garden",
      address: "Airport Road, Dhaka 1229",
      mapQuery: "Radisson Blu Dhaka Water Garden",
      calDate: "2027-02-12",
      calStart: "18:00",
      calEnd: "23:00",
      calTz: "Asia/Dhaka",
    },
    {
      tag: "Celebration",
      name: "Walima Reception",
      icon: "crescent",
      tagline: "dinner, blessings & celebrations",
      date: "Saturday, 13 February 2027",
      time: "7:00 PM onwards",
      venue: "The Grand Ballroom, InterContinental Dhaka",
      address: "1 Minto Road, Ramna, Dhaka 1000",
      mapQuery: "InterContinental Dhaka",
      calDate: "2027-02-13",
      calStart: "19:00",
      calEnd: "23:00",
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
    name: "Crystal Hall, Radisson Blu Dhaka Water Garden",
    address: "Airport Road, Dhaka 1229",
    mapQuery: "Radisson Blu Dhaka Water Garden",
    mapZoom: 15,
  },

  /* ---------- Photo gallery ---------- */
  // Drop photos into assets/photos/ (webp/jpg, ~1200px wide is plenty)
  // and list them here. "wide: true" makes a tile span two columns.
  gallery: {
    eyebrow: "Captured Moments",
    title: "Our",
    titleAccent: "Gallery",
    photos: [
      { src: "assets/photos/photo-1.svg", alt: "Sumaiya and Zayan monogram", caption: "Two rings, one promise", wide: false },
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
    deadline: "25 January 2027",
    note: "Kindly respond by {deadline}. We can't wait to celebrate with you!",
    whatsapp: "8801712345678",
    endpoint: "",
    successNote:
      "JazakAllah Khair! Your response has been noted — we can't wait to see you.",
  },

  /* ---------- Closing ---------- */
  closing: "With love and prayers, we await your presence",
  credit: "Crafted with \u2665 \u2014 Your Studio Name",
};

/* Export for reuse; safe to ignore in the browser. */
if (typeof module !== "undefined") {
  module.exports = INVITE_CONFIG;
}
