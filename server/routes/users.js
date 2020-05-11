const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = requrie('jsonwebtoken');

const router = express.Router();

const { UserModel } = require('../models/User');