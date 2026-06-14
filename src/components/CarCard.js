import React from "react";
import DealBadge from "./DealBadge";
import { formatUSD, formatMiles } from "../lib/deal";

function CarGlyph() {
  return (
    <svg viewBox="0 0 64 28" width="58" height="27" aria-hidden="true" style={{ color: "inherit" }}>
      <path
        d="M4 20 L9 11 C10 9 12 8 14 8 L42 8 C45 8 47 9 49 11 L56 18 L60 19 C62 19 62 20 62 21 L62 21 L4 21 Z"
        fill="currentColor"
      />
      <circle cx="18" cy="21" r="5" fill="#fffcf2" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="46" cy="21" r="5" fill="#fffcf2" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export default function CarCard({ car }) {
  const { deal } = car;
  const savingsPositive = deal && deal.savings > 0;

  return (
    <article className="card">
      <div className={`card-banner banner-${deal ? deal.rating : "unknown"}`}>
        <CarGlyph />
        <DealBadge deal={deal} />
      </div>

      <div className="card-body">
        <h3 className="card-title">
          {car.year} {car.make} {car.model}
        </h3>

        <div className="price-row">
          <span className="price">{formatUSD(car.price)}</span>
          {car.estimate ? (
            <span className="estimate">est. {formatUSD(car.estimate)}</span>
          ) : null}
        </div>

        {deal && deal.rating !== "unknown" && (
          <div className={`savings ${savingsPositive ? "savings-pos" : "savings-neg"}`}>
            {savingsPositive ? "Saves " : "Over by "}
            {formatUSD(Math.abs(deal.savings))}
            <span className="savings-pct">
              {" "}({Math.abs(Math.round(deal.savingsPct * 100))}% {savingsPositive ? "below" : "above"} market)
            </span>
          </div>
        )}

        <dl className="specs">
          <div>
            <dt>Mileage</dt>
            <dd>{formatMiles(car.miles)}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{[car.city, car.state].filter(Boolean).join(", ") || "-"}</dd>
          </div>
          <div>
            <dt>Dealer</dt>
            <dd>{car.dealer || "-"}</dd>
          </div>
        </dl>

        {car.url && (
          <a className="card-link" href={car.url} target="_blank" rel="noopener noreferrer">
            View listing
          </a>
        )}
      </div>
    </article>
  );
}
