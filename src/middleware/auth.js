const jwt = require("jsonwebtoken");
const User = require("../models/user");



const userAuth = async (req,res,next)=>{
   //Read the token from cookies
   try{

   const {token} = req.cookies;
    const decodedObj = await jwt.verify(token, "DEV_TINDER@JWT$123");

   //Validate the token
   const {_id} = decodedObj;
    const user = await User.findById(_id);

    if(!user){
        throw new Error("User does not exist");
    }
    
    req.user = user;
    next();
    }catch(err) {
        res.status(404).send("ERROR: " + err.message);
    }

};

module.exports = {
    userAuth,
};