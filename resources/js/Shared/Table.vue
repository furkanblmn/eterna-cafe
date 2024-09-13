<template>
    <DataTable :value="items" tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]"
        :sortOrder="sortOrder" @sort="onSort">
        <Column field="id" header="ID"></Column>
        <Column field="title" header="BAŞLIK"></Column>
        <Column field="title" header="RESİM">
            <template #body="slotProps">
                <img :src="slotProps.data.file.orj_link" class="w-24 rounded" style="height: 60px;" />
            </template>
        </Column>
        <Column header="İŞLEMLER">
            <template #body="slotProps">
                <span>
                    <LoadingButton @click="deleteItem(slotProps.data)" :loading="loadingIds.includes(slotProps.data.id)"
                        buttonClass="btn btn-danger me-3 process_btn">
                        <span class="indicator-label">Sil</span>
                    </LoadingButton>
                    <LoadingButton @click="updateItem(slotProps.data)" :loading="false"
                        buttonClass="btn btn-primary process_btn">
                        <span class="indicator-label">Düzenle</span>
                    </LoadingButton>
                </span>
            </template>
        </Column>
        <template #footer> Toplam {{ items.length }} kayıt. </template>
    </DataTable>
</template>

<script>
import dayjs from 'dayjs';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import LoadingButton from '@/Shared/LoadingButton.vue';
import axios from "axios";

export default {
    components: {
        LoadingButton,
        DataTable,
        Column
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            sortField: 'id',
            sortOrder: 1,
            currentUrl: window.location.href,
            loadingIds: []  // Silme işlemi sırasında hangi öğenin yüklendiğini takip eder
        };
    },
    methods: {
        async deleteItem(item) {
            if (this.loadingIds.includes(item.id)) return;

            this.loadingIds.push(item.id);

            try {
                await axios.delete(`${this.currentUrl}/${item.id}`, {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('#csrf-token').getAttribute('content')
                    }
                });

                this.$showAlert("Silme işlemi başarıyla tamamlandı", "success");
                this.removeItem(item.id);
            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message)
                    ? error.response.data.message
                    : 'Bilinmeyen bir hata oluştu.';
                this.$showAlert(message, "error");
            } finally {
                this.loadingIds = this.loadingIds.filter(id => id !== item.id); // İşlem tamamlandı, loading id'sini kaldır
            }
        },
        removeItem(itemId) {
            const index = this.items.findIndex(i => i.id === itemId);
            if (index !== -1) {
                this.items.splice(index, 1); // Listeden öğeyi kaldır
            }
        },
        updateItem(item) {
            this.$inertia.visit(`${this.currentUrl}/${item.id}/edit`);
        },
        formatDate(time, format = 'DD.MM.YYYY HH:mm') {
            const date = dayjs(time);
            return date.isSame(dayjs(), 'day') ? "Bugün" : date.format(format);
        },
        onSort(event) {
            this.sortField = event.sortField;
            this.sortOrder = event.sortOrder;
        }
    }
};
</script>

<style scoped>
.process_btn {
    display: inline-block;
    width: auto !important;
}
</style>
