from dal.mysql_connection import get_database_connection
from exceptions import CustomHTTPException
from dal.threeDots import update_is_deleted_file,update_is_deleted_folder


def permanently_delete_file(file_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    delete_query = "DELETE FROM file WHERE id=? AND user_id=?;"

    try:
        cursor.execute(delete_query, (file_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"File with ID {file_id} permanently deleted."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()


def permanently_delete_folder(folder_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    delete_files= "DELETE FROM file WHERE parent_id=? AND user_id=?;"
    delete_folders= "DELETE FROM folder WHERE parent_id=? AND user_id=?;"
    delete_query = "DELETE FROM folder WHERE id=? AND user_id=?;"

    try:
        cursor.execute(delete_files, (folder_id, user_id))
        cursor.execute(delete_folders, (folder_id, user_id))
        cursor.execute(delete_query, (folder_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"Folder with ID {folder_id} permanently deleted."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()


def restore_file(file_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    restore_query = update_is_deleted_file()

    try:
        cursor.execute(restore_query, ("0",file_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"File with ID {file_id} restored successfully."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()


def restore_folder(folder_id,user_id):

    connection = get_database_connection()
    cursor = connection.cursor()
    restore_query = update_is_deleted_folder()

    try:
        cursor.execute(restore_query, ("0",folder_id, user_id))
        connection.commit()

        return {
            "status": "success",
            "msg": f"Folder with ID {folder_id} restored successfully."
        }
    except Exception as e:
        connection.rollback()
        raise CustomHTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    finally:
        cursor.close()


