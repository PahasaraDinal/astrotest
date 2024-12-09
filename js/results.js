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

// Populate First Round Results Table
const firstResultsTable = document.getElementById("team-table-body-first");
firstResultsTable.innerHTML = results
  .map((result) => {
    const { SchoolName, TeamCode, Marks, Place } = result;
    return `<tr>
      <td>${SchoolName}</td>
      <td>${TeamCode}</td>
      <td>${Marks}</td>
      <td>${Place}</td>
    </tr>`;
  })
  .join("");

// Populate School Codes Table
const schoolCodesTable = document.getElementById("team-table-body-school");
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

// Search Functionality for Each Tab
document.getElementById("search-input-first").addEventListener("input", (e) => {
  filterTable(e.target.value, "team-table-body-first");
});

document
  .getElementById("search-input-school")
  .addEventListener("input", (e) => {
    filterTable(e.target.value, "team-table-body-school");
  });

function filterTable(query, tableId) {
  const filter = query.toLowerCase();
  const tableBody = document.getElementById(tableId);
  const rows = tableBody.getElementsByTagName("tr");

  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const matches = Array.from(cells).some((cell) =>
      cell.textContent.toLowerCase().includes(filter)
    );
    row.style.display = matches ? "" : "none";
  }
}
