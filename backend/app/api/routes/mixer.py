from fastapi import APIRouter, UploadFile, File, Depends
from app.services.mixer_service import MixerService
from app.services.auth_service import get_current_user

router = APIRouter()
mixer_service = MixerService()

@router.post("/upload")
async def upload_audio(file: UploadFile = File(...), user=Depends(get_current_user)):
    result = await mixer_service.save_uploaded_file(file, user)
    return {"message": "File uploaded", "file_path": result}
