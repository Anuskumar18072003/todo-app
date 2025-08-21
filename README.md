# 📝 MERN Todo App

A simple Todo application built with MongoDB, Express, React, and Node.js

---

## 🚀 Features
- User authentication (JWT)
- Create, Read, Update, Delete (CRUD) todos
- Protected API routes
- React frontend with Tailwind CSS
- Persistent login with localStorage

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js with Express.js
- **Database:** MongoDB 
- **Authentication:** JWT + Bcrypt

---

## 📂 Project Structure
todo-app/
├── client/ 
├── server/
├── .gitignore
├── README.md

---

# ⚙️ Setup Instructions

# 1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app

---

setup backend
cd server
npm install

---

Create a .env file inside server/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

Run the server:
npm run dev

---

Setup frontend

cd ../client
npm install
npm start