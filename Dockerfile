# # ================================
# # 1️⃣ Build frontend
# # ================================
# FROM node:22 AS frontend-build

# WORKDIR /app/frontend

# # Copy frontend files and install dependencies
# COPY frontend/package*.json ./
# RUN npm install

# # Copy source and build
# COPY frontend/ ./
# #maybe replace with COPY ..

# RUN npm run build

# EXPOSE 3000

# FROM python:3.11-slim AS backend

# WORKDIR /app

# # Copy and install backend dependencies
# COPY backend/requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy backend code
# COPY backend/ ./backend

# # Copy built frontend to backend/static or backend/public (adjust for your app)
# #COPY --from=frontend-build /usr/src/frontend/dist ./backend/static
# COPY --from=frontend-build /app/frontend/build ./backend/static

# # Expose backend port
# EXPOSE 5000

# WORKDIR /app/backend

# # Run the backend server
# CMD ["python", "main.py"]



# ================================
# 1️⃣ Build React frontend
# ================================
FROM node:22 AS frontend-build

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source code
COPY frontend/ ./

# Build React app (outputs to /app/frontend/build)
RUN npm run build

# ================================
# 2️⃣ Python backend
# ================================
FROM python:3.11-slim AS backend

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend

# Copy built React frontend into backend static folder
COPY --from=frontend-build /app/frontend/build ./backend/static

# Expose backend port
EXPOSE 5000

WORKDIR /app/backend

# Run backend server
CMD ["python", "main.py"]


