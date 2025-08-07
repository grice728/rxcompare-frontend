import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>RxCompare</h1>
  <form id="searchForm">
    <input type="text" name="drug" placeholder="Drug name" required />
    <input type="text" name="dosage" placeholder="Dosage (e.g., 10mg)" required />
    <input type="text" name="quantity" placeholder="Quantity (e.g., 30 tablets)" required />
    <input type="text" name="zip" placeholder="ZIP code" required />
    <button type="submit">Search</button>
  </form>
  <pre id="results"></pre>
`;

const form = document.querySelector('#searchForm');
const results = document.querySelector('#results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  results.textContent = "Searching...";
  try {
    const res = await fetch('https://rxcompare-backend.onrender.com/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    results.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    results.textContent = "Error: " + err.message;
  }
});
