# from fastapi import FastAPI
# from pydantic import BaseModel

# app = FastAPI()

# @app.get("/")
# async def root():
#   return {"message": "Hello World"}



# backend/main.py
import os
import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse # Needed for the fallback route

# --- Configuration ---
# Directory where the built React app is copied by the Dockerfile.
# The Dockerfile copies it to /app/backend/static
# Since the CMD runs from /app/backend, the relative path is just 'static'.
REACT_BUILD_DIR = "static"

app = FastAPI()

# --- API Routes ---
# Define any API routes first so they take precedence over the static files.

@app.get("/api/hello")
async def get_hello():
    return {"message": "Hello from the FastAPI API!"}

# --- Serve React Frontend ---

# 1. Mount the Static Files
# This is the crucial step. It tells FastAPI to look in the 'static' directory
# for any files requested at the root ('/').
# The 'html=True' flag ensures that if a URL corresponds to a directory (like the root '/'),
# FastAPI automatically serves the 'index.html' file from that directory.
app.mount(
    "/", 
    StaticFiles(directory=REACT_BUILD_DIR, html=True), 
    name="static_app"
)

# 2. Fallback Route for React Router (SPA Routing)
# This handles client-side routes (e.g., if a user navigates directly to /dashboard).
# If the path requested doesn't match an API endpoint or a physical static file, 
# it serves index.html, allowing React Router to take over.
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # Construct the full path to index.html
    index_file_path = os.path.join(REACT_BUILD_DIR, "index.html")
    
    # Check if index.html exists before serving (for robustness)
    if os.path.exists(index_file_path):
        return FileResponse(index_file_path)
    else:
        # Fallback if the build files are missing
        return {"error": "React application build files not found"}, 404

# --- Run Application ---
if __name__ == "__main__":
    # Ensure it binds to 0.0.0.0 for access outside the container
    uvicorn.run(app, host="0.0.0.0", port=5000)