import router from './router'
import App from './App.vue'

// dayjs add zh-cn
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/notification/style/css'

createApp(App).use(router).mount('#app')
