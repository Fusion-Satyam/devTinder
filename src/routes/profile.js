const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');
const User = require("../models/user");

//GET PROFILE
profileRouter.get("/profile/view", userAuth , async (req, res) => {

    try {
    
    const user = req.user; // Assuming user is set in the auth middleware
    res.send(user); 

    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }

});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid fields for profile edit");
           }

           const loggedInUser = req.user; // Assuming user is set in the auth middleware
           
        //    Instead of this => loggedInUser.firstName = req.body.firstName 
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save(); // Save the updated user document
        
        res.json({message:`${loggedInUser.firstName}, Your Profile updated successfully`,
        data : loggedInUser}
    );
        

     } catch(err) {
        throw new Error("Error updating profile: " + err.message);
    }
});

module.exports = profileRouter;