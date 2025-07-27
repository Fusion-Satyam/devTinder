const express = require('express');
const connectDB = require('./config/database');
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middleware/auth');


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



 

//GET USER  BY EMAIL ID
// app.get("/user", async(req,res)=>{
//     const userMail = req.body.emailId;
//     try{
//         const users = await User.findOne({emailId:userMail});
//         //if(users.length === 0){
//           //  res.status(404).json({message: "User not found"});
//         if(!users){
//             res.status(404).json({message: "User not found"});
//          }
//         else{
//             res.send(users);
//         }
//     }catch{
//         res.status(400).send("Something went wrong");
//     }
// });


// //GET FEED (ALL USERS)
// app.get("/feed",async (req,res)=>{
//     try{
//         const users = await User.find({});
              
//         res.send(users);

//     }catch{
//         res.status(400).send("Something went wrong");
//     }
// });


// //DELETE USER BY ID
// app.delete("/user", async (req,res)=>{
//      const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete({_id:userId});
//             res.send("User deleted successfully");
//     }catch{
//         res.status(400).send("Something went wrong");
//     }
// });


connectDB().then(()=>{
    console.log("Databse connection is succesfully...");
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    });
}).catch(err=>{
    console.error("Databse cannot be connected");
});

