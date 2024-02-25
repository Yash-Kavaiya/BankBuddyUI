# Use a lightweight Python base image for production efficiency
FROM python:3.8-slim

# Create a working directory for your app
WORKDIR /app

# Copy the requirements file
COPY requirements.txt ./

# Install the dependencies
RUN pip install -r requirements.txt

# Copy your application code
COPY . ./

# Expose the port used by your Flask app
EXPOSE 8080

# Command to run the Flask application using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "main:app"]
