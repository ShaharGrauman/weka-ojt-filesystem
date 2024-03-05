from typing import Annotated
from dal.config import cipher
from fastapi import APIRouter, Cookie
from dal.dalFuction import get_file_data,get_myfiles,get_myfolders
from server.exceptions import CustomHTTPException

router = APIRouter()

@router.get("/my_files")
async def my_files(user_id: Annotated[str | None, Cookie()] = None):
    user=cipher.decrypt(eval(user_id)).decode()
    files=get_myfiles(user,1)
    folders=get_myfolders(user,1)
    return files+folders

@router.get("/{files_category}/file_id")
def get_file(file_id:int,user_id: Annotated[str | None, Cookie()] = None):
    user_id=cipher.decrypt(eval(user_id)).decode()
    files_category="all"
    try:
        # if (files_category=="home" || files_category=="")
        result = get_file_data(file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

