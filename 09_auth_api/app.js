const express = require('express');
const cors = require('cors');
const authRouter= require('./routers/auth.js');
const userRouter = require('./routers/users.js');


const app= express();


app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use("/", userRouter);

app.use((err, req, res, next)=>{
const{status=500, message= "Server error"}=err;
res.status(status).json({message});
});




module.exports = app;
