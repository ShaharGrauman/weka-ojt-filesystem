


function validate_pass_format(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) {
        return true;
    } else {
        return false;
    }
}



function validate_email_format(email) {
    
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

