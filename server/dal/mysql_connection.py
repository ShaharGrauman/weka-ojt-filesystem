import mysql.connector
import mysql_details


def get_database_connection():

    # Establish a connection to the MySQL server
    connection = mysql.connector.connect(
        host=mysql_details.host,
        user=mysql_details.user,
        password=mysql_details.password,
        database=mysql_details.database,
        port=mysql_details.port
    )
    if connection.is_connected():
        print("Connected to MySQL database")
    else:
        print("Failed to connect to MySQL database")
    return connection


