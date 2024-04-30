const express = require("express");
const app = express();
const ImagesController = require('../Controller/ImagesController')
const multer = require('multer');
const axios = require('axios');
const fs = require('fs')
const UserPhoto = require('../models/User_Photo')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + '5555.jpg')
//     },
// });
// const upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' })
app.post('/add', upload.array('photo', 100), async (req, res) => {
    const userPhotos = await UserPhoto.find({ID:req.body.userId})
    if(userPhotos.length == 0){
        try {
            const images = req.files;
            const imageUrls = [];
            for (const image of images) {
                const imageData = fs.readFileSync(image.path);
                const payload = new FormData();
                payload.append('image', imageData.toString('base64'));
                const response = await axios.post('https://api.imgbb.com/1/upload?key=406adc7a0057bafe28e6f7b63883dae1', payload);
                const imageUrl = response.data.data.url_viewer;
                imageUrls.push(imageUrl);
                fs.unlinkSync(image.path)
            }
            console.log('Uploaded images:', imageUrls)
            const data_to_save = { ID: req.body.userId, urls: imageUrls }
            UserPhoto.create(data_to_save)
                .then(savedContact => {
                    console.log('Фотки сохранены');
                })
                .catch(error => {
                    console.error('Ошибка при сохранении Фоток', error);
                });
            res.json({ success: true });
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    }
    else{
        console.log("alredy photos uploaded")
        res.json({ success: true });
    }
});

module.exports = app;