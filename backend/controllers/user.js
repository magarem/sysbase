const path = require('path');
const Shark = require('../models/user');
exports.index = function (req, res) {
    res.sendFile(path.resolve('views/user.html'));
};
