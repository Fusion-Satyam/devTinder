const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require('../middleware/auth');

//GET PROFILE
profileRouter.get("/profile", userAuth , async (req, res) => {

    try {
    
    const user = req.user; // Assuming user is set in the auth middleware
    res.send(user); 

    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }

});


module.exports = profileRouter;