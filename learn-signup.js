// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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
  const signup = document.getElementById('signup');
 
  signup.addEventListener("click", function(event) {
    event.preventDefault();
    const mail = document.getElementById('mail').value;
    const psw = document.getElementById('psw').value;

    createUserWithEmailAndPassword(auth, mail, psw).then((userCredential) =>  {
      const user = userCredential.user;
      alert("Creating  Account...")
      window.location.href="UserCompleteTab.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)

    });

    
  });
});

    