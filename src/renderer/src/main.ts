import { createApp } from 'vue'
import App from './App.vue'
import './assets/iconfont.js'
createApp(App)
  .mount('#app')
  .$nextTick(window.removeLoading)
