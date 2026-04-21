# Helplytics — Community Support Platform

> **Find help faster. Become help that matters.**

A full-stack community platform where people post problems, skilled helpers respond, and trust is built through contributions — not credentials.

---

## 🖥️ Live Demo

| Frontend | Backend |
|---|---|
| [helplytics-client-side.vercel.app](https://helplytics-clientside.vercel.app) | [helplytics-server.vercel.app](https://helplytics-ai-amber.vercel.app) |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with access & refresh tokens
- 🧠 **Smart Request System** — Post help requests with category, urgency, skills needed
- 🤝 **Helper Flow** — Any user can offer help on any open request
- ⭐ **Trust Score System** — Earn +10 trust points every time your help is marked as solved
- 🏅 **Badge Engine** — Automatic badges: First Helper → Rising Star → Top Contributor
- 🏆 **Leaderboard** — Top 10 helpers ranked by trust score
- 🔍 **Search & Filter** — Live search with debounce, filter by category and urgency
- 🔔 **Notifications** — In-app alerts when someone helps or a request is solved
- 📊 **Dashboard** — Personal stats, recent activity, badges, trust progress
- 🎨 **Premium Dark UI** — Editorial SaaS design with Sora + DM Sans typography

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework |
| **TypeScript** | Type safety |
| **Zustand** + `persist` | State management + localStorage persistence |
| **Formik** + **Yup** | Form handling + validation |
| **Axios** | API client with JWT interceptors |
| **Lucide React** | Icon system |
| **Tailwind CSS** | Utility styling |

### Backend
| Tech | Purpose |
|---|---|
| **Node.js** + **Express** | REST API server |
| **MongoDB** + **Mongoose** | Database + ODM |
| **JWT** | Authentication (access + refresh token flow) |
| **bcryptjs** | Password hashing |
| **Vercel** | Serverless deployment |

---

## 📁 Project Structure

```
helplytics/
├── client/                          # Next.js Frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── requests/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── create/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── leaderboard/page.tsx
│   │   └── home/page.tsx
│   ├── components/shared/
│   │   └── Sidebar.tsx
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── requestStore.ts
│   │   └── userStore.ts
│   └── lib/axios.ts
│
└── server/                          # Express Backend
    ├── models/
    │   ├── User.model.js
    │   ├── Request.model.js
    │   └── Notification.model.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── request.controller.js
    │   ├── user.controller.js
    │   └── notification.controller.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    └── server.js
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register       Register new user
POST   /api/auth/login          Login + get tokens
POST   /api/auth/logout         Logout + clear refresh token
GET    /api/auth/me             Get current user (protected)
```

### Requests
```
GET    /api/requests            Get all requests (with filters)
POST   /api/requests            Create new request
GET    /api/requests/:id        Get single request
POST   /api/requests/:id/help   Offer help on a request
PATCH  /api/requests/:id/solve  Mark request as solved
DELETE /api/requests/:id        Delete request (author only)
```

### Users
```
POST   /api/users/onboarding    Complete profile onboarding
GET    /api/users/leaderboard   Top 10 helpers by trust score
GET    /api/users/dashboard     Personal stats + recent activity
GET    /api/users/me            Current user profile
GET    /api/users/profile/:id   Any user's profile
```

### Notifications
```
GET    /api/notifications        Get all notifications
PATCH  /api/notifications/read-all  Mark all as read
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Backend
```bash
cd server
npm install
```

Create `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 How It Works

```
1. Register & complete onboarding (set skills, role, location)
        ↓
2. Post a help request (title, description, category, urgency)
        ↓
3. Community browses feed & offers help
        ↓
4. Author marks request as solved
        ↓
5. Helpers receive +10 trust score + automatic badges
        ↓
6. Leaderboard updates — top contributors recognized
```

---

## 🏅 Badge System

| Badge | Requirement |
|---|---|
| 🥇 First Helper | Help on 1 solved request |
| ⭐ Rising Star | Help on 5 solved requests |
| 🏆 Top Contributor | Help on 10 solved requests |

---

## 🚀 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel (Next.js) |
| Backend | Vercel (Serverless) |
| Database | MongoDB Atlas |

---

## 👨‍💻 Author

**M.A.Hasnain**
— Full Stack Developer (MERN) · Designer · Builder

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/m-a-hasnain-03296322a/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/MAHasnain)

---

## 🏁 Built At

This project was built during a **10-hour Full Stack Hackathon** — from blank repo to deployed product in one session.

> *"Not just a help forum — a reputation system where every contribution is tracked, rewarded, and remembered."*

---

<p align="center">Built with focus. Deployed with purpose. 🚀</p>