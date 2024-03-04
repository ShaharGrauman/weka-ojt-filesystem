import mysql.connector
from .config import host, user, password, database , port


def get_database_connection():

    # Establish a connection to the MySQL server
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=port
    )
    if connection.is_connected():
        print("Connected to MySQL database")
    else:
        print("Failed to connect to MySQL database")
    return connection


def initialize_db():
    # Establish a connection to the MySQL server
    connection = get_database_connection()

    # Create a cursor object to interact with the database
    cursor = connection.cursor()
    
    # Commit the changes and close the cursor and connection
    connection.commit()
    cursor.close()
    connection.close()







