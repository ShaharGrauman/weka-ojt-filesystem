from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    name: Optional[str] = None
    email: str
    password: str
class Pass(BaseModel):
    pass1: str
    pass2: str
    token: str

class File(BaseModel):
    id:int
    name: str
    user_id: int
    folder_id: Optional[int] = None
    size: int
    is_deleted: bool = False
    path: str
    upload_date: datetime
    group_version_id: Optional[str] = None

class Folder(BaseModel):
    id: int
    name: str
    user_id: int
    parent_folder: Optional[int] = None
    is_deleted: bool = False
    path: str
    upload_date: datetime