from pydantic import BaseModel

class User(BaseModel):
    name: Optional[str] = None
    email: str
    password: str