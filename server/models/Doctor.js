const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    speciality: mongoose.Schema.Types.ObjectId
});

const DoctorModel = mongoose.model('Doctors', DoctorSchema);

module.exports = {
    DoctorModel
}