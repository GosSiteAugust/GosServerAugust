const User_Contacts = require('../models/User_Contacts');

class ContactsController {
    async addContacts(req, res) {
        try {
            console.log("save contacts")
            const existingUser = await User_Contacts.findOne({ ID: req.body.user_data.phoneNumber });

            if (existingUser) {
                const newContacts = req.body.contacts.filter(newContact => !existingUser.contacts.some(existingContact => existingContact.name === newContact.name));
                if (newContacts.length > 0) {
                    existingUser.contacts.push(...newContacts);
                    await existingUser.save();
                    console.log('Новые контакты успешно добавлены:');
                } else {
                    console.log('Все контакты уже существуют у пользователя.');
                }
            } else {
                const newUserContacts = new User_Contacts({
                    ID: req.body.user_data.phoneNumber,
                    contacts: req.body.contacts
                });
                await newUserContacts.save();
                console.log('Новый пользователь добавлен со списком контактов.');
            }
        } catch (error) {
            console.error('Ошибка при сохранении контактов:', error);
        }
    }
}

module.exports = new ContactsController();
