const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/ecommrce',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true
})