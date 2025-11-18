from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
from uuid import uuid4

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload/")
async def upload_music(file: UploadFile = File(...)):
    filename = f"{uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {"filename": filename, "message": "Upload successful"}

@router.get("/music-list/")
def list_music():
    files = os.listdir(UPLOAD_DIR)
    return {"files": files}
y

