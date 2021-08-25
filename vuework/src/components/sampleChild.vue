<template>
  <div class="hello">
    <div class="m-auto p-5">
      <h1 class="title-c-props">我是子層sampleChild接受資料props</h1>
      <div>狀態：{{ status }}&nbsp;&nbsp;&nbsp;(使用props方法)</div>
      <div>新資料：{{ newData }}&nbsp;&nbsp;&nbsp;(使用props方法)</div>
    </div>
    <div class="m-auto p-5">
      <h1 class="title-c-emit">我是子層sampleChild傳送資料$emit</h1>
      <input type="text" v-model="userName" />
      <button @click="clickUserName">送出</button>
    </div>
    <div class="m-auto p-5">
      <h1 class="title-c-vuex">我是子層Home同步vuex狀態</h1>
      <div>狀態：{{ showvexstatus }}&nbsp;&nbsp;&nbsp;(使用vuex方法)</div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- {{ listData }} -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ["status", "newData"],
  data() {
    return {
      userName: 'ssssss',
    };
  },
  setup(props) {
    console.log(props.msg);
    return { props };
  },
  methods: {
    clickUserName() {
      this.$emit('pushNewName',this.userName)
    }
  },
  computed:{
    showvexstatus() {
      return this.$store.state.vexStatus
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.title-c-props {
  font-weight: 600;
  color: forestgreen;
}

.title-c-emit{
  font-weight: 600;
  color: rgb(34, 90, 139);
}

.title-c-vuex{
  font-weight: 600;
  color: rgb(125, 34, 139);
}
</style>
