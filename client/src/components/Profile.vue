<template>
    <div
        v-if="user"
        class="p-4"
    >
        <h3>{{ user.name }}</h3>

        <p><strong>Логин пользователя:</strong> {{ user.username }}</p>
        <p><strong>E-mail:</strong> {{ user.email }}</p>
        <p><strong>ИК Медицинской Карты:</strong> {{ user._id }}</p>
        <p><strong>Дата регистрации:</strong> {{ user.createdAt }}</p>
    </div>
</template>

<script>

import { UsersModel } from '../services/api/models/users.js';

export default {
    name: "Profile",
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
            } catch(error) {
                console.log(error);
            }
        }
    }
}
</script>