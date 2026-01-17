
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.logoutUser = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully");
    window.location.href = "student-login.html";
  } catch (err) {
    console.error(err);
    alert("Logout failed");
  }
};

