import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import { HomeFilled, Money, InfoFilled,ArrowDown,Timer } from "@element-plus/icons-vue";


const app = createApp(App)

const icons = {
    "HomeFilled":HomeFilled,
    "Money":Money,
    "InfoFilled":InfoFilled,
    "arrow-down":ArrowDown,
    "Timer":Timer
}

for (const [key,value] of Object.entries(icons)) {
    app.component(key,value)
}

// app.component("HomeFilled",HomeFilled)
// app.component("Money",Money)
// app.component("InfoFilled",InfoFilled)


// app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
