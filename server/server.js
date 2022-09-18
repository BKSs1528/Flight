const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const loginController = require("./routes/login")
// const signupController = require("./routes/signup")
const bookSearch = require("./routes/searchBook")

const app = express()
app.use(express.json())

let url = "mongodb://localhost:27017/ticketUsers"
let port = process.env.port || 8000

mongoose.connect(url,{useNewUrlparser: true},(err)=>{
    if(!err){
        console.log("connected to db");
    }else{
        console.log(err)
    }
})

app.listen(port,(err)=>{
    if(!err){
        console.log(`connected to port ${port}`);
    }else{
        console.log(err);
    }
})


// app.use("/signup",signupController)
// app.use("/login",loginController)
app.use("/",bookSearch)

