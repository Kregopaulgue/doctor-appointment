const express = require('express');

const router = express.Router();

const { UserModel } = require('../models/User.js');
const { DoctorModel } = require('../models/Doctor.js');
const { RoleModel } = require('../models/Role.js');

router.put('/:doctorProfileId',
    async (req, res) => {
        try {
            const { user, speciality, dayTimes } = req.body;

            const doctorProfile = await DoctorModel.findById(req.params.doctorProfileId);
            if(!doctorProfile) {
                return res.status(404).json({
                    message: 'No doctor with that id is found'
                });
            }

            doctorProfile.user = user || doctorProfile.user;
            doctorProfile.speciality = speciality || doctorProfile.speciality;
            doctorProfile.dayTimes = dayTimes || doctorProfile.dayTimes;

            await doctorProfile.save();

            return res.status(200).json({
                doctor: doctorProfile
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while updating doctor');
        }
        
    }
)