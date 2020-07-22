import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 解决路由重复
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
// 引入路由和路由配置
import VueRouter from 'vue-router'
import routerConfig from './router/index.js';

// 引入iconfont
import './assets/icons'

// 引入axios
import Axios from 'axios'
import VueAxios from 'vue-axios'

// 引入VueSession
import VueSession from 'vue-session'

//引入格式化日期时间为（YYYY-MM-DD hh：mm：ss）
import moment from 'moment/moment'

// 引入Mock
import './mock';

// 引入语言国际化支持
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

Vue.filter('moment', function (value, formatString) { 
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'; return moment(value).format(formatString); 
});

Axios.defaults.baseURL = 'http://172.16.183.127:28080/'
Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(config => {
	if (/get/i.test(config.method)) { //判断get请求
		config.params  =  config.params || {};
		config.params.t = Date.parse(new Date())/1000; //添加时间戳
	}
    return config;
}, error => {
    return Promise.reject(error);
})

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);
Vue.use(VueSession)
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: sessionStorage.getItem('language')||'zh',
   messages:{
     //将我们项目中的语言包与Element的语言包进行合并
     'en':Object.assign(require('./assets/lang/en-US.js'),enLocale),
     'zh':Object.assign(require('./assets/lang/zh-CN.js'),zhLocale),
     'ja':Object.assign(require('./assets/lang/ja-JP.js'),jaLocale),
   },
});
Vue.use(ElementUI,{
  i18n:(key,value) =>i18n.t(key,value) 
});

const router = new VueRouter(routerConfig);

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
