function showOverlay() {
  const overlay = document.getElementById("dimOverlay");
  if (overlay) {
    overlay.style.display = "block";
    requestAnimationFrame(() => overlay.classList.add("active"));
  }
}

function hideOverlay() {
  const overlay = document.getElementById("dimOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    setTimeout(() => overlay.style.display = "none", 300); // wait for fade out
  }
}

//login
function openSearch() {
  const search = document.getElementById("mysearch");
  if (!search) return;
  search.classList.add("active");
  showOverlay();
  // focus the input when visible
  const input = document.getElementById("searchtab");
  setTimeout(() => { if (input) input.focus(); }, 380);
}

function closeSearch() {
  const search = document.getElementById("mysearch");
  if (!search) return;
  search.classList.remove("active");
  hideOverlay();
}

document.addEventListener("DOMContentLoaded", () => {
  // Prevent search form submit reload
  const searchContainer = document.querySelector(".search-container");
  if (searchContainer) {
    searchContainer.addEventListener("submit", (e) => e.preventDefault());
  }

  // Clear search results when animation ends
  const search = document.getElementById("mysearch");
  if (search) {
    search.addEventListener("transitionend", () => {
      if (!search.classList.contains("active")) {
        const form = search.querySelector("form");
        if (form) form.reset();
        const results = document.getElementById("results");
        if (results) results.innerHTML = "";
      }
    });

    // Prevent inner clicks from closing search
    search.addEventListener("click", (event) => event.stopPropagation());
  }

  // Prevent clicks inside login/signup from closing them
  const signupForm = document.getElementById("myForm");
  const loginForm = document.getElementById("LoginmyForm");
  [signupForm, loginForm].forEach(form => {
    if (form) {
      form.addEventListener("click", (event) => event.stopPropagation());
    }
  });
});


//handles both popups for search and sign up
window.addEventListener("click", (event) => {
  const signupForm = document.getElementById("myForm");
  const search = document.getElementById("mysearch");
  const signupButton = document.querySelector(".signup-btn");

  // Close signup if open and click outside
  if (signupForm && signupForm.style.display === "block" &&
    !signupForm.contains(event.target) && event.target !== signupButton) {
    signupForm.style.display = "none";
    hideOverlay();
    signupForm.querySelector("form").reset();
  }

  // Close search if open and click outside
  if (search && search.classList.contains("active") &&
    !search.contains(event.target) && !event.target.closest(".search-btn")) {
    closeSearch();
  }
});
function openDrop() {

  const drop = document.getElementById("DropDownMenu");
  console.log("iya ako!!");
  if (!drop) return;
  drop.style.display = drop.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", (event) => {
  const drop = document.getElementById("DropDownMenu");
  const userButton = document.querySelector(".User-Icon");
  if (drop && drop.style.display === "block" &&
    !drop.contains(event.target) && event.target !== userButton) {
    drop.style.display = "none";
  }
});

//if user is already signed in

function alertabi() {
  console.log("gagana ako");
}

