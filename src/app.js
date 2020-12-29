const express = require('express');
require('./db/mongoose');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
const wishRoutes = require('./routes/wish-list');



const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRoutes)


app.listen(port , ()=>{
    console.log(`server done http://localhost:${port}`);
})