# Todo App - Phase I

A simple in-memory Python console todo application with 5 core features.

## Features

1. **Add Task** - Create new tasks with title and optional description
2. **View All Tasks** - Display all tasks with their status
3. **Update Task** - Modify task details by ID
4. **Delete Task** - Remove tasks by ID
5. **Mark Complete/Incomplete** - Toggle task completion status

## Requirements

- Python 3.13+
- UV package manager

## Setup

### Install UV

**macOS/Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows:**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Run the Application

From the project root:

```bash
uv run python main.py
```

Or simply:

```bash
uv run main.py
```

## Usage

The application presents a menu-driven interface:

```
=============================
      Todo App - Phase I
=============================

1. Add Task
2. View All Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit

=============================
Select an option (1-6):
```

## Data Persistence

**Important**: All task data is stored in memory and will be lost when the application exits. This is intentional for Phase I.

## Project Structure

```
src/
├── models/        # Task entity
├── services/      # Business logic
├── ui/            # Console interface
├── utils/         # Input validation
└── main.py        # Entry point
```

## Phase Evolution

This is Phase I of a three-phase project:
- **Phase I** (Current): In-memory console CLI
- **Phase II** (Future): Full-stack web app (Next.js + FastAPI + Postgres)
- **Phase III** (Future): AI chatbot interface with MCP server
