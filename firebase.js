// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBb3QiIxJdjCkWiLhq2wh6m8EOo4Zhsrwg",
  authDomain: "iyto-fc452.firebaseapp.com",
  projectId: "iyto-fc452",
  storageBucket: "iyto-fc452.firebasestorage.app",
  messagingSenderId: "152596776277",
  appId: "1:152596776277:web:6e3511a23663d81b885bdc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
