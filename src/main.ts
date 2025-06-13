import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Import Vuetify styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Import global theme CSS
import './assets/theme.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
