const HotLineModel = require('../models/HotLine')

class HotLineController {
    async getHotLineNumber(req,res) {
        try {
            const hotlines = await HotLineModel.find();
            res.status(200).send(hotlines)
        } catch (error) {
            console.error("Error getting hotline numbers:", error);
        }
    }

    async addHotLineNumber(req, res) {
        try {
            const newHotline = new HotLineModel({ number: req.body.number });
            const savedHotline = await newHotline.save();
            res.status(200).send(savedHotline);
        } catch (error) {
            console.error("Error adding hotline number:", error);
            res.status(500).send("Error adding hotline number");
        }
    }
}

module.exports = new HotLineController();
