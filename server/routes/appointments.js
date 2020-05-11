const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const { UserModel } = require('../models/User.js');
const { DoctorModel } = require('../models/Doctor.js');
const { AppointmentModel } = require('../models/Appointment.js');