<template>
    <Head title="Parolayı Sıfırla" />
    <div class="form-wrapper background_blue d-flex align-items-center justify-content-center">
        <div class="form-container">
            <h2 class="form-title">Parolayı Sıfırla</h2>
            <form @submit.prevent="resetPassword" class="form-body">
                <input type="hidden" v-model="form.token" />
                <div class="form-group">
                    <label for="password">Yeni Parola:</label>
                    <input type="password" id="password" v-model="form.password" class="form-input" required />
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Parola Tekrar:</label>
                    <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                        class="form-input" required />
                </div>

                <LoadingButton type="submit" :loading="processing" class="btn btn-primary form-button">
                    Parolayı Sıfırla
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
import { Link, Head } from '@inertiajs/vue3';
import axios from 'axios';

export default {
    components: {
        LoadingButton,
        Link,
        Head,
    },
    props: {
        token: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            form: {
                token: this.token,
                email: this.email,
                password: '',
                password_confirmation: '',
            },
            processing: false,
        };
    },
    methods: {
        resetPassword() {
            this.processing = true;

            axios.post('/password/update', this.form)
                .then(response => {
                    const message = response.data.message || 'Parolanız başarıyla sıfırlandı.';
                    this.$showAlert(message, 'success');
                    this.$inertia.visit('/login');
                })
                .catch(error => {
                    const message = (error.response && error.response.data && error.response.data.message)
                        ? error.response.data.message
                        : 'Bilinmeyen bir hata oluştu.';
                    this.$showAlert(message, 'error');
                })
                .finally(() => {
                    this.processing = false;
                });
        }
    }
};
</script>
