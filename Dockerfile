# ================================
# 1️⃣ Build frontend
# ================================
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend files and install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy source and build
COPY frontend/ ./
RUN npm run build

# ================================
# 2️⃣ Build backend
# ================================
FROM python:3.11-slim AS backend

WORKDIR /app

# Copy backend dependencies
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend
