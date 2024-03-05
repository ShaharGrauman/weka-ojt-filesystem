from typing import Annotated
from dal.config import cipher
from fastapi import APIRouter, Cookie,path
from dal.dalFuction import get_file_data,get_myfiles,get_myfolders,get_folder_data
from exceptions import CustomHTTPException

router = APIRouter()

@router.get("/my_files")
async def my_files(user_id: Annotated[str | None, Cookie()] = None):
    user=cipher.decrypt(eval(user_id)).decode()
    files=get_myfiles(user,1)
    folders=get_myfolders(user,1)
    return files+folders

@router.get("/{files_category}/file_id")
def get_file(file_id:int,user_id: Annotated[str | None, Cookie()] = None,):
    user_id=cipher.decrypt(eval(user_id)).decode()
    files_category="home"
    try:
        if (files_category=="home" or files_category=="myfiles" or files_category=="deleted"):
            result = get_file_data(file_id,user_id)
            return result
        elif (files_category=="sharedfiles"):
            result = get_shared_file_data(file_id,user_id)
            return result
    
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.get("/{file_category}/{folder_id}")
async def get_files_or_folders_in_folder(
    folder_id: int = Path(..., title="The ID of the folder"),
    file_category: str = Path(..., title="Category of files (myfiles or allFiles)"),
    user_id: Annotated[str | None, Cookie()] = None
):
    user_id=cipher.decrypt(eval(user_id)).decode()
    if file_category not in ["myfiles", "allFiles"]:
        return {"error": "Invalid file category"}

    folder_data = get_folder_data(folder_id, user_id)  # Replace user_id with actual user ID
    return folder_data