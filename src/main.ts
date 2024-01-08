import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import App from './App.vue'
import router from './router'
import store from './store'
import './Index.css'

// Add the icon to the library
library.add(fas, fab)

// Create the app
const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Use the router and store
app.use(store).use(router).use(ToastPlugin);

// Mount the app
app.mount('#app')
