<template>

    <Head title="Ürün Ekle/Düzenle" />
    <div id="content" class="w-100">
        <div class="container-fluid">
            <div class="card shadow mt-4 w-100">
                <form id="form" @submit.prevent="formSubmit" class="form-body">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-4 align-items-center">
                                            <label class="text-end form-label mb-0 col-lg-3">Başlık</label>
                                            <div class="col-lg-9">
                                                <InputText placeholder="Başlık girin" type="text" v-model="form.title"
                                                    class="w-100" />
                                            </div>
                                        </div>

                                        <div class="row mb-4 align-items-center">
                                            <label class="text-end form-label mb-0 col-lg-3">Kategoriler</label>
                                            <div class="col-lg-9">
                                                <MultiSelect v-model="form.categories" :options="categories"
                                                    optionLabel="title" optionValue="id" filter
                                                    placeholder="Kategori Seçin" :maxSelectedLabels="20"
                                                    class="w-100" />
                                            </div>
                                        </div>

                                        <div class="row mb-4 align-items-center">
                                            <label class="text-end form-label mb-0 col-lg-3">Fiyat</label>
                                            <div class="col-lg-9">
                                                <InputNumber v-model="form.price" inputId="currency-turkey"
                                                    class="w-100" mode="currency" currency="TRY" locale="tr-TR"
                                                    placeholder="Fiyat girin" />
                                            </div>
                                        </div>

                                        <div class="row mb-4 align-items-start">
                                            <label class="text-end form-label mb-0 col-lg-3">İçerik</label>
                                            <div class="col-lg-9">
                                                <Editor v-model="form.content" @load="initEditorValue"
                                                    editorStyle="height: 320px" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <FileUploader ref="fileUploader"
                                            :defaultPreview="product ? product.file.orj_link : ''"
                                            :fileId="form.file_id" @update:fileId="updateFileId" />
                                    </div>
                                </div>
                                <SaveButtonWrapper backUrl="/dashboard/products" :loading="loader" />
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
import Editor from 'primevue/editor';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';

export default {
    components: {
        FileUploader,
        SaveButtonWrapper,
        InputText,
        Editor,
        MultiSelect,
        InputNumber
    },
    data() {
        return {
            form: {
                title: "",
                content: "",
                file_id: "",
                price: "",
                categories: [],
            },
            loader: false,
            message: "",
            icon: "success"
        };
    },
    props: {
        product: {
            type: Object,
            required: false,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        if (this.product) {
            this.loadProductData();
        }
    },
    methods: {
        initEditorValue({ instance }) {
            instance.clipboard.dangerouslyPasteHTML(this.form.content);
        },
        loadProductData() {
            this.form.title = this.product.title;
            this.form.content = this.product.content;
            this.form.file_id = this.product.file_id;
            this.form.price = this.product.price;

            this.form.categories = this.product.categories.map(category => category.id);
        },
        formSubmit() {
            this.loader = true;

            const requestType = this.product ? 'put' : 'post';
            const url = this.product
                ? `/dashboard/products/${this.product.id}`
                : '/dashboard/products';

            axios[requestType](url, this.form)
                .then((response) => {
                    this.message = response.data.data.message;
                    this.icon = "success";


                    if (!this.product) {
                        this.resetForm();
                    }

                })
                .catch((error) => {
                    this.message = error.response?.data?.message || 'Bilinmeyen bir hata oluştu.';
                    this.icon = "error";
                })
                .finally(() => {
                    this.$showAlert(this.message, this.icon);
                    this.loader = false;
                });
        },

        resetForm() {
            this.form = {
                title: "",
                content: "",
                file_id: "",
                price: "",
                categories: []
            };

            this.updateFileId("");
            this.$refs.fileUploader.clearFileUpload();
        },
        updateFileId(newFileId) {
            this.form.file_id = newFileId;
        }
    },
    layout: Layout
};
</script>
