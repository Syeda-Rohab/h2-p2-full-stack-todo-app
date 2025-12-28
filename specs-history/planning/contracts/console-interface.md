# Console Interface Contract: Phase I Todo App

**Date**: 2025-12-28
**Interface Type**: Console Menu-Driven CLI
**Purpose**: Define exact input/output formats for user interactions

## Menu Interface

### Main Menu Display

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

**Contract**:
- Menu displays after every operation (except Exit)
- User input: Integer from 1-6
- Invalid input: Display error and re-prompt

## Feature Contracts

### 1. Add Task

**Input Flow**:
```text
Select an option (1-6): 1

--- Add New Task ---
Enter task title: _
```

User enters title, presses Enter.

```text
Enter task description (optional, press Enter to skip): _
```

User enters description or presses Enter to skip.

**Success Output**:
```text
✓ Task added successfully!
  ID: 3
  Title: Buy groceries
  Description: Milk, bread, eggs
  Status: Incomplete

Press Enter to continue...
```

**Error Output (Empty Title)**:
```text
✗ Error: Title cannot be empty
Please try again.

Enter task title: _
```

**Error Output (Title Too Long)**:
```text
✗ Error: Title exceeds 200 characters
Please try again.

Enter task title: _
```

**Contract**:
- Title is required (re-prompt if empty after strip)
- Description is optional (empty string if skipped)
- Display confirmation with all task details
- Auto-assign unique ID
- Default status: "Incomplete"

---

### 2. View All Tasks

**Input Flow**:
```text
Select an option (1-6): 2
```

**Output (Tasks Exist)**:
```text
--- All Tasks ---

[1] Buy groceries - Milk, bread, eggs [Incomplete]
    Created: 2025-12-28 10:30:15

[2] Call plumber [Complete]
    Created: 2025-12-28 09:15:42

[3] Finish project - Complete Phase I implementation [Incomplete]
    Created: 2025-12-28 11:00:03

Total: 3 tasks (1 complete, 2 incomplete)

Press Enter to continue...
```

**Output (No Tasks)**:
```text
--- All Tasks ---

No tasks found. Start by adding a task!

Press Enter to continue...
```

**Contract**:
- Display all tasks sorted by created_at (oldest first)
- Show: [ID] Title - Description [Status]
- Include creation timestamp
- Show summary: Total count and complete/incomplete breakdown
- Truncate long descriptions if needed (show full in individual view)

---

### 3. Update Task

**Input Flow**:
```text
Select an option (1-6): 3

--- Update Task ---
Enter task ID to update: _
```

User enters ID (e.g., 2).

**Success Flow (Task Found)**:
```text
Current task:
  [2] Call plumber [Complete]

Enter new title (or press Enter to keep current): _
```

User enters new title or presses Enter.

```text
Enter new description (or press Enter to keep current): _
```

User enters new description or presses Enter.

**Success Output**:
```text
✓ Task updated successfully!
  ID: 2
  Title: Call plumber - urgent
  Description: Fix kitchen sink leak
  Status: Complete (unchanged)

Press Enter to continue...
```

**Error Output (Task Not Found)**:
```text
✗ Error: Task not found. Please check the ID and try again.

Press Enter to continue...
```

**Error Output (Invalid ID)**:
```text
✗ Error: Invalid ID format. Please enter a positive number.

Enter task ID to update: _
```

**Contract**:
- Validate ID exists before showing current task
- Allow keeping current values (press Enter to skip)
- Preserve status and created_at timestamp
- Display updated task details
- Handle non-numeric input gracefully

---

### 4. Delete Task

**Input Flow**:
```text
Select an option (1-6): 4

--- Delete Task ---
Enter task ID to delete: _
```

User enters ID (e.g., 3).

**Success Output**:
```text
✓ Task deleted successfully!
  Deleted: [3] Finish project

Press Enter to continue...
```

**Error Output (Task Not Found)**:
```text
✗ Error: Task not found. No task was deleted.

Press Enter to continue...
```

**Error Output (Invalid ID)**:
```text
✗ Error: Invalid ID format. Please enter a positive number.

Enter task ID to delete: _
```

**Contract**:
- Validate ID exists before deletion
- Permanent deletion (no undo)
- Show deleted task title in confirmation
- Handle non-numeric input gracefully

---

### 5. Mark Complete/Incomplete

**Input Flow**:
```text
Select an option (1-6): 5

--- Mark Task ---
Enter task ID: _
```

User enters ID (e.g., 1).

**Success Output (Marked Complete)**:
```text
✓ Task marked as Complete!
  [1] Buy groceries [Complete]

Press Enter to continue...
```

**Success Output (Marked Incomplete)**:
```text
✓ Task marked as Incomplete!
  [1] Buy groceries [Incomplete]

Press Enter to continue...
```

**Error Output (Task Not Found)**:
```text
✗ Error: Task not found. Please check the ID and try again.

Press Enter to continue...
```

**Contract**:
- Toggle behavior: Complete → Incomplete, Incomplete → Complete
- Display new status in confirmation
- Validate ID exists
- Handle non-numeric input gracefully

---

### 6. Exit

**Input Flow**:
```text
Select an option (1-6): 6
```

**Output**:
```text
=============================
   Thanks for using Todo App!
   All data will be lost.
=============================
```

**Contract**:
- Graceful exit (no error/exception)
- Reminder that data is lost (in-memory only)
- No confirmation prompt (direct exit)

## Error Handling Contract

### Invalid Menu Choice

**Input**: User enters 0, 7, -1, "abc", etc.

**Output**:
```text
✗ Error: Invalid choice. Please enter a number between 1 and 6.

Select an option (1-6): _
```

### Keyboard Interrupt (Ctrl+C)

**Output**:
```text

Exiting...
=============================
   Thanks for using Todo App!
   All data will be lost.
=============================
```

**Contract**:
- Catch KeyboardInterrupt gracefully
- Display exit message (same as option 6)
- Clean termination (no stack trace)

### Unexpected Errors

**Output**:
```text
✗ An unexpected error occurred. Returning to main menu.

Press Enter to continue...
```

**Contract**:
- Never crash the application
- Log error details (for debugging)
- Return user to main menu
- Generic message (don't expose technical details)

## Display Formatting Standards

### Symbols

- Success: `✓`
- Error: `✗`
- Separator: `---` (3 dashes)
- Section separator: `=============================` (29 equals signs)

### Text Formatting

- **Headers**: Centered between separators
- **Labels**: Bold or uppercase (depending on terminal support)
- **Task Display**: `[ID] Title - Description [Status]`
- **Timestamps**: ISO format with time: `2025-12-28 10:30:15`

### Spacing

- One blank line before/after section headers
- One blank line before "Press Enter to continue..."
- No extra blank lines in task listings

### Input Prompts

- Always end with `: ` (colon + space)
- Cursor positioned after space
- Clear indication of what input is expected

## Phase II Evolution

When transitioning to REST API (Phase II):

| Console Feature | REST Endpoint | HTTP Method |
|-----------------|---------------|-------------|
| Add Task | `POST /api/{user_id}/tasks` | POST |
| View All Tasks | `GET /api/{user_id}/tasks` | GET |
| Update Task | `PUT /api/{user_id}/tasks/{task_id}` | PUT |
| Delete Task | `DELETE /api/{user_id}/tasks/{task_id}` | DELETE |
| Mark Complete/Incomplete | `PATCH /api/{user_id}/tasks/{task_id}/status` | PATCH |

Each console interaction maps to a single API call, facilitating smooth Phase II transition.
