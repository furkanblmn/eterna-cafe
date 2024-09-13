<template>
    <Head title="Ürünler" />
    <div id="content" class="w-100">
        <div class="container-fluid">
            <div class="card shadow mt-4 w-100">
                <div class="card-header">
                    <div class="d-flex justify-content-end ms-auto col-12">
                        <Link href="products/create" class="btn btn-success">Yeni ekle</Link>
                    </div>
                </div>
                <div class="card-body">
                    <Table :items="products" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Layout from '@/Shared/Layout.vue';
import Table from '@/Shared/Table.vue';

export default {
    components: {
        Table
    },
    data() {
        return {
            //
        };
    },
    props: {
        products: {
            type: Object,
            required: true,
        },
    },
    layout: Layout
};
</script>
