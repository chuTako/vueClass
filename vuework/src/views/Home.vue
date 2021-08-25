/* eslint-disable no-undef */
<template>
  <div class="home">
    <div class="container pt-5">
      <table class="table">
        <thead></thead>
        <tbody>
          <tr v-for="(item, i) in listData" :key="item.name">
            <th scope="col">{{ i + 1 }}</th>
            <th><img :src="item.picture.medium" alt="" /></th>
            <th>{{ item.name.first }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      listData: [],
    };
  },
  components: {
    // HelloWorld,
  },
  methods: {
    getData() {
      var api = "https://randomuser.me/api/?results=20";
      //2.使用axios 進行get请求
      this.$http.get(api).then((response) => {
        console.log(response);
        this.listData = response.data.results;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.home {
  background-color: rgb(211, 229, 235);
}
</style>
