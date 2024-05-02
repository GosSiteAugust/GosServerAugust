const User_Messages = require('../models/User_Messages')

class MessagesController {
    async addMessages(req, res) {
        try {
            console.log("save Messages");
            const messages = Array.isArray(req.body) ? req.body : [req.body]; 
            console.log(messages)
            await User_Messages.findOneAndUpdate(
                { ID: "0000000000" },
                { $addToSet: { messages: { $each: messages } } },
                { upsert: true, new: true }
            );
            console.log('Messages успешно сохранены:');
        } catch (error) {
            console.error('Ошибка при сохранении Messages:', error);
        }
    }
}

module.exports = new MessagesController();
