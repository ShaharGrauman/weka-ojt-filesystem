from fastapi import FastAPI
from models import User
from mysql_connection import get_database_connection

# Create an instance of the FastAPI class
app = FastAPI()

# Define a route using a decorator
@app.get("/")
def read_root():
    return {"message": "Hello, World"}

@app.post("/signup")
def signup(user: User):
    name = user.name
    email = user.email
    password = user.password

    # Validate email format
    if not validate_email_format(email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Validate password format
    if not validate_pass_format(password):
        raise HTTPException(status_code=400, detail="Invalid password format")

    # Validate name format
    if not validate_name(name):
        raise HTTPException(status_code=400, detail="Invalid name format")

    # Check if email already exists
    if check_email_exist(email):
        raise HTTPException(status_code=400, detail="Email already exists")

    # Add user to the database
    add_user(user)

    return {"msg": "User sign up successfully"}