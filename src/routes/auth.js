const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require('../utils/validation');
const User = require("../models/user");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');


//POST /users
authRouter.post("/signup", async (req,res)=>{

    try{
         // Validate the signup data
        validateSignupData(req);

        const {firstName, lastName, emailId ,password} = req.body;
        
        //Encrypt the password
        
        const passwordHash = await bcrypt.hash(password, 10);
                

        // creating a new instance of the User Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });


        // Save the user to the database
        await user.save();
        res.status(201).json({message: "User created successfully"}); 
    }
   
   catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});



//POST /login
authRouter.post("/login", async (req,res) => {
    try {
        const { emailId, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        // Compare the password with the hashed password in the database

        const isPasswordValid = await user.validatePassword(password);
        
        if (isPasswordValid) {
            
            const token = await user.getJWT();  

            // Set the token in a cookie
            res.cookie("token", token,{expires: new Date(Date.now() + 8*3600000)
            });
            res.send("Login successful");

        } else {
            throw new Error("Invalid credentials");
        }

    }catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});
 

authRouter.post("/logout", (req, res) => {
    try{
        res.cookie("token",null,{expires: new Date(Date.now())});
        res.send("Logout successful"); 
    }catch(err) {
       throw new Error("Logout failed");

    }
});





module.exports = authRouter;