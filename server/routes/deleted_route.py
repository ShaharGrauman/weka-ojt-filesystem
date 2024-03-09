from dal.deleted_options import permanently_delete_file,permanently_delete_folder,restore_file,restore_folder
from common.HTTPExceptions.exceptions import CustomHTTPException
from fastapi import APIRouter, Cookie,Request
from dal.config import cipher,get_user_id

router = APIRouter()

@router.delete("/deleted/files/{file_id}")
def delete_file(request:Request,file_id: int):
    try:
        user_id = get_user_id(request)
        # Check if file deleted
        result = permanently_delete_file( file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.delete("/deleted/folders/{folder_id}")
def delete_folder(request:Request,folder_id: int):

    try:
        user_id = get_user_id(request)
        # Check if folder deleted
        result = permanently_delete_folder(folder_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")



@router.put("/deleted/files/restore/{file_id}")
def file_restore(request:Request,file_id: int):
    try:
        user_id = get_user_id(request)
        # Check if file restored
        result = restore_file( file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    
@router.put("/deleted/folders/restore/{folder_id}")
def folder_restore(request:Request,folder_id: int):
    try:
        user_id = get_user_id(request)
        # Check if folder restored
        result = restore_folder( folder_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


