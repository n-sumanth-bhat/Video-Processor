# # Use an official Python runtime as a parent image
# FROM python:3.10-slim

# # Set environment variables
# ENV PYTHONUNBUFFERED 1

# # Set the working directory
# WORKDIR /app

# # Copy the requirements file into the image
# COPY requirements.txt /app/

# # Install the Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the current directory contents into the image
# COPY . /app/

# # Expose port 8000 for the Django app
# EXPOSE 8000

# # Set the default command to run the Django development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


# Use the official Python 3.10 slim image from the Docker Hub
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

# Set Django environment variables
ENV DJANGO_SETTINGS_MODULE=video_processor.settings

# Run the application
CMD ["gunicorn", "video_processor.wsgi:application", "--bind", "0.0.0.0:8000"]

