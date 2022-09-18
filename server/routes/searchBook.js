const express = require("express")
const bookModel = require("../models/bookModels")
const router = express.Router()


router.post("/addbooks",async (req,res)=>{
    await bookModel.find({title: req.body.title}).then((data)=>{
        if(data.length){
            res.status(200).send(data)
        }else{
            bookModel.create({
                title: req.body.title,
                author:req.body.author,
                published_by:req.body.published_by,
                published_on:req.body.published_on,
                ISBN:req.body.ISBN
            }).then((book)=>{
                res.status(200).send({book})
            }).catch((err)=>{
                res.status(400).send(err)
            })
        }
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get("/books/:search",async (req,res)=>{
    let book = await bookModel.find({
        "$or":[
            {"title":{$regex:req.params.search}},
            {"ISBN":{$regex:req.params.search}}
        ]
    })
    if(book.length){
        res.status(200).send(book)
    }else{
        res.status(400).send("book not found")
    }
})

router.put("/update/:search",async(req,res)=>{
    try {
        let key = req.params.search
        const updateBooks =  await bookModel.findOneAndUpdate(key,req.body )
        res.status(200).send(updateBooks)
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router;