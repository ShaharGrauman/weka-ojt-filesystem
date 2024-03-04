import os
from email.message import EmailMessage
import ssl
import smtplib
from server.dal.mysql_connection import get_database_connection
from cryptography.fernet import Fernet
from typing import List

encryption_key = b'BpthmmKROjL-bMMnZD8h-jye-ZJN6cY7z-QB3ms_qD0='
cipher = Fernet(encryption_key)

# witch do encrypt for the mail to send it to the user in the token
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


# Function to retrieve myfiles
def get_myfiles(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    conn = get_database_connection()
    cursor = conn.cursor()
    # Query to retrieve user's files from MyFile
    my_files_query = "SELECT * FROM file WHERE user_id = %s AND is_deleted = 0"
    # Sorting files by upload_date if requested
    my_files_query += f" ORDER BY {sorted_by} DESC"
    # Calculate the range of files to return based on the page
    start_index = (page - 1) * 20
    # Execute the query with user_id as parameter
    cursor.execute(my_files_query, (user_id,))
    my_files = cursor.fetchall()
    # Return the subset of files based on the page
    return my_files[start_index:start_index + 20]

def get_MyFile_folders(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    conn = get_database_connection()
    cursor = conn.cursor()
    # Query to retrieve user's folders from MyFile
    my_folders_query = "SELECT * FROM folder WHERE user_id = %s AND is_deleted = 0"
    # Sorting folders by upload_date if requested
    my_folders_query += f" ORDER BY {sorted_by} DESC"
    # Calculate the range of folders to return based on the page
    start_index = (page - 1) * 20
    # Execute the query with user_id as parameter
    cursor.execute(my_folders_query, (user_id,))
    my_folders = cursor.fetchall()
    # Return the subset of folders based on the page
    return my_folders[start_index:start_index + 20]