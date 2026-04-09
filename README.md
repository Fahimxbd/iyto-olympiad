# IYTO — International Youth Tech Olympiad
## Complete Setup Guide for GitHub Pages + Firebase

---

## 📁 File Structure

```
iyto/                          ← Upload ALL of this to GitHub
│
├── index.html                 → iyto.online/
├── login.html                 → iyto.online/login.html
├── register.html              → iyto.online/register.html
├── forgot-password.html       → iyto.online/forgot-password.html
├── dashboard.html             → iyto.online/dashboard.html
├── olympiad.html              → iyto.online/olympiad.html
├── practice.html              → iyto.online/practice.html
├── about.html                 → iyto.online/about.html
├── contact.html               → iyto.online/contact.html
├── privacy.html               → iyto.online/privacy.html
├── terms.html                 → iyto.online/terms.html
│
└── assets/
    ├── css/
    │   └── global.css
    └── js/
        ├── firebase-config.js   ← PUT YOUR FIREBASE KEYS HERE
        └── components.js
```

---

## 🔥 STEP 1 — Set Up Firebase

### 1.1 Create Firebase Project
1. Go to **https://console.firebase.google.com**
2. Click **"Add Project"** → Name it `iyto-2026`
3. Disable Google Analytics (optional) → **Create Project**

### 1.2 Register a Web App
1. In your project → click the **`</>`** (Web) icon
2. App nickname: `IYTO Website`
3. ✅ Check **"Also set up Firebase Hosting"** (optional)
4. Click **Register app**
5. **Copy the config object** — it looks like this:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "iyto-2026.firebaseapp.com",
  projectId:         "iyto-2026",
  storageBucket:     "iyto-2026.appspot.com",
  messagingSenderId: "12345678",
  appId:             "1:12345678:web:abc123"
};
```

### 1.3 Paste Config into firebase-config.js
Open `assets/js/firebase-config.js` and replace:
```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",          // ← paste yours
  authDomain:        "YOUR_PROJECT...",
  ...
};
```

---

## 🔐 STEP 2 — Enable Authentication

In Firebase Console → **Authentication** → **Sign-in method**:

| Provider | Action |
|----------|--------|
| **Email/Password** | Enable → Save |
| **Google** | Enable → Add your support email → Save |

### 2.1 Add Authorized Domain for Google Sign-In
Go to: **Authentication** → **Settings** → **Authorized domains**

Add:
- `iyto.online`
- `www.iyto.online`
- `YOUR_GITHUB_USERNAME.github.io`

> ⚠️ Without this, Google Sign-In will fail with "unauthorized domain" error.

---

## 🗄️ STEP 3 — Set Up Firestore Database

1. Firebase Console → **Firestore Database** → **Create database**
2. Choose **Production mode**
3. Select your region → **Enable**

### 3.1 Set Security Rules
Go to **Firestore** → **Rules** tab → Replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Anyone can submit a contact message
    match /contact_messages/{doc} {
      allow create: if true;
      allow read: if false; // only you see these in Firebase Console
    }
  }
}
```

Click **Publish**.

---

## 💾 STEP 4 — Enable Firebase Storage (for profile pictures)

1. Firebase Console → **Storage** → **Get Started**
2. Choose **Production mode** → your region → **Done**

### Storage Rules:
Go to **Storage** → **Rules** tab:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

---

## 🐙 STEP 5 — Deploy to GitHub Pages

### 5.1 Create GitHub Repository
1. Go to **github.com** → **New repository**
2. Name: `iyto-website` (or anything)
3. Set to **Public**
4. Click **Create repository**

### 5.2 Upload Files
**Option A — GitHub Website (easiest):**
1. Open your repo → click **"uploading an existing file"**
2. Drag the entire `iyto/` folder contents
3. Click **Commit changes**

**Option B — Git CLI:**
```bash
git clone https://github.com/YOUR_USERNAME/iyto-website
cd iyto-website
# Copy all files from iyto/ folder into here
git add .
git commit -m "Initial IYTO website"
git push origin main
```

### 5.3 Enable GitHub Pages
1. Repo → **Settings** → **Pages** (left sidebar)
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` → `/ (root)` → **Save**
4. Wait 2–3 minutes
5. Your site: `https://YOUR_USERNAME.github.io/iyto-website/`

---

## 🌐 STEP 6 — Connect iyto.online Domain

### 6.1 GitHub Pages Custom Domain
1. Repo → **Settings** → **Pages** → **Custom domain**
2. Type: `iyto.online` → **Save**
3. ✅ Check **Enforce HTTPS**

### 6.2 DNS Records (in your domain registrar)
Add these records where you bought `iyto.online`:

**A Records (for root domain):**
| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**CNAME Record (for www):**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR_USERNAME.github.io |

> ⏳ DNS changes take 10 minutes to 48 hours to propagate.

---

## ✅ STEP 7 — Test Everything

After setup, verify:

| URL | Should work |
|-----|-------------|
| `iyto.online` | Homepage |
| `iyto.online/login.html` | Login page |
| `iyto.online/register.html` | Registration |
| `iyto.online/forgot-password.html` | Password reset |
| `iyto.online/dashboard.html` | Dashboard (login required) |
| `iyto.online/olympiad.html` | Olympiad registration |
| `iyto.online/practice.html` | Practice hub |
| `iyto.online/about.html` | About page |
| `iyto.online/contact.html` | Contact form |
| `iyto.online/privacy.html` | Privacy policy |

**Test checklist:**
- [ ] Email registration works
- [ ] Google Sign-In works
- [ ] Forgot password sends email
- [ ] Profile picture upload works
- [ ] Contact form saves to Firestore
- [ ] Dashboard shows user data

---

## 📧 STEP 8 — Contact Form Messages

To read contact form submissions:
1. Firebase Console → **Firestore Database**
2. Click `contact_messages` collection
3. All messages appear here with name, email, subject, message, and timestamp

You can also set up **Firebase email alerts** for new messages using **Firebase Extensions** → "Trigger Email".

---

## 🔒 STEP 9 — Add Your Signature to Certificates

The certificate PDF is generated in `dashboard.html`.

To add your actual signature image:
1. Sign on white paper, photograph it, remove background (use remove.bg)
2. Save as `signature.png` in `assets/images/`
3. In `dashboard.html`, find the certificate generation code
4. Replace the text-based signature with:
```js
const img = new Image();
img.src = '/assets/images/signature.png';
doc.addImage(img, 'PNG', W/2 - 40, 148, 80, 20);
```

---

## 📞 Contact Info Used in Site

- **Email:** iyto.official@hotmail.com
- **Website:** iyto.online
- **Facebook:** https://www.facebook.com/share/1CaQfMEmCt/
- **Founder:** Fahim Sikder — https://www.aibyfahim.com

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Google Sign-In fails | Add your domain to Firebase Auth → Authorized Domains |
| CSS not loading | Make sure paths start with `/` not `./` |
| 404 on GitHub Pages | GitHub Pages serves from root — keep all files at root level |
| Firebase not connecting | Double-check all 6 values in `firebase-config.js` |
| Contact form not saving | Check Firestore security rules |

---

*© 2026 International Youth Tech Olympiad · iyto.official@hotmail.com*
