import { ApiModel } from './services/api/ApiModel.js';

import LoginPage from './components/LoginPage.vue';
import Signup from './components/Signup.vue';
import AppointmentsPage from './components/AppointmentsPage.vue';

export default [
    {
        path: '/', redirect: () => {
            if (ApiModel.currentUserId) {
                return { name: 'appointments' };
            } else {
                return { name: 'login'};
            }
        }
    },

    {
        path: '/appointments', component: AppointmentsPage, name: 'appointments', meta: {
            public: true
        }
    },
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/signup', component: Signup, name: 'signup' }
];