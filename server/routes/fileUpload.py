from fastapi import APIRouter, UploadFile, File,Request
from datetime import datetime
from dal.fileUpload import insert_file_details_to_database,save_uploaded_file_to_s3
from dal.config import get_user_id

router = APIRouter()


@router.post("/file/{folder_id}/upload")
async def upload_file(folder_id,request: Request, file: UploadFile = File(...)):

    # Decrypt the session token to get user_id
    user_id=get_user_id(request)
    # Save the file to S3

    file_path = await save_uploaded_file_to_s3(file,user_id)
    if file_path is None:
        return {"error": "File upload failed"}

    # Extract filename from the UploadFile object
    file_name = file.filename
    
    # Insert file details into the database
    upload_date = datetime.now()
    file_size = file.file._file.__sizeof__()
    insert_file_details_to_database(file_name, user_id, folder_id, file_size, upload_date, file_path)

    return {"file_name": file_name, "file_path": file_path}

