<template>

    <Head title="Giriş Yap" />
    <div class="form-wrapper background_blue d-flex align-items-center justify-content-center">
        <div class="background-image">
            <img src="https://picsum.photos/1920/1080" alt="">
        </div>
        <div class="form-container">
            <h2 class="form-title">Giriş Yap</h2>
            <form @submit.prevent="login" class="form-body">
                <div class="form-group">
                    <label for="email">E-Posta:</label>
                    <input type="email" id="email" v-model="form.email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="password">Şifre:</label>
                    <input type="password" id="password" v-model="form.password" class="form-input" required>
                </div>
                <LoadingButton type="submit" :loading="processing" class="btn btn-primary form-button">
                    Giriş Yap
                </LoadingButton>
            </form>
            <div class="login-link mt-3">
                <div>
                    <Link href="/password/forgot">Parolamı unuttum</Link> <!-- Parolamı Unuttum linki -->
                </div>
                <div class="mt-2">
                    Bir hesabın yok mu?
                    <Link href="/register">Kayıt ol</Link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingButton from '@/Shared/LoadingButton.vue';
import axios from "axios";

export default {
    components: {
        LoadingButton,
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            processing: false
        };
    },
    methods: {
        login() {
            this.processing = true;

            axios.post('/login', this.form)
                .then(response => {
                    this.$inertia.visit('/dashboard');
                })
                .catch(error => {
                    let message = (error.response && error.response.data && error.response.data.message)
                        ? error.response.data.message
                        : 'Bilinmeyen bir hata oluştu.';

                    console.error('Form gönderilirken bir hata oluştu:', message);

                    this.$showAlert(message, "error");
                })
                .finally(() => {
                    this.processing = false;
                });
        }
    }
};
</script>
