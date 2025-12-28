"""Console user interface for todo application."""
from src.services.todo_manager import TodoManager
from src.utils.validators import validate_task_id


class ConsoleUI:
    """Console-based user interface for todo app."""

    def __init__(self, todo_manager: TodoManager):
        """
        Initialize ConsoleUI with TodoManager dependency.

        Args:
            todo_manager: TodoManager instance for business logic
        """
        self.todo_manager = todo_manager

    def display_menu(self) -> None:
        """Display the main menu."""
        print("\n" + "=" * 29)
        print("      Todo App - Phase I")
        print("=" * 29)
        print()
        print("1. Add Task")
        print("2. View All Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Mark Complete/Incomplete")
        print("6. Exit")
        print()
        print("=" * 29)

    def get_user_choice(self) -> int:
        """
        Get and validate user menu choice.

        Returns:
            Valid menu choice (1-6)
        """
        while True:
            choice_str = input("Select an option (1-6): ")
            try:
                choice = int(choice_str)
                if 1 <= choice <= 6:
                    return choice
                else:
                    print("✗ Error: Invalid choice. Please enter a number between 1 and 6.")
            except ValueError:
                print("✗ Error: Invalid choice. Please enter a number between 1 and 6.")

    def handle_add_task(self) -> None:
        """Handle adding a new task."""
        print("\n--- Add New Task ---")

        # Get title with validation
        while True:
            title = input("Enter task title: ")
            if not title.strip():
                print("✗ Error: Title cannot be empty")
                print("Please try again.\n")
                continue
            if len(title.strip()) > 200:
                print("✗ Error: Title exceeds 200 characters")
                print("Please try again.\n")
                continue
            break

        # Get description (optional)
        description = input("Enter task description (optional, press Enter to skip): ")

        # Validate description length
        if description.strip() and len(description.strip()) > 1000:
            print("✗ Error: Description exceeds 1000 characters")
            print("Task not created.")
            input("\nPress Enter to continue...")
            return

        # Add task
        try:
            task = self.todo_manager.add_task(title, description)
            print(f"\n✓ Task added successfully!")
            print(f"  ID: {task.id}")
            print(f"  Title: {task.title}")
            print(f"  Description: {task.description if task.description else '(none)'}")
            print(f"  Status: {task.status}")
        except ValueError as e:
            print(f"\n✗ Error: {e}")

        input("\nPress Enter to continue...")

    def handle_view_tasks(self) -> None:
        """Handle viewing all tasks."""
        print("\n--- All Tasks ---\n")

        tasks = self.todo_manager.get_all_tasks()

        if not tasks:
            print("No tasks found. Start by adding a task!")
        else:
            for task in tasks:
                print(f"{task}")
                print(f"    Created: {task.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
                print()

            # Summary
            total = len(tasks)
            complete_count = sum(1 for t in tasks if t.status == "Complete")
            incomplete_count = total - complete_count

            print(f"Total: {total} task{'s' if total != 1 else ''} "
                  f"({complete_count} complete, {incomplete_count} incomplete)")

        input("\nPress Enter to continue...")

    def handle_toggle_status(self) -> None:
        """Handle toggling task status."""
        print("\n--- Mark Task ---")

        # Get task ID
        while True:
            id_str = input("Enter task ID: ")
            is_valid, task_id, error_msg = validate_task_id(id_str)

            if not is_valid:
                print(f"✗ Error: {error_msg}")
                print()
                continue

            # Try to toggle
            success, message, new_status = self.todo_manager.toggle_task_status(task_id)

            if success:
                # Get task for display
                task = self.todo_manager.get_task_by_id(task_id)
                print(f"\n✓ {message}")
                print(f"  {task}")
            else:
                print(f"\n✗ Error: {message}")

            break

        input("\nPress Enter to continue...")

    def handle_update_task(self) -> None:
        """Handle updating a task."""
        print("\n--- Update Task ---")

        # Get task ID
        while True:
            id_str = input("Enter task ID to update: ")
            is_valid, task_id, error_msg = validate_task_id(id_str)

            if not is_valid:
                print(f"✗ Error: {error_msg}")
                print()
                continue

            # Check if task exists
            task = self.todo_manager.get_task_by_id(task_id)
            if task is None:
                print("\n✗ Error: Task not found. Please check the ID and try again.")
                input("\nPress Enter to continue...")
                return

            # Show current task
            print(f"\nCurrent task:")
            print(f"  {task}")
            print()

            # Get new title
            new_title = input("Enter new title (or press Enter to keep current): ")

            # If user provides a new title, validate it's not empty
            if new_title.strip() and not new_title.strip():
                print("\n✗ Error: Title cannot be empty")
                print("Update cancelled.")
                input("\nPress Enter to continue...")
                return

            # Get new description
            new_description = input("Enter new description (or press Enter to keep current): ")

            # Implement "keep current" logic
            if not new_title.strip():
                new_title = task.title  # Keep current title
            if not new_description.strip():
                new_description = task.description  # Keep current description

            # Update task
            success, message = self.todo_manager.update_task(task_id, new_title, new_description)

            if success:
                updated_task = self.todo_manager.get_task_by_id(task_id)
                print(f"\n✓ {message}")
                print(f"  ID: {updated_task.id}")
                print(f"  Title: {updated_task.title}")
                print(f"  Description: {updated_task.description if updated_task.description else '(none)'}")
                print(f"  Status: {updated_task.status} (unchanged)")
            else:
                print(f"\n✗ Error: {message}")

            break

        input("\nPress Enter to continue...")

    def handle_delete_task(self) -> None:
        """Handle deleting a task."""
        print("\n--- Delete Task ---")

        # Get task ID
        while True:
            id_str = input("Enter task ID to delete: ")
            is_valid, task_id, error_msg = validate_task_id(id_str)

            if not is_valid:
                print(f"✗ Error: {error_msg}")
                print()
                continue

            # Try to delete
            success, message, deleted_task = self.todo_manager.delete_task(task_id)

            if success:
                print(f"\n✓ {message}")
                print(f"  Deleted: [{deleted_task.id}] {deleted_task.title}")
            else:
                print(f"\n✗ Error: {message}")

            break

        input("\nPress Enter to continue...")
