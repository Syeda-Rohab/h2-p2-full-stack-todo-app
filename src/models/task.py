"""Task model for todo application."""
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
        desc_preview = ""
        if self.description:
            if len(self.description) > 50:
                desc_preview = f" - {self.description[:50]}..."
            else:
                desc_preview = f" - {self.description}"
        return f"[{self.id}] {self.title}{desc_preview} [{self.status}]"
