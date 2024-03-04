import json
from dal.mysql_connection import get_database_connection
import mysql.connector

connection = get_database_connection()


def check_email_exist(email):
    with connection.cursor() as cursor:
            # Execute the query to check if the email exists
            sql = "SELECT COUNT(*) FROM users WHERE email = %s"
            cursor.execute(sql, (email,))
            result = cursor.fetchone()
            # If result is greater than 0, email exists, return True
            return result[0] > 0
    return False

def add_user(user):
    try:
        cursor = connection.cursor()
        # Execute the query to insert the user into the database
        sql = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(sql, (user.name, user.email, user.password))
        # Commit the transaction
        connection.commit()
    except mysql.connector.Error as error:
        print("Error adding user:", error)



def get_user_details(email, password):
    connection = get_database_connection()
    cursor = connection.cursor()

    # Fetch user details based on email and plain text password
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()

    # Close cursor and connection
    cursor.close()
    connection.close()
    
    if user:
        user_dict = {
            "id": user[0],
            "username": user[1],
            "email": user[2],
            "password":user[3],
        }
        # Serialize dictionary to JSON
        user_json = json.dumps(user_dict)
        return user_json
    else:
        return None

