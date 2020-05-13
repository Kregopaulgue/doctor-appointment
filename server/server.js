const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/users.js');
const timesRouter = require('./routes/times.js');
const appointmentsRouter = require('./routes/appointments.js');

const { initiateMongoServer } = require('./config/db.js');

initiateMongoServer();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/times', timesRouter);
app.use('/api/appointments', appointmentsRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});