// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Your web app's Firebase configuration
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

document.addEventListener("DOMContentLoaded", () => {
  const loginbtn = document.getElementById('loginbtn');
  
  if (!loginbtn) {
    console.error("loginbtn not found in DOM!");
    return;
  }

  loginbtn.addEventListener("click", function(event) {
    event.preventDefault();
    const Email = document.getElementById('Email').value;
    const passinput = document.getElementById('passinput').value;

    console.log("Login clicked:", Email); // <-- check log

    signInWithEmailAndPassword(auth, Email, passinput)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user.uid); // <-- check log
        window.location.href = "UserCompleteTab.html";
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message); // <-- check log
        alert(error.message);
      });
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Already logged in — go to dashboard
      if (!window.location.href.includes("UserCompleteTab.html")) {
        window.location.href = "UserCompleteTab.html";
      }
    } else {
      // Not logged in — only redirect if NOT on login page
      if (!window.location.href.includes("STEMQuest.html")) {
        window.location.href = "STEMQuest.html";
      }
    }
  });
  
});

//signout function
window.SignouT = function () {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      window.location.href = "STEMQuest.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    });
};

//For saving Profile bg and icon
