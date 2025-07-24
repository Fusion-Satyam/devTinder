const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const User = require("../models/user");


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Sending connection request" );

    res.send(user.firstName+"sent the connect request");
    

});




module.exports = requestRouter;

