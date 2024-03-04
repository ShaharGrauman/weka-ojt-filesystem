from fastapi import APIRouter
from server.dal.deleted_options import permanently_delete_file,permanently_delete_folder,restore_file,restore_folder
from server.exceptions import CustomHTTPException


router = APIRouter()

@router.delete("/deleted/files/{file_id}")
def delete_file(file_id: int,user_id:int):
    try:
        # Check if file deleted
        result = permanently_delete_file( file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.delete("/deleted/folders/{folder_id}")
def delete_folder(folder_id: int,user_id:int):
    try:
        # Check if folder deleted
        result = permanently_delete_folder(folder_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")



@router.update("/deleted/files/{file_id}/restore")
def file_restore(file_id: int,user_id:int):
    try:
        # Check if file restored
        result = restore_file( file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    
@router.update("/deleted/folders/{folder_id}/restore")
def folder_restore(folder_id: int,user_id:int):
    try:
        # Check if folder restored
        result = restore_folder( folder_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


