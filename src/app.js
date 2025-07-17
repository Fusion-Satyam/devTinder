const express = require('express');
const connectDB = require('./config/database');
const User = require("./models/user");
const app = express();

app.post("/signup", async (req,res)=>{
  
    
    // creating a new instance of the User Model
    const user = new User({
        firstName : "satyam",
        lastName : "raj",
        emailId : "satyam@raj.com",
        password :"satyam@123"
    });
    try {
        // saving the user to the database
        await user.save();
        res.send("User added succesfully");
    }catch(err){
        res.status(400).send("Error saving the data"); 
    }
    
});

connectDB().then(()=>{
    console.log("Databse connection is succesfully...");
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    });
}).catch(err=>{
    console.error("Databse cannot be connected");
});

