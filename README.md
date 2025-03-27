# React User Management System

A React app to manage users with login, pagination, edit, and delete functionality.

## 🚀 Features
- Login authentication
- Fetch and display users (pagination)
- Edit and update users
- Delete users
- API error handling
- Form validation

## 🛠️ Tech Stack
- React.js
- Axios (API calls)
- React Router
- Tailwind CSS (Styling)

## 📌 Installation
1. Clone the repository:
git clone https://github.com/vedantnaik1008/EmployWise.git

2. Install dependencies:
cd vite-project npm install

3. Start the development server:
npm start

## Hosted Link
hosted link https://employ-wise-iota.vercel.app/

## 🖥️ API Endpoints
- **Login**: `POST /api/login`
- **Fetch Users**: `GET /api/users?page=1`
- **Edit User**: `PUT /api/users/{id}`
- **Delete User**: `DELETE /api/users/{id}`

## 🔥 Assumptions
- Uses `https://reqres.in/` as a mock API.
- Login requires:
- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

## 📌 Considerations
- API error messages are displayed properly.
- User-friendly form validation is implemented.
- Pagination is handled dynamically.
