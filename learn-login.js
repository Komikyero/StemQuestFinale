// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCbUZpTfd7TlGv5Vn-67VroxvlgLiUyrv0",
  authDomain: "stemquest-signup-fe01c.firebaseapp.com",
  projectId: "stemquest-signup-fe01c",
  storageBucket: "stemquest-signup-fe01c.firebasestorage.app",
  messagingSenderId: "201202531658",
  appId: "1:201202531658:web:d81f5dc14eb0d0784f55b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const homebtn = document.querySelector('.stemquest'); // <-- missing

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, checking auth state...");

  const signupBtn = document.querySelector(".signup-btn");
  const userIcon = document.querySelector(".User-Icon");
  const navRight = document.getElementById("nav-right");
  const loadingOverlay = document.getElementById("loading-overlay");

  if (!signupBtn || !userIcon || !navRight) {
    console.error("Missing DOM elements!");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    console.log("Auth state:", user);

    if (user) {
      userIcon.style.display = "inline-block";
      signupBtn.style.display = "none";
      if (homebtn) {
        homebtn.addEventListener('click', () => {
          window.location.href = 'UserCompleteTab.html';
        });
      }

    } else {
      signupBtn.style.display = "inline-block";
      userIcon.style.display = "none";
      if (homebtn) {
        homebtn.addEventListener('click', () => {
          window.location.href = 'STEMQuest.html';
        });
      }
    }

    navRight.style.visibility = "visible"; // show nav after auth check
    loadingOverlay.style.display = "none"; // hide loading overlay
  });
});

// Sign out function
window.SignouT = function () {
  signOut(auth)
    .then(() => {
      window.location.href = "STEMQuest.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    });
};

