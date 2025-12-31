# Hugging Face Spaces Deployment Guide

## 📦 Files Required for Deployment

### Core Application Files (sab zaruri hain):
```
backend/
├── src/                          # Main application code
│   ├── main.py                   # FastAPI app entry point
│   ├── api/                      # API routes
│   │   ├── auth.py              # Authentication endpoints
│   │   ├── tasks.py             # Task CRUD endpoints
│   │   └── deps.py              # Dependencies
│   ├── models/                   # Database models
│   │   ├── user.py              # User model
│   │   └── task.py              # Task model
│   ├── services/                 # Business logic
│   │   ├── auth.py              # Auth service
│   │   ├── user_service.py      # User operations
│   │   └── task_service.py      # Task operations
│   ├── core/                     # Core utilities
│   │   ├── config.py            # Settings/config
│   │   └── security.py          # JWT & password hashing
│   └── db/                       # Database setup
│       ├── base.py              # Base model
│       └── session.py           # DB session
│
├── alembic/                      # Database migrations
│   ├── env.py                   # Alembic config
│   └── versions/                # Migration files
│       └── 001_create_users_and_tasks_tables.py
│
├── Dockerfile                    # Docker configuration ✨ NEW
├── .dockerignore                 # Docker ignore file ✨ NEW
├── requirements.txt              # Python dependencies
├── alembic.ini                   # Alembic configuration
├── start.sh                      # Startup script ✨ NEW
└── README_HUGGINGFACE.md        # HF Space README ✨ NEW
```

## 🚀 Step-by-Step Deployment

### Step 1: Create Hugging Face Space
1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Fill in details:
   - **Space name**: `todo-app-backend` (ya apni marzi ka naam)
   - **License**: MIT
   - **Select SDK**: **Docker**
   - **Space hardware**: CPU basic (free tier)
   - **Visibility**: Public

### Step 2: Upload Backend Files
Option A - Via Git:
```bash
# Clone your space
git clone https://huggingface.co/spaces/YOUR_USERNAME/todo-app-backend
cd todo-app-backend

# Copy all backend files
cp -r ../H2-todo-app/backend/* .

# Commit and push
git add .
git commit -m "Initial backend deployment"
git push
```

Option B - Via Web Interface:
1. Click "Files" tab in your Space
2. Click "Add file" > "Upload files"
3. Upload all files from `backend/` folder
4. Make sure to maintain the folder structure

### Step 3: Set Environment Variables
1. In your Space, go to "Settings" tab
2. Scroll to "Variables and secrets"
3. Add these secrets:

```
DATABASE_URL = sqlite+aiosqlite:///./data/todo.db
JWT_SECRET_KEY = apni-secret-key-yahan-dale-minimum-32-characters
JWT_ALGORITHM = HS256
ACCESS_TOKEN_EXPIRE_DAYS = 7
ALLOWED_ORIGINS = ["*"]
```

**Important**: JWT_SECRET_KEY generate karne ke liye:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 4: Wait for Build
- Space automatically build hoga
- Build logs check karein
- 3-5 minutes me ready ho jayega

### Step 5: Test Your API
Your backend will be live at:
```
https://YOUR_USERNAME-todo-app-backend.hf.space
```

Test endpoints:
- **API Docs**: https://YOUR_USERNAME-todo-app-backend.hf.space/docs
- **Health Check**: https://YOUR_USERNAME-todo-app-backend.hf.space/
- **Register**: POST to /api/auth/register

## 🔧 Important Configuration

### For PostgreSQL (Optional):
If you want to use PostgreSQL instead of SQLite:

1. Sign up at https://neon.tech (free)
2. Create database
3. Update environment variable:
```
DATABASE_URL = postgresql+asyncpg://user:pass@host/dbname?sslmode=require
```

### For CORS (Frontend Integration):
Update ALLOWED_ORIGINS to include your frontend URL:
```
ALLOWED_ORIGINS = ["https://your-frontend.vercel.app", "http://localhost:3000"]
```

## 🐛 Troubleshooting

### Build Fails
- Check Dockerfile syntax
- Verify all files uploaded correctly
- Check build logs in Space

### Database Issues
- Make sure `/app/data` directory is created
- Check DATABASE_URL format
- Verify migrations run successfully

### Port Issues
- Hugging Face Spaces uses port **7860**
- Make sure Dockerfile exposes this port
- Uvicorn should listen on `0.0.0.0:7860`

## 📝 Testing Your Deployed API

```bash
# Register a user
curl -X POST "https://YOUR_SPACE.hf.space/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "test123"}'

# Login
curl -X POST "https://YOUR_SPACE.hf.space/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "test123"}'

# Copy the token from response, then create task
curl -X POST "https://YOUR_SPACE.hf.space/api/tasks" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "description": "My first task"}'
```

## 🎉 Success!

Agar sab kuch sahi se ho gaya to:
- ✅ API `/docs` pe Swagger UI show ho rahi hogi
- ✅ Register/Login endpoints kaam kar rahe honge
- ✅ Tasks create/read/update/delete ho rahe honge
- ✅ Database persist ho raha hoga

## 📚 Next Steps

1. **Frontend Integration**: Frontend me `NEXT_PUBLIC_API_URL` update karo
2. **Custom Domain**: Hugging Face Space me custom domain add karo (optional)
3. **Monitoring**: Space logs regularly check karo
4. **Backups**: Agar PostgreSQL use kar rahe ho to backups enable karo

---

Good luck! 🚀
