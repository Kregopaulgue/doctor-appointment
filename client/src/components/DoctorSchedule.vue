<template>
    <div>
        <table
            v-if="times.length"
            class="table table-striped table-hover"
        >
            <thead
                class="thead-dark"
            >
                <tr>
                    <th
                        v-for="day in Object.keys(doctorProfile.dayTimes)"
                        :key="day.toString()"
                        scope="col"
                    >
                        {{ day.toUpperCase() }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <td
                    v-for="day in Object.keys(doctorProfile.dayTimes)"
                    :key="day"
                >
                    <table
                        class="table table-hover"
                    >
                        <tbody>
                            <tr
                                v-for="(timeId, timeIndex) in dayTimes[day]"
                                :key="timeId"
                                scope="row"
                                class="w-100 table-row-pointer"
                            >
                                <td>{{ formattedTimes[timeId].hours }}:{{ formattedTimes[timeId].minutes }}</td>
                                <td 
                                    @click="deleteDayTime(day, timeIndex)"
                                    class="cursor-pointer"
                                > X </td>
                            </tr>
                            <tr
                                class="w-100"
                            >
                                <b-form-select
                                    v-model="selectedTimes[day]"
                                    :options="timesOptions[day]"
                                    class="mt-3"
                                >
                                </b-form-select>
                                <b-button
                                    variant="success"
                                    @click="addDayTime(day)"
                                    class="mt-1"
                                >
                                    + Time
                                </b-button>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tbody>
        </table>
    </div>
</template>

<script>
import { TimesModel } from '../services/api/models/times.js';
import { DoctorsModel } from '../services/api/models/doctors.js';

export default {
    name: "DoctorSchedule",
    props: {
        doctorId: String,
        doctorProfile: Object
    },
    data() {
        return {
            dayTimes: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: []
            },

            times: [],
            selectedTimes: {
                monday: null,
                tuesday: null,
                wednesday: null,
                thursday: null,
                friday: null
            }
        }
    },
    async created() {
        try {
            const timesModelInstance = new TimesModel();
            const response = await timesModelInstance.getAllTimes();
            this.times = response.times;
        } catch(error) {
            console.log(error);
        }
    },
    mounted() {
        const dayTimesCopy = Object.assign({}, this.doctorProfile.dayTimes);
        this.dayTimes = dayTimesCopy;
    },
    computed: {
        formattedTimes() {
            const resultTimes = {};
            this.times.forEach((time) => {
                const timeObject = {
                    hours: time.time.split(':')[0],
                    minutes: time.time.split(':')[1]
                };
                resultTimes[time._id] = timeObject;
            });
            return resultTimes;
        },
        timesOptions() {
            const timesOptions = {};
            Object.keys(this.dayTimes).forEach(day => {
                const availableTimes = this.times.filter(time => {
                    const equalTime = this.dayTimes[day].find(dayTime => time._id === dayTime); 
                    return !equalTime;
                });
                const formattedAvailableTimes = availableTimes.map(time => {
                    return { 
                        text: time.time,
                        value: time._id
                    };
                });
                timesOptions[day] = formattedAvailableTimes;
            });
            return timesOptions;
        }
    },
    methods: {
        async deleteDayTime(day, timeIndex) {
            try {
                this.dayTimes[day].splice(timeIndex, 1);
                const doctorsModelInstance = new DoctorsModel(this.doctorId);
                const response = await doctorsModelInstance.updateDoctorProfile({ dayTimes: this.dayTimes });
                console.log(response);
            } catch(error) {
                console.log(error);
            }
        },
        async addDayTime(day) {
            try {
                this.dayTimes[day].push(this.selectedTimes[day]);
                const doctorsModelInstance = new DoctorsModel(this.doctorId);
                const response = await doctorsModelInstance.updateDoctorProfile({ dayTimes: this.dayTimes });
                console.log(response);
            } catch(error) {
                console.log(error);
            }
        }
    }
}
</script>