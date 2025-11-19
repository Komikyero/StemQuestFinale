// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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
const db = getFirestore(app);

let isSigningUp = false; // Prevent redirect before grade selection

document.addEventListener("DOMContentLoaded", () => {

  // ================= SIGNUP =================
  const signupForm = document.getElementById("signupForm");
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission
    isSigningUp = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("inputpass").value;
    const confirmPass = document.getElementById("confirmpass").value;

    if (password !== confirmPass) {
      document.getElementById("notmatchingg").style.display = "block";
      return;
    } else {
      document.getElementById("notmatchingg").style.display = "none";
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Hide signup form
      document.getElementById("myForm").style.display = "none";

      // Show grade selection
      showGradeSelection(user.uid);
    } catch (err) {
      alert("Signup failed: " + err.message);
      isSigningUp = false;
    }
  });

  // ================= LOGIN =================
  const loginBtn = document.getElementById("loginbtn");
  loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("passinput").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "UserCompleteTab.html";
    } catch (err) {
      alert(err.message);
    }
  });

  // ================= AUTH STATE =================
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      if (!window.location.href.includes("UserCompleteTab.html") && !isSigningUp) {
        window.location.href = "UserCompleteTab.html";
      }
    } else {
      // User is NOT signed in
      if (!window.location.href.includes("STEMQuest.html")) {
        window.location.href = "STEMQuest.html";
      }
    }
  });

}); // DOMContentLoaded end

// ================= SIGNOUT =================
window.SignouT = function () {
  signOut(auth)
    .then(() => window.location.href = "STEMQuest.html")
    .catch(err => alert("Signout failed: " + err.message));
};

// ================= GRADE SELECTION =================
function showGradeSelection(userId) {
  const popup = document.getElementById("grade-selection");
  popup.style.display = "flex";

  const grade11 = document.getElementById("grade11");
  const grade12 = document.getElementById("grade12");

  grade11.onclick = () => saveGradeAndRedirect(userId, "STEM 11");
  grade12.onclick = () => saveGradeAndRedirect(userId, "STEM 12");
}

async function saveGradeAndRedirect(userId, grade) {
  try {
    await setDoc(doc(db, "users", userId), { grade });
    document.getElementById("grade-selection").style.display = "none";
    isSigningUp = false;
    window.location.href = "UserCompleteTab.html";
  } catch (err) {
    alert("Error saving grade: " + err.message);
  }
}
