# devTinder APIS


## authRouter
-POST/signup
-POST/login
-POST/logout


## profileRouter
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-POST/request/send/:status/:userId
-POST/request/review/:status/:requestId

-POST/request/review/rejected/:requestId


## userRouter
-GET/connections
-POST/request/received
-GET/feed- Get you the profiles of the other users on the platform

Status :- Ignore , Interested , accepted , rejected 
