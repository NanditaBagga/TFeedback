export const CheckPassword = (password) => {
    
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

    return true
}

export const CheckMobile = (MobileNo) => {
    
      for (let i = 0; i < MobileNo.length; i++) {
        if (MobileNo[i].match(/[0-9]/g) == null) {
          return "Error: Mobile Number should contain only numbers!!"
        }
      }
    
      if (MobileNo.length !== 10) {
        return "Error: Mobile Number length should be 10!!";
      }

    return true
}