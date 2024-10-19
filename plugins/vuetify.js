// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css

const vuetify = createVuetify();

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(vuetify);
});
