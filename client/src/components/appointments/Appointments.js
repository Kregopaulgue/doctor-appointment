import React, { Component } from 'react';

import { AppointmentsModel } from '../../services/api/models/appointments.js';

class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: []
        };
    }

    async componentDidMount() {
        let appointments = [];
        try {
            const appointmentsModelInstance = new AppointmentsModel();
            appointments = await appointmentsModelInstance.getAllAppointments();
            this.setState({ appointments: appointments.appointments });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return(
            <div>
                Test
            </div>
        )
    }
}

export default Appointments;