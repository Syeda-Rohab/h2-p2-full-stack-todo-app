# Complete Deployment Guide - Phase 2 Todo App

## Overview
This guide will help you deploy both backend and frontend to make the app accessible on mobile.

---

## Part 1: Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to: https://railway.app
2. Sign up with GitHub
3. Verify your email

### Step 2: Deploy Backend to Railway

1. **Click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Choose repository**: `h2-p2-full-stack-todo-app`
4. **Select root directory**: `/backend` (IMPORTANT!)

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically create a database
4. Copy the **DATABASE_URL** (you'll need this)

### Step 4: Configure Environment Variables

In Railway project settings → **Variables**, add these:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET_KEY=your-super-secret-jwt-key-min-32-chars-change-this
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000
APP_NAME=Todo API - Phase II
DEBUG=False
```

**Important**:
- Replace `your-vercel-app` with your actual Vercel domain (you'll get this in Part 2)
- Generate a strong JWT secret: `python -c "import secrets; print(secrets.token_urlsafe(32))"`

### Step 5: Deploy

1. Railway will automatically deploy
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a URL like: `https://your-app.up.railway.app`
4. **Copy this URL** - you'll need it for frontend

### Step 6: Verify Backend

Open in browser: `https://your-app.up.railway.app/health`

You should see: `{"status": "healthy"}`

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import your repository

### Step 2: Configure Vercel Project

1. **Project Name**: `h2-p2-full-stack-todo-app`
2. **Framework Preset**: Next.js (auto-detected)
3. **Root Directory**: Click **Edit** → Select **`frontend`**
4. **Build Command**: `npm run build` (auto)
5. **Output Directory**: `.next` (auto)

### Step 3: Add Environment Variable

Before deploying, add this environment variable:

**Key**: `NEXT_PUBLIC_API_URL`
**Value**: `https://your-app.up.railway.app` (your Railway backend URL)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://h2-p2-full-stack-todo-app.vercel.app`

### Step 5: Update Backend CORS

**IMPORTANT**: Go back to Railway and update the `ALLOWED_ORIGINS` variable:

```
ALLOWED_ORIGINS=https://h2-p2-full-stack-todo-app.vercel.app,http://localhost:3000
```

Replace with your actual Vercel URL. Then redeploy backend.

---

## Part 3: Testing on Mobile

### Step 1: Open on Mobile
1. Open your Vercel URL on mobile: `https://your-app.vercel.app`
2. You should see the login/register page

### Step 2: Test Features
1. **Register** a new account
2. **Login** with credentials
3. **Create** a new task
4. **Edit** a task
5. **Mark Complete/Incomplete**
6. **Delete** a task

### Troubleshooting

**If login doesn't work:**
- Check Railway logs for errors
- Verify `ALLOWED_ORIGINS` includes your Vercel URL
- Check `NEXT_PUBLIC_API_URL` is set correctly

**If tasks don't load:**
- Open browser console (F12) and check for errors
- Verify backend `/health` endpoint works
- Check database connection in Railway

---

## Quick Summary

### Railway Backend URL
Format: `https://your-app.up.railway.app`

### Vercel Frontend URL
Format: `https://your-app.vercel.app`

### Environment Variables Checklist

**Railway (Backend):**
- ✅ DATABASE_URL (from PostgreSQL)
- ✅ JWT_SECRET_KEY
- ✅ ALLOWED_ORIGINS (with Vercel URL)

**Vercel (Frontend):**
- ✅ NEXT_PUBLIC_API_URL (Railway backend URL)

---

## Need Help?

If you encounter any issues:
1. Check Railway deployment logs
2. Check Vercel deployment logs
3. Verify all environment variables are set correctly
4. Ensure CORS is configured with correct URLs
