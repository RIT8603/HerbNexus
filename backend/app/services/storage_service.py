import os
import aiofiles
import uuid
from abc import ABC, abstractmethod
from fastapi import UploadFile
from app.config import settings

class StorageInterface(ABC):
    @abstractmethod
    async def save_file(self, file: UploadFile) -> str:
        pass

class LocalStorage(StorageInterface):
    def __init__(self):
        self.upload_dir = settings.STORAGE_PATH
        os.makedirs(self.upload_dir, exist_ok=True)
        
    async def save_file(self, file: UploadFile) -> str:
        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4()}{ext}"
        file_path = os.path.join(self.upload_dir, filename)
        
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)
            
        return f"/uploads/{filename}"

storage_service: StorageInterface = LocalStorage()
