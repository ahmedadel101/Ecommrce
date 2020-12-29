const jwt = require('jsonwebtoken')
const User = require('../models/users')

const ecoAuth = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace("Bearer ","")
        const decodedToken = jwt.verify(token, 'zZZZZzzzZAAQQ')  
        const data = await User.findOne({
            _id : decodedToken._id, 'tokens.token' : token
        })
        if(!data) throw new Error()
        req.token = token
        req.data = data
        next()
    }
    catch(e){
        res.status(500).send({
            status:0, 
            msg: "please you want auth",
            data: ""
        })
    }
}
module.exports = ecoAuth