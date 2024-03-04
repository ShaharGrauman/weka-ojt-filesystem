from typing import Annotated
from dal.config import cipher
from fastapi import APIRouter, Cookie
router = APIRouter()

@router.get("/my_files")
async def my_files(user_id: Annotated[str | None, Cookie()] = None):
    return cipher.decrypt(eval(user_id)).decode()