import re

def validate_email_format(email):
    # Regular expression for email validation
    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    # Match the email address with the regular expression
    if re.match(regex, email):
        return True
    else:
        return False



def validate_pass_format(password):
    # Regular expression for password validation
    # At least one lowercase letter, one uppercase letter, one digit
    # Minimum length of 5 characters
    regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$'
    
    # Match the password with the regular expression
    if re.match(regex, password):
        return True
    else:
        return False
    

def validate_name(name):
    # Check if the name contains only alphabetic characters
    if name.isalpha():
        return True
    else:
        return False