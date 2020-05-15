import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { AppointmentsModel } from './../../services/api/models/appointments.js';

class OwnAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: []
        }
    }

    async componentDidMount() {
        await this.loadOwnAppointments();
    }
    async componentDidUpdate() {
        //FUCK THIS I GO TO VUE
    }

    loadOwnAppointments = async () => {
        try {
            const appointmentsModelInstance = new AppointmentsModel();
            const response = await appointmentsModelInstance.searchAppointments({
                fromDate: (new Date(Date.now())).toISOString(),
                client: this.props.client._id
            });
            this.setState({ appointments: response.appointments });
        } catch(error) {
            console.log(error);
        }
    }
    deleteAppointment = async (appointmentId) => {
        try {
            const appointmentsModelInstance = new AppointmentsModel(appointmentId);
            const response = await appointmentsModelInstance.deleteAppointment();
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { appointments } = this.state;
        return (
            <div
                className="own-appointments-max-height"
            >
                {
                    !appointments.length &&
                    <span>
                        Запланированные посещения отсутствуют
                    </span>
                }
                {
                    !!appointments.length && 
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Доктор
                                </th>
                                <th>
                                    Специальность
                                </th>
                                <th>
                                    Дата посещения
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments.map(appoint => {
                                    return <tr
                                        key={appoint._id}
                                    >
                                        <th>
                                            { appoint.doctor }
                                        </th>
                                        <th>
                                            { appoint.client }
                                        </th>
                                        <th>
                                            { appoint.date }
                                        </th>
                                        <th
                                            className="cursor-pointer"
                                            onClick={async () => {
                                                await this.deleteAppointment(appoint._id);
                                                await this.loadOwnAppointments();
                                            }}
                                        >
                                            X
                                        </th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                }
            </div>
        );
    }
}

export default OwnAppointments;