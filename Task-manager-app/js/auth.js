import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Register User
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('uid', userCredential.user.uid);
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

// Login User
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('uid', userCredential.user.uid);
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

// Logout User
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('uid');
      window.location.href = 'index.html';
    } catch (error) {
      alert(error.message);
    }
  });
}
