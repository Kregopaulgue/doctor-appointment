<template>
    <div>
        <table
            class="table table-striped table-hover"
        >
            <thead
                class="thead-dark"
            >
                <tr
                    v-if="Object.keys(tableHeaderDays).length"
                >
                    <th
                        scope="col"
                    >
                        Понедельник {{ tableHeaderDays['monday'] }}
                    </th>
                    <th
                        scope="col"
                    >
                        Вторник {{ tableHeaderDays['tuesday'] }}
                    </th>
                    <th
                        scope="col"
                    >
                        Среда {{ tableHeaderDays['wednesday'] }}
                    </th>
                    <th
                        scope="col"
                    >
                        Четверг {{ tableHeaderDays['thursday'] }}
                    </th>
                    <th
                        scope="col"
                    >
                        Пятница {{ tableHeaderDays['friday'] }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <td
                    v-for="day in Object.keys(filteredDayTimes)"
                    :key="day"
                >
                    <table
                        class="table table-hover"
                    >
                        <tbody>
                            <tr
                                v-for="time in filteredDayTimes[day]"
                                :key="time.toISOString()"
                                scope="row"
                                class="w-100 table-row-pointer"
                                @click="$emit('select-date', time)"
                            >
                                {{ time.getUTCHours() }}:{{ time.getUTCMinutes() }}0
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tbody>
        </table>
    </div>
</template>

<script>

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default {
    name: 'AppointmentsTable',
    props: {
        times: Array,
        appointments: Array,

        fromDate: Date,
        toDate: Date,

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
            }
        }
    },
    mounted() {
        this.formatDayTimes();
    },
    watch: {
        doctorProfile: function() {
            this.formatDayTimes();
        },
        fromDate: function() {
            this.formatDayTimes();
        },
        toDate: function() {
            this.formatDayTimes();
        }
    },
    computed: {
        filteredDayTimes() {
            const filteredDayTimes = Object.assign({}, this.dayTimes);
            for(let day of Object.keys(filteredDayTimes)) {
                filteredDayTimes[day] = filteredDayTimes[day].filter(dayTime => {
                    return !(this.appointments.find(appoint => {
                        const leftCompareDate = new Date(appoint.date);
                        console.log(leftCompareDate.toISOString());
                        const rightCompareDate = new Date(dayTime.toISOString());
                        console.log(rightCompareDate.toISOString());
                        const areDatesEqual = leftCompareDate.getTime() ===
                            rightCompareDate.getTime();
                        return areDatesEqual;
                    }));
                });
            }
            return filteredDayTimes;
        },
        tableHeaderDays() {
            const headerItems = {};
            if(this.dayTimes.monday.length > 0) {
                for(let [day, date] of Object.entries(this.dayTimes)) {
                    const dateToSet = new Date(date[0].toISOString());
                    headerItems[day] = `${dateToSet.getDate()}/${dateToSet.getMonth() + 1}`;
                }
            }
            return headerItems;
        }
    },
    methods: {
        formatDayTimes() {
            const getNextDayDate = (startDate) => {
                const nextDayDate = new Date();
                nextDayDate.setDate(startDate.getDate() + 1);
                nextDayDate.setUTCHours(0, 0, 0, 0);
                return nextDayDate;
            }

            const daysOfWeekDates = {};
            daysOfWeekDates[daysOfWeek[0]] = this.fromDate;
            for(let i = 1; i < daysOfWeek.length; i++) {
                daysOfWeekDates[daysOfWeek[i]] = 
                    getNextDayDate(daysOfWeekDates[daysOfWeek[i - 1]]);
            }

            const dayTimes = {};
            for(let [day, date] of Object.entries(daysOfWeekDates)) {
                let currentDayDates = this.times;
                if(this.doctorProfile) {
                    currentDayDates = this.times.filter(time => {
                        return this.doctorProfile.dayTimes[day].find(dayTime => {
                            return time._id === dayTime;
                        });
                    })
                }

                dayTimes[day] = currentDayDates.map(timeEntry => {
                    let [ hours, minutes ] = timeEntry.time.split(':');
                    hours = parseInt(hours, 10);
                    minutes = parseInt(minutes, 10);

                    const dateCopy = new Date(date);
                    dateCopy.setUTCHours(hours, minutes, 0, 0);
                    return dateCopy;
                }); 
            }
            this.dayTimes = dayTimes;
        }
    }
}
</script>

<style scoped>
.table-row-pointer {
    cursor: pointer;
}
</style>