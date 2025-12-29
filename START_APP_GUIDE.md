# 🚀 Todo App - Quick Start Guide

## ✅ Current Status
- **Backend**: Running on http://localhost:8000
- **Frontend**: Running on http://localhost:3001 (port 3000 was busy)
- **Database**: SQLite (backend/todo.db) - Migrations complete

---

## 📖 How to Use the App

### Method 1: Open Browser Directly
1. Open your browser and go to: **http://localhost:3001**
2. You should see the Todo App login page

### Method 2: Use Test Panel
1. Double-click `TEST_APP.html` file
2. Click "Open Todo App" button
3. It will open in your default browser

---

## 🎯 First Time Setup

### Step 1: Register a New Account
1. On login page, click "Don't have an account? Register"
2. Enter any email (doesn't have to be real): `test@example.com`
3. Enter password (minimum 8 characters): `password123`
4. Click "Register"
5. You'll be automatically logged in and redirected to dashboard

### Step 2: Create Your First Task
1. In the "Create New Task" section:
   - **Title**: "Buy groceries" (required)
   - **Description**: "Milk, eggs, bread" (optional)
2. Click "Add Task"
3. Your task appears in the list below!

### Step 3: Manage Tasks
- **Mark Complete**: Click "Mark Complete" button → Task gets strikethrough
- **Edit Task**: Click "Edit" → Modify title/description → Click "Save"
- **Delete Task**: Click "Delete" → Confirm → Task removed
- **Toggle Status**: Click "Mark Incomplete" to undo completion

---

## 🔑 Features Available

| Feature | Description | Status |
|---------|-------------|--------|
| ✍️ Create Tasks | Add tasks with title & description | ✅ Working |
| 📋 View Tasks | See all your tasks sorted by date | ✅ Working |
| ✅ Toggle Status | Mark as Complete/Incomplete | ✅ Working |
| ✏️ Edit Tasks | Update task title & description | ✅ Working |
| 🗑️ Delete Tasks | Permanently remove tasks | ✅ Working |
| 🔐 User Auth | Register, login, logout with JWT | ✅ Working |
| 👤 User Isolation | Each user sees only their tasks | ✅ Working |

---

## 🛠️ Troubleshooting

### Frontend Not Loading?
**Check if port 3001 is working:**
```
Open browser → http://localhost:3001
```

**If not working, check terminal:**
- Look for "✓ Ready in X.Xs" message
- If you see errors, try:
  ```bash
  cd frontend
  rm -rf .next node_modules
  npm install
  npm run dev
  ```

### Backend Not Responding?
**Test backend:**
```
Open browser → http://localhost:8000/docs
```

**If not working:**
```bash
cd backend
uv run uvicorn src.main:app --reload --port 8000
```

### Database Issues?
**Reset database:**
```bash
cd backend
rm todo.db
uv run alembic upgrade head
```

---

## 🧪 API Testing

### Option 1: Swagger UI (Recommended)
1. Open: http://localhost:8000/docs
2. Test all endpoints with interactive interface
3. Click "Try it out" on any endpoint

### Option 2: Create Test Account via API
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login (copy the token from response)
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📱 Multi-User Testing

To test user isolation:

1. **User 1**:
   - Register: `user1@test.com` / `password123`
   - Create 3 tasks
   - Logout

2. **User 2**:
   - Register: `user2@test.com` / `password123`
   - Create 2 tasks
   - Should NOT see User 1's tasks ✅

3. **Login as User 1 again**:
   - Should see only User 1's 3 tasks ✅

---

## 🎨 UI Features

### Desktop View (1280px+)
- Full width cards
- Large buttons
- Spacious layout

### Tablet View (768px-1024px)
- Responsive grid
- Medium buttons

### Mobile View (320px-640px)
- Stacked layout
- Touch-friendly buttons
- Full-width inputs

### Task Status Colors
- **Incomplete**: Yellow badge
- **Complete**: Green badge with strikethrough text

---

## 🔐 Security Features

1. **Password Hashing**: Bcrypt with cost factor 12
2. **JWT Tokens**: 7-day expiry, HS256 algorithm
3. **User Isolation**: Database queries filtered by user_id
4. **CORS Protection**: Only localhost:3001 allowed
5. **Input Validation**: Title (1-200 chars), Description (0-1000 chars)

---

## 📊 Project Statistics

- **Total Files**: 86
- **Lines of Code**: 10,367
- **Backend Files**: 37 (Python/FastAPI)
- **Frontend Files**: 15 (React/Next.js/TypeScript)
- **Shared Types**: 4 (TypeScript)
- **Documentation**: 6 files

---

## 🎯 Quick Commands

### Start Everything
```bash
# Terminal 1: Backend
cd backend
uv run uvicorn src.main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Stop Servers
Press **Ctrl+C** in both terminals

### View Logs
- Backend logs: Terminal 1
- Frontend logs: Terminal 2
- Browser console: F12 → Console tab

---

## 💡 Tips & Tricks

1. **Keep terminals open** while using the app
2. **Auto-refresh** works when you edit code
3. **Browser dev tools** (F12) show API calls in Network tab
4. **localStorage** stores JWT token - clear it to force re-login
5. **Database file** `backend/todo.db` can be deleted to start fresh

---

## 🎓 What You Can Learn

This project demonstrates:
- ✅ REST API design (FastAPI)
- ✅ Database migrations (Alembic)
- ✅ JWT authentication
- ✅ React hooks (useState, useEffect)
- ✅ TypeScript types
- ✅ Responsive CSS (Tailwind)
- ✅ Async/await patterns
- ✅ Error handling
- ✅ Form validation
- ✅ CRUD operations

---

## 📞 Need Help?

1. Check terminal logs for errors
2. Open browser dev tools (F12)
3. Test backend at http://localhost:8000/docs
4. Reset database if needed (see Troubleshooting)

---

## ✨ Enjoy Your Todo App!

**Made with**: Claude Code (Sonnet 4.5)
**Date**: December 29, 2025
**Version**: Phase II Complete
