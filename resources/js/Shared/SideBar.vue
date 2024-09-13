<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


        <Link class="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
        <div class="sidebar-brand-text mx-3">YÖNETİM PANELİ</div>
        </Link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <li class="nav-item">
            <Link class="nav-link" href="/dashboard/categories">
            <span>Kategoriler</span>
            </Link>
        </li>

        <li class="nav-item">
            <Link class="nav-link" href="/dashboard/products">
            <span>Ürünler</span>
            </Link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">


        <li class="nav-item">
            <Link class="nav-link" href="/logout">
            <span>Çıkış Yap</span>
            </Link>
        </li>

    </ul>
</template>

<script>

export default {
    props: {
        status: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        //
    },
    mounted() {
        //
    }
};
</script>
