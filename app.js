require('dotenv').config();
const mongoose = require('mongoose');
const connect = process.env.CONNECTING_STRING
const express = require("express")
const app = express()
const cors = require('cors'); 
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));

const UserRouter = require('./Routes/UserRouter')
const HotLineRouter = require('./Routes/HotLineRouter')
const ImageRouter = require('./Routes/ImageRouter')
app.use('/hotline', HotLineRouter)
app.use('/user', UserRouter)
app.use('/image', ImageRouter)
app.listen(PORT, ()=>{
    mongoose.connect(connect)
    console.log("server start at "+ PORT)
})