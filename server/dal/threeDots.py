from dal.mysql_connection import get_database_connection


connection = get_database_connection()



def get_versions_for_file(file_id):
    conn = get_database_connection()  # Assuming get_database_connection() returns a valid database connection
    cursor = conn.cursor()

    # Fetch versions for the given file_id using a single query
    cursor.execute("""
        SELECT fv.id, fv.name, fv.upload_date 
        FROM FileVersion fv 
        INNER JOIN file f ON fv.id = f.group_version_id 
        WHERE f.id = ?
    """, (file_id,))
    versions = cursor.fetchall()

    conn.close()

    return versions