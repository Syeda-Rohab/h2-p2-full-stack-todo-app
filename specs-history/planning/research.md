# Research: Phase I - Python Console Todo App

**Date**: 2025-12-28
**Feature**: Phase I Python Console CLI
**Purpose**: Resolve technical decisions and establish best practices for implementation

## Technology Decisions

### Decision 1: UV Package Manager Setup

**Decision**: Use UV for Python 3.13+ project initialization and dependency management with minimal external dependencies.

**Rationale**:
- UV is the constitutional requirement for Phase I
- Provides fast, reliable dependency resolution
- Supports Python 3.13+ which includes latest performance improvements
- Simpler alternative to Poetry/pip-tools for single-package projects
- No external dependencies needed for Phase I (pure Python standard library sufficient)

**Alternatives Considered**:
1. **Poetry**: More feature-rich but heavier; overkill for Phase I
2. **pip + requirements.txt**: Less robust dependency resolution; UV preferred per constitution
3. **pipenv**: Good but UV is faster and constitutionally mandated

**Implementation Details**:
```bash
# Project initialization
uv init todo-app
cd todo-app

# Add development dependencies (if needed for Phase II testing)
uv add --dev pytest  # Future Phase II use

# Run application
uv run python src/main.py
```

### Decision 2: Console UI Pattern

**Decision**: Menu-driven numbered selection with input validation and error recovery.

**Rationale**:
- Most intuitive for console applications (familiar UX pattern)
- Clear visual separation between menu and input/output
- Easy to test manually
- Supports error recovery without application restart
- Aligns with constitutional requirement for "user-friendly console UI"

**Alternatives Considered**:
1. **Command-line arguments (e.g., `todo add "Buy milk"`)**: Less interactive, harder for users to discover features
2. **REPL-style (e.g., `> add`, `> view`)**: More complex parsing, steeper learning curve
3. **Curses/TUI library**: Overkill for Phase I, adds dependency complexity

**Implementation Pattern**:
```text
===== Todo App Menu =====
1. Add Task
2. View All Tasks
3. Update Task
4. Delete Task
5. Mark Complete/Incomplete
6. Exit
=========================
Select an option (1-6): _
```

### Decision 3: Data Storage Structure

**Decision**: In-memory storage using Python dictionary with integer keys for O(1) task lookup.

**Rationale**:
- Fast lookups by ID: O(1) vs O(n) for list iteration
- Maintains task ID as unique identifier
- Simple to implement without external database
- Aligns with constitutional "in-memory (lost on restart)" requirement
- Supports up to 100 tasks efficiently (performance constraint from spec)

**Alternatives Considered**:
1. **List with linear search**: O(n) lookups, slower for ID-based operations
2. **JSON file persistence**: Violates Phase I in-memory requirement
3. **SQLite in-memory**: Overkill, adds dependency, unnecessary complexity

**Data Structure**:
```python
{
    1: Task(id=1, title="Buy groceries", description="Milk, eggs", status="Incomplete", created_at=datetime(...)),
    2: Task(id=2, title="Call plumber", description="", status="Complete", created_at=datetime(...)),
    # ...
}
```

**ID Generation**: Auto-increment counter starting at 1, incremented on each add.

### Decision 4: Input Validation Strategy

**Decision**: Centralized validation functions in `utils/validators.py` with clear error messages.

**Rationale**:
- DRY principle: Reusable validation logic
- Consistent error messaging across all features
- Easier to test and maintain
- Supports constitutional requirement for "input validation"
- Clear separation of concerns (validation separate from business logic)

**Alternatives Considered**:
1. **Inline validation in UI**: Duplicated code, hard to maintain
2. **Dataclass validators**: Good for model validation but doesn't cover user input edge cases
3. **Pydantic**: Powerful but adds external dependency; overkill for Phase I

**Validation Rules**:
- **Title**: Not empty, ≤200 characters, strip whitespace
- **Description**: Optional, ≤1000 characters, strip whitespace
- **Task ID**: Integer, >0, exists in storage
- **Menu choice**: Integer, within valid range (1-6)

**Error Handling**:
- Invalid input → Clear error message + prompt to re-enter
- Non-existent ID → "Task not found" + return to menu
- Empty required field → "Field cannot be empty" + prompt to re-enter

### Decision 5: Object-Oriented Design

**Decision**: Three-layer architecture with Task (model), TodoManager (service), ConsoleUI (presentation).

**Rationale**:
- Separation of concerns: Each class has single responsibility
- Testable: Business logic isolated from UI
- Maintainable: Changes to UI don't affect business logic
- Aligns with constitutional "proper OOP" requirement
- Facilitates Phase II evolution (TodoManager → FastAPI service layer)

**Alternatives Considered**:
1. **Procedural with functions**: Simpler but harder to extend and test
2. **Single class with all logic**: Violates single responsibility principle
3. **Over-engineered with repositories/interfaces**: Unnecessary abstraction for Phase I

**Class Responsibilities**:
- **Task**: Data entity with validation (immutable after creation except status/title/description)
- **TodoManager**: Business logic (CRUD operations, ID management, storage)
- **ConsoleUI**: Presentation (menu display, input collection, output formatting)

### Decision 6: Error Handling Philosophy

**Decision**: Graceful degradation with user-friendly messages; never crash on invalid input.

**Rationale**:
- Constitutional requirement: "validate all user inputs before processing"
- Success criteria: "100% of invalid inputs result in clear error messages rather than crashes"
- Better user experience: Users can recover from mistakes without restarting
- Professional software behavior: Robust error handling builds trust

**Alternatives Considered**:
1. **Fail-fast with exceptions**: Poor UX, forces application restart
2. **Silent failures**: Confusing, users don't know what went wrong
3. **Logging only**: Insufficient feedback for console application

**Error Handling Levels**:
1. **Input validation**: Catch at point of entry, prompt re-entry
2. **Business logic errors**: Return error messages to UI layer
3. **Unexpected errors**: Catch at top level, display generic error, return to menu

## Best Practices Research

### Python 3.13+ Features to Leverage

1. **Dataclasses**: Use `@dataclass` for Task model (simpler than manual `__init__`)
2. **Type Hints**: Add type annotations for better IDE support and self-documentation
3. **f-strings**: Modern string formatting for console output
4. **datetime**: Use `datetime` module for task creation timestamps

### UV Project Structure Best Practices

1. **pyproject.toml**: Centralize project metadata and dependencies
2. **src/ layout**: Avoid top-level packages, use src/ to prevent import issues
3. **No .env for Phase I**: All config is code-based (no secrets in Phase I)
4. **README.md**: Document UV setup commands (`uv init`, `uv run`)

### Console UI Best Practices

1. **Clear prompts**: Always indicate what input is expected
2. **Visual separators**: Use `=====` or `-----` to separate menu from output
3. **Consistent formatting**: Task display format consistent across all views
4. **Success confirmations**: Always confirm successful operations
5. **Empty state messaging**: Helpful message when no tasks exist

### Code Organization

1. **Single responsibility**: Each module/class has one clear purpose
2. **Minimal coupling**: UI doesn't know about storage details, TodoManager doesn't know about console I/O
3. **Dependency direction**: UI → TodoManager → Task (never reverse)
4. **No circular imports**: Careful module organization to prevent import cycles

## Implementation Guidelines

### Task Model Design

```python
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Task:
    id: int
    title: str
    description: str
    status: str  # "Complete" or "Incomplete"
    created_at: datetime

    def toggle_status(self) -> None:
        """Toggle between Complete and Incomplete"""
        self.status = "Complete" if self.status == "Incomplete" else "Incomplete"
```

### TodoManager Service Design

**Key Methods**:
- `add_task(title: str, description: str) -> Task`
- `get_all_tasks() -> list[Task]`
- `get_task_by_id(task_id: int) -> Optional[Task]`
- `update_task(task_id: int, title: str, description: str) -> bool`
- `delete_task(task_id: int) -> bool`
- `toggle_task_status(task_id: int) -> bool`

### ConsoleUI Design

**Key Methods**:
- `display_menu() -> None`
- `get_user_choice() -> int`
- `handle_add_task() -> None`
- `handle_view_tasks() -> None`
- `handle_update_task() -> None`
- `handle_delete_task() -> None`
- `handle_toggle_status() -> None`
- `run() -> None`  # Main loop

### Validation Utils Design

**Key Functions**:
- `validate_title(title: str) -> tuple[bool, str]`  # Returns (is_valid, error_message)
- `validate_description(desc: str) -> tuple[bool, str]`
- `validate_task_id(id_str: str) -> tuple[bool, int, str]`  # Returns (is_valid, parsed_id, error_message)
- `validate_menu_choice(choice_str: str, max_choice: int) -> tuple[bool, int, str]`

## Open Questions (None)

All technical decisions resolved. No blockers for implementation.

## Next Steps

1. Proceed to Phase 1: Generate data-model.md
2. Create quickstart.md with UV setup and run instructions
3. Ready for `/sp.tasks` to generate implementation task breakdown
