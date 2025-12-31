# Hugging Face Spaces Dockerfile for FastAPI Backend
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directory for SQLite database (if using SQLite)
RUN mkdir -p /app/data

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

# Expose port (Hugging Face Spaces uses 7860)
EXPOSE 7860

# Run database migrations and start server
CMD alembic upgrade head && \
    uvicorn src.main:app --host 0.0.0.0 --port 7860
