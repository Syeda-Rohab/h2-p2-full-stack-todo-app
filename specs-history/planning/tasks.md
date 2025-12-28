---
description: "Task list for Phase I - Python Console Todo App implementation"
---

# Tasks: Phase I - Python Console Todo App

**Input**: Design documents from `specs-history/planning/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/console-interface.md, research.md, quickstart.md

**Tests**: Tests are NOT requested for Phase I. Manual console testing per quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, at repository root (Phase I structure)
- All paths shown below are from project root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize UV project with pyproject.toml at repository root
- [ ] T002 Create src/ directory structure (models/, services/, ui/, utils/)
- [ ] T003 Create pyproject.toml with project metadata (name: "todo-app", Python 3.13+)
- [ ] T004 [P] Create .gitignore for Python (*.pyc, __pycache__/, .env, etc.)
- [ ] T005 [P] Create README.md with UV setup instructions per quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create Task dataclass in src/models/task.py (id, title, description, status, created_at)
- [ ] T007 Add toggle_status() method to Task class in src/models/task.py
- [ ] T008 [P] Create validators module in src/utils/validators.py with validate_title() function
- [ ] T009 [P] Add validate_description() function to src/utils/validators.py
- [ ] T010 [P] Add validate_task_id() function to src/utils/validators.py
- [ ] T011 Create TodoManager class skeleton in src/services/todo_manager.py with __init__ (storage dict, next_id counter)
- [ ] T012 Create ConsoleUI class skeleton in src/ui/console_ui.py with __init__ (TodoManager dependency)
- [ ] T013 Add display_menu() method to ConsoleUI in src/ui/console_ui.py
- [ ] T014 Add get_user_choice() method with validation to ConsoleUI in src/ui/console_ui.py
- [ ] T015 Create main.py entry point that initializes TodoManager and ConsoleUI, starts main loop

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add New Todo Task (Priority: P1) 🎯 MVP

**Goal**: Users can add tasks with title and optional description, receiving confirmation with assigned ID

**Independent Test**: Run app, select "Add Task", enter title "Buy groceries" and description "Milk, bread, eggs", verify task created with ID 1 and status Incomplete

### Implementation for User Story 1

- [ ] T016 [US1] Implement add_task(title, description) method in src/services/todo_manager.py (validate, create Task, store, increment ID, return Task)
- [ ] T017 [US1] Add handle_add_task() method to ConsoleUI in src/ui/console_ui.py (prompt for title, prompt for description, call TodoManager.add_task, display confirmation)
- [ ] T018 [US1] Integrate handle_add_task() into main menu loop in src/ui/console_ui.py (option 1)
- [ ] T019 [US1] Add error handling for empty title in handle_add_task() (re-prompt until valid)
- [ ] T020 [US1] Add error handling for title >200 chars in handle_add_task() (display error, re-prompt)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (MVP achieved!)

---

## Phase 4: User Story 2 - View All Tasks (Priority: P2)

**Goal**: Users can see all tasks with ID, title, description, status, and creation time

**Independent Test**: Add 3 tasks (2 incomplete, 1 complete), select "View All Tasks", verify all 3 displayed with correct details and summary count

### Implementation for User Story 2

- [ ] T021 [US2] Implement get_all_tasks() method in src/services/todo_manager.py (return sorted list by created_at)
- [ ] T022 [US2] Add handle_view_tasks() method to ConsoleUI in src/ui/console_ui.py (call get_all_tasks, format output with task details)
- [ ] T023 [US2] Integrate handle_view_tasks() into main menu loop in src/ui/console_ui.py (option 2)
- [ ] T024 [US2] Add empty state message "No tasks found. Start by adding a task!" when no tasks exist
- [ ] T025 [US2] Add summary line showing total count and complete/incomplete breakdown

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently (users can add and view tasks)

---

## Phase 5: User Story 3 - Mark Complete/Incomplete (Priority: P3)

**Goal**: Users can toggle task status between Complete and Incomplete by task ID

**Independent Test**: Add a task, select "Mark Complete" with ID 1, verify status changes to Complete, then select "Mark Incomplete", verify status changes back

### Implementation for User Story 3

- [ ] T026 [US3] Implement get_task_by_id(task_id) helper method in src/services/todo_manager.py (return Task or None)
- [ ] T027 [US3] Implement toggle_task_status(task_id) method in src/services/todo_manager.py (validate ID exists, call task.toggle_status(), return success/failure)
- [ ] T028 [US3] Add handle_toggle_status() method to ConsoleUI in src/ui/console_ui.py (prompt for ID, call toggle_task_status, display new status)
- [ ] T029 [US3] Integrate handle_toggle_status() into main menu loop in src/ui/console_ui.py (option 5)
- [ ] T030 [US3] Add error handling for non-existent task ID (display "Task not found" message)
- [ ] T031 [US3] Add error handling for invalid ID format (non-numeric input, re-prompt)

**Checkpoint**: All core productivity features now work (add, view, mark complete)

---

## Phase 6: User Story 4 - Update Task Details (Priority: P4)

**Goal**: Users can update task title and/or description by task ID, preserving status and creation time

**Independent Test**: Add task, select "Update Task" with ID 1, change title to "New Title", verify title updated and description/status unchanged

### Implementation for User Story 4

- [ ] T032 [US4] Implement update_task(task_id, new_title, new_description) method in src/services/todo_manager.py (validate ID, validate inputs, update task fields, preserve status/created_at)
- [ ] T033 [US4] Add handle_update_task() method to ConsoleUI in src/ui/console_ui.py (prompt for ID, show current task, prompt for new title/description with "press Enter to keep current" option)
- [ ] T034 [US4] Integrate handle_update_task() into main menu loop in src/ui/console_ui.py (option 3)
- [ ] T035 [US4] Add error handling for non-existent task ID (display "Task not found" message)
- [ ] T036 [US4] Add error handling for empty new title (display "Title cannot be empty", cancel update)
- [ ] T037 [US4] Implement "keep current" logic (if user presses Enter without input, preserve existing value)

**Checkpoint**: All CRUD operations except Delete now functional

---

## Phase 7: User Story 5 - Delete Task (Priority: P5)

**Goal**: Users can permanently delete tasks by ID

**Independent Test**: Add 3 tasks, select "Delete Task" with ID 2, verify task 2 removed and remaining tasks (1, 3) still visible

### Implementation for User Story 5

- [ ] T038 [US5] Implement delete_task(task_id) method in src/services/todo_manager.py (validate ID exists, remove from storage, return success/deleted task)
- [ ] T039 [US5] Add handle_delete_task() method to ConsoleUI in src/ui/console_ui.py (prompt for ID, call delete_task, display confirmation with deleted task title)
- [ ] T040 [US5] Integrate handle_delete_task() into main menu loop in src/ui/console_ui.py (option 4)
- [ ] T041 [US5] Add error handling for non-existent task ID (display "Task not found. No task was deleted.")
- [ ] T042 [US5] Add error handling for invalid ID format (non-numeric input, re-prompt)

**Checkpoint**: All 5 constitutional features now complete and independently functional!

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T043 [P] Add exit functionality (option 6) to main menu loop in src/ui/console_ui.py with goodbye message
- [ ] T044 [P] Add keyboard interrupt (Ctrl+C) handling in main.py for graceful exit
- [ ] T045 [P] Add invalid menu choice error handling with clear message in ConsoleUI.get_user_choice()
- [ ] T046 [P] Add "Press Enter to continue..." prompts after each operation in ConsoleUI methods
- [ ] T047 [P] Format task display with visual separators (=====, -----) per console-interface contract
- [ ] T048 [P] Add success/error symbols (✓/✗) to console output messages
- [ ] T049 Update README.md with complete usage examples and test script from quickstart.md
- [ ] T050 Run complete manual test script from quickstart.md (all 5 features + data loss verification)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories (but benefits from US1 for testing)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Uses get_task_by_id() helper (no direct dependency)
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Uses get_task_by_id() helper (no direct dependency)
- **User Story 5 (P5)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Foundation tasks (Phase 2) must complete before any user story
- Tasks within a user story should be done in order (T016 → T017 → T018 → T019 → T020 for US1)
- get_task_by_id() helper (T026) is used by US3, US4, US5 but implemented in US3 phase

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T004, T005)
- All Foundational tasks marked [P] can run in parallel within their groups (T008, T009, T010 validation functions)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All Polish tasks marked [P] can run in parallel (T043-T048)

---

## Parallel Example: Foundational Phase

```bash
# Launch validation functions in parallel:
Task: "Create validators module in src/utils/validators.py with validate_title() function"
Task: "Add validate_description() function to src/utils/validators.py"
Task: "Add validate_task_id() function to src/utils/validators.py"
```

---

## Parallel Example: User Story 3

```bash
# Within User Story 3, tasks must run sequentially:
1. T026: Implement get_task_by_id() helper
2. T027: Implement toggle_task_status() using helper
3. T028: Add handle_toggle_status() UI method
4. T029: Integrate into menu
5. T030-T031: Add error handling

# But User Story 3 can run in parallel with User Story 4 and 5 (different files/features)
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T015) - CRITICAL
3. Complete Phase 3: User Story 1 - Add Task (T016-T020)
4. Complete Phase 4: User Story 2 - View Tasks (T021-T025)
5. **STOP and VALIDATE**: Test adding and viewing tasks independently
6. Deploy/demo if ready (minimal viable todo app)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP: can add tasks!)
3. Add User Story 2 → Test independently → Deploy/Demo (can add + view tasks!)
4. Add User Story 3 → Test independently → Deploy/Demo (can mark complete!)
5. Add User Story 4 → Test independently → Deploy/Demo (can update tasks!)
6. Add User Story 5 → Test independently → Deploy/Demo (full CRUD complete!)
7. Add Polish (Phase 8) → Final refinement → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Add Task)
   - Developer B: User Story 2 (View Tasks)
   - Developer C: User Story 3 (Mark Complete)
3. Stories complete and integrate independently
4. Remaining stories (US4, US5) assigned as capacity allows

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Phase I uses manual testing per quickstart.md (automated tests in Phase II)

---

## Task Summary

**Total Tasks**: 50 tasks across 8 phases

**Task Count Per Phase**:
- Phase 1 (Setup): 5 tasks
- Phase 2 (Foundational): 10 tasks ⚠️ BLOCKS all user stories
- Phase 3 (US1 - Add Task): 5 tasks 🎯 MVP
- Phase 4 (US2 - View Tasks): 5 tasks
- Phase 5 (US3 - Mark Complete): 6 tasks
- Phase 6 (US4 - Update Task): 6 tasks
- Phase 7 (US5 - Delete Task): 5 tasks
- Phase 8 (Polish): 8 tasks

**Parallel Opportunities**: 11 tasks marked [P] can run in parallel within their phases

**Independent Test Criteria**:
- US1: Add task → verify confirmation with ID
- US2: View tasks → verify all displayed with details
- US3: Toggle status → verify status changes
- US4: Update task → verify changes reflected
- US5: Delete task → verify task removed

**Suggested MVP Scope**: Phase 1 + 2 + 3 + 4 (Setup + Foundation + Add Task + View Tasks) = 25 tasks

**Constitutional Compliance**: All 50 tasks implement exactly 5 features (Add, View, Update, Delete, Mark), no additional features

**Format Validation**: ✅ All tasks follow checklist format with ID, [P]/[Story] labels where applicable, and file paths
