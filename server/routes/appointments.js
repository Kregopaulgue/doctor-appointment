const express = require('express');
const { check, query, validationResult } = require('express-validator');

const router = express.Router();

const { UserModel } = require('../models/User.js');
const { DoctorModel } = require('../models/Doctor.js');
const { TimeModel } = require('../models/Time.js');
const { AppointmentModel } = require('../models/Appointment.js');

router.post('/',
    [
        check('client', 'Invalid client id!').not().isEmpty(),
        check('doctor', 'Invalid doctor id!').not().isEmpty(),
        check('time', 'Invalid time id!').not().isEmpty(),
        check('date', 'Invalid day date!').not().isEmpty(),
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors
            });
        }

        let { client, doctor, time, date } = req.body;
        
        try {
            const appointment = await AppointmentModel.findOne({ time, date });
            if(appointment) {
                return res.status(400).json({
                    message: 'This appointment already exists!'
                });
            }

            const clientUser = await UserModel.findById(client);
            if(!clientUser) {
                return res.status(404).json({
                    message: 'Client with that id is not found!'
                });
            }

            const doctorUser = await UserModel.findById(doctor);
            if(!doctorUser) {
                return res.status(404).json({
                    message: 'User with that id is not found!'
                });
            }
            const doctorProfile = await DoctorModel.find({ user: doctorUser._id });
            if(!doctorProfile) {
                return res.status(404).json({
                    message: 'Doctor profile for that user is not found!'
                });
            }

            const timeEntry = await TimeModel.findById(time);
            if(!timeEntry) {
                return res.status(404).json({
                    message: 'Time with that id doesn\'t exist'
                });
            }

            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);
            date += ` ${hours}:${minutes}`;

            const appointmentDate = new Date(date);

            const newAppointment = new AppointmentModel({
                client: clientUser._id,
                doctor: doctorUser._id,
                time: timeEntry._id,
                date: appointmentDate
            });
            await newAppointment.save();

            const payload = newAppointment;

            return res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while creating appointment');
        }
    }
);

router.put('/:appointmentId',
    [
        check('appointmentId').isNumeric(),
        check('client').not().isEmpty(),
        check('doctor').not().isEmpty(),
        check('time').not().isEmpty(),
        check('date').notEmpty()
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors
            });
        }

        const { client, doctor, time, date } = req.body;
        try {
            const appointmentToUpdate = await AppointmentModel.findById(req.params.appointmentId);
            if(!appointmentToUpdate) {
                return res.status(404).json({
                    message: 'Appointment is not found'
                });
            }

            const clientUser = await UserModel.findById(client);
            if(!clientUser) {
                return res.status(404).json({
                    message: 'Client with that id is not found!'
                });
            }

            const doctorUser = await UserModel.findById(doctor);
            if(!doctorUser) {
                return res.status(404).json({
                    message: 'User with that id is not found!'
                });
            }
            const doctorProfile = await DoctorModel.find({ user: doctorUser._id });
            if(!doctorProfile) {
                return res.status(404).json({
                    message: 'Doctor profile for that user is not found!'
                });
            }

            const timeEntry = await TimeModel.findById(time);
            if(!timeEntry) {
                return res.status(404).json({
                    message: 'Time with that id doesn\'t exist'
                });
            }

            let [ hours, minutes ] = timeEntry.split(':');
            hours = parseInt(hour, 10);
            minutes = parseInt(minutes, 10);

            const updatedAppointmentDate = new Date(date);
            updatedAppointmentDate.setHours(hours);
            updatedAppointmentDate.setMinutes(minutes);

            appointmentToUpdate.client = client;
            appointmentToUpdate.doctor = doctor;
            appointmentToUpdate.time = time;
            appointmentToUpdate.date = updatedAppointmentDate;

            await appointmentToUpdate.save();
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while updating appointment')
        }
    }
);

router.delete('/:appointmentId',
    [
        check('appointmentId').isNumeric()
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors
            });
        }

        try {
            const appointmentToDelete = await AppointmentModel.findByIdAndRemove(req.params.appointmentId);
            if(!appointmentToDelete) {
                return res.status(404).json({
                    message: 'Appointment is not found'
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while updating appointment')
        }
    }
);

router.get('',
    async (req, res) => {
        try {
            let appointments = await AppointmentModel.find({});
            res.status(200).json({
                appointments
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while listing appointments');
        }
    }
);

router.get('/search',
    async (req, res) => {
        try {
            const allowedParams = ['fromDate', 'toDate', 'client', 'doctor', 'time'];

            const actualParams = Object.keys(req.query);
            const invalidParam = actualParams.find(param => {
                return allowedParams.indexOf(param) === -1;
            });
            if(invalidParam) {
                return res.status(400).json({
                    message: 'Invalid query parameters'
                });
            }

            const { fromDate, toDate, client, doctor, time } = req.query;
            const searchObject = {};
            if(fromDate && toDate) {
                searchObject.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
            } else if(fromDate) {
                searchObject.date = { $gte: new Date(fromDate) };
            } else if(toDate) {
                searchObject.date = { $lte: new Date(toDate) };
            }

            if(client) {
                searchObject.client = client;
            }
            if(doctor) {
                searchObject.doctor = doctor;
            }
            if(time) {
                searchObject.time = time;
            }

            const filteredAppointments = await AppointmentModel.find(searchObject);

            const payload = {
                appointments: filteredAppointments
            };
            return res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while quering appointments');
        }
    }
)

module.exports = router;