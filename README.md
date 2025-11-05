# 📝 Full Stack Todo List Application

### 📌 Project Overview
This is a **Full Stack Todo List Application** built with a **production-ready architecture**, featuring complete user authentication, CRUD task management, and a fully responsive UI.

The app is **fully deployed** with separate **frontend** and **backend** setups.

---

## 🚀 Tech Stack

### **Frontend**
- ⚛️ React (TypeScript)
- 🎨 Tailwind CSS
- 🧾 Formik (for form handling)
- ✅ Yup (for validation)
- 🌐 Axios (for API calls)

### **Backend**
- 🟢 Node.js
- 🚏 Express.js
- 🧩 Prisma ORM
- 🗄️ MySQL Database
- 🧠 MVC Architecture
- 💻 TypeScript

### **Deployment**
- 🌍 **Frontend** → [Netlify](https://www.netlify.com)
- ⚙️ **Backend** → [Railway](https://railway.app)
- 🛢️ **Database** → MySQL (hosted on Railway)

---

## ⚙️ Features

### 👤 User Authentication
- Signup for new users  
- Login for existing users  
- JWT-based session handling  

### ✅ Task Management
- Add new tasks  
- Update or mark tasks as completed  
- Delete existing tasks  
- Search tasks by title or description  

### 🗂️ View Modes
- List and Column view (based on reference design)

### 💡 Additional
- Fully responsive design for all screen sizes  
- Proper validation and error handling  
- Clean and modular MVC folder structure for backend  

---
## 🧪 Testing Credentials

You can use the following **dummy user** for testing:

Email: john@example.com
Password: 12345678
Or register a new user from the signup page.


## 🌐 Live Demo Links

- 🖥️ **Frontend (Netlify):** [https://todo-list-edfdad.netlify.app/](https://todo-list-edfdad.netlify.app/)
---

## 💾 Setup Instructions (Run Locally)

### **Backend Setup**
cd backend
npm install
npx prisma migrate dev
npm run server

### **frontend Setup**
cd frontend
npm install
npm run dev


### **Environment Variables**
backend .env
DATABASE_URL="mysql://user:password@host:port/dbname"
JWT_SECRET="your_jwt_secret"

frontent .env
VITE_API_URL="http://localhost:{port}/api"