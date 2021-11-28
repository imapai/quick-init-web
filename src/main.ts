import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import VueRouter from './router'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8080/'
axios.interceptors.request.use(config => {
  console.log(config)
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = localStorage.getItem('token')
  // 在最后必须return config
  return config
})

const app = createApp(App)
app.use(ElementPlus)
app.use(VueRouter)
app.use(VueAxios, axios)
app.config.globalProperties.$http = axios
app.mount('#app')
