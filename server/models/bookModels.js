const mongoose  = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    published_by: String,
    published_on:{
        type:Date,
        default:new Date()
    },
    ISBN:String
})

const bookModel=new mongoose.model("bookData",bookSchema)

module.exports = bookModel;