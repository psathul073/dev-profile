# 🚀 Dev Profile

**Dev Profile** is a full-stack portfolio management app for developers.  
It lets authenticated users log in, add & manage their projects, and share a public portfolio page — similar to Linktree, but for developers.

---

## ✨ Features

### 🔑 Authentication
- Secure login via **GitHub** or **Google**.

### 📦 Project Management
- Add, edit, and delete projects.
- Track:
  - **Total projects count**
  - **Total likes across all projects** 
- These stats are visible **only** to the logged-in owner.

### 🌐 Public Portfolio
- Share your profile link so anyone can:
  - View your showcased projects.
  - See project title, description, live demo link, and source code link.
  - Like individual projects.
- Public visitors **cannot** see your total likes or total project count.

### ❤️ Likes
- Likes are stored per project in **Firebase Realtime Database**.
- Owners can see aggregated like counts across all projects.
- Visitors can like projects but can’t see your total stats.

### 📤 API Support
- API endpoints for fetching project and profile data — ideal for integrating into a custom portfolio site.

---

## 🛠 Tech Stack

**Frontend**  
- React (Hooks)  
- Tailwind CSS  
- Intersection Observer for infinite scrolling  

**Backend**  
- Node.js + Express.js  
- Firebase Firestore (project storage)  
- Firebase Authentication  
- Firebase Realtime Database (likes tracking)  

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/psathul073/dev-profile.git
   cd dev-profile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**
   - Create a Firebase project.
   - Enable **Firestore**, **Realtime Database**, and **Authentication**.
   - Configure OAuth for GitHub & Google.
   - Add your Firebase config to `.env`.

4. **Run Backend**
   ```bash
   cd server
   npm start
   ```

5. **Run Frontend**
   ```bash
   cd client
   npm start
   ```

---

## 🎯 Use Cases
- Showcase your developer portfolio.
- Manage your projects in one place.
- Publicly share demos while keeping analytics private.

---

## 📄 License
MIT License.

---

**Dev Profile** — Build your profile, showcase your work, and keep your stats private.
