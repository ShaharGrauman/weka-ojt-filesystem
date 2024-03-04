from fastapi import FastAPI, HTTPException,Response
import json
from models import User
from dal.validation import validate_email_format, validate_pass_format,validate_name 
from dal.authentication import check_email_exist,add_user,get_user_details,exite_the_mail_from_the_token
from exceptions import CustomHTTPException
from cryptography.fernet import Fernet
from routes import three_dots
import json

from routes.home_routes import router as home_routes
from dal.config import cipher
from routes import three_dots
import json
from dal.dalFuction import send_email
from dal.validation import validate_match_password
from dal.dalFuction import update_user_Password


# Create an instance of the FastAPI class
app = FastAPI()
app.include_router(home_routes, prefix="")

app.include_router(three_dots.router)

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
    add_user(user)

    return {"msg": "User sign up successfully"}





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
        encrypted_user_id = cipher.encrypt(user_id)

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






@app.post ("/forgetpassword")
def login(user_email):
    email = user_email

    # Check email format validation
    if not validate_email_format(email):
        raise HTTPException(status_code=400, detail="Invalid email format")

   
   # Check if email  exists
    if not check_email_exist(email):
        raise CustomHTTPException(status_code=400, detail="Email not exists")

    # now we send email
    # the masge we want to send
    msg="hhhhhhh"
    if send_email(email,msg):
        # Return success message 
        return{"msg" :"the reset lenke send to your mail"}
    else:
        # User not found, raise custom HTTPException
        raise CustomHTTPException(status_code=400, detail="problem with connect to the")







@app.post ("/new_password")
def login(token,pass1,pass2):

     # Check password match
    if not validate_match_password(pass1,pass2):
        raise HTTPException(status_code=400, detail="The password not match")

     # Check password format validation
    if not validate_pass_format(pass1):
        raise HTTPException(status_code=400, detail="Invalid password format")
    #  now we update the data
    email=exite_the_mail_from_the_token(token)
    # update=update_user_Password(email,pass1)
    if update_user_Password(email,pass1):
         return{"msg" :"update succsfuly"}
    else:
       
        raise CustomHTTPException(status_code=400, detail="cannot update")


 