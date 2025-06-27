from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()

# Enable CORS for React frontend (e.g., http://localhost:3000)
# This is the corrected code
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], # ✅ I've added your React app's origin
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



@app.delete("/deleteLogo/")
async def delete_file(filename: str):
    file_location = f"{UPLOAD_DIR_LOGO}/{filename}"
    try:
        if os.path.exists(file_location):
            os.remove(file_location)
        else:
            raise HTTPException(status_code=404,detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {e}")

@app.delete("/deletePdf/{filename}")
async def delete_pdf(filename: str):
    file_location = f"{UPLOAD_DIR_PDF}/{filename}"
    try:
        if os.path.exists(file_location):
            os.remove(file_location)
            return {"message": f"PDF {filename} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {e}")

@app.delete("/deleteFirma/{filename}")
async def delete_firma(filename: str):
    file_location = f"{UPLOAD_DIR_FIRMA}/{filename}"
    try:
        if os.path.exists(file_location):
            os.remove(file_location)
            return {"message": f"Firma {filename} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {e}")