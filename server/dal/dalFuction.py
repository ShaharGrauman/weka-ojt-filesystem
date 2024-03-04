import os
from email.message import EmailMessage
import ssl
import smtplib
from cryptography.fernet import Fernet

encryption_key = b'BpthmmKROjL-bMMnZD8h-jye-ZJN6cY7z-QB3ms_qD0='
cipher = Fernet(encryption_key)


# witch do encrybit for the mail to send it to the user in the token
def Encrypt_email(email):
   encrypted_email= cipher.encrypt(email.encode())
   return encrypted_email

# send email to the user
email_sender="filesystem2024@gmail.com"
email_password="ejnw zjwu gmfc jzjt"
email_receiver="ekhlass@post.bgu.ac.il"

subject='check out mu new vedii'
body=""""
ifcde niehd ihfic"""

em =EmailMessage()
em['From']=email_sender
em['To']= email_receiver
em['Subject']=subject
em.set_content(body) 


context=ssl.create_default_context()


with smtplib.SMTP_SSL('smtp.gmail.com',465,context=context)as smtp:
    smtp.login(email_sender,email_password)
    smtp.sendmail(email_sender,email_receiver,em.as_string())


