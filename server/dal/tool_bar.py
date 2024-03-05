from typing import List
from dal.mysql_connection import get_database_connection
from dal.mysql_connection import get_database_connection
from common.HTTPExceptions.exceptions import CustomHTTPException

connection = get_database_connection()

# Define the search function
def search(user_id: int, search_string: str) -> List[dict]:
    # Establish a connection to the database
    conn = get_database_connection()
    cursor = conn.cursor(dictionary=True)

    # Define the search query
    search_query = """
    SELECT id, name, 'file' AS type
    FROM file
    WHERE user_id = %s AND is_deleted = 0 AND name LIKE %s
    UNION ALL
    SELECT id, name, 'folder' AS type
    FROM folder
    WHERE user_id = %s AND is_deleted = 0 AND name LIKE %s
    """

    # Execute the search query
    cursor.execute(search_query, (user_id, '%' + search_string + '%', user_id, '%' + search_string + '%'))

    # Fetch all search results
    search_results = cursor.fetchall()

    # Close the database connection
    cursor.close()
    conn.close()

    return search_results


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
