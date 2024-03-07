from cryptography.fernet import Fernet
from common.HTTPExceptions.exceptions import CustomHTTPException


encryption_key = b'BpthmmKROjL-bMMnZD8h-jye-ZJN6cY7z-QB3ms_qD0='
cipher = Fernet(encryption_key)




def get_user_id(request):
    user = request.cookies.get("user_id")
    if user is None:
        raise CustomHTTPException(status_code=400, detail="Useeerrr cookie is missing")
    user_id=cipher.decrypt(eval(user)).decode()
    return user_id
