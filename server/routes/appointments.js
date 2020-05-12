const express = require('express');
const { check, validationResult } = require('express-validator');

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

        const { client, doctor, time, date } = req.body;
        
        try {
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

            const newAppointment = new AppointmentModel({
                client: clientUser._id,
                doctor: doctorUser._id,
                time: timeEntry._id,
                date: new Date(date)
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
        check('date').notEmpty().isISO8601().toDate()
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

            appointmentToUpdate.client = client;
            appointmentToUpdate.doctor = doctor;
            appointmentToUpdate.time = time;
            appointmentToUpdate.date = date;

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
            const appointments = await AppointmentModel.find({});
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
    [
        query('fromDate').isISO8601().toDate(),
        query('toDate').isISO8601().toDate()
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);
        if(!validationResult.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors
            });
        }

        try {
            const allowedParams = ['fromDate', 'toDate', 'client', 'doctor', 'time'];

            const actualParams = Object.keys(allowedParams);
            const invalidParam = actualParams.find(param => {
                return allowedParams.indexOf(param) === -1;
            });
            if(invalidParam) {
                return res.status(400).json({
                    message: 'Invalid query parameters'
                });
            }

            const filteredAppointments = await AppointmentModel.find({
                client,
                doctor,
                time,
                date: { $gte: new Date(fromDate), $lte: new Date(toDate) }, 
            });

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