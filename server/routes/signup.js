const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

const userModel = require("../models/userModels")


const salt = Math.floor(Math.random())

router.post("/",async(req,res)=>{
    await userModel.find({
        email:req.body.email
    }).then((data)=>{
        if(data.length){
            res.status(400).send(`${email} already exists`)
        }else{
            bcrypt.genSalt(salt).then((saltHash)=>{
                bcrypt.hash(req.body.password,saltHash).then((hashedPassword)=>{
                    userModel.create({
                        email:req.body.email,
                        password:hashedPassword
                    }).then((userData)=>{
                        res.status(200).send(`${userData} sucessfully created`)
                    }).catch((err)=>{
                        res.status(400).send(err)
                    })
                })
            })
        }
    }).catch((e)=>{
        res.status(400).send({message : e.message})
    })
})



module.exports = router;