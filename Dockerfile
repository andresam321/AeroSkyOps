# Use an official Python image with Alpine for a lightweight base
FROM python:3.9.18-alpine3.18

# Install build tools and PostgreSQL development dependencies
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set environment variables
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG x-apikey

ENV FLASK_APP=$FLASK_APP \
    FLASK_ENV=$FLASK_ENV \
    DATABASE_URL=$DATABASE_URL \
    SCHEMA=$SCHEMA \
    SECRET_KEY=$SECRET_KEY \
    X_APIKEY=$x-apikey

# Set working directory
WORKDIR /var/www

# Copy requirements file first for better caching
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install additional dependencies
RUN pip install --no-cache-dir psycopg2 boto3

# Copy application source code
COPY . .

# Apply database migrations and seed data
RUN flask db upgrade && flask seed all

# Expose application port
EXPOSE 8000

# Start Gunicorn to serve the Flask app
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000", "--workers", "3"]
