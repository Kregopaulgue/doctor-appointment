<template>
    <div>
        <div
            class="d-flex"
        >
            <Profile/>
            <OwnAppointments/>
        </div>
        <CalendarAppointments/>
    </div>
</template>

<script>

import Profile from './Profile.vue';
import OwnAppointments from './OwnAppointments.vue';
import CalendarAppointments from './CalendarAppointments.vue';

export default {
    name: 'AppointmentsPage',
    components: {
        Profile,
        OwnAppointments,
        CalendarAppointments
    }
}
</script>

<style scoped>

</style>