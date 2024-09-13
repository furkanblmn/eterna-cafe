<template>

    <Head title="Kategori Ekle/Düzenle" />
    <div id="content" class="w-100">
        <div class="container-fluid">
            <div class="card shadow mt-4 w-100">
                <form id="form" @submit.prevent="formSubmit" class="form-body">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="card">
                                    <div class="card-body">
                                        <!-- Başlık Girişi -->
                                        <div class="row mb-4 align-items-center">
                                            <label class="text-end form-label mb-0 col-lg-3">Başlık</label>
                                            <div class="col-lg-9">
                                                <InputText placeholder="Başlık girin" type="text" v-model="form.title"
                                                    class="w-100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Dosya Yükleyici ve Kaydet Butonu -->
                            <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <FileUploader :defaultPreview="category ? category.file.orj_link : ''"
                                            :fileId="form.file_id" @update:fileId="updateFileId" />
                                    </div>
                                </div>
                                <SaveButtonWrapper backUrl="/dashboard/categories" :loading="loader" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Layout from '@/Shared/Layout.vue';
import SaveButtonWrapper from '@/Shared/SaveButtonWrapper.vue';
import InputText from 'primevue/inputtext';
import axios from "axios";
import FileUploader from '@/Shared/FileUploader.vue';
import { Inertia } from '@inertiajs/inertia';

export default {
    components: {
        FileUploader,
        SaveButtonWrapper,
        InputText
    },
    data() {
        return {
            form: {
                title: "",
                file_id: ""
            },
            loader: false,
            message: "",
            icon: "success"
        };
    },
    props: {
        category: {
            type: Object,
            required: false,
        },
    },
    mounted() {
        if (this.category) {
            this.form.title = this.category.title;
            this.form.file_id = this.category.file_id;
        }
    },
    methods: {
        formSubmit() {
            this.loader = true;
            const requestType = this.category ? 'put' : 'post';
            const url = this.category
                ? `/dashboard/categories/${this.category.id}`
                : '/dashboard/categories';

            axios[requestType](url, this.form)
                .then((response) => {
                    this.message = response.data.data.message;
                    this.icon = "success";

                    this.$showAlert(this.message, this.icon);

                    if (!this.category) {
                        this.resetForm();
                    }

                    // Yönlendirme
                    Inertia.visit('/dashboard/categories');
                })
                .catch((error) => {
                    console.log(error);

                    this.message = (error.response && error.response.data && error.response.data.message)
                        ? error.response.data.message
                        : 'Bilinmeyen bir hata oluştu.';
                    this.icon = "error";

                    this.$showAlert(this.message, this.icon);
                })
                .finally(() => {
                    this.loader = false;
                });
        },

        resetForm() {
            this.form = {
                title: "",
                file_id: ""
            };

            // Eğer bir dosya yüklendiyse onu da sıfırlıyoruz
            this.updateFileId("");
        },
        updateFileId(newFileId) {
            this.form.file_id = newFileId;
        }
    },
    layout: Layout
};
</script>
