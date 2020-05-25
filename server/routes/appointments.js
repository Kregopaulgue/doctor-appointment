const express = require('express');
const { check, query, validationResult } = require('express-validator');

const router = express.Router();

const { UserModel } = require('../models/User.js');
const { DoctorModel } = require('../models/Doctor.js');
const { TimeModel } = require('../models/Time.js');
const { AppointmentModel } = require('../models/Appointment.js');

router.post('/',
    [
        check('client', 'Неправильный клиент!').not().isEmpty(),
        check('doctor', 'Неправильный доктор!').not().isEmpty(),
        check('time', 'Неправильное время!').not().isEmpty(),
        check('date', 'Неправильная дата!').not().isEmpty(),
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
                    message: 'Эта запись уже существует!'
                });
            }

            const clientUser = await UserModel.findById(client);
            if(!clientUser) {
                return res.status(404).json({
                    message: 'Клиент не найден!'
                });
            }

            const doctorUser = await UserModel.findById(doctor);
            if(!doctorUser) {
                return res.status(404).json({
                    message: 'Пользователь не найден!'
                });
            }
            const doctorProfile = await DoctorModel.find({ user: doctorUser._id });
            if(!doctorProfile) {
                return res.status(404).json({
                    message: 'Доктор не найден!'
                });
            }

            const timeEntry = await TimeModel.findById(time);
            if(!timeEntry) {
                return res.status(404).json({
                    message: 'Время с этим кодом не найдено'
                });
            }

            const appointmentDate = new Date(date);

            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);
            appointmentDate.setUTCHours(hours, minutes);

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
            return res.status(500).send('Ошибка во время создания записи');
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
                    message: 'Запись не найдена!'
                });
            }

            const clientUser = await UserModel.findById(client);
            if(!clientUser) {
                return res.status(404).json({
                    message: 'Клиент не найден!'
                });
            }

            const doctorUser = await UserModel.findById(doctor);
            if(!doctorUser) {
                return res.status(404).json({
                    message: 'Клиент не найден!'
                });
            }
            const doctorProfile = await DoctorModel.find({ user: doctorUser._id });
            if(!doctorProfile) {
                return res.status(404).json({
                    message: 'Профиль доктора не найден!'
                });
            }

            const timeEntry = await TimeModel.findById(time);
            if(!timeEntry) {
                return res.status(404).json({
                    message: 'Время с этим кодот не найдено'
                });
            }

            let [ hours, minutes ] = timeEntry.split(':');
            hours = parseInt(hours, 10);
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
            return res.status(500).send('Ошибка во время редактирования записи')
        }
    }
);

router.delete('/:appointmentId',
    async (req, res) => {
        try {
            const appointmentToDelete = await AppointmentModel.findByIdAndRemove(req.params.appointmentId);
            if(!appointmentToDelete) {
                return res.status(404).json({
                    message: 'Посещение не найдено!'
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).send('Ошибка во время удаление записи')
        }
    }
);

router.get('',
    async (req, res) => {
        try {
            let appointments = await AppointmentModel.find({});
            for(let i = 0; i < appointments.length; i++) {
                const appointmentDoctor = await DoctorModel.findById(appointments[i].doctor);
                const appointmentDoctorUser = await UserModel.findById(appointmentDoctor.user);

                const clientUser = await UserModel.findById(appointment[i].client);

                appointments[i].doctorProfile = appointmentDoctor;
                appointments[i].doctorUser = appointmentDoctorUser;
                appointments[i].clientProfile = clientUser;
            }
            res.status(200).json({
                appointments
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send('Ошибка во время листинга запросов');
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
                    message: 'Неверные параметры запроса'
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

            let filteredAppointments = await AppointmentModel.find(searchObject);
            filteredAppointments = filteredAppointments.map(filteredAppointment => filteredAppointment.toObject());

            for(let i = 0; i < filteredAppointments.length; i++) {
                const appointmentDoctor = await DoctorModel.findOne({ user: filteredAppointments[i].doctor });
                const appointmentDoctorUser = await UserModel.findById(appointmentDoctor.user);

                const clientUser = await UserModel.findById(filteredAppointments[i].client);

                filteredAppointments[i].doctorProfile = appointmentDoctor;
                filteredAppointments[i].doctorUser = appointmentDoctorUser;
                filteredAppointments[i].clientProfile = clientUser;
            }

            const payload = {
                appointments: filteredAppointments
            };
            return res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Ошибка во время загрузки записей');
        }
    }
)

module.exports = router;