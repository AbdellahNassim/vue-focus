import './assets/tailwindcss.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiBarChartSteps, RiSettings3Line,MdLoginOutlined,MdLogout,MdDoneSharp} from 'oh-vue-icons/icons'
import App from './App.vue'
import router from './router/router'

addIcons(BiBarChartSteps, RiSettings3Line,MdLoginOutlined,MdLogout,MdDoneSharp)
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
