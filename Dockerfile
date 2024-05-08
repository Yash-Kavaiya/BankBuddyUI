# Use a lightweight Python base image for production efficiency
FROM python:3.9.2-slim

# Create a working directory for your app
WORKDIR /app

# Copy the requirements file
COPY requirements.txt ./app/requirements.txt

# Copy your application code
COPY . ./

# Install the dependencies
RUN pip install -r requirements.txt
# Expose the port used by your Flask app
EXPOSE 8080

CMD ["python", "main.py"]
