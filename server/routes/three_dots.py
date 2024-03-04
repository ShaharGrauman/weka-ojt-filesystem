from fastapi import  APIRouter
from  dal.threeDots import get_versions_for_file
from exceptions import CustomHTTPException


router = APIRouter()



@router.get("/versions/{file_id}")
async def show_versions(file_id: int):
    versions = get_versions_for_file(file_id)
    if versions:
        return {"status": "success", "versions": versions}
    else:
        raise CustomHTTPException(status_code=404, detail="File not found")