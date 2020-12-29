const express = require('express')
const ecoAuth = require('../middleware/auth')
const router = new express.Router()
const Users = require('../models/users')
router.post('/user/register',  async(req,res)=>{
    const user = new Users(req.body)
    try{
        await user.save()
        console.log(user.password);
        const token = await user.generateToken()
        console.log(user.password);
        res.status(200).send({
            status:1,
            data: user,
            msg: 'data inserted',
            token: token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'error inserting data',
            token: ""
        })
    }
   
})

router.get('/getUsers', ecoAuth, async (req,res)=>{
    try{
        const user = await User.find({})
        res.status(200).send({
            status:1,
            data: user,
            msg: 'all users selected',
            me: req.data
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading users data'
        })
    }
})

router.delete('/user/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const user = await Users.findByIdAndDelete(_id)
        if(!user){
            res.status(200).send({
                status:2,
                data:"",
                msg:"user not found"
            })
        }
        res.status(200).send({
            status:1,
            data: user, 
            msg:"user data deleted successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete data"
        })
    }
})

router.post('/login',  async(req,res)=>{
    try{
        const user = await Users.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateToken()
        res.send({
            status:1,
            data:user,
            msg:"logged in",
            token: token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"err in data",
            token:""
        })
    }
})


module.exports = router