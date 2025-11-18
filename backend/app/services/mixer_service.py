import os
from uuid import uuid4
from app.db.mongodb import get_database

class MixerService:
    def __init__(self):
        self.db = get_database()["tracks"]

    async def save_uploaded_file(self, file, user_id):
        filename = f"{uuid4()}_{file.filename}"
        save_path = os.path.join("uploads", filename)
        os.makedirs("uploads", exist_ok=True)
        with open(save_path, "wb") as buffer:
            buffer.write(await file.read())
        await self.db.insert_one({"user_id": user_id, "filename": filename, "path": save_path})
        return save_path
