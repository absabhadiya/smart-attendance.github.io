# Use a slim Node.js image as the base
FROM node:18-slim

# Install system dependencies for Python, OpenCV, and dlib
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    libboost-python-dev \
    libboost-thread-dev \
    pkg-config \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy requirements and install Python dependencies
# Since there's no requirements.txt, I'll install them directly based on my research
RUN pip3 install --no-cache-dir face_recognition opencv-python numpy

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (can be overridden in docker-compose.yml)
ENV PORT=3000
ENV NODE_ENV=production
ENV PYTHON_PATH=/usr/bin/python3

# Start the application with database initialization
CMD ["sh", "-c", "node scripts/init-db.js && node server.js"]
