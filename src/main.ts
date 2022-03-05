import App from '~/App.vue'
import router from '~/router'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import '~/style.scss'

createApp(App).use(router).mount('#app')
