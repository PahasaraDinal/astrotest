document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("instructionModal");
  const closeModalButton = document.getElementById("closeInstructionModal");

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Optionally, close the modal if the user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n === x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");

  if (n === 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";
  currentTab += n;

  if (currentTab >= x.length) {
    // Prevent default submission here and let the submit handler take over
    document
      .getElementById("registrationForm")
      .dispatchEvent(new Event("submit"));
    return false;
  }

  showTab(currentTab);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  for (i = 0; i < y.length; i++) {
    // Skip validation for optional fields
    if (y[i].hasAttribute("required") && y[i].value === "") {
      y[i].className += " invalid"; // Highlight invalid field
      valid = false;
    }
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }

  return valid; // Proceed if all required fields are valid
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Hide the buttons and steps
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";

    const steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
      steps[i].style.display = "none";
    }

    // Show the spinner
    showSpinner();

    const form = e.target;
    const data = new FormData(form);
    const action = form.action;

    fetch(action, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        hideSpinner(); // Hide the spinner after receiving the response
        if (result.result === "success") {
          showModal("successModal");
          console.log("Row:", result.row); // Log the returned row number
        } else if (result.result === "error") {
          showModal("failureModal");
          console.error("Error:", result.error); // Log the error message
        }
      })
      .catch((error) => {
        hideSpinner(); // Hide the spinner in case of a network error
        showModal("failureModal");
        console.error("Network error:", error.message);
      });
  });

// Show spinner function
function showSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.style.display = "block";
  }
}

// Hide spinner function
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.style.display = "none";
  }
}

// Show modal function
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
  }
}

// Close modal function
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Redirect to the specified page
function redirectToPage(url) {
  window.location.href = url;
}
