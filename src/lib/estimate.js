// Without a KBB-style price feed, estimate each car's "market" value from the
// listings themselves: the median asking price of comparable cars in the result
// set (same make + model + year, falling back to make + model). Needs at least
// a few comparables to mean anything, otherwise the estimate stays null.
function median(nums) {
  if (!nums.length) return null;
  const a = [...nums].sort((x, y) => x - y);
  const n = a.length;
  return n % 2 ? a[(n - 1) / 2] : Math.round((a[n / 2 - 1] + a[n / 2]) / 2);
}

const MIN_COMPARABLES = 3;

export function computeEstimates(cars) {
  const priced = cars.filter((c) => c.price > 0);
  const keyYMY = (c) => `${c.make}|${c.model}|${c.year}`.toLowerCase();
  const keyMM = (c) => `${c.make}|${c.model}`.toLowerCase();

  const byYMY = {};
  const byMM = {};
  for (const c of priced) {
    (byYMY[keyYMY(c)] ||= []).push(c.price);
    (byMM[keyMM(c)] ||= []).push(c.price);
  }

  return cars.map((c) => {
    if (!(c.price > 0)) return { ...c, estimate: null };
    const ymy = byYMY[keyYMY(c)] || [];
    const mm = byMM[keyMM(c)] || [];
    let estimate = null;
    if (ymy.length >= MIN_COMPARABLES) estimate = median(ymy);
    else if (mm.length >= MIN_COMPARABLES) estimate = median(mm);
    return { ...c, estimate };
  });
}
