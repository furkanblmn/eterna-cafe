<template>
    <div>
        <div v-if="localDefaultPreview !== ''"
            class="default-preview d-flex flex-column justify-content-center align-items-center mb-3">
            <img :src="localDefaultPreview" alt="Default Preview" class="img-fluid" />
            <button type="button" class="btn btn-danger mt-2 w-25 mx-auto" @click="removeDefaultPreview">
                Resmi Kaldır
            </button>
        </div>

        <FileUpload ref="fileUpload" name="file" :multiple="false" accept="image/*" :maxFileSize="3000000"
            chooseLabel="Dosya Seç" uploadLabel="Yükle" :showCancelButton="false" :showUploadButton="false"
            :withCredentials="true" :auto="true" :url="fileUrl" @before-send="beforeSend" @removeUploadedFile="onRemove"
            @upload="onUpload" :showPreview="true" :disabled="fileId !== ''">
            <template #empty>
                <span>Dosyaları buraya sürükleyip bırakın veya <strong>Dosya Seç</strong> butonuna tıklayın.</span>
            </template>
        </FileUpload>
    </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import axios from 'axios';

export default {
    components: {
        FileUpload,
    },
    props: {
        fileId: {
            type: String,
            required: true,
        },
        defaultPreview: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            localDefaultPreview: this.defaultPreview,
            fileUrl: '/dashboard/file',
        };
    },
    methods: {
        beforeSend(event) {
            event.xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('#csrf-token').getAttribute('content'));
        },

        onUpload(event) {
            const fileId = event.xhr.response;
            this.$emit('update:fileId', fileId);
        },

        onRemove() {
            axios.delete(`${this.fileUrl}/${this.fileId}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('#csrf-token').getAttribute('content')
                }
            }).then(() => {
                this.$emit('update:fileId', "");
                this.clearFileUpload();
            });
        },

        removeDefaultPreview() {
            this.localDefaultPreview = "";
            this.$emit('update:fileId', "");
        },

        clearFileUpload() {
            this.$refs.fileUpload.files = [];
            this.$refs.fileUpload.uploadedFiles = [];
            this.$forceUpdate();
            console.log("Dosya yükleme alanı manuel olarak temizlendi.");
        },
    }
}
</script>
