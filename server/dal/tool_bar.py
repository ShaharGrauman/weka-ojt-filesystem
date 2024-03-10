from typing import Dict, List
from dal.mysql_connection import get_database_connection
from dal.mysql_connection import get_database_connection
from common.HTTPExceptions.exceptions import CustomHTTPException
import mysql

connection = get_database_connection()

# Define the search function
def search(username: str, search_string: str) -> List[dict]:
    try:
        # Establish a connection to the database
        with get_database_connection() as conn:
            cursor = conn.cursor(dictionary=True)

            # Define the search query
            search_query = """
            SELECT id, name, 'file' AS type
            FROM file
            WHERE user_id = (SELECT id FROM users WHERE username = %s) 
                AND is_deleted = 0 
                AND name LIKE CONCAT(%s, '%')
            UNION ALL
            SELECT id, name, 'folder' AS type
            FROM folder
            WHERE user_id = (SELECT id FROM users WHERE username = %s) 
                AND is_deleted = 0 
                AND name LIKE CONCAT(%s, '%');
            """

            # Execute the search query
            cursor.execute(search_query, (username, '%' + search_string + '%', username, '%' + search_string + '%'))

            # Fetch all search results
            search_results = cursor.fetchall()

            return search_results
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return []


# Sorting function
def sort_files(user_id: int, category: str, criteria: str) -> List[dict]:
    conn = get_database_connection()
    cursor = conn.cursor()
    
    # Define the sorting query based on the criteria
    if criteria == "name":
        sort_query = f"SELECT * FROM file WHERE user_id = {user_id} AND is_deleted = 0 AND category = '{category}' ORDER BY name"
    elif criteria == "date":
        sort_query = f"SELECT * FROM file WHERE user_id = {user_id} AND is_deleted = 0 AND category = '{category}' ORDER BY upload_date"
    else:
        raise CustomHTTPException("Invalid sorting criteria")

    cursor.execute(sort_query)
    sorted_files = cursor.fetchall()
    return sorted_files




def add_folder(name, parent_id, user_id):
    conn = get_database_connection()
    cursor = conn.cursor()
    folder_path="/path/to/new/folder"

    try:
        # Find the highest counter for the base name
        query_max_counter = "SELECT MAX(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(name, '(', -1), ')', 1) AS UNSIGNED)) FROM folder WHERE name LIKE %s AND parent_folder = %s"
        cursor.execute(query_max_counter, (f"{name}%", parent_id))
        max_counter = cursor.fetchone()[0]

        if max_counter is None:
            # If no folders with the same base name exist, use the base name directly
            new_name = name
        else:
            # If folders with the same base name exist, append the next available counter
            new_name = f"{name}({max_counter + 1})"

        # Insert new folder into the database
        query_insert = "INSERT INTO folder (name, user_id, parent_folder, is_deleted, Path, upload_date) VALUES (%s, %s, %s, %s, %s, NOW())"
        cursor.execute(query_insert, (new_name, user_id, parent_id, False, folder_path))
        conn.commit()
        print("Folder added successfully.")

    except mysql.connector.Error as error:
        print("Error adding folder:", error)
        raise CustomHTTPException(status_code=500, detail="Failed to add folder")

    finally:
        if (conn.is_connected()):
            cursor.close()
            conn.close()
