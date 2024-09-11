<template>
    <div>
        <h2>Giriş Yap</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" required>
            </div>
            <div>
                <label for="password">Şifre:</label>
                <input type="password" v-model="form.password" required>
            </div>
            <button type="submit">Giriş Yap</button>
        </form>
    </div>
</template>

<script>
import { Inertia } from '@inertiajs/inertia';

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        };
    },
    methods: {
        login() {
            Inertia.post('/login', this.form);
        }
    }
};
</script>