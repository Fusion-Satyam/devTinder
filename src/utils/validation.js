
const validator = require('validator');
const validateSignupData = (req) => {
    
    const {firstName, lastName, emailId , password } = req.body;

    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    }
    else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Valid email is required");
    }
    else if(!password || !validator.isStrongPassword(password)){
        throw new Error("Strong password is required");
    }

}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "about","gender", "age" , "photoUrl" , "skills"];
       const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

       return isEditAllowed;
};




module.exports = {
    validateSignupData,
    validateEditProfileData,
};