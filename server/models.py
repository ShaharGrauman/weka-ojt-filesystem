from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    name: Optional[str] = None
    email: str
    password: str

class File(BaseModel):
    name: str
    user_id: int
    folder_id: Optional[int] = None
    size: int
    is_deleted: bool = False
    path: str
    upload_date: datetime
    group_version_id: Optional[int] = None

class Folder(BaseModel):
    name: str
    user_id: int
    parent_folder: Optional[int] = None
    is_deleted: bool = False
    path: str
    upload_date: datetime