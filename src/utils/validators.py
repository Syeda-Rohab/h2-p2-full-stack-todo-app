"""Input validation utilities for todo application."""


def validate_title(title: str) -> tuple[bool, str]:
    """
    Validate task title.

    Args:
        title: The title string to validate

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

    Args:
        description: The description string to validate

    Returns:
        (True, "") if valid
        (False, error_message) if invalid
    """
    stripped = description.strip()
    if len(stripped) > 1000:
        return (False, "Description exceeds 1000 characters")
    return (True, "")


def validate_task_id(id_str: str) -> tuple[bool, int, str]:
    """
    Validate and parse task ID.

    Args:
        id_str: The ID string to validate and parse

    Returns:
        (True, parsed_id, "") if valid
        (False, 0, error_message) if invalid
    """
    try:
        task_id = int(id_str)
        if task_id <= 0:
            return (False, 0, "ID must be a positive number")
        return (True, task_id, "")
    except ValueError:
        return (False, 0, "Invalid ID format. Please enter a positive number")
