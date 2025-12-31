"""
AI Service for natural language processing and chat functionality
Uses OpenAI GPT-4o-mini for intent detection and response generation
"""

import json
from typing import Dict, Any, Optional
from openai import OpenAI
from src.core.config import settings


# Initialize OpenAI client
client = OpenAI(api_key=settings.OPENAI_API_KEY)


# System prompt for the AI assistant
SYSTEM_PROMPT = """You are a helpful todo list assistant. Your job is to help users manage their tasks through natural language.

You can understand these intents:
- create_task: User wants to add a new task
- list_tasks: User wants to see their tasks
- update_task: User wants to modify an existing task
- delete_task: User wants to remove a task
- mark_complete: User wants to mark a task as done
- mark_incomplete: User wants to mark a task as not done
- general: General conversation or questions

For each message, respond with a JSON object:
{
  "intent": "one of the above intents",
  "confidence": 0.0-1.0,
  "task_title": "extracted task title if applicable",
  "task_description": "extracted description if provided",
  "due_date": "YYYY-MM-DD format if date mentioned",
  "priority": "low|medium|high if priority mentioned",
  "task_id": "task number if mentioned (e.g., '1', 'first', 'last')",
  "response": "Friendly message to show user"
}

Examples:
User: "Add task: Buy groceries tomorrow"
{
  "intent": "create_task",
  "confidence": 0.95,
  "task_title": "Buy groceries",
  "due_date": "tomorrow",
  "response": "I'll create a task 'Buy groceries' for tomorrow."
}

User: "Show my tasks"
{
  "intent": "list_tasks",
  "confidence": 1.0,
  "response": "Here are your tasks:"
}

User: "Mark the first task as done"
{
  "intent": "mark_complete",
  "confidence": 0.9,
  "task_id": "1",
  "response": "I'll mark your first task as complete."
}

Always extract dates, priorities, and other details from the message.
"""


async def process_message(message: str, user_id: int) -> Dict[str, Any]:
    """
    Process user message with OpenAI and extract intent + entities

    Args:
        message: User's input message
        user_id: ID of the user (for context if needed)

    Returns:
        Dictionary containing intent, extracted data, and response
    """
    try:
        # Call OpenAI API
        response = client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ],
            temperature=0.7,
            max_tokens=settings.OPENAI_MAX_TOKENS
        )

        # Get AI response
        ai_response = response.choices[0].message.content

        # Parse JSON response
        try:
            result = json.loads(ai_response)
        except json.JSONDecodeError:
            # If AI didn't return valid JSON, create a default response
            result = {
                "intent": "general",
                "confidence": 0.5,
                "response": ai_response
            }

        # Ensure required fields exist
        result.setdefault("intent", "general")
        result.setdefault("confidence", 0.8)
        result.setdefault("response", "I'll help you with that.")

        return result

    except Exception as e:
        print(f"AI Service Error: {e}")
        return {
            "intent": "general",
            "confidence": 0.0,
            "response": f"Sorry, I encountered an error: {str(e)}"
        }


async def generate_response(
    intent: str,
    task_data: Optional[Dict[str, Any]] = None,
    error: Optional[str] = None
) -> str:
    """
    Generate a friendly response based on the action taken

    Args:
        intent: The detected intent
        task_data: Task information if applicable
        error: Error message if action failed

    Returns:
        Friendly response string
    """
    if error:
        return f"❌ {error}"

    responses = {
        "create_task": f"✅ Created task '{task_data.get('title', 'Untitled')}' successfully!",
        "list_tasks": "Here are your tasks:",
        "update_task": f"✅ Updated task '{task_data.get('title', '')}' successfully!",
        "delete_task": f"✅ Deleted task '{task_data.get('title', '')}' successfully!",
        "mark_complete": f"✅ Marked task '{task_data.get('title', '')}' as complete!",
        "mark_incomplete": f"✅ Marked task '{task_data.get('title', '')}' as incomplete!",
        "general": "How can I help you with your tasks?"
    }

    return responses.get(intent, "Done!")


# Optional: Function to parse natural language dates
from datetime import datetime, timedelta


def parse_relative_date(date_str: str) -> Optional[str]:
    """
    Convert natural language dates to YYYY-MM-DD format

    Examples:
        "today" -> "2025-12-31"
        "tomorrow" -> "2026-01-01"
        "next week" -> "2026-01-07"

    Args:
        date_str: Natural language date string

    Returns:
        ISO format date string or None
    """
    if not date_str:
        return None

    date_str_lower = date_str.lower().strip()
    today = datetime.now().date()

    date_mappings = {
        "today": today,
        "tomorrow": today + timedelta(days=1),
        "next week": today + timedelta(days=7),
        "next month": today + timedelta(days=30),
    }

    # Check for exact matches
    if date_str_lower in date_mappings:
        return date_mappings[date_str_lower].isoformat()

    # Check for "in X days" pattern
    if "in" in date_str_lower and "day" in date_str_lower:
        try:
            days = int(''.join(filter(str.isdigit, date_str_lower)))
            return (today + timedelta(days=days)).isoformat()
        except (ValueError, TypeError):
            pass

    # Check for "in X weeks" pattern
    if "in" in date_str_lower and "week" in date_str_lower:
        try:
            weeks = int(''.join(filter(str.isdigit, date_str_lower)))
            return (today + timedelta(weeks=weeks)).isoformat()
        except (ValueError, TypeError):
            pass

    return None
