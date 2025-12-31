# Todo App Backend - FastAPI

A production-ready REST API for multi-user todo application built with FastAPI, SQLModel, and JWT authentication.

## 🚀 Features

- **User Authentication** - JWT-based registration and login
- **Task Management** - Full CRUD operations for tasks
- **User Isolation** - Each user sees only their own tasks
- **Auto-generated API Docs** - Interactive Swagger UI at `/docs`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Tasks
- `GET /api/tasks` - Get all user's tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get specific task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PATCH /api/tasks/{id}/toggle` - Toggle task completion

## 🔧 Environment Variables

Set these in Hugging Face Spaces Settings:

```env
DATABASE_URL=sqlite+aiosqlite:///./data/todo.db
JWT_SECRET_KEY=your-secret-key-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
ALLOWED_ORIGINS=["*"]
```

## 📖 Usage

### Register a User
```bash
curl -X POST "https://your-space.hf.space/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "password123"}'
```

### Login
```bash
curl -X POST "https://your-space.hf.space/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "password123"}'
```

### Create Task (with token)
```bash
curl -X POST "https://your-space.hf.space/api/tasks" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "description": "Task details"}'
```

## 🛠️ Technology Stack

- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **Pydantic** - Data validation
- **JWT** - Secure authentication
- **SQLite/PostgreSQL** - Database options
- **Alembic** - Database migrations

## 📚 API Documentation

Once deployed, visit:
- **Swagger UI**: `https://your-space.hf.space/docs`
- **ReDoc**: `https://your-space.hf.space/redoc`

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens with configurable expiration
- CORS protection
- User data isolation

## 📄 License

MIT License - Feel free to use for learning and projects!

---

Built with FastAPI | Deployed on Hugging Face Spaces
