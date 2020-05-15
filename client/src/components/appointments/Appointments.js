import React, { Component } from 'react';

import Profile from './Profile.js';
import AvailableAppointments from './AvailableAppointments'
import OwnAppointments from './OwnAppointments';

import { AppointmentsModel } from '../../services/api/models/appointments.js';

class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,

            toUpdate: false
        }
    }

    setClient = (client) => {
        this.setState({ client });
    }
    triggerUpdate = () => {
        this.setState({ toUpdate: !this.state.toUpdate});
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
                                toUpdate={this.state.toUpdate}
                                client={this.state.client}/>
                        }
                    </div>
                </div>
                
                <AvailableAppointments
                    className="appointments-max-height"
                    triggerUpdate={this.triggerUpdate}
                    client={this.state.client}/>
            </div>
        )
    }
}

export default Appointments;