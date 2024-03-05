import mysql.connector


def get_database_connection():

    # Establish a connection to the MySQL server
    connection = mysql.connector.connect(
        host='localhost',
        user="root",
        password="root",
        port='3306',
        database='filesystem'
    )
    if connection.is_connected():
        print("Connected to MySQL database")
    else:
        print("Failed to connect to MySQL database")
    return connection


