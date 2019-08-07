import Vue from 'vue'
import App from './App'
// import "./style/weui.wxss";//报错
// import 'weui';// 不支持微信
import "mp-weui/lib/style.css"
import store from './store/index';
import interfaces from './utils/interfaces';
import https, {
  httpsPure
} from './utils/https';
import date from './utils/index';
// import * as cloud from './utils/cloud';
// import { cloud } from './utils/cloud';
// import cloud from './utils/cloud';

Vue.prototype.$store = store;
Vue.prototype.$interfaces = interfaces;
Vue.prototype.$https = https;
Vue.prototype.$httpsPure = httpsPure;
Vue.prototype.$date = date;
// Vue.prototype.$cloud = cloud;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
