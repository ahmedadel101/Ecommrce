const jwt = require('jsonwebtoken')
const User = require('../models/users')

const authMe = async(req, res, next)=>{
    next()
}
module.exports = authMe