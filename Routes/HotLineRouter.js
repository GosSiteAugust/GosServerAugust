const express = require("express");
const app = express();
const HotLineController = require('../Controller/HotLineController')

app.get('/', async (req,res)=>{
    await HotLineController.getHotLineNumber(req,res)
})
app.post('/add', async(req,res)=>{
    await HotLineController.addHotLineNumber(req,res)
})
module.exports = app;