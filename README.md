# nextjs-jwt-auth

A production-ready authentication system built with Next.js, JWT, HttpOnly Cookies, and MySQL.

## Features

- ✅ Signup with email & password
- ✅ Login / Logout
- ✅ JWT + HttpOnly Cookie (secure authentication)
- ✅ Forgot Password with email reset link
- ✅ Account deletion
- ✅ Protected routes
- ✅ Cloud MySQL (Railway)

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL (Railway)
- **Auth:** JWT + HttpOnly Cookies
- **Email:** Nodemailer + Gmail

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Dpnxhuu/nextjs-jwt-auth.git
cd nextjs-jwt-auth
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup `.env.local`
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password

### 4. Run the app

```bash
pnpm dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret key for JWT |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail app password |

## Author

**Deepanshu** — [@Dpnxhuu](https://github.com/Dpnxhuu)
