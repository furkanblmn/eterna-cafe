//globalProperties.js

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';


export default (app) => {
    // Swal alert fonksiyonu
    app.config.globalProperties.$showAlert = (message, icon = 'warning') => {
        Swal.fire({
            showConfirmButton: false,
            timer: 3000,
            icon: icon,
            title: message
        });
    };

};