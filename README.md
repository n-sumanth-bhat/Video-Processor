---

# Video Processor

A web application for video processing using Django REST Framework, PostgreSQL, and ReactJS.

## Project Overview

This project, `video_processor`, demonstrates a full-stack application integrating Django REST Framework for the backend and ReactJS for the frontend. The application processes videos, extracts subtitles, and handles various edge cases.

## Features

- **Backend**: 
  - Created using Django REST Framework.
  - Uses PostgreSQL for data storage.
  - Implements `ModelSerializers` and `APIView`.
  - Follows Hacksoft's style guide with a clear separation of business logic via `services` and `selectors`.
  - Handles edge cases such as missing subtitles and corrupted or unsupported video files.
  - Custom exceptions and a custom exception handler for robust error management.

- **Frontend**: 
  - Developed with ReactJS.
  - Simplistic UI in a single page to cover all features.
  - Note: UI does not include styles or routing; it's a basic implementation.

## Project Structure

```
video_processor/
│
├── backend/            # Backend related code
│   ├── Dockerfile       # Dockerfile for backend
│   └── ...              # Other backend files
│
├── frontend/           # React code
│   ├── Dockerfile       # Dockerfile for frontend
│   └── ...              # Other frontend files
│
├── docker-compose.yml  # Docker Compose configuration
├── .env                # Environment variables and credentials
└── README.md           # This README file
```

## Setup and Installation

### Prerequisites

- Docker
- Docker Compose

### Steps to Use Docker Compose

1. **Clone the Project**:
   ```bash
   git clone <repository-url>
   cd video_processor
   ```

2. **Navigate to the Folder**:
   ```bash
   cd ~/video_processor/
   ```

3. **Run Docker Compose**:
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**:
   Open your web browser and go to [http://localhost:80](http://localhost:80).
   
5. **Accessing the docker images**:
https://hub.docker.com/repository/docker/sumanthn/video-processor-frontend/general
https://hub.docker.com/repository/docker/sumanthn/video-processor-backend/general

## Notes

- **UI**: Please be aware that the UI is very basic and lacks styles and proper routing. All features are implemented on a single page.
- **Environment Variables**: The `.env` file contains dynamic data and credentials like database details and secure keys. Ensure it is properly configured for your environment.

## Additional Information

- **Backend**: The backend logic is separated into `services` and `selectors` to keep the code clean and maintainable.
- **Frontend**: The React code is contained within the `frontend` folder and includes basic functionality without advanced styling.

---