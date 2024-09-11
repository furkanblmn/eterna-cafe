<template>
    <div>
        <h1>Dashboard</h1>
        <p>Hoş geldiniz, {{ user.name }}!</p>
        <form method="POST" action="/logout">
            <button type="submit">Çıkış Yap</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>