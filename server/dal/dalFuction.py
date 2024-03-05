import os
from email.message import EmailMessage
import ssl
import smtplib
from dal.mysql_connection import get_database_connection
from typing import List
from dal.config import cipher
from common.HTTPExceptions.exceptions import CustomHTTPException

# witch do encrypt for the mail to send it to the user in the token
def Encrypt_email(email):
   encrypted_email= cipher.encrypt(email.encode())
   return encrypted_email


# send email to the recever_email
def send_email(recever_email,msg):
   email_sender="filesystem2024@gmail.com"
   email_password="ejnw zjwu gmfc jzjt"
   subject="reset your password"
   body=msg
   em =EmailMessage()
   em['From']=email_sender
   em['To']= recever_email
   em['Subject']=subject
   em.set_content(body) 
   context=ssl.create_default_context()
   try:
        with smtplib.SMTP_SSL('smtp.gmail.com',465,context=context)as smtp:
            smtp.login(email_sender,email_password)
            smtp.sendmail(email_sender,recever_email,em.as_string())
        return True
   except Exception as E:
        return False

# Function to retrieve myfiles
def get_myfiles(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    with get_database_connection() as conn:
        cursor = conn.cursor()
        my_files_query = "SELECT * FROM file WHERE user_id = %s AND is_deleted = 0"
        my_files_query += f" ORDER BY {sorted_by} DESC"
        start_index = (page - 1) * 20
        cursor.execute(my_files_query, (user_id,))
        my_files = cursor.fetchall()
    return my_files[start_index:start_index + 20]

def get_myfolders(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    with get_database_connection() as conn:
        cursor = conn.cursor()
        my_folders_query = "SELECT * FROM folder WHERE user_id = %s AND is_deleted = 0"
        my_folders_query += f" ORDER BY {sorted_by} DESC"
        start_index = (page - 1) * 20
        cursor.execute(my_folders_query, (user_id,))
        my_folders = cursor.fetchall()
    return my_folders[start_index:start_index + 20]

def get_deletedfiles(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    with get_database_connection() as conn:
        cursor = conn.cursor()
        deleted_files_query = """
            SELECT * FROM file 
            WHERE user_id = %s AND is_deleted = 1 
            ORDER BY {} DESC
            LIMIT %s OFFSET %s
        """.format(sorted_by)
        limit = 20
        offset = (page - 1) * limit
        cursor.execute(deleted_files_query, (user_id, limit, offset))
        deleted_files = cursor.fetchall()
    return deleted_files

def get_deletedfolders(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    with get_database_connection() as conn:
        cursor = conn.cursor()
        deleted_files_query = """
            SELECT * FROM folder 
            WHERE user_id = %s AND is_deleted = 1 
            ORDER BY {} DESC
            LIMIT %s OFFSET %s
        """.format(sorted_by)
        limit = 20
        offset = (page - 1) * limit
        cursor.execute(deleted_files_query, (user_id, limit, offset))
        deleted_files = cursor.fetchall()
    return deleted_files

# send_email("ekhlass@post.bgu.ac.il","welcome")



def update_Password(email,password):
    with get_database_connection() as connection:
        cursor = connection.cursor()
        update_password = """
            UPDATE users SET password = %s WHERE email = %s LIMIT 1;
        """
        cursor.execute(update_password, (password,email ))
        connection.commit()
    return True

# update_Password("ekhlass@post.bgu.ac.il","12121212")



def  get_file_data(file_id,user_id):
    with get_database_connection() as connection:
        cursor = connection.cursor()
        get_query = "SELECT * FROM file WHERE id=? AND user_id=?;"
        try:
            cursor.execute(get_query, (file_id, user_id))
            file_data = cursor.fetchone()
            return file_data
        except Exception as e:
            connection.rollback()
            raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


def get_shared_file_data(file_id,user_id):
    with get_database_connection() as connection:
        cursor = connection.cursor()
        get_query = "Select * From file Where id=? user_id = (SELECT shared_by_user_id FROM SharedFile WHERE file_id=? AND shared_with_user_id=?);"
        try:
            cursor.execute(get_query, (file_id, file_id, user_id))
            file_data = cursor.fetchone()
            return file_data
        except Exception as e:
            connection.rollback()
            raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

def get_files_infolder(folder_id, user_id):
    with get_database_connection() as conn:
        cursor = conn.cursor()
        query = "SELECT id, name, size, upload_date FROM file WHERE folder_id = %s AND user_id = %s AND is_deleted = FALSE"
        cursor.execute(query, (folder_id, user_id))
        files = cursor.fetchall()
    return files

# Function to get list of folders in a folder
def get_folders_infolder(folder_id, user_id):
    with get_database_connection() as conn:
        cursor = conn.cursor()
        query = "SELECT id, name, upload_date FROM folder WHERE parent_folder = %s AND user_id = %s AND is_deleted = FALSE"
        cursor.execute(query, (folder_id, user_id))
        folders = cursor.fetchall()
    return folders

# Function to get data (files and folders) in a folder
def get_folder_data(folder_id, user_id):
    files = get_files_infolder(folder_id, user_id)
    folders = get_folders_infolder(folder_id, user_id)
    return {'files': files, 'folders': folders}