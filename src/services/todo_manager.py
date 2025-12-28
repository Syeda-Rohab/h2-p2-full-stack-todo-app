"""TodoManager service for managing todo tasks."""
from datetime import datetime
from typing import Optional
from src.models.task import Task
from src.utils.validators import validate_title, validate_description


class TodoManager:
    """Manages todo tasks with in-memory storage."""

    def __init__(self):
        """Initialize TodoManager with empty storage."""
        self.storage: dict[int, Task] = {}
        self.next_id: int = 1

    def add_task(self, title: str, description: str) -> Task:
        """
        Add a new task with title and description.

        Args:
            title: Task title (will be validated and stripped)
            description: Task description (will be validated and stripped)

        Returns:
            Created Task object

        Raises:
            ValueError: If validation fails
        """
        # Validate title
        is_valid_title, title_error = validate_title(title)
        if not is_valid_title:
            raise ValueError(title_error)

        # Validate description
        is_valid_desc, desc_error = validate_description(description)
        if not is_valid_desc:
            raise ValueError(desc_error)

        # Create task
        task = Task(
            id=self.next_id,
            title=title.strip(),
            description=description.strip(),
            status="Incomplete",
            created_at=datetime.now()
        )

        # Store task
        self.storage[self.next_id] = task
        self.next_id += 1

        return task

    def get_all_tasks(self) -> list[Task]:
        """
        Get all tasks sorted by creation time (oldest first).

        Returns:
            List of Task objects sorted by created_at
        """
        tasks = list(self.storage.values())
        tasks.sort(key=lambda t: t.created_at)
        return tasks

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id: Task ID to retrieve

        Returns:
            Task object if found, None otherwise
        """
        return self.storage.get(task_id)

    def toggle_task_status(self, task_id: int) -> tuple[bool, str, Optional[str]]:
        """
        Toggle task status between Complete and Incomplete.

        Args:
            task_id: ID of task to toggle

        Returns:
            (success: bool, message: str, new_status: Optional[str])
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return (False, "Task not found. Please check the ID and try again.", None)

        task.toggle_status()
        return (True, f"Task marked as {task.status}!", task.status)

    def update_task(self, task_id: int, new_title: str, new_description: str) -> tuple[bool, str]:
        """
        Update task title and/or description.

        Args:
            task_id: ID of task to update
            new_title: New title (empty string to keep current)
            new_description: New description (empty string to keep current)

        Returns:
            (success: bool, message: str)
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return (False, "Task not found. Please check the ID and try again.")

        # Update title if provided
        if new_title.strip():
            is_valid, error_msg = validate_title(new_title)
            if not is_valid:
                return (False, error_msg)
            task.title = new_title.strip()

        # Update description if provided
        if new_description.strip():
            is_valid, error_msg = validate_description(new_description)
            if not is_valid:
                return (False, error_msg)
            task.description = new_description.strip()
        elif new_description == "":  # Explicitly clear description
            # Allow clearing, but new_description must be explicitly empty
            pass

        return (True, "Task updated successfully!")

    def delete_task(self, task_id: int) -> tuple[bool, str, Optional[Task]]:
        """
        Delete a task by ID.

        Args:
            task_id: ID of task to delete

        Returns:
            (success: bool, message: str, deleted_task: Optional[Task])
        """
        task = self.get_task_by_id(task_id)
        if task is None:
            return (False, "Task not found. No task was deleted.", None)

        # Remove task from storage
        deleted_task = self.storage.pop(task_id)
        return (True, "Task deleted successfully!", deleted_task)
