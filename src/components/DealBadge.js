import React from "react";

export default function DealBadge({ deal }) {
  if (!deal || deal.rating === "unknown") return null;
  return <span className={`badge badge-${deal.rating}`}>{deal.label}</span>;
}
