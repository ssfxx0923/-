import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err)
  // 可以添加错误上报逻辑
}

router.onError((error) => {
  console.error('路由错误:', error)
})

app.use(router)
app.mount('#app') 