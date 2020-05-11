const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = 
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@lancecluster-0i8mn.mongodb.net/DoctorAppointment?retryWrites=true&w=majority`;

async function initiateMongoServer() {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    initiateMongoServer
}