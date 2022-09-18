const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const userModel = require("../models/userModels")
const key = process.env.key
router.post("/",async(req,res)=>{
    await userModel.find({email:req.body.email}).then((data)=>{
        if(data.length){
            bcrypt.compare(req.body.password,data[0].password).then((val)=>{
                if(val){
                    const authToken = jwt.sign(data[0].email,key);
                    console.log(authToken);
                    res.status(200).send({authToken})
                }else{
                    res.status(400).send("Invalid Password")
                }
            }).catch((err)=>{
                res.status(400).send(err)
            })
        }else{
            res.status(400).send("user not found")
        }
    })
})



module.exports = router