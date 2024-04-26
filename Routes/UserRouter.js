const express = require("express");
const app = express();
const UserController = require("../Controller/User")

app.get('/', async (req,res)=>{
    await UserController.getUsers(req,res);
})
app.get('/:phoneNumber', async(req,res)=>{
    await UserController.GetUserByPhoneNumber(req,res)
})
app.get('/data/:phoneNumber',async(req,res)=>{
    await UserController.getUserData(req,res)
})
app.post('/add', async(req,res)=>{
    await UserController.addUser(req,res)
})
app.post('/add/message', async(req,res)=>{
    await UserController.addUserMessage(req,res)
})
module.exports = app;