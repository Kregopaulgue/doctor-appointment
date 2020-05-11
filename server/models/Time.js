const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    time: String
});

const TimeModel = mongoose.model('Times', TimeSchema);

module.exports = {
    TimeModel
}