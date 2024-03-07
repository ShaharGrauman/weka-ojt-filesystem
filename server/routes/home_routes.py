from dal.config import cipher
from fastapi import APIRouter, Cookie,Path,Request
from dal.dalFuction import get_sharedfiles,get_file_data,get_myfiles,get_myfolders,get_shared_file_data,get_folder_data,get_deletedfiles,get_deletedfolders
from common.HTTPExceptions.exceptions import CustomHTTPException
from dal.config import get_user_id

router = APIRouter()

@router.get("/my_files")
async def my_files(request:Request):
    try:
        user_id=get_user_id(request)
        files=get_myfiles(user_id,1)
        folders=get_myfolders(user_id,1)
        return files+folders
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=str(e))

@router.get("/deleted_files")
async def deleted_files(request:Request):
    try:
        user_id=get_user_id(request)
        files=get_deletedfiles(user_id,1)
        folders = get_deletedfolders(user_id, 1)
        return files+folders
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=str(e))

@router.get("/{files_category}/file_id")
def get_file(request:Request,file_id:int):
    files_category="home"
    try:
        user_id = get_user_id(request)
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
    request:Request,
    folder_id: int = Path(..., title="The ID of the folder"),
    file_category: str = Path(..., title="Category of files (myfiles or allFiles)")
    
):
    user_id=get_user_id(request)
    if file_category not in ["myfiles", "allFiles"]:
        return {"error": "Invalid file category"}

    folder_data = get_folder_data(folder_id, user_id)  # Replace user_id with actual user ID
    return folder_data
@router.get("/shared_files")
async def shared_files(request:Request):
    try:
        user_id=get_user_id(request)
        files=get_sharedfiles(user_id,1)
        return files
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=str(e))