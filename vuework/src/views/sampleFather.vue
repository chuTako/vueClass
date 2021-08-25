<template>
  <div class="about">
    <div class="container">
      <div class="col-md-6 m-auto p-5">
        <h1 class="title-f-props">我是父層sampleFather傳送資料props</h1>
        <select
          class="form-select"
          aria-label="Default select example"
          @change="changeStatus"
          v-model="status"
        >
          <option selected>Open this select menu</option>
          <option value="線上">線上</option>
          <option value="線下">線下</option>
        </select>
        <input class="mt-3" type="text" v-model="newData" />
        <button @click="clicknewData">送出</button>
      </div>
      <h1 class="title-f-emit">我是父層sampleFather接受資料$emit</h1>
      {{ userName }}
      <div class="m-auto p-5">
      <h1 class="title-f-vuex">我是Vuex接受資料</h1>
      <select
        class="form-select"
        aria-label="Default select example"
        @change="changevexStatus"
        v-model="vexStatus"
      >
        <option selected>Open this select menu</option>
        <option value="線上">線上</option>
        <option value="線下">線下</option>
      </select>
      {{ vexStatus }}
      </div>
      <sampleChild
        :status="myStatus"
        :newData="mynewData"
        @pushNewName="getNewName"
      ></sampleChild>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import sampleChild from "@/components/sampleChild.vue";

export default defineComponent({
  setup() {},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    sampleChild,
  },
  data() {
    return {
      status: "Open this select menu",
      myStatus: "",
      newData: "測試用",
      mynewData: "",
      userName: "",
      vexStatus: this.$store.state.vexStatus,
    };
  },
  methods: {
    changeStatus() {
      //  空值
      console.log(this.myStatus);
      this.myStatus = this.status;
      //  帶入select切換過後的值
      console.log(this.myStatus);
    },
    clicknewData() {
      this.mynewData = this.newData;
    },
    getNewName(newName) {
      this.userName = newName;
    },
    changevexStatus() {
      this.$store.state.vexStatus = this.vexStatus;
    },
  },
});
</script>

<style scoped>
.title-f-props {
  font-weight: 600;
  color: forestgreen;
}

.title-f-emit{
  font-weight: 600;
  color: rgb(34, 90, 139);
}

.title-f-vuex{
  font-weight: 600;
  color: rgb(125, 34, 139);
}
</style>

