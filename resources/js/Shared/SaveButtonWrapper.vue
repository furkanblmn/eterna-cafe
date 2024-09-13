<template>
    <div class="card mt-3">
        <div class="card-body">
            <div class="d-block text-center">
                <button @click="goBack" type="button" class="btn btn-default w-50">
                    <i class="fas fa-arrow-left"></i> Geri Dön
                </button>
                <LoadingButton :loading="loading" type="submit" buttonClass="btn btn-success w-50">
                    <span class="indicator-label">Kaydet</span>
                </LoadingButton>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingButton from '@/Shared/LoadingButton.vue';

export default {
    components: {
        LoadingButton
    },
    props: {
        loading: Boolean,
        backUrl: {
            type: String,
            required: true
        }
    },
    methods: {
        goBack() {
            this.$inertia.visit(this.backUrl);
        }
    },
    mounted() {
        //
    }
};
</script>
