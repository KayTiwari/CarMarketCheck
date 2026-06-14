// Deal scoring: compare asking price against a KBB-style fair-market estimate.
// savingsPct > 0 means the car is listed below estimated value.

export function scoreDeal(price, estimate) {
  if (!price || !estimate) {
    return { rating: "unknown", label: "No estimate", savings: 0, savingsPct: 0 };
  }
  const savings = estimate - price;
  const savingsPct = savings / estimate;

  let rating, label;
  if (savingsPct >= 0.12) {
    rating = "great";
    label = "Great deal";
  } else if (savingsPct >= 0.04) {
    rating = "good";
    label = "Good deal";
  } else if (savingsPct >= -0.04) {
    rating = "fair";
    label = "Fair price";
  } else {
    rating = "high";
    label = "Above market";
  }
  return { rating, label, savings, savingsPct };
}

export function formatUSD(n) {
  if (n == null || Number.isNaN(n)) return "-";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatMiles(n) {
  if (n == null || Number.isNaN(n)) return "-";
  return `${n.toLocaleString("en-US")} mi`;
}
