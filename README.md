# 🌐 International Youth Tech Olympiad (IYTO)
### Official Website — [iyto.online](https://iyto.online)

---

## 📌 Overview

This is the official website for the **International Youth Tech Olympiad (IYTO)** — a global platform for young tech innovators to compete, collaborate, and shine.

The site includes:
- 🏠 Landing / Home Page
- 📋 Olympiad Registration Page
- 🔐 Login & Registration System (Firebase Auth)
- 👤 Participant Dashboard (after login)
- ℹ️ About Us Page
- 🔒 Privacy Policy Page
- 📬 Contact Page

---

## 🗂️ Project Structure

```
iyto-website/
│
├── index.html              ← Home / Landing Page
├── register.html           ← Olympiad Registration Form
├── login.html              ← Login Page
├── signup.html             ← New User Sign Up
├── dashboard.html          ← Participant Dashboard (protected)
├── about.html              ← About Us
├── privacy.html            ← Privacy Policy
├── contact.html            ← Contact Page
│
├── assets/
│   ├── css/
│   │   └── style.css       ← Global Styles
│   ├── js/
│   │   ├── auth.js         ← Firebase Auth Logic
│   │   └── main.js         ← General Scripts
│   └── images/
│       └── logo.png        ← IYTO Logo
│
├── firebase.js             ← Firebase Config
└── README.md               ← This file
```

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/iyto-website.git
cd iyto-website
```

### 2. Open with Live Server

Install the **Live Server** extension in VS Code, then right-click `index.html` → **Open with Live Server**.

Or simply open `index.html` in your browser directly.

---

## 🔐 Login & Registration Setup (Firebase)

This website uses **Google Firebase Authentication** for real login/registration.

### Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add Project"** → Name it `IYTO`
3. Disable Google Analytics (optional) → Click **Create Project**

### Step 2: Enable Email/Password Authentication

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Click **Save**

### Step 3: Get Your Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** → Click `</>` (Web)
3. Register app → Copy the config object

### Step 4: Add Config to `firebase.js`

Open `firebase.js` and replace the placeholder:

```javascript
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

> ⚠️ **Never share your API key publicly.** For GitHub Pages, Firebase rules will protect your data.

### Step 5: Set Firebase Rules (Firestore)

If you use Firestore to store registrations:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🌍 Deploy on GitHub Pages

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial IYTO website commit"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings** → **Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)`
4. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/iyto-website/
```

### Step 3: Connect Custom Domain (`iyto.online`)

1. In GitHub Pages settings → **Custom domain** → Enter `iyto.online`
2. Go to your domain registrar (where you bought `iyto.online`)
3. Add these DNS records:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | @    | 185.199.108.153              |
| A     | @    | 185.199.109.153              |
| A     | @    | 185.199.110.153              |
| A     | @    | 185.199.111.153              |
| CNAME | www  | YOUR_USERNAME.github.io      |

4. Wait 10–48 hours for DNS propagation
5. Check **Enforce HTTPS** in GitHub Pages settings

---

## 📧 Contact

- 🌐 Website: [iyto.online](https://iyto.online)
- 📧 Email: [iyto.official@hotmail.com](mailto:iyto.official@hotmail.com)

---

## 📄 License

© 2025 International Youth Tech Olympiad (IYTO). All rights reserved.
