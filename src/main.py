"""Main entry point for the todo application."""
from src.services.todo_manager import TodoManager
from src.ui.console_ui import ConsoleUI


def main():
    """Initialize and run the todo application."""
    # Create instances
    todo_manager = TodoManager()
    console_ui = ConsoleUI(todo_manager)

    try:
        # Main application loop
        while True:
            console_ui.display_menu()
            choice = console_ui.get_user_choice()

            if choice == 1:
                console_ui.handle_add_task()
            elif choice == 2:
                console_ui.handle_view_tasks()
            elif choice == 3:
                console_ui.handle_update_task()
            elif choice == 4:
                console_ui.handle_delete_task()
            elif choice == 5:
                console_ui.handle_toggle_status()
            elif choice == 6:
                print("\n" + "=" * 29)
                print("   Thanks for using Todo App!")
                print("   All data will be lost.")
                print("=" * 29)
                break
    except KeyboardInterrupt:
        print("\n\nExiting...")
        print("=" * 29)
        print("   Thanks for using Todo App!")
        print("   All data will be lost.")
        print("=" * 29)


if __name__ == "__main__":
    main()
