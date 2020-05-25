<template>
    <div
        v-if="user"
        class="p-4"
    >
        <h3>{{ user.name }}</h3>

        <p><strong>Логин пользователя:</strong> {{ user.username }}</p>
        <p><strong>E-mail:</strong> {{ user.email }}</p>
        <p><strong>ИК Медицинской Карты:</strong> {{ user._id }}</p>
        <p><strong>Дата регистрации:</strong> {{`${(new Date(user.createdAt)).getUTCDate()}.${(new Date(user.createdAt)).getUTCMonth() + 1}.20${(new Date(user.createdAt)).getYear() - 100} ${(new Date(user.createdAt)).getUTCHours()}:${(new Date(user.createdAt)).getUTCMinutes()}`}}</p>
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