from fastapi import APIRouter, HTTPException, Cookie, Request, Path
from  dal.threeDots import get_versions_for_file,delete_file,delete_folder, download_file
from common.HTTPExceptions.exceptions import CustomHTTPException
from dal.config import cipher
from dal.validation import validate_email_format
from dal.authentication import check_email_exist
from dal.dalFuction import get_myfolders,owner_of_file,send_email,email_owner,get_userid,do_share
from dal.threeDots import update_file_parent,renamefile
from dal.config import get_user_id
from dal.models import Shared

router = APIRouter()



@router.get("/versions/{file_id}")
async def show_versions(file_id: int):
    versions = get_versions_for_file(file_id)
    if versions:
        return {"status": "success", "versions": versions}
    else:
        raise CustomHTTPException(status_code=404, detail="File not found")
    


@router.put("/file/{file_id}")
def file_delete(request:Request,file_id: int):
    try:
        user_id = get_user_id(request)
        # Check if file restored
        result = delete_file( file_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    


@router.put("/folder/{folder_id}")
def folder_delete(request:Request,folder_id: int):
    try:
        user_id = get_user_id(request)
        # Check if folder restored
        result = delete_folder( folder_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    



@router.post("/share/{file_id}")
def share_file(request:Request,share: Shared):
    user_id=get_user_id(request)

    email= share.email
    file_id= share.file_id
    print(user_id)

    print(email)
    #check if formate email is write 
    if not validate_email_format(email):
        raise HTTPException(status_code=400, detail="Invalid Email format")
    # check if the email in db
    if not check_email_exist(email):
        raise HTTPException(status_code=400, detail="email not in database")
    # check if the owner of the file is the user that loged in

    # user=cipher.decrypt(eval(user_id)).decode()
    # print(user)
    # validate owner of the file
    if not owner_of_file(user_id,file_id):
        raise HTTPException(status_code=400, detail="your not the owner of the file")
    
    # get the name of the owner of the file
    email_owne=email_owner(user_id) 
    print(email_owne)
    Shared_with=get_userid(email)
    print(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
    print(Shared_with)


    do_share(Shared_with,user_id,file_id)
    login_link = f"http://localhost:5173/"  

    msg = f"hi, {email_owne} shared a file with you. Enter the website to see the file: {login_link}"    
    subject="Shared file"
    if send_email(email,msg,subject):
        return "The file has been shared"
    else:
        
            return "something went wrong,try again later"

    

@router.get("/file/download/{file_id}")
def download_file_route(request:Request,file_id: int):
    try:
        user_id=get_user_id(request)
        result = download_file(file_id, user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.get("/move")
def get_all_folders(request:Request,folder_id:int,file_id: int):
    try:
        user_id = get_user_id(request)
        folders = get_myfolders(user_id,1)
        return folders
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")



@router.put("/move/{file_id}/{target_folder_id}")
def move_file(request:Request,file_id: int,target_folder_id:int):
    try:
        user_id = get_user_id(request)
        result = update_file_parent(file_id,target_folder_id,user_id)
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.put("/{file_id}/rename")
async def rename_file(request:Request,file_id: int ,new_file_name: str):
    try:
        user_id = get_user_id(request)
        result = renamefile(file_id, new_file_name, user_id)
        print(f"Renaming file with ID {file_id} to {new_file_name}")
        return result
    except CustomHTTPException as e:
        return e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


