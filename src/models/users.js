const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    userName:{
        type:String,
        required: true,
        trim: true,
        unique:true,
        validate(value){
            if(!validator.isAlphanumeric(value ,'en-US')) throw new Error ('check username')	
        }
    },
    password:{
        type:String,
        lowercase:true,
        required: true,
        validate(value){
            if(
    validator.isStrongPassword(value,{ returnScore: true })<25)
             throw new Error('weak pass')   
        }
    },
    type:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
        default:"-"
    },
    phone:{
        type:String
    },
    tokens:[
        {token:{type:String, required:true}}
    ]
},
{timestamps: true}
)

const Users = mongoose.model('Users', userSchema)
module.exports = User