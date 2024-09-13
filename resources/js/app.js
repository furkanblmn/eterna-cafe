//app.js

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import setupGlobalProperties from '@/Utils/globalProperties';
import { registerGlobalComponents } from './Utils/globalComponents';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
    return pages[`./Pages/${name}.vue`];
  },
  title: title => title ? `${title} - Eterna Cafe Panel` : 'Eterna Cafe Panel',
  setup({ el, App, props, plugin }) {
    const vueApp = createApp({ render: () => h(App, props) });

    vueApp.use(plugin);
    setupGlobalProperties(vueApp);
    registerGlobalComponents(vueApp);

    vueApp.use(PrimeVue, {
      theme: {
          preset: Aura,
          options: {
              darkModeSelector: '.my-app-dark',
          }
      }
   });

    vueApp.mount(el);

  },
});



