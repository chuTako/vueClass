import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// library.add(faPhone);



const app = createApp(App)
app.use(VueAxios, axios)
app.use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app")


// 導航守衛 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
// router.beforeEach((to, from, next) => {
    //2.使用axios 進行get请求
    // eslint-disable-next-line no-undef
    // if (to.meta.requiresAuth){
    //     var api = `${process.env.VUE_APP_API}/api/user/check`;
    //     axios.post(api).then((response) => {
    //     console.log(response.data);
    //         if(response.data.success){
    //             next()
    //         }else{
    //             console.log('22222222222')
    //             next({ name: 'login' })
    //         }
    //     });
    // }else{
    //     next()
    // }
    // console.log(to, from, next)
// })


