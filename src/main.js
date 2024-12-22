import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err)
}

app.use(router)
app.mount('#app') 