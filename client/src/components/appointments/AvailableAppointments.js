import React, { Component } from 'react';

import { Table, Form, Button, Badge } from 'react-bootstrap';

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
            doctors: [],

            selectedDoctor: null,
            selectedDate: null,
            selectedWeek: new Date(Date.now()),

            days: {},
            dayTimes: {},
            filteredDayTimes: {},

            times: []
        };
    }
    async componentDidMount() {
        await this.loadTimes();
        await this.loadDoctors();
        await this.refreshWeekDays();
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
    loadDoctors = async () => {
        try {
            const userModelInstance = new UsersModel();
            const response = await userModelInstance.getAllDoctors();
            this.setState({ 
                doctors: response.doctors,
                selectedDoctor: response.doctors[0] || null
            });
        } catch(error) {
            console.log(error);
        }
    }
    refreshWeekDays = async (newDate) => {
        this.setWeekDays(newDate || this.state.selectedWeek);
        await this.loadSearchAppointments();
        this.filterDayTimes();
    }
    setWeekDays = (date) => {
        const currentDate = new Date(date.toISOString());
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
                toDate: this.state.days.friday.toISOString(),
                doctor: this.state.selectedDoctor ? this.state.selectedDoctor._id : undefined 
            });
            await this.setState({ appointments: response.appointments || [] });
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

    createAppointment = async () => {
        const selectedTime = this.state.times.find(time => {
            const timeString = this.state.selectedDate.toISOString().split('T')[1];
            const pureTimeString = timeString.split(':')[0] + ':' + timeString.split(':')[1];
            return time.time === pureTimeString;
        })
        try {
            const appointmentsModelInstance = new AppointmentsModel();
            const response = await appointmentsModelInstance.createAppointment(
                this.props.client._id,
                this.state.selectedDoctor._id,
                selectedTime._id,
                this.state.selectedDate.toISOString()
            );
            await this.loadSearchAppointments();
            this.filterDayTimes();
            this.props.triggerUpdate();
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }

    //I HATE THIS SHIT ALREADY
    moveNextWeek = async () => {
        const newWeekDate = new Date();
        newWeekDate.setDate(this.state.selectedWeek.getDate() + 7);
        this.setState({ selectedWeek: newWeekDate }); 
        await this.refreshWeekDays(newWeekDate);
    }
    movePrevWeek = async () => {
        const newWeekDate = new Date();
        newWeekDate.setDate(this.state.selectedWeek.getDate() - 7);
        this.setState({ selectedWeek: newWeekDate });
        await this.refreshWeekDays(newWeekDate); 
    }

    render() {
        const { days, filteredDayTimes, doctors, selectedDoctor, setState } = this.state;
        return (
            <div>
                <div
                    className="d-flex flex-row mt-4"
                >
                    <div
                        className="pr-2"
                    >
                        <Button
                            variant="dark"
                            onClick={this.movePrevWeek}
                        >
                            Previous Week
                        </Button>
                    </div>

                    <div>
                        <Button
                            variant="dark"
                            onClick={this.moveNextWeek}
                        >
                            Next Week
                        </Button>
                    </div>
                    <span
                        className="mb-0 p-2 align-center"
                    >
                        Select doctor: 
                    </span>
                    <div
                        className="pr-2"
                    >
                        <Form.Control
                            as="select"
                            variant="dark"
                        >
                            {
                                doctors.map(doctor => {
                                    return <option
                                        onClick={ () => { this.setState({ selectedDoctor: doctor })} }
                                    >
                                        { doctor.name } { doctor.speciality }
                                    </option>
                                })
                            }
                        </Form.Control>
                    </div>
                    <div
                        className="p-2 pl-0 d-flex"
                    >
                        <span>
                            Selected Date:
                        </span>
                        <Badge
                            variant="dark"
                            className="mx-2"
                        >
                            {
                                this.state.selectedDate ? 
                                this.state.selectedDate.toISOString() :
                                'No date is selected'
                            }
                        </Badge>
                    </div>
                    <div
                        className="ml-2"
                    >
                        <Button
                            onClick={this.createAppointment}
                        >
                            + Add Appointment
                        </Button>
                    </div>
                </div>
                {
                    this.state.days.monday &&
                    <Table
                        variant="dark"
                        className="mt-2"
                    >
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
                                                            return <tr
                                                                className="cursor-pointer"
                                                                onClick={
                                                                   () => { this.setState({ selectedDate: dayTime })}
                                                                }
                                                            >
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