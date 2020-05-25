<template>
    <div>
        <div
            v-if="user"
            class="d-flex"
        >
            <Profile
                :user="user"/>
            <OwnAppointments
                :refreshTrigger="refreshTrigger"
                :isDoctor="!!user.doctor"/>
        </div>

        <div
            v-if="user"
        >
            <CalendarAppointments
                @refresh-own-appointments="refreshOwnAppointments"
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
            user: null,
            refreshTrigger: false
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
                if(response.doctor) {
                    this.user.doctor = response.doctor;
                }
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
        refreshOwnAppointments() {
            this.refreshTrigger = !this.refreshTrigger;
        }
    }
}
</script>

<style scoped>

</style>