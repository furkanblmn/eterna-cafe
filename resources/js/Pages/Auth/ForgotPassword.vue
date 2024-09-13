<template>

    <Head title="Parolamı Unuttum" />
    <div class="form-wrapper background_blue d-flex align-items-center justify-content-center">
        <div class="background-image">
            <img src="https://picsum.photos/1920/1080" alt="">
        </div>
        <div class="form-container">
            <h2 class="form-title">Parolamı Unuttum</h2>
            <form @submit.prevent="sendResetLink" class="form-body">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="form.email" class="form-input" required>
                </div>
                <LoadingButton type="submit" :loading="processing" class="btn btn-primary form-button">
                    Şifre Sıfırlama Bağlantısı Gönder
                </LoadingButton>
            </form>
            <div class="login-link mt-3">
                Giriş sayfasına dön
                <Link href="/login">Giriş Yap</Link>
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
            },
            processing: false
        };
    },
    methods: {
        sendResetLink() {
            this.processing = true;

            axios.post('/password/forgot', this.form)
                .then(response => {
                    let message = response.data.message || 'Parola sıfırlama bağlantısı email adresinize gönderildi.';
                    this.$showAlert(message, "success");
                })
                .catch(error => {
                    let message = (error.response && error.response.data && error.response.data.message)
                        ? error.response.data.message
                        : 'Bilinmeyen bir hata oluştu.';
                    this.$showAlert(message, "error");
                })
                .finally(() => {
                    this.processing = false;
                });
        }
    }
};
</script>
