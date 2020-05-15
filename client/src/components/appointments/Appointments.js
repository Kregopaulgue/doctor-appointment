import React, { Component } from 'react';

import Profile from './Profile.js';
import AvailableAppointments from './AvailableAppointments'
import OwnAppointments from './OwnAppointments';

import { AppointmentsModel } from '../../services/api/models/appointments.js';

class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null
        }
    }

    setClient = (client) => {
        this.setState({ client });
    }

    render() {
        return(
            <div
                className="mt-3"
            >
                <div
                    className="d-flex"
                >
                    <Profile
                        setClient={this.setClient}/>

                    <div
                        className="flex-grow-1 px-5"
                    >
                        <span>Запланированные посещения</span>
                        {
                            !!this.state.client &&
                            <OwnAppointments
                                client={this.state.client}/>
                        }
                    </div>
                </div>
                
                <AvailableAppointments
                    client={this.state.client}/>
            </div>
        )
    }
}

export default Appointments;