const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://satyamraj2779:mnIIGMLQs2j9gWdD@primarydatabase.chml9g6.mongodb.net/devTinder"); 

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://satyamraj2779:mnIIGMLQs2j9gWdD@primarydatabase.chml9g6.mongodb.net/devTinder"); 
};

module.exports= connectDB;

