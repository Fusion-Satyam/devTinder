const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




const userSchema = new mongoose.Schema({

    


    firstName : {
        type:String,
        minlength: 4,
        maxlength: 50,
    },
    lastName :{
        type :String
    },
    emailId:{
        type :String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address"+ value);
            }
        },
    },
    password :{
        type :String,
         validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password"+ value);
            }
        },
    },
    age:{
        type :Number
    },
    gender :{
        type :String,
        enum: {
            values:["male","female","other"],
            message: `{VALUE} is not a valid gender type`
            },
        
        // validate(value){
        //     if(["male","female","other"].includes(value)){ 
        //         throw new Error("Gender is not valid");
        // } 

    // },
  },
    photoUrl :{
        type :String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL for photo"+ value);
            }
        }
    },
    about :{
        type :String,
        default: "Hey there! I am using this app.",

    },
    skills :{
        type :[String]
    },

},{timestamps: true,});

userSchema.methods.getJWT = async function() {

    const user = this;
    const token = await jwt.sign({ _id: user._id},"DEV_TINDER@JWT$123",{expiresIn: "7d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    
    return isPasswordValid;

}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;