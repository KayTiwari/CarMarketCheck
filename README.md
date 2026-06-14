# Car Market Check

https://car-market-check.vercel.app

Search used-car inventory and instantly see how each asking price compares to a
fair-market estimate. Deals are scored and the best ones float to the top.

![Car Market Check](docs/screenshot.png)

## What it does

- **Uses your location** (browser geolocation) to pull live used-car listings
  nearby, within a radius you choose.
- **Search** by make, model, year range, max price, max miles, and radius.
- **Deal scoring** compares each price to the median of comparable listings in
  the results (same make / model / year) and labels it Great deal / Good deal /
  Fair price / Above market, with the dollar and percentage savings.
- **Sorted by value** so the strongest deals appear first, with summary stats.

## Live data (Auto.dev, via a serverless proxy)

Listings come from the live [Auto.dev Listings API](https://www.auto.dev/listings).
Because Auto.dev uses a Bearer token, the app calls it through a small Vercel
serverless function (`api/listings.js`) so the key stays server-side and there
are no CORS issues. Set the key as an environment variable on the host:

```
AUTODEV_API_KEY=your_key_here
```

The free tier covers 1,000 calls/month. Without a key, the app shows a clear
"connect live inventory" state instead of any placeholder data. Location is
requested in the browser and turned into a ZIP for the search; if it's declined,
the query runs without a location.

## Develop

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build
```

## Tech

- React 18 (functional components + hooks)
- Create React App (react-scripts 5)
- Vercel serverless function as an Auto.dev API proxy (key stays server-side)
- Browser Geolocation + BigDataCloud reverse geocode (coords to ZIP)

## Structure

```
src/
  App.js                 # layout, state, search orchestration
  components/
    SearchBar.js         # filter form
    CarCard.js           # deal-scored car card
    DealBadge.js         # Great/Good/Fair/Above-market badge
  lib/
    geo.js               # browser geolocation + reverse geocode (city + ZIP)
    listings.js          # calls the proxy, scores deals, sorts (no fallback)
    estimate.js          # comparable-listing median as the market estimate
    deal.js              # deal scoring + formatting
api/
  listings.js            # Vercel serverless proxy to Auto.dev (key server-side)
```

Originally a 2023 learning project; rebuilt in 2026 with a working search, a deal
engine, and a modern UI.
