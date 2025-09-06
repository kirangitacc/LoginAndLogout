# 🔐 Login Flow App

A full-stack authentication system built with React.js (frontend),
Node.js + Express (backend), and SQLite (database). Users can register,
log in, and view their profile securely using JWT-based authentication
stored in cookies.

------------------------------------------------------------------------

vercel-https://login-and-logout-tau.vercel.app/

------------------------------------------------------------------------

## 🚀 Features

-   Secure login/logout flow using JWT and bcrypt
-   Session management with cookies (`js-cookie`)
-   SQLite database for lightweight persistence
-   Responsive UI with modular React components
-   Protected routes using React Router
-   Profile view with user details

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Layer        Technology
  ------------ -----------------------------------
  Frontend     React.js, React Router, js-cookie
  Backend      Node.js, Express.js, bcrypt, JWT
  Database     SQLite
  Styling      CSS Modules
  Deployment   Render.com

------------------------------------------------------------------------

## 📦 Installation

### 1. Clone the repo

``` bash
git clone https://github.com/kirangitacc/LoginAndLogout.git
cd LoginAndLogout
```

### 2. Install backend dependencies

``` bash
cd backend
npm install
```

### 3. Install frontend dependencies

``` bash
cd ../frontend
npm install
```

------------------------------------------------------------------------

## 🧪 Running Locally

### Start the backend

``` bash
cd backend
npm start
```

### Start the frontend

``` bash
cd ../frontend
npm start
```

Then visit: http://localhost:3000

------------------------------------------------------------------------

## 🔐 Environment Variables

Create a .env file in the backend folder:

``` env
JWT_SECRET=your_secret_key
```

------------------------------------------------------------------------

## 📄 API Endpoints

  Method   Endpoint        Description
  -------- --------------- --------------------
  POST     /register       Register new user
  POST     /login          Authenticate user
  GET      /user/:userId   Fetch user profile

------------------------------------------------------------------------

## 🧹 Deployment Notes

-   Ensure bcrypt version is compatible (\^5.1.0)
-   Remove embedded .git folders before pushing
-   Deploy backend and frontend separately on Render or Netlify

------------------------------------------------------------------------

## 📄 License

MIT License © 2025 Kiran
