const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vShAtOr9RXHZ95BYlKngeR7WaGTyf6rUfoqmFJWKykCLGN4o8qNjdfBv2DbWbtNa2JP1FBYZ8y0zjuy/pub?gid=686696441&single=true&output=csv";

function parseCSV(text) {
  const rows = text
    .trim()
    .split("\n")
    .map((row) => row.split(","));
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = row[i] ? row[i].trim() : "";
    });
    return obj;
  });
}

function displayItems(items) {
  const container = document.getElementById("itemContainer");
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <h3>${item.nom}</h3>
      <p>ID : ${item["id produit"]}</p>
      <p>Stock : ${item.stock}</p>
      <p>Prix émeraude : ${item["prix emeraude"]}</p>
      <button class="orderBtn">Commander</button>
    `;
    container.appendChild(div);
  });
}

function loadProducts() {
  fetch(SHEET_URL)
    .then((res) => res.text())
    .then((text) => {
      const items = parseCSV(text);
      displayItems(items);
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);
