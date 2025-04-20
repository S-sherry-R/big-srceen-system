import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view';
// 引入全局css
// import './assets/demo/scss/style.scss';
import './assets/scss/style.scss'
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
// import './assets/demo/icon/iconfont.css'
import './assets/icon/iconfont.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';

const app = createApp(App)
app.use(PublicComponent)
app.use(dataV)
app.use(store)
app.use(router)
app.mount('#app')
