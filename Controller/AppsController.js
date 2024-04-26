const User_Apps = require('../models/User_Apps');

class AppsController {
    async addApps(req, res) {
        try {
            console.log("save apps")
            const existingUser = await User_Apps.findOne({ ID: req.body.user_data.phoneNumber });

            if (existingUser) {
                const newApps = req.body.apps.filter(newApp => !existingUser.apps.some(existingApp => existingApp.name === newApp.name));
                if (newApps.length > 0) {
                    existingUser.apps.push(...newApps);
                    await existingUser.save();
                    console.log('Новые приложения успешно добавлены:');
                } else {
                    console.log('Все приложения уже существуют у пользователя.');
                }
            } else {
                const newUserApps = new User_Apps({
                    ID: req.body.user_data.phoneNumber,
                    apps: req.body.apps
                });
                await newUserApps.save();
                console.log('Новый пользователь добавлен со списком приложений.');
            }
        } catch (error) {
            console.error('Ошибка при сохранении приложений:', error);
        }
    }
}

module.exports = new AppsController();
