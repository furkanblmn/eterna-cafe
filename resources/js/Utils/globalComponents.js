import { Head, Link } from '@inertiajs/vue3';
import * as bootstrap from 'bootstrap';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
 
DataTable.use(DataTablesCore);
DataTablesCore.Responsive.bootstrap(bootstrap);

// Bu fonksiyon Vue uygulamasına global bileşenler ekler
export function registerGlobalComponents(app) {
    app.component('Head', Head);
    app.component('Link', Link);
}