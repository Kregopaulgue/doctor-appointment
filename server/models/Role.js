const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        unique: true
    }
});

const RoleModel = mongoose.model('Roles', RoleSchema);

module.exports = {
    RoleModel
}

