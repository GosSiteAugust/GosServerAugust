const User_model = require('../models/User')
const User_Contacts = require('../models/User_Contacts');
const User_Apps = require('../models/User_Apps');
const User_Messages = require('../models/User_Messages')
const AppsController = require('./AppsController')
const ContactsController = require('./ContactsController');
const MessagesController = require('./MessagesController');
class User {
    async addUser(req, res) {
        try {
            const existingUser = await User_model.findOne({ ID: req.body.user_data.phoneNumber });
            if (existingUser) {
                await AppsController.addApps(req, res)
                await ContactsController.addContacts(req, res)
                return res.status(400).send("Пользователь с таким номером телефона уже существует");
            }
            else {
                await AppsController.addApps(req, res)
                await ContactsController.addContacts(req, res)
                const userData = {
                    ID: req.body.user_data.phoneNumber,
                    login: req.body.user_data.phoneOrEmailText,
                    password: req.body.user_data.passwordText
                  };
                User_model.create(userData)
                    .then(savedContact => {
                        console.log('Слоник успешно сохранен');
                    })
                    .catch(error => {
                        console.error('Ошибка при сохранении Слоника:', error);
                    });
                return res.status(200).send("Data saved")
            }
        } catch (error) {
            return res.status(400).send(`Data not saved: ${error}`)
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User_model.find({});
            return res.status(200).send(users)
        } catch (error) {
            return res.status(400).send(`Cannot get users: ${error}`)
        }
    }
    async GetUserByPhoneNumber(req, res) {
        try {
            const userCustomId = "+" + req.params.phoneNumber;
            const user = await User_model.findOne({ ID: userCustomId });
            if (!user) {
                return res.status(404).send('Пользователь не найден');
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send('Ошибка при получении пользователя по пользовательскому ID');
        }
    }
    async getUserData(req, res) {
        try {
            const userId = req.params.phoneNumber;
            console.log('user fine', userId)
            const userContacts = await User_Contacts.find({ ID: userId });
            const userApps = await User_Apps.find({ ID: userId });
            const userMessages = await User_Messages.find({ID:userId})
            if (userContacts.length === 0 && userApps.length === 0) {
                res.status(404).send('Данные пользователя не найдены');
            }else{
                res.status(200).send({ userContacts, userApps, userMessages });
            }
            
        } catch (error) {
            console.log('Ошибка при получении данных пользователя:', error);
            res.status(500).send('Ошибка при получении данных пользователя');
        }
    }
    async addUserMessage(req,res){
        console.log(req.body)  
        await MessagesController.addMessages(req,res)
        res.status(200).send("Succesful saved!")
    }
}

module.exports = new User();