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
                Зарегистрироваться
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
                const response = await usersModelInstance.signupUser(
                    this.username, this.email, this.name, this.password
                );
                console.log(response);
                UsersModel.setAuthToken(response);
                this.$router.history.push('/appointments');
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
                event.preventDefault();
            }
        }
    }
}
</script>

<style scoped>

</style>