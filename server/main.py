from fastapi import FastAPI, HTTPException,Response
from dal.models import User,Pass
from dal.validation import validate_email_format, validate_pass_format,validate_name 
from dal.authentication import check_email_exist,add_user,get_user_details,decrypt
from common.HTTPExceptions.exceptions import CustomHTTPException
from dal.config import cipher
import json
from dal.dalFuction import send_email,Encrypt_email
from dal.validation import validate_match_password
from dal.dalFuction import update_Password
from routes.home_routes import router as home_routes
from fastapi.middleware.cors import CORSMiddleware
from routes.tool_bar import router as tool_bar_router
from routes.three_dots import router as three_dots_router
import urllib.parse
from routes.fileUpload import router as file_upload



# Create an instance of the FastAPI class
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
app.include_router(home_routes, prefix="")
app.include_router(tool_bar_router, prefix="")
app.include_router(three_dots_router, prefix="")
app.include_router(file_upload, prefix="")



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
def forgotpassword(user_email: str):
    email = user_email

    # Check email format validation
    if not validate_email_format(email):
        raise HTTPException(status_code=400, detail="Invalid email format")

   
   # Check if email  exists
    if not check_email_exist(email):
        raise CustomHTTPException(status_code=400, detail="Email not exists")

    # now we send email
    # the masge we want to send


    ecrybrt_email=Encrypt_email(email)
    safe_token = urllib.parse.quote(ecrybrt_email, safe='')

    reset_link = f"http://localhost:5173/resetPassword?token={safe_token}"  
    msg = f"Click the following link to reset your password: {reset_link}"


    if send_email(email,msg):
        # Return success message 
        return {"msg" :"the reset lenke send to your mail"}
    else:
        # User not found, raise custom HTTPException
        raise CustomHTTPException(status_code=500, detail="problem with connect to the server")






@app.post ("/new_password")
def new_password(Pass:Pass):
    pass1=Pass.pass1
    pass2=Pass.pass2
    token=Pass.token
     # Check password match
    if not validate_match_password(pass1,pass2):
        raise HTTPException(status_code=400, detail="The password not match")

     # Check password format validation
    if not validate_pass_format(pass1):
        raise HTTPException(status_code=400, detail="Invalid password format")
    #  now we update the data
    email=decrypt(token)
    if update_Password(email,pass1):
         return{"msg" :"update succsfuly"}
    else:
       
        raise CustomHTTPException(status_code=400, detail="cannot update")


 