<template>
    <DataTable v-model:filters="filters" :value="itemsWithCategoryTitles" tableStyle="min-width: 50rem" stripedRows
        showGridlines paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" :sortOrder="sortOrder" @sort="onSort"
        filterDisplay="menu" :loading="loading" :globalFilterFields="['title', 'price', 'categoryTitles']">

        <template #header>
            <div class="d-flex justify-content-between">
                <Button type="button" label="Filtreyi Temizle" outlined @click="clearFilter()" />
                <IconField>
                    <InputText v-model="filters['global'].value" placeholder="Arama Yap..." />
                </IconField>
            </div>
        </template>

        <template #empty> Kayıt bulunamadı. </template>
        <template #loading> Yükleniyor. Lütfen bekleyiniz. </template>

        <Column field="id" header="ID" style="width: 20px"></Column>

        <Column field="file_id" header="RESİM" style="width: 50px">
            <template #body="slotProps">
                <img :src="slotProps.data.file.orj_link" class="w-24 rounded preview_image" />
            </template>
        </Column>

        <Column field="title" header="BAŞLIK" filterField="title"></Column>

        <Column v-if="hasPrice" field="price" header="FİYAT" filterField="price">
            <template #body="slotProps">
                <span>{{ slotProps.data.price }}₺</span>
            </template>
        </Column>

        <Column v-if="hasCategories" field="categoryTitles" header="KATEGORİLER" filterField="categoryTitles">
            <template #body="slotProps">
                <span v-for="(category, index) in slotProps.data.categories" :key="category.id">
                    {{ category.title }}<span v-if="index < slotProps.data.categories.length - 1">,</span>
                </span>
            </template>
        </Column>

        <Column header="İŞLEMLER" style="width: 15%">
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
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    components: {
        LoadingButton,
        DataTable,
        Column,
        IconField,
        InputText,
        Button
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
            loadingIds: [],
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
                price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                categoryTitles: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
            },
            loading: false
        };
    },
    computed: {
        hasCategories() {
            return this.items.some(item => item.categories && item.categories.length > 0);
        },
        hasPrice() {
            return this.items.some(item => item.price);
        },
        itemsWithCategoryTitles() {
            return this.items.map(item => ({
                ...item,
                categoryTitles: item.categories?.map(cat => cat.title).join(', ') || ''
            }));
        }
    },
    methods: {
        clearFilter() {
            this.initFilters();
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
                price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                categoryTitles: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
            };
        },
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
                this.loadingIds = this.loadingIds.filter(id => id !== item.id);
            }
        },
        removeItem(itemId) {
            const index = this.items.findIndex(i => i.id === itemId);
            if (index !== -1) {
                this.items.splice(index, 1);
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

.preview_image {
    width: 50px;
    height: 50px;
    object-fit: contain;
}
</style>
