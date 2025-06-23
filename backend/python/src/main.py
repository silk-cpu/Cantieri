from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()

# Enable CORS for React frontend (e.g., http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR_LOGO= "uploads/logo"
UPLOAD_DIR_PDF= "uploads/pdf"
UPLOAD_DIR_FIRMA= "uploads/firma"

os.makedirs(UPLOAD_DIR_LOGO, exist_ok=True)
os.makedirs(UPLOAD_DIR_PDF, exist_ok=True)
os.makedirs(UPLOAD_DIR_FIRMA, exist_ok=True)

@app.post("/uploadLogo/")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR_LOGO}/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {file.filename}

@app.post("/uploadPdf/")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR_PDF}/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {file.filename}

@app.post("/uploadFirma/")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR_FIRMA}/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {file.filename}