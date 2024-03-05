from typing import List
from dal.mysql_connection import get_database_connection
from dal.mysql_connection import get_database_connection
from common.HTTPExceptions.exceptions import CustomHTTPException

connection = get_database_connection()

# search 
def search(user_id: int, search_string: str) -> List[dict]:
    conn = get_database_connection()
    cursor = conn.cursor()
    search_query = "SELECT * FROM (SELECT * FROM file WHERE user_id = %s AND is_deleted = 0 UNION ALL SELECT * FROM folder WHERE user_id = %s AND is_deleted = 0) AS combined WHERE name LIKE %s"
    cursor.execute(search_query, (user_id, user_id, '%' + search_string + '%'))
    search_results = cursor.fetchall()
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
