<template>
    <div
        class="p-4"
    >
        <h5>
            Текущие записи на приём
        </h5>
        <table
            class="table own-appoints-max-height"
        >
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        {{!isDoctor ? 'Имя врача' : 'Имя клиента'}}
                    </th>
                    <th>
                        {{!isDoctor ? 'Специальность врача' : 'ИД клиента'}}
                    </th>
                    <th>
                        Дата записи
                    </th>
                    <th
                        v-if="isDoctor"
                    >
                        Удалить
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(appointment, index) in appointments"
                    :key="appointment._id"
                >
                    <td>
                        {{ index + 1 }}
                    </td>
                    <td>
                        {{ !isDoctor ? appointment.doctorUser.name : appointment.clientProfile.name }}
                    </td>
                    <td>
                        {{ !isDoctor ? appointment.doctorProfile.speciality : appointment.clientProfile._id}}
                    </td>
                    <td>
                        {{ `${appointment.date.getUTCDate()}.${appointment.date.getUTCMonth() + 1}.20${appointment.date.getYear() - 100} ${appointment.date.getUTCHours()}:${appointment.date.getUTCMinutes()}0` }}
                    </td>
                    <td
                        v-if="isDoctor"
                        @click="deleteAppointment(appointment._id)"
                        class="cursor-hover"
                    >
                        X
                    </td>
                </tr>
            </tbody>
        </table>
        <b-alert
            v-if="!appointments.length"
            show
        >
            Запланированные посещения врача отсутствуют
        </b-alert>
    </div>
</template>

<script>

import { AppointmentsModel } from '../services/api/models/appointments.js';
import { UsersModel } from '../services/api/models/users.js';

export default {
    name: 'OwnAppointments',
    props: {
        refreshTrigger: Boolean,
        isDoctor: Boolean
    },
    data() {
        return {
            appointments: []
        }
    },
    async created() {
        await this.loadOwnAppointments();
    },
    watch: {
        refreshTrigger: async function() {
            await this.loadOwnAppointments();
        }
    },
    methods: {
        async loadOwnAppointments() {
            const appointmentsModelInstance = new AppointmentsModel();
            const searchObject = {
                fromDate: (new Date(Date.now())).toISOString()
            };
            if(this.isDoctor) {
                searchObject.doctor = UsersModel.currentUserId;
            } else {
                searchObject.client = UsersModel.currentUserId;
            }

            try {
                const response = await appointmentsModelInstance.searchAppointments(searchObject);
                this.appointments = response.appointments.map(appoint => {
                    const ap = {
                        ...appoint
                    };
                    ap.date = new Date(appoint.date);
                    return ap;
                });
            } catch(error) {
                console.log('im here' + error);
                let errors = '';
                if(error.message) {
                    errors = error.message;
                }
                if(error.errors) {
                    error.errors.forEach(err => {
                        errors += err.msg + '';
                    });
                }
                console.log(errors);
                window.alert('Ошибка:' + errors);
            }
        },
        async deleteAppointment(id) {
            const appointmentsModelInstance = new AppointmentsModel(id);
            const index = this.appointments.findIndex(appoint => appoint._id = id);
            this.appointments.splice(index, 1);
            console.log(this.appointments);

            try {
                const response = await appointmentsModelInstance.deleteAppointment();
                
                console.log(response);
                await this.loadOwnAppointments();
            } catch(error) {
                console.log('im here' + error);
                let errors = '';
                if(error.message) {
                    errors = error.message;
                }
                if(error.errors) {
                    error.errors.forEach(err => {
                        errors += err.msg + '';
                    });
                }
                console.log(errors);
                window.alert('Ошибка:' + errors);
            }
        }
    }
}
</script>

<style scoped>
    .own-appoints-max-height {
        max-height: 35rem;
        overflow: auto;
    }

    .cursor-hover {
        cursor: pointer;
    }
</style>