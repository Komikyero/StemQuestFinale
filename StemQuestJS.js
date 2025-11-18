//tanginang yan nagulat ako gago AHWDHAWHDWAHDWAH
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

function openForm() { 
  document.getElementById("myForm").style.display = "block";
  document.getElementById("myForm").style.opacity = "1";

  document.getElementById("LoginmyForm").style.display = "none";
  document.getElementById("notmatchingg").style.display = "none";
  showOverlay();
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  hideOverlay();
  document.querySelector("#myForm form").reset();
}

//login
function openLogin() { 
  document.getElementById("LoginmyForm").style.display = "block";
  document.getElementById("myForm").style.display = "none";
  showOverlay();
}

function closeLogin() {
  document.getElementById("LoginmyForm").style.display = "none";
  document.getElementById("myForm").style.display = "none";
  hideOverlay();
}

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

function ShowPass() {
  // get each input
  var x = document.getElementById("inputpass");
  var y = document.getElementById("passinput");
  var z = document.getElementById("confirmpass");

  // toggle safely only if the element exists
  [x, y, z].forEach((field) => {
    if (field) {
      field.type = (field.type === "password") ? "text" : "password";
    }
  });
}


function checkpass() { //checks if both pass and checkpass are the same
    var FirstPass = document.getElementById("inputpass").value;
    var CheckPass = document.getElementById("confirmpass").value;
    var notmatchingg = document.getElementById("notmatchingg");

        if (FirstPass !== CheckPass) {
            notmatchingg.style.display = "block";
        }
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
  const loginForm = document.getElementById("LoginmyForm");
  const search = document.getElementById("mysearch");
  const signupButton = document.querySelector(".signup-btn");

  // Close signup if open and click outside
  if (signupForm && signupForm.style.display === "block" &&
      !signupForm.contains(event.target) && event.target !== signupButton) {
    signupForm.style.display = "none";
    console.log("ako ra!@")
    hideOverlay();
    signupForm.querySelector("form").reset();
  }

if (loginForm && loginForm.style.display === "block" &&
      !loginForm.contains(event.target) && event.target !== loginForm) {
    loginForm.style.display = "none";
    console.log("ako ra!@")
    hideOverlay();
    loginForm.querySelector("form").reset();
  }

  // Close search if open and click outside
  if (search && search.classList.contains("active") &&
      !search.contains(event.target) && !event.target.closest(".search-btn")) {
    closeSearch();
  }
});
