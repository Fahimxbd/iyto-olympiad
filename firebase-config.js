// ================================================================
// IYTO Firebase Configuration
// REPLACE all "YOUR_..." values with your actual Firebase config
// Get from: console.firebase.google.com → Project Settings → Web App
// ================================================================
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Age category helper
function getAgeCategory(dob) {
  const age = (new Date() - new Date(dob)) / (365.25 * 24 * 3600 * 1000);
  if (age >= 10 && age <= 12) return { name:'Junior Pioneer',  icon:'🌱', range:'10–12', level:'beginner' };
  if (age >= 13 && age <= 16) return { name:'Tech Explorer',   icon:'⚙️', range:'13–16', level:'intermediate' };
  if (age >= 17 && age <= 20) return { name:'Elite Innovator', icon:'🔥', range:'17–20', level:'advanced' };
  return null;
}

// Toast notification
function toast(msg, type='info') {
  const c = document.getElementById('toasts');
  if (!c) return;
  const t = document.createElement('div');
  t.className = 'toast toast-'+type;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(10px)'; setTimeout(()=>t.remove(),400); }, 3500);
}

// Redirect if not logged in
function requireAuth() {
  return new Promise(resolve => {
    const u = auth.onAuthStateChanged(user => {
      u();
      if (!user) {
        window.location.href = 'login.html?r=' + encodeURIComponent(window.location.pathname);
      } else resolve(user);
    });
  });
}
