//import library
const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const knex = require('../config/database')

//variable table name
const _table = "posts"


/**
 * INDEX POSTS
 */
router.get("/", async(req, res) => {
    try{
        let posts = await knex(_table).orderBy("id", "desc");
        return res.status(200).json({
            status: true, 
            message: "List Data Postingan", 
            datas: posts
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
                status: false, 
                message: "Internal Server Error",
                error: e
            })
    }
})

/**
 * STORE POST
 */
router.post('/store', [
    body("title").notEmpty(),
    body("content").notEmpty()    
], async (req, res) => {
    
    const error = validationResult(req);
    //validasi inputan
    if(!error.isEmpty()){
        return res.status(422).json({
            errors: error.array()
        })
    }


    try{
        let title = req.body.title
        let content = req.body.content

        let id = await knex(_table).insert({
            "title": title,
            "content": content
        })

        let newPost = await knex(_table).where("id", id[0]).first()

        return res.status(201).json({
            status: true, 
            message: "Insert Data Successfully",
            data: newPost
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
                status: false, 
                message: "Internal Server Error",
                error: e
            })
    }

})

/**
 * SHOW POST
 */
router.get('/(:id)', async(req, res) => {
    try{
        let id = req.params.id;
        let posts = await knex(_table).where("id", id);
        if(posts.length > 0){
            return res.status(200).json({
                status: true, 
                message: "Detail Data Post", 
                data: posts[0]
            })
        }else{
            return res.status(404).json({
                status: false,
                message: "No Data"
            })
        }
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error", 
            error, e
        })
    }
})

/**
 * UPDATE POST
 */
router.put('/update/:id', [
    body("title").notEmpty(),
    body("content").notEmpty()
], async (req, res) => {
     try {
        //get id
        let id = req.params.id;

        //get body data
        let title = req.body.title;
        let content = req.body.content;

        let update = await knex(_table).where("id", id).update({
            "title": title, 
            "content": content
        })
        .catch(function(erro){
            return res.status(500).json({
                status: false, 
                message: "Internal Server Error",
                error: erro
            })            
        })

         return res.status(200).json({
                status: true, 
                message: "Update Data Successfully"
            })
        
       
    } catch (e) {
        console.log(e);
        return res.status(500).json({
                status: false, 
                message: "Internal Server Error",
                error: e
            })
    }


})

/**
 * DELETE POST
 */
router.delete('/delete/(:id)', async function(req, res){
    try{
        let id = req.params.id;

        await knex(_table).where("id", id).del()
        .catch(function(error){
            return res.status(500).json({
                status: false,
                message: "Internal Server Error", 
                error: error
            })            
        })

        return res.status(200).json({
            status: true, 
            message: "Delete Data Successfully",            
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error", 
            error, e
        })        
    }
})


module.exports = router;