# Data Model: Phase I - Python Console Todo App

**Date**: 2025-12-28
**Feature**: Phase I Python Console CLI
**Purpose**: Define the Task entity structure and validation rules

## Entity: Task

### Overview

The Task entity represents a single todo item with a unique identifier, title, optional description, completion status, and creation timestamp. Tasks are stored in-memory using a dictionary with integer IDs as keys.

### Attributes

| Attribute | Type | Required | Constraints | Default | Description |
|-----------|------|----------|-------------|---------|-------------|
| `id` | int | Yes | >0, unique | Auto-generated | Unique numeric identifier, auto-incremented starting from 1 |
| `title` | str | Yes | 1-200 chars, non-empty after strip | None | Short description of what needs to be done |
| `description` | str | No | 0-1000 chars | "" (empty string) | Detailed information about the task |
| `status` | str | Yes | "Complete" or "Incomplete" | "Incomplete" | Completion state of the task |
| `created_at` | datetime | Yes | Valid datetime | `datetime.now()` | Timestamp when task was created |

### Validation Rules

#### Title Validation
- **Not Empty**: After stripping whitespace, title must have at least 1 character
- **Length Limit**: Maximum 200 characters (inclusive)
- **Whitespace Handling**: Leading/trailing whitespace automatically stripped
- **Special Characters**: All unicode characters allowed including emojis
- **Error Message**: "Title cannot be empty" or "Title exceeds 200 characters"

#### Description Validation
- **Optional**: Empty string is valid
- **Length Limit**: Maximum 1000 characters (inclusive)
- **Whitespace Handling**: Leading/trailing whitespace automatically stripped
- **Special Characters**: All unicode characters allowed
- **Error Message**: "Description exceeds 1000 characters"

#### Status Validation
- **Valid Values**: Exactly "Complete" or "Incomplete" (case-sensitive)
- **No Custom Values**: Only these two states allowed
- **Default**: All new tasks start as "Incomplete"

#### ID Validation
- **Auto-Generated**: Never manually set by users during creation
- **Sequential**: Increments from 1 (1, 2, 3, ...)
- **Permanent**: Once assigned, IDs never change or reused
- **For Operations**: Users provide ID for update/delete/toggle operations
- **Validation**: Must be positive integer and exist in storage

### State Transitions

```
[Create Task]
     ↓
[Incomplete] ←→ [Complete]  (toggle_status method)
     ↓
[Delete Task]
```

**Allowed Transitions**:
1. **Create**: → Incomplete (default status)
2. **Toggle**: Incomplete ↔ Complete (bidirectional)
3. **Update**: Any status → Same status (status preserved during title/description updates)
4. **Delete**: Any status → Removed from storage

### Relationships

**Phase I**: No relationships (single entity)

**Phase II Evolution**: Task will gain `user_id` foreign key relationship to User entity for multi-user support.

## Storage Structure

### In-Memory Dictionary

```python
# Dictionary with integer keys (task IDs) and Task values
storage: dict[int, Task] = {
    1: Task(id=1, title="Buy groceries", description="Milk, bread, eggs",
            status="Incomplete", created_at=datetime(2025, 12, 28, 10, 30)),
    2: Task(id=2, title="Call plumber", description="",
            status="Complete", created_at=datetime(2025, 12, 28, 9, 15)),
    3: Task(id=3, title="Finish project", description="Complete Phase I implementation",
            status="Incomplete", created_at=datetime(2025, 12, 28, 11, 00)),
}

# Auto-increment counter for next ID
next_id: int = 4
```

### Rationale for Dictionary Storage

1. **O(1) Lookup**: Fast task retrieval by ID vs O(n) list search
2. **Unique IDs**: Dictionary keys enforce uniqueness
3. **Deletion**: Easy removal without index shifting (unlike lists)
4. **Iteration**: `storage.values()` provides all tasks for viewing
5. **Memory Efficient**: For up to 100 tasks, memory overhead is negligible

## Task Lifecycle

### Creation Flow

```
User Input (title, description)
    ↓
Validate title (not empty, ≤200 chars)
    ↓
Validate description (≤1000 chars)
    ↓
Generate unique ID (auto-increment)
    ↓
Create Task(id, title, description, status="Incomplete", created_at=now())
    ↓
Store in dictionary[id] = task
    ↓
Return task to user
```

### Update Flow

```
User Input (task_id, new_title, new_description)
    ↓
Validate task_id exists
    ↓
Validate new_title (not empty, ≤200 chars)
    ↓
Validate new_description (≤1000 chars)
    ↓
Retrieve task from dictionary[task_id]
    ↓
Update task.title = new_title
Update task.description = new_description
(Preserve task.id, task.status, task.created_at)
    ↓
Return success
```

### Toggle Status Flow

```
User Input (task_id)
    ↓
Validate task_id exists
    ↓
Retrieve task from dictionary[task_id]
    ↓
task.toggle_status()
    ↓
Return new status
```

### Deletion Flow

```
User Input (task_id)
    ↓
Validate task_id exists
    ↓
Remove dictionary[task_id]
    ↓
Return success
```

### View All Flow

```
User requests all tasks
    ↓
Retrieve all values from dictionary.values()
    ↓
Sort by created_at (oldest first)
    ↓
Return sorted list
```

## Python Implementation

### Task Dataclass

```python
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Task:
    """
    Represents a single todo task.

    Attributes:
        id: Unique positive integer identifier (auto-generated)
        title: Short task description (1-200 chars, required)
        description: Detailed task information (0-1000 chars, optional)
        status: Completion state ("Complete" or "Incomplete")
        created_at: Task creation timestamp
    """
    id: int
    title: str
    description: str
    status: str
    created_at: datetime

    def toggle_status(self) -> None:
        """Toggle task status between Complete and Incomplete."""
        self.status = "Complete" if self.status == "Incomplete" else "Incomplete"

    def __str__(self) -> str:
        """Human-readable task representation for console display."""
        desc_preview = f" - {self.description[:50]}..." if len(self.description) > 50 else f" - {self.description}" if self.description else ""
        return f"[{self.id}] {self.title}{desc_preview} [{self.status}]"
```

### Validation Functions

```python
def validate_title(title: str) -> tuple[bool, str]:
    """
    Validate task title.

    Returns:
        (True, "") if valid
        (False, error_message) if invalid
    """
    stripped = title.strip()
    if not stripped:
        return (False, "Title cannot be empty")
    if len(stripped) > 200:
        return (False, "Title exceeds 200 characters")
    return (True, "")

def validate_description(description: str) -> tuple[bool, str]:
    """
    Validate task description.

    Returns:
        (True, "") if valid
        (False, error_message) if invalid
    """
    stripped = description.strip()
    if len(stripped) > 1000:
        return (False, "Description exceeds 1000 characters")
    return (True, "")
```

## Data Constraints Summary

| Constraint | Value | Enforcement |
|------------|-------|-------------|
| Max tasks in memory | 100 (soft limit for performance) | Not enforced, but tested up to 100 |
| Task ID range | 1 to ∞ | Auto-increment, never reused |
| Title min length | 1 character (after strip) | Validation function |
| Title max length | 200 characters | Validation function |
| Description min length | 0 (optional) | None required |
| Description max length | 1000 characters | Validation function |
| Status values | "Complete", "Incomplete" only | Enforced by toggle logic |
| Data persistence | None (lost on restart) | In-memory only |

## Phase II Evolution Notes

When transitioning to Phase II (FastAPI backend with Neon Postgres):

1. **Add user_id field**: `user_id: int` (foreign key to users table)
2. **SQLModel migration**: Convert `@dataclass` to `SQLModel` class
3. **Database schema**: Map to `tasks` table with columns (id, user_id, title, description, status, created_at)
4. **Validation**: Reuse validation logic in FastAPI endpoints
5. **Business logic**: TodoManager methods become FastAPI service layer
6. **Timestamps**: Add `updated_at` field for audit trail

The current Task model design intentionally mirrors future database structure to minimize Phase II refactoring.
