<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/sampleFather">Sample</router-link> |
    <router-link to="/userlist">UserList</router-link> |
    <router-link to="/login">login</router-link> |
    <router-link to="/orderMenu">orderMenu</router-link> |
    <router-link to="/movies">movies</router-link> |
    <router-link to="/ToDoList">todolist</router-link>
    <button class="ml-5 loginOut-btn" @click="logoutPage">登出</button>
    <!-- <button v-if="myHobbies[1]">測試</button>
    {{ myHobbies[1] }} -->
  </div>
  <router-view></router-view>
</template>

<script>
// import { ref } from '@vue/reactivity';
export default {
  name: "Home",
  data() {
    return {
      logData:[]
    };
  },
  methods:{
    logoutPage(){
        var api = `${process.env.VUE_APP_API}/logout`;
        // eslint-disable-next-line no-unused-vars
        this.$http.post(api).then((response) => {
          // console.log('22223444')
          // this.logData = ! response.data.success
          if(response.data.success){
              this.$router.push('/')
          }
        });
    },
    getLoginData(){
    }
  },
  created () {
        // this.$store.dispatch('fetchVexUserList')
      // this.$set(this.counter, 'penguin', 0)
      this.getLoginData();
  },
  setup() {
  // const myHobbies =  ref(['篮球', '羽毛球', '桌球']);
  // return {
  //   myHobbies,
  // }
  },
  mounted() {
      // var api = `${process.env.VUE_APP_API}/api/user/check`;
      // this.$http.post(api).then((response) => {
      // this.myHobbies[1] = response.data.success; // 视图更新
      
          // let cachedData = [];
          // cachedData.push(response.data);
          // this.logData = cachedData;
          // console.log(this.logData,'測試測試測試測試')
          // this.$router.go(0)
          // window.location.reload()
        // console.log(response.data);
    // });
  }
};
</script>


<style lang="scss">
@import "~bootstrap/scss/bootstrap";


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: rgb(137, 160, 167);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.displayNone{
  display: none;
}

.displayBlack{
  display: block;
}

.loginOut-btn{
  margin-left: 20px;
}
</style>
