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
export default {
    name: "Profile",
    props: {
        user: Object
    }
}
</script>