const express = require('express');
const connectDB = require('./config/database');
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();
const { validateSignupData } = require('./utils/validation');


app.use(express.json());

//POST /users
app.post("/signup", async (req,res)=>{

    try{
         // Validate the signup data
        validateSignupData(req);

        const {firstName, lastName, emailId ,password} = req.body;
        
        //Encrypt the password
        
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("Password Hash:", passwordHash);        

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

app.post("/login", async (req,res) => {
    try {
        const { emailId, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        // Compare the password with the hashed password in the database
        // bcrypt.compare returns a promise that resolves to true or false


        // const isPasswordValid = await bcrypt.compare(password, user.password);  //NOT WORKING

        const isPasswordValid = bcrypt.compare(password, user.password);//WORKING 

        // Validate the login data
        if (isPasswordValid) {
            res.send("Login successful");
        } else {
            throw new Error("Invalid credentials");
        }

    }catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

//GET USER  BY EMAIL ID
app.get("/user", async(req,res)=>{
    const userMail = req.body.emailId;
    try{
        const users = await User.findOne({emailId:userMail});
        //if(users.length === 0){
          //  res.status(404).json({message: "User not found"});
        if(!users){
            res.status(404).json({message: "User not found"});
         }
        else{
            res.send(users);
        }
    }catch{
        res.status(400).send("Something went wrong");
    }
});

//GET FEED (ALL USERS)
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
              
        res.send(users);

    }catch{
        res.status(400).send("Something went wrong");
    }
});

//DELETE USER BY ID
app.delete("/user", async (req,res)=>{
     const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id:userId});
            res.send("User deleted successfully");
    }catch{
        res.status(400).send("Something went wrong");
    }
});

//UPDATE USING PATCH 
app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    
     try{
         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills", "age"];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update is not allowed");

        }

        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument : "after",
            runValidators : true,
        });
         console.log(user);
            res.send("User updated successfully");    
    }catch(err){
        res.status(400).send("Update is failed"+err.message);
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

