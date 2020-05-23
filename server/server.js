const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


const usersRouter = require('./routes/users.js');
const timesRouter = require('./routes/times.js');
const appointmentsRouter = require('./routes/appointments.js');
const doctorsRotuer = require('./routes/doctors.js');

const { initiateMongoServer } = require('./config/db.js');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

initiateMongoServer();

app.use('/api/users', usersRouter);
app.use('/api/times', timesRouter);
app.use('/api/doctors', doctorsRotuer);
app.use('/api/appointments', appointmentsRouter);

if(true) {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});