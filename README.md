# Car Market Check

Search used-car inventory and instantly see how each asking price compares to a
fair-market estimate. Deals are scored and the best ones float to the top.

![Car Market Check](docs/screenshot.png)

## What it does

- **Search** by make, model, year range, max price, max miles, and location.
- **Deal scoring** compares each asking price to a fair-market (KBB-style)
  estimate and labels it Great deal / Good deal / Fair price / Above market,
  with the dollar and percentage savings.
- **Sorted by value** so the strongest deals appear first, with summary stats
  (matches, great deals, total potential savings).

## Live data vs sample data

The app calls the [MarketCheck](https://www.marketcheck.com/) API when an API key
is configured, and otherwise falls back to a curated **sample inventory** so the
UI is always populated and demoable.

To use live listings, add a key to a `.env` file:

```
REACT_APP_MARKETCHECK_KEY=your_key_here
```

Without it, the app shows sample data and a small notice.

## Develop

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build
```

## Tech

- React 18 (functional components + hooks)
- Create React App (react-scripts 5)
- axios for API calls

## Structure

```
src/
  App.js                 # layout, state, search orchestration
  components/
    SearchBar.js         # filter form
    CarCard.js           # deal-scored car card
    DealBadge.js         # Great/Good/Fair/Above-market badge
  lib/
    marketcheck.js       # live API with sample-data fallback
    deal.js              # deal scoring + formatting
  data/
    sampleCars.js        # curated demo inventory
```

Originally a 2023 learning project; rebuilt in 2026 with a working search, a deal
engine, and a modern UI.
