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
    username:{
        type:String,
        required: true,
        trim: true,
        unique:true,
        // validate(value){
        //     if(!validator.isAlphanumeric(value ,'en-US')) throw new Error ('check username')	
        // }
    },
    password:{
        type:String,
        lowercase:true,
        trim:true,
        required: true,
    //     validate(value){
    //         if(
    // validator.isStrongPassword(value,{ returnScore: true }))
    //          throw new Error('weak pass')}   
        
    },
    type:{
        type:Boolean,  
    },
    // image:{
    //     type:String,
    //     default:"-"
    // },
    phone:{
        type:String
    },
    tokens:[
        {token:{type:String, required:true}}
    ]
},
{timestamps: true}
)

userSchema.methods.toJSON =  function(){
    const user = this.toObject()
    delete user.password
    delete user.type
    delete user.token
    return user
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id}, 'zZZZZzzzZAAQQ')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password) =>{
    const user = await Users.findOne({username})
    console.log(user);
    if(!user) throw new Error('')
    console.log(password);
    console.log(user.password);
    const matched = await bcrypt.compare(password, user.password)
    console.log(matched);
    if(!matched) throw new Error('')
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 13)
    next()
})


const Users = mongoose.model('Users', userSchema)
module.exports = Users