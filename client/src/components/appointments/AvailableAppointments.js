import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

import './Appointments.css';

import { AppointmentsModel } from '../../services/api/models/appointments.js';
import { UsersModel } from '../../services/api/models/users.js';
import { TimesModel } from '../../services/api/models/times.js';

class AvailableAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: null,
            toDate: null,

            client: null,
            doctor: null,
            time: null,
            date: null,

            appointments: [],

            days: {},
            dayTimes: {},
            filteredDayTimes: {},

            times: []
        };
    }
    async componentDidMount() {
        await this.loadTimes();
        this.setWeekDays(Date.now());
        await this.loadSearchAppointments();
        this.filterDayTimes();
    }
    loadTimes = async () => {
        try {
            const timesModelInstance = new TimesModel();
            const response = await timesModelInstance.getAllTimes();

            this.setState({ times: response.times || [] });
        } catch(error) {
            console.log(error);
        }
    }
    setWeekDays = (date) => {
        const currentDate = new Date(date);
        currentDate.setUTCHours(0, 0, 0);
        const currentDay = currentDate.getDay();

        const difference = currentDate.getDate() - currentDay + 
            (currentDay === 0 ? -6 : 1);

        const monday = new Date(currentDate.setDate(difference));
        const tuesday = new Date();
        tuesday.setDate(monday.getDate() + 1);
        tuesday.setUTCHours(0, 0, 0, 0);
        const wednesday = new Date();
        wednesday.setDate(tuesday.getDate() + 1);
        wednesday.setUTCHours(0, 0, 0, 0);
        const thursday = new Date();
        thursday.setDate(wednesday.getDate() + 1);
        thursday.setUTCHours(0, 0, 0, 0);
        const friday = new Date();
        friday.setDate(thursday.getDate() + 1);
        friday.setUTCHours(0, 0, 0, 0);
        
        const days = {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday
        }

        const mondayTimes = this.state.times.map(timeEntry => {
            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            const mondayCopy = new Date(monday);
            mondayCopy.setUTCHours(hours, minutes);
            return mondayCopy;
        });

        const tuesdayTimes = this.state.times.map(timeEntry => {
            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            const tuesdayCopy = new Date(tuesday);
            tuesdayCopy.setUTCHours(hours, minutes);
            return tuesdayCopy;
        });

        const wednesdayTimes = this.state.times.map(timeEntry => {
            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            const wednesdayCopy = new Date(wednesday);
            wednesdayCopy.setUTCHours(hours, minutes);
            return wednesdayCopy;
        });

        const thursdayTimes = this.state.times.map(timeEntry => {
            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            const thursdayCopy = new Date(thursday);
            thursdayCopy.setUTCHours(hours, minutes);
            return thursdayCopy;
        });

        const fridayTimes = this.state.times.map(timeEntry => {
            let [ hours, minutes ] = timeEntry.time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            const fridayCopy = new Date(friday);
            fridayCopy.setUTCHours(hours, minutes);
            return fridayCopy;
        });

        const dayTimes = {
            mondayTimes,
            tuesdayTimes,
            wednesdayTimes,
            thursdayTimes,
            fridayTimes
        };

        this.setState({ days, dayTimes });
    }
    loadSearchAppointments = async () => {
        try {
            const appointmentsModelInstance = new AppointmentsModel();
            const response = await appointmentsModelInstance.searchAppointments({
                fromDate: this.state.days.monday.toISOString(),
                toDate: this.state.days.friday.toISOString()
            });
            this.setState({ appointments: response.appointments || [] });
        } catch(error) {
            console.log(error);
        }
    }
    filterDayTimes = () => {
        let filteredDayTimes = Object.assign({}, this.state.dayTimes);
        const { appointments } = this.state;
        filteredDayTimes.mondayTimes = filteredDayTimes.mondayTimes.filter((dayTime) => {
            const sameDateAppointment = appointments.find(appoint => {
                return (new Date(appoint.date)).getTime() === dayTime.getTime();
            });
            return !(!!sameDateAppointment); 
        });
        filteredDayTimes.tuesdayTimes = filteredDayTimes.tuesdayTimes.filter((dayTime) => {
            const sameDateAppointment = appointments.find(appoint => {
                return (new Date(appoint.date)).getTime() === dayTime.getTime();
            });
            return !(!!sameDateAppointment); 
        });
        filteredDayTimes.wednesdayTimes = filteredDayTimes.wednesdayTimes.filter((dayTime) => {
            const sameDateAppointment = appointments.find(appoint => {
                return (new Date(appoint.date)).getTime() === dayTime.getTime();
            });
            return !(!!sameDateAppointment); 
        });
        filteredDayTimes.thursdayTimes = filteredDayTimes.thursdayTimes.filter((dayTime) => {
            const sameDateAppointment = appointments.find(appoint => {
                const appointISOString = (new Date(appoint.date)).toISOString();
                const dayTimeISOString = dayTime.toISOString();
                const isTheSameDate = appointISOString === dayTimeISOString; 
                return isTheSameDate;
            });
            return !(!!sameDateAppointment); 
        });
        filteredDayTimes.fridayTimes = filteredDayTimes.fridayTimes.filter((dayTime) => {
            const sameDateAppointment = appointments.find(appoint => {
                return (new Date(appoint.date)).getTime() === dayTime.getTime();
            });
            return !(!!sameDateAppointment); 
        });
        this.setState({ filteredDayTimes });
    }

    createAppointment = async (cell) => {
        try {
            const appointmentsModelInstance = new AppointmentsModel();
            const response = await appointmentsModelInstance.createAppointment(
                this.props.client,
                this.state.doctor,
                this.state.time,
                this.state.date
            );
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }


    render() {
        const { days, filteredDayTimes } = this.state;
        return (
            <div>
                {
                    this.state.days.monday &&
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    <p>Monday</p>
                                    <p>{days.monday.getDate()}.{days.monday.getMonth() + 1}</p>
                                </th>
                                <th>
                                    <p>Tuesday</p>
                                    <p>{days.tuesday.getDate()}.{days.tuesday.getMonth() + 1}</p>
                                </th>
                                <th>
                                    <p>Wednesday</p>
                                    <p>{days.wednesday.getDate()}.{days.wednesday.getMonth() + 1}</p>
                                </th>
                                <th>
                                    <p>Thursday</p>
                                    <p>{days.thursday.getDate()}.{days.thursday.getMonth() + 1}</p>
                                </th>
                                <th>
                                    <p>Friday</p>
                                    <p>{days.friday.getDate()}.{days.friday.getMonth() + 1}</p>
                                </th>
                            </tr>
                        </thead>
                        {
                            !!filteredDayTimes.fridayTimes &&
                            <tbody>
                                <tr>
                                    {
                                        Object.keys(filteredDayTimes).map(daykey =>
                                            <th
                                                className="p-0"
                                            >
                                                <Table
                                                    variant="dark"
                                                    striped
                                                    hover
                                                >
                                                    <tbody>
                                                    {
                                                        Object.values(filteredDayTimes[daykey]).map(dayTime => {
                                                            return <tr>
                                                                {dayTime.getUTCHours()}:{dayTime.getUTCMinutes()}0
                                                            </tr>
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                            </th>
                                        )
                                    }
                                </tr>
                            </tbody>
                        }
                    </Table>
                    
                }
            </div>
        );
    }
}

export default AvailableAppointments;