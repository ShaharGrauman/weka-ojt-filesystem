from fastapi import FastAPI, HTTPException,Response
from models import User
from dal.validation import validate_email_format, validate_pass_format,validate_name
from dal.authentication import check_email_exist,add_user,get_user_details
from exceptions import CustomHTTPException
from cryptography.fernet import Fernet
import json


key = Fernet.generate_key()
cipher_suite = Fernet(key)
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
        raise CustomHTTPException(status_code=400, detail="Invalid email format")

    # Validate password format
    if not validate_pass_format(password):
        raise CustomHTTPException(status_code=400, detail="Invalid password format")

    # Validate name format
    if not validate_name(name):
        raise CustomHTTPException(status_code=400, detail="Invalid name format")

    # Check if email already exists
    if check_email_exist(email):
        raise CustomHTTPException(status_code=400, detail="Email already exists")

    # Add user to the database
    if add_user(user):
        return {"msg": "User sign up successfully"}
    else:
        return {"msg": "User sign up Failed"}
    

    





@app.post("/login")
def login(login_request: User, response: Response):
    email = login_request.email
    password = login_request.password

    # Check email format validation
    if not validate_email_format(email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Check password format validation
    if not validate_pass_format(password):
        raise HTTPException(status_code=400, detail="Invalid password format")

    # Check if user exists in the database
    user = get_user_details(email, password)

    if user:
        user_dict = json.loads(user)
        # User authentication successful, set cookies for user id
        user_id = str(user_dict["id"]).encode()
        encrypted_user_id = cipher_suite.encrypt(user_id).decode()

        # Set encrypted user ID as a cookie
        response.set_cookie(key="user_id", value=encrypted_user_id)

        # Return success message and user object
        return {
            "msg": "User logged in successfully",
            "User": {
                "id": user_dict["id"],
                "username": user_dict["username"],
                "email": user_dict["email"]
            }
        }
    else:
        # User not found, raise custom HTTPException
        raise CustomHTTPException(status_code=404, detail="User not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
