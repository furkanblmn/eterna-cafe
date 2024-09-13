<template>
    <Head title="Yönetim Paneli" />

</template>

<script>
import Layout from '@/Shared/Layout.vue'

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        };
    },
    layout: Layout,
    methods: {
    }
};
</script>
