from dal.mysql_connection import get_database_connection
from common.HTTPExceptions.exceptions import CustomHTTPException

connection = get_database_connection()

def get_versions_for_file(file_id):
    conn = get_database_connection()  
    cursor = conn.cursor()

    # Fetch versions for the given file_id using a single query
    cursor.execute("""
    SELECT fv.id,fv.file_id ,fv.name, fv.upload_date 
    FROM FileVersion fv 
    INNER JOIN File f ON fv.id = f.group_id 
    WHERE f.id = %s
    """, (file_id,))
    versions = cursor.fetchall()
    versions_list = []
    for version in versions:
        versions_list.append({
            'id': version[1],
            'name': version[2],
            'upload_date': version[3]
    })

    conn.close()
    

    return versions_list



def delete_file(file_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    delete_query = update_is_deleted_file()

    try:
        cursor.execute(delete_query, ("1",file_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"File with ID {file_id} deleted successfully."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()


def delete_folder(folder_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    delete_query = update_is_deleted_folder()

    try:
        cursor.execute(delete_query, ("1",folder_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"Folder with ID {folder_id} deleted successfully."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()




def update_is_deleted_file():
    restore_query = "UPDATE file SET is_deleted = %s WHERE id = %s AND user_id= %s;"
    return restore_query       

def update_is_deleted_folder():
    restore_query = "UPDATE folder SET is_deleted = %s WHERE id = %sAND user_id= %s;"
    return restore_query

# rename file
def rename_file(file_id, new_name, user_id):
    connection = get_database_connection()
    cursor = connection.cursor()
    update_query = "UPDATE file SET name = %s WHERE id = %s AND user_id = %s;"

    try:
        cursor.execute(update_query, (new_name, file_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"File with ID {file_id} renamed to {new_name} successfully."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()



# download file

def download_file(file_id):
    connection = get_database_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT id FROM file WHERE id = %s;", (file_id,))
        file_id = cursor.fetchone()

        if file_id:
            # get the file from aws
            return file_id[0]  
        else:
            raise CustomHTTPException(status_code=404, detail=f"File with ID {file_id} not found.")
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()



def update_file_parent(file_id,target_folder_id,user_id):
    connection = get_database_connection()
    cursor = connection.cursor()
    update_query = "UPDATE file SET folder_id = %s WHERE id = %s AND user_id = %s"

    try:
        cursor.execute(update_query, (target_folder_id, file_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"File with ID {file_id} moved successfully."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()

