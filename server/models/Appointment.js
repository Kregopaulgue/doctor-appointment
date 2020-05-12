const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    client: mongoose.Schema.Types.ObjectId,
    doctor: mongoose.Schema.Types.ObjectId,
    time: mongoose.Schema.Types.ObjectId,

    date: Date
});

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema);

module.exports = {
    AppointmentModel
}