const userAuth = ("/user",(req,res)=>{
    console.log("Admin auth is checked!!");
    const token = "xyz";
    const isAdminAuthorised = token ==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Admin not authorised");
    }else{
        next();
    }

});
const adminAuth = ("/admin",(req,res)=>{
    console.log("Admin auth is checked!!");
    const token = "xyz";
    const isAdminAuthorised = token ==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Admin not authorised");
    }else{
        next();
    }

});

module.exports = {
    userAuth,
    adminAuth
};