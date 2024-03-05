from typing import List
from fastapi import APIRouter, HTTPException, Query
router = APIRouter()
from dal.tool_bar import search 
from dal.tool_bar import search, sort_files  
from exceptions import CustomHTTPException  


@router.get("/search")
def search_files(user_id: int = Query(..., description="User ID"), 
                 search_string: str = Query(..., description="Search String")) -> List[dict]:
    # Call the search function to retrieve search results
    search_results = search(user_id, search_string)
    
    return search_results


@router.get("/sort")
def sort_files_route(user_id: int, category: str, criteria: str) -> List[dict]:
    # Call the sort_files function to retrieve sorted files
    try:
        sorted_files = sort_files(user_id, category, criteria)
        return sorted_files
    except CustomHTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))
