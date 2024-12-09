// Initialize Tabs: Show only the first tab content
document.querySelectorAll(".table-wrapper").forEach((content, index) => {
  content.style.display = index === 0 ? "block" : "none";
});

// Tab Switching Functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".table-wrapper");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    tabContents.forEach((content) => {
      content.style.display =
        content.id === button.dataset.tab ? "block" : "none";
    });
  });
});

// Populate First Round Results Table and Cards
const firstResultsTable = document.getElementById("team-table-body-first");
const firstResultsCards = document.getElementById("results-cards-first");

firstResultsTable.innerHTML = results
  .map((result) => {
    const { SchoolName, TeamCode, Marks, Place } = result;
    return `<tr>
      <td>${Place}</td>
      <td>${SchoolName}</td>
      <td>${TeamCode}</td>
      <td>${Marks}</td>
    </tr>`;
  })
  .join("");

firstResultsCards.innerHTML = results
  .map((result) => {
    const { SchoolName, TeamCode, Marks, Place } = result;
    return `<div class="results-card">
      <h4>${Place} - ${SchoolName}</h4>
      <p><strong>Team Code:</strong> ${TeamCode}</p>
      <p><strong>Marks:</strong> ${Marks}</p>
      </div>`;
    })
    .join("");

// Populate School Codes Table and Cards
const schoolCodesTable = document.getElementById("team-table-body-school");
const schoolCodesCards = document.getElementById("results-cards-school");

schoolCodesTable.innerHTML = schoolCodes
  .map((school) => {
    const { SchoolName, SchoolCode, Team } = school;
    return `<tr>
      <td>${SchoolName}</td>
      <td>${SchoolCode}</td>
      <td>${Team}</td>
    </tr>`;
  })
  .join("");

schoolCodesCards.innerHTML = schoolCodes
  .map((school) => {
    const { SchoolName, SchoolCode, Team } = school;
    return `<div class="results-card">
      <h4>${SchoolName}</h4>
      <p><strong>Team Code:</strong> ${SchoolCode}</p>
      <p><strong>Team:</strong> ${Team}</p>
    </div>`;
  })
  .join("");

// Search Functionality for Each Tab
document.getElementById("search-input-first").addEventListener("input", (e) => {
  filterTableAndCards(
    e.target.value,
    "team-table-body-first",
    "results-cards-first"
  );
});

document
  .getElementById("search-input-school")
  .addEventListener("input", (e) => {
    filterTableAndCards(
      e.target.value,
      "team-table-body-school",
      "results-cards-school"
    );
  });

function filterTableAndCards(query, tableId, cardId) {
  const filter = query.toLowerCase();
  const tableBody = document.getElementById(tableId);
  const rows = tableBody.getElementsByTagName("tr");
  const cards = document
    .getElementById(cardId)
    .getElementsByClassName("results-card");

  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const matches = Array.from(cells).some((cell) =>
      cell.textContent.toLowerCase().includes(filter)
    );
    row.style.display = matches ? "" : "none";
  }

  for (let card of cards) {
    const matches = card.textContent.toLowerCase().includes(filter);
    card.style.display = matches ? "" : "none";
  }
}
