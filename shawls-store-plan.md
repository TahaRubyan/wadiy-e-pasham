# Shawls Store — Project Plan (Draft)

## Concept
E-commerce site for men's and women's shawls, backed by Shopify, custom-designed frontend for the 4 core pages.

## Color Palette
`#FFBE91` `#FFDDB0` `#FFFCE1` `#CFEBFF`
Warm peach → cream → soft blue. Suggest: peach/cream for backgrounds and CTAs, blue as an accent (badges, links, hover states) so it doesn't feel flat.

## Pages
1. **Landing** — hero, palette-led visuals, featured shawls, trust signals (fabric quality, delivery, COD availability)
2. **About Us** — brand story, sourcing/fabric info
3. **Shawls (Shop)** — browse grid, filter by men/women (and color/fabric if relevant), product detail view, add to cart
4. **Contact Us** — details + form (needs an email/notification service if it's a real form, not just a mailto)

## Recommended Architecture
- **Backend/commerce engine:** Shopify (products, inventory, orders, payments)
- **Frontend:** Custom-built (React/Next), pulling products via Shopify **Storefront API** — gives full design control over the 4 pages instead of fighting a Liquid theme
- **Cart:** Built in the custom frontend using Storefront API cart mutations
- **Checkout:** Hand off to Shopify's **hosted checkout** rather than building a custom one — this is the part that should NOT be reinvented, since it handles stock, tax, and order records correctly
- **Payments:** Shopify manual payment methods
  - COD → native manual payment method
  - Online transfer → needs clarification (see open questions)

## Build Order (updated)
Payment/Shopify integration is deferred. Build the UI first against mock data, then wire up the real backend once the design is approved.

**Phase 1 — UI with mock data**
1. Landing + About + Contact pages (static/marketing)
2. Shop page: browse, filter (men/women), product detail
3. Cart flow (add/remove/update) against mock product data — no real checkout yet
4. Review pass on the full UI before touching Shopify

**Phase 2 — Final integration**
5. Shopify store setup: products, collections, manual payment methods
6. Swap mock data for the Storefront API (products, cart)
7. Checkout handoff to Shopify hosted checkout
8. QA on COD + online transfer flow end-to-end before launch

## Open Questions (still relevant for Phase 2)
- [ ] "Online transfer" — bank deposit (native Shopify) or JazzCash/Easypaisa (needs custom handling)?
- [ ] COD: any order-value limit or confirmation-call step, or fully open?
- [ ] Men vs women shawls: separate collections/pricing, or just a filter?
- [ ] Contact page: real form (needs backend email service) or static details only?
- [ ] Who's supplying product photos and copy for the mock data / final content?
- [ ] Domain + hosting for the frontend (Vercel/Netlify suggested)
