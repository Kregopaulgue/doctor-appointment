const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    }
});

const RoleModel = mongoose.model('Roles', RoleSchema);

module.exports = {
    RoleModel
}

