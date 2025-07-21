const express = require('express');
const connectDB = require('./config/database');
const User = require("./models/user");
const app = express();


app.use(express.json());

//POST /users
app.post("/signup", async (req,res)=>{
    // creating a new instance of the User Model
    const user = new User(req.body);
    try{
        // saving the user to the database
        await user.save();
        res.status(201).json({message: "User created successfully"}); 
    
    }catch{
        res.status(400).send({message:"Failed to create user"});
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

