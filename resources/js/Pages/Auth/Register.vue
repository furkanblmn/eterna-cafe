<template>
    <div>
        <h2>Kayıt Ol</h2>
        <form @submit.prevent="register">
            <div>
                <label for="name">İsim:</label>
                <input type="text" v-model="form.name" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" required>
            </div>
            <div>
                <label for="password">Şifre:</label>
                <input type="password" v-model="form.password" required>
            </div>
            <div>
                <label for="password_confirmation">Şifreyi Onayla:</label>
                <input type="password" v-model="form.password_confirmation" required>
            </div>
            <button type="submit">Kayıt Ol</button>
        </form>
    </div>
</template>

<script>
import { Inertia } from '@inertiajs/inertia';

export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        };
    },
    methods: {
        register() {
            Inertia.post('/register', this.form);
        }
    }
};
</script>