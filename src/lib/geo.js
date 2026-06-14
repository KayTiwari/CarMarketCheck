// Detect the visitor's location with the browser Geolocation API, then
// reverse-geocode coordinates to a city/state for display (BigDataCloud's
// free, keyless client endpoint). Resolves to null if unavailable or denied.
export function detectLocation() {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let city = "";
        let state = "";
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          city = data.city || data.locality || "";
          state =
            (data.principalSubdivisionCode || "").split("-")[1] ||
            data.principalSubdivision ||
            "";
        } catch {
          // reverse geocode failed; keep coordinates without a label
        }
        resolve({ lat: latitude, lng: longitude, city, state });
      },
      () => resolve(null),
      { timeout: 9000, maximumAge: 600000 }
    );
  });
}
