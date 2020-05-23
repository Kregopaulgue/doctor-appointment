<template>
    <div
        class="p-4"
    >
        <table
            class="table own-appoints-max-height"
        >
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Имя врача
                    </th>
                    <th>
                        Специальность врача
                    </th>
                    <th>
                        Дата записи
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
                        {{ appointment.doctorUser.name }}
                    </td>
                    <td>
                        {{ appointment.doctorProfile.speciality }}
                    </td>
                    <td>
                        {{ appointment.date }}
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
    data() {
        return {
            appointments: []
        }
    },
    async created() {
        await this.loadOwnAppointments();
    },
    methods: {
        async loadOwnAppointments() {
            const appointmentsModelInstance = new AppointmentsModel();
            const searchObject = {
                fromDate: (new Date(Date.now())).toISOString(),
                client: UsersModel.currentUserId
            };

            try {
                const response = await appointmentsModelInstance.searchAppointments(searchObject);
                this.appointments = response.appointments;
            } catch(error) {
                console.log(error);
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
</style>