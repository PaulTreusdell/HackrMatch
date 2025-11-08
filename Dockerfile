# ================================
# 1️⃣ Build frontend
# ================================
FROM node:22 AS frontend-build

WORKDIR /app/frontend

# Copy frontend files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source and build
COPY frontend/ ./
#maybe replace with COPY ..

EXPOSE 3000

FROM python:3.11-slim AS backend

WORKDIR /app

# Copy and install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend

# Copy built frontend to backend/static or backend/public (adjust for your app)
COPY --from=frontend-build /usr/src/frontend/dist ./backend/static

# Expose backend port
EXPOSE 5000

WORKDIR /app/backend

# Run the backend server
CMD ["python", "main.py"]

