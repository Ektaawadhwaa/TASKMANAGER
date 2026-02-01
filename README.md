Task Manager Web Application

A full-stack Task Management web application where users can create, view, update, and delete tasks.
The app supports user authentication, task ownership, and persistent storage using MongoDB.

Built with React, Node.js, Express, and MongoDB.
 Features

User authentication (Signup & Login)

Each user sees only their own tasks

Create, edit, delete tasks

Task status management (pending, in-progress, completed)

Search and filter tasks

Responsive UI with Tailwind CSS

JWT-based authentication

MongoDB for persistent data storage

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

JavaScript (ES6+)

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcrypt for password hashing

 Project Structure
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/        # DB connection
│   │   ├── models/        # User & Task schemas
│   │   ├── routes/        # Auth & Task routes
│   │   ├── middlewares/   # Auth middleware
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

 Setup Instructions (Local Development)
1️ Clone the Repository
git clone https://github.com/Ektaawadhwaa/TASKMANAGER.git

2️ Backend Setup
Navigate to backend folder
cd Backend
Install dependencies
npm install
Create .env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start backend server   npm run dev
Backend will run on: http://localhost:5000
3️ Frontend Setup
Open a new terminal:
cd Frontend
npm install
npm run dev
Frontend will run on: http://localhost:5173


Authentication Flow
Users sign up or log in using email and password
Backend issues a JWT token
Token is stored in localStorage
All task routes are protected
Tasks are linked to users via userId

 Database Design
Users Collection
{
  _id,
  name,
  email,
  password,
  createdAt,
  updatedAt
}

Tasks Collection
{
  _id,
  title,
  description,
  status,
  user,        // Reference to User
  createdAt,
  updatedAt
}

Relationship: One user → many tasks