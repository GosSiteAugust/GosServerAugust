const Photo = require('../models/User_Photo')
class ImagesController{
    async add(req,res) {
        console.log(req.body)
        try {
            const newPhoto = new Photo({
              filename: req.body.file.filename,
              path: req.body.file.path,
            });
            await newPhoto.save();
            res.send('Photo uploaded successfully');
          } catch (err) {
            console.error('Error uploading photo: ', err);
            res.status(500).send('Internal Server Error');
          }
    }
    async get(req,res) {
        try {
            const photos = await Photo.find({}, 'url');
            res.json(photos);
        } catch (err) {
            console.error('Error getting photos: ', err);
            res.status(500).send('Internal Server Error');
        }
    }
    async getByID(req,res) {
        const photoId = req.params.id;
        try {
            const photo = await Photo.findById(photoId, 'url');
            if (!photo) {
                return res.status(404).send('Photo not found');
            }
            res.json(photo);
        } catch (err) {
            console.error('Error getting photo by ID: ', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ImagesController()