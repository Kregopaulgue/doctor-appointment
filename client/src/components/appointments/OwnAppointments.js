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

    render() {
        const { appointments } = this.state;
        return (
            <div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments.map(appoint => {
                                    return <tr>
                                        <th>
                                            { appoint.doctor }
                                        </th>
                                        <th>
                                            { appoint.client }
                                        </th>
                                        <th>
                                            { appoint.date }
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