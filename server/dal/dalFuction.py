
from cryptography.fernet import Fernet

encryption_key = b'BpthmmKROjL-bMMnZD8h-jye-ZJN6cY7z-QB3ms_qD0='
cipher = Fernet(encryption_key)


# witch do encrybit for the mail to send it to the user in the token
def Encrypt_email(email):
   encrypted_email= cipher.encrypt(email.encode())
   return encrypted_email


