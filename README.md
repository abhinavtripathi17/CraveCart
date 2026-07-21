# 🍽️ CraveCraft - Food Delivery Web Application

CraveCraft is a full-stack MERN food delivery application that enables users to browse menus, add items to their cart, place secure orders, and make online payments. It also includes an admin dashboard for managing food items and customer orders.

## 🚀 Features

- User Authentication (JWT + Bcrypt)
- Browse & Filter Food Items
- Shopping Cart
- Secure Stripe Payments
- Order Placement & Tracking
- Admin Dashboard
- Product Management
- Order Management
- RESTful APIs
- Responsive UI

## 🛠️ Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt
- Stripe
- Multer

## ⚙️ Installation

```bash
git clone https://github.com/abhinavtripathi17/CraveCraft.git
cd CraveCraft
```

Install dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
cd ../admin && npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URL=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
SALT=10
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
FRONTEND_URL=YOUR_FRONTEND_URL
PORT=4000
```

Run the project:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

# Admin
cd admin
npm run dev
```

## 📦 Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 👨‍💻 Author

**Abhinav Tripathi**

- GitHub: https://github.com/abhinavtripathi17
- LinkedIn: https://www.linkedin.com/in/abhinavtripathi17/

⭐ If you found this project useful, consider giving it a star!
