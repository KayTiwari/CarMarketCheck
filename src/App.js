import React, { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import CarCard from "./components/CarCard";
import { searchCars } from "./lib/marketcheck";
import { detectLocation } from "./lib/geo";
import "./styles.css";

function Pin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

function StatePanel({ title, children }) {
  return (
    <div className="state-panel">
      <h2 className="state-title">{title}</h2>
      <div className="state-text">{children}</div>
    </div>
  );
}

export default function App() {
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useState(null);
  const [locating, setLocating] = useState(true);

  const locRef = useRef(null);
  const filtersRef = useRef({});

  const run = async (filters) => {
    filtersRef.current = filters;
    setLoading(true);
    const result = await searchCars(filters, locRef.current);
    setCars(result.cars);
    setStatus(result.status);
    setLoading(false);
  };

  const locate = async () => {
    setLocating(true);
    const l = await detectLocation();
    locRef.current = l;
    setLoc(l);
    setLocating(false);
    return l;
  };

  useEffect(() => {
    (async () => {
      await locate();
      run({});
    })();
  }, []);

  const stats = useMemo(() => {
    const great = cars.filter((c) => c.deal.rating === "great").length;
    const totalSavings = cars
      .filter((c) => c.deal.savings > 0)
      .reduce((sum, c) => sum + c.deal.savings, 0);
    return { count: cars.length, great, totalSavings };
  }, [cars]);

  const locationLabel =
    loc && loc.city ? `${loc.city}${loc.state ? ", " + loc.state : ""}` : null;

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <div className="brand">
            <span className="brand-mark">CMC</span>
            <span className="brand-name">Car Market Check</span>
          </div>
          <h1 className="hero-title">
            Find the cars near you priced{" "}
            <span className="accent">below market</span>.
          </h1>
          <p className="hero-sub">
            We use your location to pull live used-car listings nearby, then show
            how each asking price compares to its fair-market value. Great deals
            float to the top.
          </p>
        </div>
      </header>

      <main className="container">
        <div className="locbar">
          {locating ? (
            <span className="locpill">
              <Pin /> Detecting your location...
            </span>
          ) : locationLabel ? (
            <span className="locpill">
              <Pin /> Searching near {locationLabel}
            </span>
          ) : (
            <span className="locpill locpill-off">
              <Pin /> Location off
              <button
                className="link-btn"
                onClick={async () => {
                  await locate();
                  run(filtersRef.current);
                }}
              >
                Use my location
              </button>
            </span>
          )}
        </div>

        <SearchBar onSearch={run} loading={loading} />

        {!loading && status === "ok" && cars.length > 0 && (
          <div className="result-stats">
            <span><strong>{stats.count}</strong> listings nearby</span>
            <span><strong>{stats.great}</strong> great deals</span>
            <span>
              up to{" "}
              <strong>
                {stats.totalSavings.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>{" "}
              under market
            </span>
          </div>
        )}

        {loading ? (
          <div className="state">Finding listings near you...</div>
        ) : status === "no-key" ? (
          <StatePanel title="Connect live inventory">
            Car Market Check pulls live listings from the{" "}
            <a href="https://www.marketcheck.com/apis" target="_blank" rel="noopener noreferrer">
              MarketCheck API
            </a>
            . Add your key as <code>REACT_APP_MARKETCHECK_KEY</code> (in a{" "}
            <code>.env</code> file locally, or as an environment variable on the
            host) to see cars near you.
          </StatePanel>
        ) : status === "error" ? (
          <StatePanel title="Couldn't reach MarketCheck">
            The listings service didn't respond. Check the API key or your
            connection, then{" "}
            <button className="link-btn" onClick={() => run(filtersRef.current)}>
              try again
            </button>
            .
          </StatePanel>
        ) : status === "empty" ? (
          <StatePanel title="No matches nearby">
            No used cars matched
            {locationLabel ? ` near ${locationLabel}` : ""}. Try a larger radius
            or fewer filters.
          </StatePanel>
        ) : (
          <section className="grid">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </section>
        )}
      </main>

      <footer className="footer container">
        <span>Car Market Check</span>
        <span>Deal scoring compares asking price to a fair-market estimate.</span>
      </footer>
    </div>
  );
}
