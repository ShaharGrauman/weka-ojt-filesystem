


function validate_pass_format(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) {
        return true;
    } else {
        return false;
    }
}



function Validate_email_format(email) {
    
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}


function Validate_match_password(pass1,pass2) {
    
   return pass1==pass2
}




export {
    Validate_email_format,
    Validate_match_password
  };
  