const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const User = require("../models/user");
const ConnectionRequest= require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try{

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        allowedStatuses = ['ignore', 'interested'];
        if (!allowedStatuses.includes(status)) {
            throw new Error(`Invalid status type: ${status}.`);
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {  
            return res.status(404).json({
                message: "User not found.",
            });
        }
        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,

        });

        const existingRequest = await ConnectionRequest.findOne({
           $or:[
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
           ],
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "Connection request already exists between these users.",})
        }
        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + "is"+status + "in" + toUser.firstName,
            data,
        });

    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});




module.exports = requestRouter;

