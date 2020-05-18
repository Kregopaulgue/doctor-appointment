<template>
    <div
        class="w-25 my-auto mx-auto"
    >
        <label>
            Фамилия Имя Отчество:
        </label>
        <b-input
            type="text"
            placeholder="ФИО"
            v-model="name"
            class="mb-2"
        >
        </b-input>

        <label>
            Имя пользователя:
        </label>
        <b-input
            type="text"
            placeholder="Имя пользователя"
            v-model="username"
            class="mb-2"
        >
        </b-input>

        <label>
            E-mail:
        </label>
        <b-input
            type="email"
            placeholder="Электронная почта"
            v-model="email"
            class="mb-2"
        >
        </b-input>

        <label>
            Пароль:
        </label>
        <b-input
            type="password"
            placeholder="Пароль"
            v-model="password"
            class="mb-2"
        >
        </b-input>

        <div
            class="d-flex"
        >
            <b-button
                variant="primary"
                @click="signup"
            >
                Sign Up
            </b-button>
        </div>
    </div>
</template>

<script>
import { UsersModel } from '../services/api/models/users.js';

export default {
    name: "LoginPage",
    data() {
        return {
            username: '',
            email: '',
            name: '',
            password: ''
        };
    },
    methods: {
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