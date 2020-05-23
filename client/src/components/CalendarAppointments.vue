<template>
    <div
        class="container-fluid"
    >
        <div
            class="row"
        >
            <b-button
                class="col-2"
                @click="loadNextWeekDatesAndAppointments"
            >
                Следующая неделя 
            </b-button>

            <b-form-select
                :options="doctorsOptions"
                v-model="selectedDoctor"
                class="col-2 ml-5"
                @change="refreshData"
            >
            </b-form-select>

            <div
                class="col-3 d-flex ml-2"
            >
                <b-input
                    id="selectedDateInput"
                    v-model="selectedDateText"
                    disabled
                >
                </b-input>
            </div>

            <b-button
                variant="primary"
                @click="submitAppointment"
            >
                + Записаться на приём
            </b-button>
        </div>
        
        <AppointmentsTable
            v-if="times.length"
            class="mt-2 row"

            @select-date="(time) => { this.selectedDate = time }"

            :fromDate="fromDate"
            :toDate="toDate"

            :times="times"
            :appointments="appointments"
            
            :doctorProfile="selectedDoctorProfile"/>
    </div>
</template>

<script>
import AppointmentsTable from './AppointmentsTable.vue';

import { AppointmentsModel } from '../services/api/models/appointments.js';
import { UsersModel } from '../services/api/models/users.js';
import { TimesModel } from '../services/api/models/times.js';

export default {
    name: 'CalendarAppointments',
    components: {
        AppointmentsTable
    },
    data() {
        return {
            times: [],
            doctors: [],
            appointments: [],

            doctorsOptions: [],

            fromDate: null,
            toDate: null,
            selectedDoctor: null,

            selectedDate: null,

            weekDate: new Date()
        }
    },
    async created() {
        this.setFromToDates(this.weekDate);

        await this.loadTimes();
        await this.loadDoctors();
        await this.loadAppointments();
    },
    computed: {
        selectedDateText() {
            if(this.selectedDate) {
                return this.selectedDate.toISOString(); 
            } else {
                return 'Дата посещения не выбрана...';
            }
        },
        selectedDoctorProfile() {
            const selectedDoctorUser = this.doctors.find(doctor => {
                return doctor._id === this.selectedDoctor;
            });
            return selectedDoctorUser.doctor;
        }
    },
    methods: {
        async loadNextWeekDatesAndAppointments() {
            const nextWeekDate = new Date();
            nextWeekDate.setDate(this.weekDate.getDate() + 7);
            nextWeekDate.setUTCHours(0, 0, 0, 0);
            this.weekDate = nextWeekDate;

            this.setFromToDates(nextWeekDate);
            await this.loadAppointments();
        },
        /** Sets Monday and Friday date from the passed one */
        setFromToDates(dateParam) {
            const currentDay = dateParam.getDay();
            const difference = dateParam.getDate() - currentDay +
                (currentDay === 0 ? -6 : 1);

            const fromDate = new Date(dateParam.setDate(difference));
            fromDate.setUTCHours(0, 0, 0, 0);
            this.fromDate = fromDate;

            const toDate = new Date();
            toDate.setDate(fromDate.getDate() + 4);
            toDate.setUTCHours(0, 0, 0, 0);
            this.toDate = toDate; 
        },

        async loadTimes() {
            const timesModelInstance = new TimesModel();
            try {
                const response = await timesModelInstance.getllTimes();
                this.times = response.times;
            } catch(error) {
                console.log(error);
            }
        },
        async loadDoctors() {
            const usersModelInstance = new UsersModel();
            try {
                const response = await usersModelInstance.getAllDoctors();
                this.doctors = response.doctors;
                this.doctorsOptions = response.doctors.map(doctor => {
                    return {
                        text: doctor.name,
                        value: doctor._id
                    }
                });
                this.selectedDoctor = response.doctors[0]._id || null;
            } catch(error) {
                console.log(error);
            }
        },
        async loadAppointments() {
            const appointmentsModelInstance = new AppointmentsModel();
            const searchObject = {};
            if(this.fromDate) {
                searchObject.fromDate = this.fromDate.toISOString();
            }
            if(this.toDate) {
                searchObject.toDate = this.toDate.toISOString();
            }
            if(this.selectedDoctor) {
                searchObject.doctor = this.selectedDoctor;
            }
            
            try {
                const response = await appointmentsModelInstance.searchAppointments(searchObject);
                this.appointments = response.appointments;
            } catch(error) {
                console.log(error);
            }
        },


        /** Adds appointment */
        async submitAppointment() {
            const selectedTime = this.times.find(time => {
                const timeString = this.selectedDate.toISOString().split('T')[1];
                const pureTimeString = timeString.split(':')[0] + ':' + timeString.split(':')[1];
                return time.time === pureTimeString;
            })
            try {
                const appointmentsModelInstance = new AppointmentsModel();
                const response = await appointmentsModelInstance.createAppointment(
                    UsersModel.currentUserId,
                    this.selectedDoctor,
                    selectedTime._id,
                    this.selectedDate.toISOString()
                );
                console.log(response);
                await this.refreshData();
                this.$emit('refresh-own-appointments');
            } catch(error) {
                console.log(error);
            }
        },

        async refreshData() {
            console.log('im here');
            this.setFromToDates(this.weekDate);
            await this.loadAppointments();
        }
    }
}
</script>