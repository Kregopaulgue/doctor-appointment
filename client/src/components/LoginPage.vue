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
                Войти
            </b-button>
            <a
                class="ml-2"
                href="/signup"
            >
                Зарегистрироваться
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
                console.log('im here' + error);
                event.preventDefault();
                let errors = '';
                if(error.message) {
                    errors = error.message;
                }
                if(error.errors) {
                    error.errors.forEach(err => {
                        errors += err + '';
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

</style>