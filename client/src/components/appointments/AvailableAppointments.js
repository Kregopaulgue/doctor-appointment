import React, { Component } from 'react';

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

            appointments: [],
            filteredAppointments: [],

            days: {},
            dayTimes: {},

            times: []
        };
    }
    async componentDidMount() {
        await this.loadTimes();
        this.setWeekDays(Date.now());
    }
    loadTimes = async () => {
        try {
            const timesModelInstance = new TimesModel();
            const response = await timesModelInstance.getAllTimes();

            this.setState({ times: response.times });
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
        tuesday.setUTCHours(0, 0, 0);
        const wednesday = new Date();
        wednesday.setDate(tuesday.getDate() + 1);
        wednesday.setUTCHours(0, 0, 0);
        const thursday = new Date();
        thursday.setDate(wednesday.getDate() + 1);
        thursday.setUTCHours(0, 0, 0);
        const friday = new Date();
        friday.setDate(thursday.getDate() + 1);
        friday.setUTCHours(0, 0, 0);
        
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
    loadSearchAppointments = () => {

    }

    render() {
        return (
            <div>
                Test 2
            </div>
        );
    }
}

export default AvailableAppointments;