from typing import List
from fastapi import APIRouter, HTTPException, Query
router = APIRouter()
from dal.tool_bar import search 
from dal.tool_bar import search, sort_files,add_folder  
from common.HTTPExceptions.exceptions import CustomHTTPException



@router.get("/search")
def search_files(user_id: int = Query(..., description="User ID"), 
                 search_string: str = Query(..., description="Search String")) -> List[dict]:
    # Call the search function to retrieve search results
    search_results = search(user_id, search_string)
    
    return search_results


@router.get("/sort")
def sort_files_route(user_id: int = Query(..., description="User ID"),
                     category: str = Query(..., description="Category to sort by"),
                     criteria: str = Query(..., description="Sorting criteria (asc or desc)")) -> List[dict]:
    # Call the sort_files function to retrieve sorted files
    try:
        sorted_files = sort_files(user_id, category, criteria)
        return sorted_files
    except CustomHTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/folder/{folder_id}/create")
async def create_folder(folder_id: int, folder_name: str,userid: int):
    
    try:
        # Call add_folder function to create the folder
        add_folder(folder_name, folder_id,userid)

        # Return success response
        return {"status": "success", "msg": "Folder created successfully"}

    except CustomHTTPException as e:
        # If CustomHTTPException is raised, return the error response
        return {"status": "fail", "msg": str(e)}


