const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema ({
        nome: { type: String, required: true },
        role: { type: String, required: true },
});

module.exports = mongoose.model('User', user)
