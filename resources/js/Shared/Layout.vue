<template>

    <body id="page-top">
        <div id="wrapper">
            <SideBar :status="true" />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                       
                    </nav>

                    <slot />
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
    components: {
        SideBar
    },
    data() {
        return {
            //
        };
    },
    computed: {
        //
    },
    watch: {
        //
    },
    methods: {
        //
    },
    mounted() {
        //
    }
};
</script>
