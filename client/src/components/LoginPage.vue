<template>
    <div
        class="w-25 my-auto mx-auto"
    >
        <label>
            E-mail:
        </label>
        <b-input
            type="email"
            placeholder="Электронная почта"
            v-model="loginEmail"
            class="mb-2"
        >
        </b-input>

        <label>
            Пароль:
        </label>
        <b-input
            type="password"
            placeholder="Пароль"
            v-model="loginPassword"
            class="mb-2"
        >
        </b-input>

        <div
            class="d-flex"
        >
            <b-button
                variant="primary"
                @click="login"
            >
                Log In
            </b-button>
            <a
                class="ml-2"
            >
                Sign In
            </a>
        </div>
    </div>
</template>

<script>
import { UsersModel } from '../services/api/models/users.js';

export default {
    name: "LoginPage",
    data() {
        return {
            loginEmail: '',
            loginPassword: '',

            username: '',
            email: '',
            name: '',
            password: ''
        };
    },
    methods: {
        async login() {
            const usersModelInstance = new UsersModel();
            try {
                const response = await usersModelInstance.loginUser(this.loginEmail, this.loginPassword);
                console.log(response);
                UsersModel.setAuthToken(response);
                this.$router.history.push('/appointments');
            } catch(error) {
                console.log(error);
            }
        },
        async signup() {
            const usersModelInstance = new UsersModel();
            try {
                const { username, email, name, password } = this;
                const response = await usersModelInstance.signupUser(
                    username, email, name, password
                );
                console.log(response);
                UsersModel.setAuthToken(response);
                this.$router.history.push('/appointments');
            } catch(error) {
                console.log(error);
                event.preventDefault();
            }
        }
    }
}
</script>

<style scoped>

</style>