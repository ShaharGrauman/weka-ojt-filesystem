from typing import Annotated
from dal.config import cipher
from fastapi import APIRouter, Cookie
from dal.dalFuction import get_file_data
from server.exceptions import CustomHTTPException

router = APIRouter()

@router.get("/my_files")
async def my_files(user_id: Annotated[str | None, Cookie()] = None):
    return cipher.decrypt(eval(user_id)).decode()


@router.get("/{files_category}/file_id")
def get_file(file_id:int,user_id: Annotated[str | None, Cookie()] = None):
    user_id=cipher.decrypt(eval(user_id)).decode()
    files_category="all"
    try:
        # Check if folder restored
        result = get_file_data(file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

