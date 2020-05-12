const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const { TimeModel } = require('../models/Time.js');

router.get('',
    async (req, res) => {
        try {
            const times = await TimeModel.find({});
            const payload = { times };

            return res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while loading times');
        }
    }
)

module.exports = router;