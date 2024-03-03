from dal.mysql_connection import get_database_connection

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


