# Cleaning business website

Plain HTML/CSS/JS. No build step.

## Before launch: edit `config.js`

| Setting | What to put |
|---|---|
| `name` | The 6-letter business name (replaces XXXXXX everywhere) |
| `phone`, `email` | Business contact details |
| `bookingUrl` | Embed/booking link from your booking tool (loads on residential.html) |
| `formEndpoint` | Formspree endpoint for the commercial walkthrough form (else it opens an email) |
| `metaPixelId` | Meta pixel ID (PageView, InitiateCheckout on Book clicks, Lead on walkthrough form) |
| `googleReviewUrl` | Google review link |
| `offer` | First-clean offer text used on the ad landing page |
| `prices` | Starting prices, or leave empty to show "Instant price online" |

## Pages

- `index.html` home
- `residential.html` booking page (booking tool embed at `#book`)
- `commercial.html` buildings and offices, walkthrough request form
- `first-clean.html` Meta ad landing page (send ad traffic here)
- `thanks.html` after the walkthrough form
- `privacy.html` draft privacy policy, review before launch

## Hosting

Drag the folder into Cloudflare Pages or Netlify (free), then connect your domain.
Track the actual booking as a conversion inside your booking tool (its Meta pixel / Conversions API settings).
