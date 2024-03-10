import mysql.connector
import mysql_details

def get_database_connection():

    # Establish a connection to the MySQL server
    connection = mysql.connector.connect(
        host='localhost',
        user=mysql_details.user,
        password=mysql_details.password,
        port='3306',
        database='filesystem'
    )
    if connection.is_connected():
        print("Connected to MySQL database")
    else:
        print("Failed to connect to MySQL database")
    return connection


# import mysql.connector
# from mysql.connector import pooling
# import mysql_details

# # Set your database connection details
# db_config = {
# "host": "localhost",
# "user": mysql_details.user,
# "password": mysql_details.password,
# "port": '3306',
# "database": 'filesystem',
# }

# # Create a connection pool
# connection_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=10, **db_config)

# def get_database_connection():
# # Get a connection from the pool
#     connection = connection_pool.get_connection()

#     if connection.is_connected():
#         print("Connected to MySQL database")
#     else:
#         print("Failed to get a connection from the pool")
#     return connection

