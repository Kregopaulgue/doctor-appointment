const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { UserModel } = require('../models/User.js');
const { DoctorModel } = require('../models/Doctor.js');
const { RoleModel } = require('../models/Role.js');

router.post('/signup',
    [
        check('username', 'Неправильное имя пользователя!').not().isEmpty(),
        check('email', 'Неправильная почта!').isEmail(),
        check('name', 'Неправильное имя!').not().isEmpty(),
        check('password', 'Пароль минимум 6 символов!').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const validationErrors = validationResult(res);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array()
            });
        }

        const { username, name, email, password } = req.body;
        console.log('Ne ponyal');
        console.log(username);
        if(!email || !name || !password || !username) {
            return res.status(400).json({
                message: 'Неправильные данные для регистрации!'
            });
        }
        
        try {
            const user = await UserModel.findOne({ email });
            if(user) {
                return res.status(400).json({
                    message: 'Пользователь с этой почтой уже существует!'
                });
            }

            const newUser = new UserModel({
                username,
                name,
                email,
                password
            });
            const userRole = await RoleModel.findOne({ role: 'client' });
            newUser.role = userRole._id;

            const passwordSalt = bcrypt.genSaltSync(10);
            newUser.password = bcrypt.hashSync(password, passwordSalt);

            await newUser.save();  

            newUser.role = userRole;
            const payload = { user: newUser };

            jwt.sign(
                payload, 'secret', { expiresIn: '10000m' }, (error, token) => {
                    if (error) throw error;
                    payload.token = token;
                    return res.status(200).json(payload);
                }
            )
        } catch(error) {
            console.log(error);
            res.status(500).send('Ошибка во время сохранения пользователя');
        }
    }
)

router.post('/login', 
    [
        check('email', 'Неправильная почта!').isEmail(),
        check('password', 'Неправильный пароль!').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array()
            });
        }

        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });
            if(!user) {
                res.status(404).json({
                    message: 'Пользователь не существует!'
                });
            }

            const userRole = await RoleModel.findById(user.role);
            if(!userRole) {
                res.status(404).json({
                    message: 'User role does not exist!'
                });
            }
            
            user.role = userRole;

            const userDoctorProfile = await DoctorModel.findOne({ user: user._id});
            if(userDoctorProfile) {
                user.doctor = userDoctorProfile;
            }

            const isPasswordMatching = bcrypt.compareSync(password, user.password);
            if(!isPasswordMatching) {
                return res.status(403).json({
                    message: 'Пароли не совпадают!'
                });
            }

            const payload = { user };

            jwt.sign(
                payload, 'secret', { expiresIn: '10000m' }, (error, token) => {
                    if (error) throw error;
                    payload.token = token;
                    res.status(200).json(payload);
                }
            );
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Ошибка во время логинации'
            });
        }
    }
);

router.get('/doctors',
    async (req, res) => {
        try {
            const users = await UserModel.find({});
            const usersIds = users.map(user => user._id);
            const doctors = await DoctorModel.find({ user: { $in: usersIds }});

            const doctorUsers = users.map(user => {
                const userDoctor = doctors.find(doctor => {
                    return doctor.user.toString() === user._id.toString();
                });
                const resultUser = user.toObject();
                if(userDoctor) {
                    resultUser.doctor = userDoctor;
                }
                return resultUser;
            });

            const finalDoctors = doctorUsers.filter(doctorUser => {
                return !!doctorUser.doctor;
            });

            const payload = { doctors: finalDoctors };
            res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while loading doctors');
        }
    }
);

router.get('/:userId',
    async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.userId);
            if(!user) {
                return res.status(404).json({
                    message: 'User is not found'
                });
            }
            const userDoctorProfile = await DoctorModel.findOne({ user: user._id});

            const payload = { user };
            if(userDoctorProfile) {
                payload.doctor = userDoctorProfile;
            }
            return res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while getting user by id');
        }
    }
)

module.exports = router;