const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    email :{
        required :true,
        type : String
    },
    password:{
        required :true,
        type:String,
        minlength:6
    }
})

const userModel = new mongoose.model("users",userSchema)

module.exports = userModel;