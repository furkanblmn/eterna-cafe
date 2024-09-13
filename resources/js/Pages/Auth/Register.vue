<template>
    <Head title="Kayıt Ol" />
    <div class="form-wrapper background_blue d-flex align-items-center justify-content-center">
        <div class="background-image">
            <img src="https://picsum.photos/1920/1080" alt="">
        </div>
        <div class="form-container">
            <h2 class="form-title">Kayıt Ol</h2>
            <form @submit.prevent="register" class="form-body">
                <div class="form-group">
                    <label for="first_name">İsim:</label>
                    <input type="text" id="first_name" v-model="form.first_name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="last_name">Soyisim:</label>
                    <input type="text" id="last_name" v-model="form.last_name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="username">Kullanıcı Adı:</label>
                    <input type="text" id="username" v-model="form.username" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="form.email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="password">Şifre:</label>
                    <input type="password" id="password" v-model="form.password" class="form-input" required>
                </div>
                <LoadingButton type="submit" :loading="processing" class="btn btn-primary form-button">
                    Kayıt Ol</LoadingButton>
            </form>
            <div class="login-link mt-3">
                Zaten hesabınız var mı?
                <Link href="/login">Giriş Yapın</Link>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import LoadingButton from '@/Shared/LoadingButton.vue';

export default {
    components: {
        LoadingButton,
    },
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                password: '',
            },
            processing: false,
            successMessage: '',
            errorMessage: '',
            icon: "success",
        };
    },
    methods: {
        register() {
            this.processing = true;
            axios.post('/register', this.form).then(response => {
                this.message = response.data.data || 'Kayıt başarılı!';

                setTimeout(() => {
                    this.$inertia.visit('/login');
                }, 3000);
            }).catch(error => {
                this.icon = "error";

                if (error.response && error.response.data) {
                    this.message = error.response.data.message || 'Kayıt işlemi sırasında bir hata oluştu.';
                } else {
                    this.message = 'Bir hata oluştu. Lütfen tekrar deneyin.';
                }
            }).finally(() => {
                this.$showAlert(this.message, this.icon);
                this.processing = false;
            });
        }
    }
};

</script>
