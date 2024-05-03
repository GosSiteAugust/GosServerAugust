const User_model = require('../models/User')
const User_Contacts = require('../models/User_Contacts');
const User_Apps = require('../models/User_Apps');
const User_Messages = require('../models/User_Messages')
const User_Photo = require('../models/User_Photo')
const MessagesController = require('./MessagesController');
class User {
    async addUser(req, res) {
        try {
            const existingUser = await User_model.findOne({ ID: req.body.user_data.phoneNumber });
            if (existingUser) {
                return res.status(400).send("Пользователь с таким номером телефона уже существует");
            }
            else {
                const userData = {
                    ID: req.body.user_data.phoneNumber,
                    isClickApp: req.body.user_data.isClickApp,
                    permissionSms: req.body.user_data.permissionSms
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
            const existingUser = await User_model.findOne({ ID: userId });
            res.status(200).send({ existingUser });

        } catch (error) {
            console.log('Ошибка при получении данных пользователя:', error);
            res.status(500).send('Ошибка при получении данных пользователя');
        }
    }
    async addUserMessage(req, res) {
        console.log(req.body)
        await MessagesController.addMessages(req, res)
        res.status(200).send("Succesful saved!")
    }
}

module.exports = new User();