# 🧠 Dynamic Portfolio Backend

A fully customizable **Portfolio Management API** built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL** and **Prisma ORM**.  
This backend allows users to manage portfolio content dynamically — including projects, skills, experiences, blogs, and dashboard analytics — for use with a connected frontend client.

---

## 🚀 Tech Stack

- **Language:** TypeScript  
- **Framework:** Express.js  
- **ORM:** Prisma  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Token)  
- **Validation:** Zod  
- **Environment Variables:** dotenv  
- **Deployment Ready:**  Vercel  

---

## 📁 Folder Structure

```
src/
│
├── config/
│   └── multer.config.ts             # Multer configuration
│
├── modules/
│   ├── auth/                 # User authentication (login, register)
│   ├── user/                 # User profile and admin access
│   ├── project/              # Portfolio projects management
│   ├── blog/                 # Blogs and articles
│   └── contact/              # Contact form messages
│
├── middlewares/
│   ├── auth.ts               # JWT verification middleware
│   └── errorHandler.ts       # Global error handler
│
├── utils/
│   └── response.ts           # Standardized API response helper
│
├── app.ts                    # Express app initialization
├── server.ts                 # Server entry point
└── .env                      # Environment variables
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL=your_database_url
PORT=5000
SEED_EMAIL="yourmail@gmail.com"
SEED_PASSWORD="W@123456"
NODE_ENV="development"
JWT_ACCESS_SECRET=your_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your_secret
JWT_REFRESH_EXPIRES=30d
BCRYPT_SALT_ROUND=10
CLOUDINARY_CLOUD_NAME=yourcloudname
CLOUDINARY_API_KEY=yourcloudapikey
CLOUDINARY_API_SECRET=yourcloud-secret-3LCdugBGCs
```

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://https://github.com/sultanmahmud07/Dynamic-Portfolio-Server-Prisma-PostgreSQL.git

# 2. Move into the folder
cd dynamic-portfolio-server-prisma-postgreSQL

# 3. Install dependencies
npm install

# 4. Initialize Prisma
npx prisma generate
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev
```

---

## 🔑 Authentication Routes (`/api/auth`)

| Method | Endpoint              | Description          | Auth Required |
|--------|-----------------------|----------------------|---------------|
| POST   | `/login`              | Login user & get JWT | ❌ |
| GET    | `/profile`            | Get logged-in user   | ✅ |

---

## 👤 User Routes (`/api/user`)

| Method | Endpoint      | Description          | Auth Required |
|--------|----------------|----------------------|---------------|
| GET    | `/`            | Get all users (Admin) | ✅ |
| GET    | `/:id`         | Get single user       | ✅ |
| PUT    | `/:id`         | Update user info      | ✅ |
| DELETE | `/:id`         | Delete user           | ✅ |

---

## 💼 Project Routes (`/api/project`)

| Method | Endpoint      | Description                | Auth Required |
|--------|----------------|----------------------------|---------------|
| GET    | `/`            | Get all projects           | ❌ |
| GET    | `/:id`         | Get project by ID          | ❌ |
| POST   | `/create`      | Create new project         | ✅ |
| PUT    | `/:id`         | Update existing project    | ✅ |
| DELETE | `/delete/:id`  | Delete a project           | ✅ |

---

<!-- ## 🕒 Experience Routes (`/api/experiences`)

| Method | Endpoint      | Description               | Auth Required |
|--------|----------------|---------------------------|---------------|
| GET    | `/`            | Get all experiences       | ❌ |
| POST   | `/`            | Add new experience        | ✅ |
| PUT    | `/:id`         | Update experience         | ✅ |
| DELETE | `/:id`         | Remove experience         | ✅ |

--- -->

## 📝 Blog Routes (`/api/post`)

| Method | Endpoint      | Description                | Auth Required |
|--------|----------------|----------------------------|---------------|
| GET    | `/`            | Get all blogs              | ❌ |
| GET    | `/:id`         | Get blog by ID             | ❌ |
| POST   | `/create`      | Create new blog            | ✅ |
| PUT    | `/:id`         | Update blog post           | ✅ |
| DELETE | `/:id`         | Delete blog post           | ✅ |

---

## 📊 Dashboard Routes (`/api/dashboard`)

| Method | Endpoint | Description                     | Auth Required |
|--------|-----------|----------------------------------|---------------|
| GET    | `/stats`  | Get summary (projects, blogs, etc.) | ✅ |
| GET    | `/recent` | Get recent activity logs            | ✅ |

---

## ✉️ Contact Routes (`/api/contacts`)

| Method | Endpoint      | Description                | Auth Required |
|--------|----------------|----------------------------|---------------|
| POST   | `/`            | Send message via contact form | ❌ |
| GET    | `/`            | View all messages (Admin)  | ✅ |

---

## 🧩 Dashboard Features

- Overview of total projects, skills, experiences, and blogs  
- Recently added items tracking  
- Admin-only protected access  
- Statistics visualization (Frontend integration ready)

---

## 🧪 Test Credentials

For accessing the **Admin Dashboard**:

```
Email: owner@gmail.com
Password: W@123456
```
