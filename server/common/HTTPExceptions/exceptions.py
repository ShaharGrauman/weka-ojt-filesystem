from fastapi import HTTPException


class CustomHTTPException(HTTPException):
    def __init__(self, status_code: int = 403, detail: str = "Forbidden: User is not an admin"):
        super().__init__(status_code=status_code, detail=detail)