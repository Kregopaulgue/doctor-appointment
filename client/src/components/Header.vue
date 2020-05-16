<template>
    <b-navbar type="dark" variant="info">
        <b-navbar-brand href="#">Харьковская городская поликлиника №3</b-navbar-brand>
        <b-navbar-nav
            class="ml-3"
        >
            <b-nav-item href="/appointments">Записи посещений</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav
            class="ml-auto"
        >
            <b-nav-item href="/signup" class="ml-auto">Регистрация</b-nav-item>
            <b-nav-item href="/logout">Выход из аккаунта</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>

</style>