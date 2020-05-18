<template>
    <div>
        <div
            class="d-flex"
        >
            <Profile
                :user="user"/>
            <OwnAppointments/>
        </div>

        <div
            v-if="user"
        >
            <CalendarAppointments
                v-if="!user.doctor"/>
            <DoctorSchedule
                v-if="user.doctor"
                :doctorId="user.doctor._id"
                :doctorProfile="user.doctor"/>
        </div>
    </div>
</template>

<script>

import { UsersModel } from '../services/api/models/users.js';

import Profile from './Profile.vue';
import OwnAppointments from './OwnAppointments.vue';

import DoctorSchedule from './DoctorSchedule.vue';
import CalendarAppointments from './CalendarAppointments.vue';

export default {
    name: 'AppointmentsPage',
    components: {
        Profile,
        OwnAppointments,
        CalendarAppointments,
        DoctorSchedule
    },
    data() {
        return {
            user: null
        }
    },
    async created() {
        await this.loadUserInfo();
    },
    methods: {
        async loadUserInfo() {
            try {
                const userModelInstance = new UsersModel(UsersModel.currentUserId);
                const response = await userModelInstance.getUserById();
                this.user = response.user;
                this.user.doctor = response.doctor;
            } catch(error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>

</style>