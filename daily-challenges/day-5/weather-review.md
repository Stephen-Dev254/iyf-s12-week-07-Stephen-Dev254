# Day 5: Weather Dashboard Code Review

## 1. Error Handling Audit
- **Missing HTTP status check:** Add `if (!response.ok) throw new Error(...)` before calling `response.json()` so 404 city-not-found responses show a user-friendly alert instead of crashing.
- **Offline / Network errors:** Wrap `fetch()` calls in `try/catch` and display a clear retry message when offline.
- **Empty input validation:** Trim search input and block empty submissions before firing an API request.

## 2. Code Organization Improvements
- Extract API fetch logic into a dedicated `api.js` module separate from DOM rendering (`ui.js`).
- Replace magic numbers (such as cache expiry times or Kelvin offsets) with named constants.
- Cache repeated `document.getElementById` queries at the top of the UI module.

## 3. Readability & Developer Experience
- Add a visible loading spinner state while awaiting weather data and clear it in a `finally` block.
- Add brief comments explaining forecast data mapping and unit conversion formulas.
