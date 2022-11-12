export const RegisterCheck = (userName,email,password,type,MobileNo) => {
    if (userName === "") {
        return "Error: User field empty!!";
      }
    
      if (userName.length <= 4) {
        return "Error: Length of your User Name should be greater than or equal to 5!!"
      }
    
      if (type === "") {
        return "Error: User type field empty!!";
      }

      if (email === "") {
        return "Error: E-Mail field empty!!";
      }
      else {
        if (email.includes("@thapar.edu") === false) {
            return "Error: Only thapar.edu e mail supported!!";
      }
    
      if (MobileNo == "") {
        return "Error: Mobile number field empty!!";
      }
    
      for (let i = 0; i < MobileNo.length; i++) {
        if (MobileNo[i].match(/[0-9]/g) == null) {
          return "Mobile Number should contain only numbers!!"
        }
      }
    
      if (MobileNo.length !== 10) {
        return "Error: Mobile Number length should be 10!!";
      }
    
      if (password === "") {
        return "Error: Password field is empty!!";
      }
    
      if (password.match(/[A-Z]/g) != null) {
        if (password.match(/[a-z]/g) != null) {
          if (password.match(/[0-9]/g) != null) {
            if (password.length >= 8) { }
            else {
              return "Error: Length of password should be greater than or equal to 8!!";
            }
          }
          else {
            return "Error: Password should contain atleast one number!!";
          }
        }
        else {
          return "Error: Password should contain atleast one lowercase letter!!";
        }
      }
      else {
        return "Error: Password should contain atleast one uppercase letter!!";
      }
    
      return true;
}}