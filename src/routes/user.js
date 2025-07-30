const express = require("express");
const userRouter = express.Router();
const { userAuth } = require('../middleware/auth'); 
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName skills photoUrl about age gender";


userRouter.get("/user/requests/received" ,userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status :"interested",           
        }).populate("fromUserId",
            "firstName lastName photoUrl about age gender skills");


        res.json({
            message: "Data fetched successfully.",
            data: connectionRequests,
        });

    }catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
        $or: [
            {toUserId: loggedInUser._id , status: "accepted"},
            {fromUserId: loggedInUser._id, status: "accepted"},

        ],
    }).populate("fromUserId",USER_SAFE_DATA)
    .populate("toUserId",USER_SAFE_DATA);

         
    const data = connectionRequest.map((row)=> {
    if(row.fromUserId.id.toString() === loggedInUser._id.toString() ) 
         {
           
           return row.toUserId;
        }
        return row.fromUserId;
    });

     res.json({data});
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }


   
});

module.exports = userRouter;


