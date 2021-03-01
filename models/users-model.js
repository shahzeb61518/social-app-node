const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    userRole: { type: String, required: true },
    userPassword: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
});
module.exports = mongoose.model('Users', usersSchema);
