import os
from email.message import EmailMessage
import ssl
import smtplib
from dal.mysql_connection import get_database_connection
from typing import List
from dal.config import cipher
from exceptions import CustomHTTPException



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

def get_myfolders(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
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

def get_deletedfiles(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    conn = get_database_connection()
    cursor = conn.cursor()
    # Query to retrieve user's deleted files
    deleted_files_query = """
        SELECT * FROM file 
        WHERE user_id = %s AND is_deleted = 1 
        ORDER BY {} DESC
        LIMIT %s OFFSET %s
    """.format(sorted_by)
    # Calculate offset and limit for pagination
    limit = 20
    offset = (page - 1) * limit
    # Execute the query with user_id, limit, and offset as parameters
    cursor.execute(deleted_files_query, (user_id, limit, offset))
    deleted_files = cursor.fetchall()
    return deleted_files

def get_deletedfolders(user_id: int, page: int, sorted_by: str = "upload_date") -> List[dict]:
    conn = get_database_connection()
    cursor = conn.cursor()
    # Query to retrieve user's deleted folders
    deleted_files_query = """
        SELECT * FROM folder 
        WHERE user_id = %s AND is_deleted = 1 
        ORDER BY {} DESC
        LIMIT %s OFFSET %s
    """.format(sorted_by)
    # Calculate offset and limit for pagination
    limit = 20
    offset = (page - 1) * limit
    # Execute the query with user_id, limit, and offset as parameters
    cursor.execute(deleted_files_query, (user_id, limit, offset))
    deleted_files = cursor.fetchall()
    return deleted_files

# send_email("ekhlass@post.bgu.ac.il","welcome")



def update_Password(email,password):
   
    connection = get_database_connection()
    cursor = connection.cursor()
    # cursor.execute("SET sql_safe_updates=0;")
    update_password = """
       UPDATE users SET password = %s WHERE email = %s LIMIT 1;

    """
    cursor.execute(update_password, (password,email ))
    connection.commit()
    # update_user = cursor.fetchall()
    return  True

# update_Password("ekhlass@post.bgu.ac.il","12121212")



def  get_file_data(file_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    get_query = "SELECT * FROM file WHERE id=? AND user_id=?;"

    try:
        cursor.execute(get_query, (file_id, user_id))
        file_data = cursor.fetchone()
        return file_data
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()


def get_shared_file_data(file_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    get_query = "Select * From file Where id=? user_id = (SELECT shared_by_user_id FROM SharedFile WHERE file_id=? AND shared_with_user_id=?);"

    try:
        cursor.execute(get_query, (file_id, file_id, user_id))
        file_data = cursor.fetchone()
        return file_data
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()