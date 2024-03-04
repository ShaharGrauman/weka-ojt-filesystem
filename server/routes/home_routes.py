from fastapi import APIRouter
from server.dal.dalFuction import get_myfiles

import sys
sys.path.append('/path/to/parent_directory')
router = APIRouter()

@router.get("/my_files")
async def my_files():
    return """123"""