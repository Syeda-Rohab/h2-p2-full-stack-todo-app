#!/bin/bash
# Startup script for Hugging Face Spaces

echo "Starting Todo App Backend..."

# Create data directory for SQLite
mkdir -p /app/data

# Run database migrations
echo "Running database migrations..."
alembic upgrade head

# Start the FastAPI server
echo "Starting server on port 7860..."
uvicorn src.main:app --host 0.0.0.0 --port 7860
