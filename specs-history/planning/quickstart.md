# Quickstart Guide: Phase I - Python Console Todo App

**Date**: 2025-12-28
**Target**: Developers setting up and running the Phase I console application
**Prerequisites**: Python 3.13+, UV package manager installed

## Installation

### 1. Install UV (if not already installed)

**macOS/Linux**:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows**:
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Verify Installation**:
```bash
uv --version
# Expected output: uv 0.x.x (or newer)
```

### 2. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
git checkout 001-python-console-todo
```

### 3. Initialize UV Project (First Time Only)

If the project is not yet initialized:

```bash
uv init
```

This creates `pyproject.toml` and sets up the Python environment.

### 4. Verify Python Version

```bash
uv run python --version
# Expected output: Python 3.13.x (or newer)
```

## Running the Application

### Quick Run

From the project root directory:

```bash
uv run python src/main.py
```

This will:
1. Automatically resolve dependencies (if any)
2. Launch the console todo application
3. Display the main menu

### Expected Output

```text
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
Select an option (1-6): _
```

## Usage Examples

### Example Session: Adding and Viewing Tasks

```text
Select an option (1-6): 1

--- Add New Task ---
Enter task title: Buy groceries
Enter task description (optional, press Enter to skip): Milk, bread, eggs

✓ Task added successfully!
  ID: 1
  Title: Buy groceries
  Description: Milk, bread, eggs
  Status: Incomplete

Press Enter to continue...

[User presses Enter]

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
Select an option (1-6): 2

--- All Tasks ---

[1] Buy groceries - Milk, bread, eggs [Incomplete]
    Created: 2025-12-28 10:30:15

Total: 1 task (0 complete, 1 incomplete)

Press Enter to continue...
```

### Example Session: Marking Task Complete

```text
Select an option (1-6): 5

--- Mark Task ---
Enter task ID: 1

✓ Task marked as Complete!
  [1] Buy groceries [Complete]

Press Enter to continue...
```

### Example Session: Exiting

```text
Select an option (1-6): 6

=============================
   Thanks for using Todo App!
   All data will be lost.
=============================
```

## Testing the 5 Core Features

Follow this test script to verify all constitutional features work correctly:

### Test Script

1. **Start the application**:
   ```bash
   uv run python src/main.py
   ```

2. **Feature 1: Add Task (with description)**
   - Select option `1`
   - Title: `Write project README`
   - Description: `Include setup instructions and examples`
   - ✓ Verify: Task created with ID 1, status Incomplete

3. **Feature 1: Add Task (without description)**
   - Select option `1`
   - Title: `Call dentist`
   - Description: [Press Enter to skip]
   - ✓ Verify: Task created with ID 2, no description

4. **Feature 2: View All Tasks**
   - Select option `2`
   - ✓ Verify: Both tasks displayed with IDs, titles, statuses
   - ✓ Verify: Total count shows 2 tasks (0 complete, 2 incomplete)

5. **Feature 5: Mark Task Complete**
   - Select option `5`
   - Enter ID: `2`
   - ✓ Verify: Task 2 status changed to "Complete"

6. **Feature 2: View All Tasks (again)**
   - Select option `2`
   - ✓ Verify: Task 2 shows [Complete], Task 1 shows [Incomplete]
   - ✓ Verify: Total count shows (1 complete, 1 incomplete)

7. **Feature 3: Update Task**
   - Select option `3`
   - Enter ID: `1`
   - New title: `Write comprehensive README`
   - New description: [Press Enter to keep current]
   - ✓ Verify: Title updated, description unchanged, status preserved

8. **Feature 4: Delete Task**
   - Select option `4`
   - Enter ID: `2`
   - ✓ Verify: Task 2 deleted successfully

9. **Feature 2: View All Tasks (final check)**
   - Select option `2`
   - ✓ Verify: Only Task 1 remains

10. **Exit**
    - Select option `6`
    - ✓ Verify: Graceful exit with goodbye message

11. **Restart and Verify Data Loss**
    - Run `uv run python src/main.py` again
    - Select option `2`
    - ✓ Verify: "No tasks found" message (data was in-memory only)

## Troubleshooting

### Issue: "uv: command not found"

**Solution**: UV is not installed or not in PATH.

- Reinstall UV using installation commands above
- Restart terminal to refresh PATH
- Verify: `uv --version`

### Issue: "Python 3.13 not found"

**Solution**: UV will automatically download Python 3.13+ if not available.

If this fails:
```bash
# Manually install Python 3.13+
# Then force UV to use it
uv python pin 3.13
```

### Issue: "ModuleNotFoundError"

**Solution**: Ensure you're running from the project root and using `uv run`:

```bash
# Correct (from project root):
uv run python src/main.py

# Incorrect:
python src/main.py  # Missing UV environment
cd src && uv run python main.py  # Wrong directory
```

### Issue: Application doesn't start or crashes

**Solution**: Check Python file structure:

```bash
ls -R src/
# Expected:
# src/main.py
# src/models/task.py
# src/services/todo_manager.py
# src/ui/console_ui.py
# src/utils/validators.py
```

If any files are missing, implementation is incomplete.

### Issue: "Data persists after restart"

**Problem**: Phase I MUST use in-memory storage only.

**Solution**: Verify no file I/O code exists in the implementation:
```bash
grep -r "open(" src/
grep -r "json.dump" src/
grep -r "pickle" src/
# Should return no results for Phase I
```

## Development Workflow

### Adding Dependencies (Future Phase II)

Phase I requires no external dependencies. For Phase II:

```bash
# Add runtime dependency
uv add <package-name>

# Add development dependency (e.g., pytest)
uv add --dev <package-name>

# Dependencies are recorded in pyproject.toml
```

### Code Structure Reference

```text
src/
├── models/
│   └── task.py              # Task dataclass with validation
├── services/
│   └── todo_manager.py      # Business logic (CRUD operations)
├── ui/
│   └── console_ui.py        # Menu and user interaction
├── utils/
│   └── validators.py        # Input validation functions
└── main.py                  # Entry point (run this)
```

### Running from Different Locations

**Always run from project root**:

```bash
# ✓ Correct
/path/to/project$ uv run python src/main.py

# ✗ Wrong
/path/to/project/src$ uv run python main.py
```

## Performance Expectations

Based on success criteria from specification:

- **Startup Time**: <2 seconds
- **All Operations**: <1 second (for up to 100 tasks)
- **Memory Usage**: <50MB for typical use

To verify:

```bash
# Linux/macOS
time uv run python src/main.py  # Check startup time

# Measure memory (macOS)
/usr/bin/time -l uv run python src/main.py
```

## Next Steps

After successfully running and testing:

1. **Verify all 5 features** using the test script above
2. **Report issues** if any feature doesn't work as expected
3. **Push to GitHub** once demo is successful
4. **Prepare for Phase II** (Next.js + FastAPI evolution)

## Phase II Preview

Phase I code will be reused in Phase II:

- `Task` model → SQLModel for Neon Postgres
- `TodoManager` → FastAPI service layer
- Console UI → Next.js React components
- Validation → FastAPI request validation

Keep Phase I code clean and well-structured for easy evolution!
