const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    speciality: String,
    dayTimes: {
        monday: [mongoose.Schema.Types.ObjectId],
        tuesday: [mongoose.Schema.Types.ObjectId],
        wednesday: [mongoose.Schema.Types.ObjectId],
        thursday: [mongoose.Schema.Types.ObjectId],
        friday: [mongoose.Schema.Types.ObjectId]
    }
});

const DoctorModel = mongoose.model('Doctors', DoctorSchema);

module.exports = {
    DoctorModel
}