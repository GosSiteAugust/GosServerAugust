const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phoneNumberSchema = new Schema({
    id: String,
    label: String,
    number: String
});
const emailAdressesScheme = new Schema({
    id:String,
    label:String,
    email:String
})
const contactSchema = new Schema({
    ID: String,
    contacts: [{
        displayName: String,
        emailAddresses: [emailAdressesScheme],
        givenName: String,
        phoneNumbers: [phoneNumberSchema],
        postalAddresses: [String]
    }]
});

const Contact = mongoose.model('User_Contacts', contactSchema, 'User_Contacts');

module.exports = Contact;
