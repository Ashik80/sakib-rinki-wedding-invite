# Signature (Standard) Wedding Invitation Template

Tier: **Signature / Standard (৳3,990)** · Mobile-first single-page digital
invitation. Everything in the Classic tier, plus the Signature upgrades.

Romantic **rosewood** design — blush paper, deep wine and rose gold — with a
garlanded arch hero, drifting petals, family welcome, live countdown, an
**Our Story timeline**, multiple **event cards** with Google Maps + calendar
links, a **photo gallery with fullscreen lightbox**, embedded venue map,
**RSVP form**, **background music**, three switchable colour themes and
one-tap share.

## Included in this tier

Everything from Classic (৳2,990):

- Couple names + monogram seal, wedding date + live countdown
- Family / welcome message
- Event cards with Google Maps + Add-to-Calendar
- Venue with embedded map + directions
- Shareable link (Web Share API + copy-link fallback)
- Mobile-first; full-width desktop layout

Signature additions:

- **Photo gallery** — mosaic grid, captions, fullscreen lightbox with
  keyboard (←/→/Esc) and swipe navigation
- **Multiple events** — three sample events (Mehendi, Akd, Walima); add or
  remove freely in config
- **Couple story** — timeline chapter milestones with animated reveals
- **RSVP** — name, attendance, guest count, per-event checkboxes, message;
  delivered via WhatsApp (pre-typed) and/or a Formspree-style endpoint
- **Background music** — floating player, gentle autoplay on the guest's
  first tap (browser policy prevents true silent autoplay), fade in/out,
  pauses when the tab is hidden
- **Enhanced animations** — staggered hero entrance, drifting rose petals,
  hero parallax, staggered scroll reveals, countdown pulse — all disabled
  under `prefers-reduced-motion`
- **More personalisation** — one-word theme switch (see below)

Not in this tier (reserved for Luxury / Bespoke): premium cinematic scenes,
custom sections, custom typography, priority delivery.

## Files

| File         | Purpose                                          |
|--------------|--------------------------------------------------|
| `index.html` | Page structure. Rarely needs editing.            |
| `styles.css` | All styling + theme tokens at the top.           |
| `config.js`  | **Every client-specific value lives here.**      |
| `script.js`  | Rendering, countdown, gallery, music, RSVP, FX.  |
| `assets/photos/` | Gallery images (placeholder art included).   |
| `assets/music/theme.mp3` | Placeholder track — swap for the client's song. |

## Customising for a client

Edit **`config.js` only** — names, blessing, date, families, story chapters,
events, venue, photos, music, RSVP destination, closing line and studio
credit. Every field is commented.

Fields that need small care:

- `weddingDateTime` — ISO format with timezone, e.g.
  `"2027-02-12T18:00:00+06:00"`. Drives the countdown.
- Each event's `mapQuery` — paste the venue name exactly as Google Maps
  knows it (or `23.7936,90.4043` style coordinates) so the map pins
  correctly.
- `gallery.photos[].src` — drop webp/jpg files into `assets/photos/`
  (~1200px wide is plenty) and list them. `wide: true` gives a tile two
  columns.
- `rsvp.whatsapp` — international format, digits only, no `+`
  (e.g. `8801712345678`). Set `rsvp.endpoint` to a Formspree URL to POST
  answers there instead/additionally.
- `music.src` — replace `assets/music/theme.mp3` with the client's song
  (mp3, ideally ≤2 MB). The current file is a soft generated piano loop
  (placeholder only).

### Themes (sold as a personalisation option)

One word in `config.js` recolours the entire invitation:

```js
theme: "rosewood",   // blush + deep wine + rose gold  (default)
theme: "midnight",   // ivory + deep navy + champagne gold
theme: "sage",       // warm white + sage green + soft copper
```

The `<meta name="theme-color">` in `index.html` should be updated to match
(#5b1c2e / #1d2a45 / #47593f).

## Running locally

```bash
cd template2-standard
python3 -m http.server 8080
# open http://localhost:8080
```

(Opening `index.html` directly via `file://` also works — only the map
iframe, clipboard and music need a real http(s) origin when deployed.)

## Deploying

Any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages —
drag the folder in. One URL per couple = the shareable link.

## Fonts

Google Fonts loaded in `index.html`: Playfair Display (serif), Parisienne
(script), Jost (sans), Noto Serif Bengali (Bangla text support). Bangla
renders correctly anywhere it appears (names, blessing, messages).
