import axios from 'axios'
import { createStore } from 'vuex'


export default createStore({
  // state狀態像data原本存放的屬性
  state: {
    vexStatus:'線上-x',
    vexUserList:[{"id":"22222"},{"id":"33333"}]
  },
  // mutations變動
  mutations: {
    fetchVexUserList: ( state, payload )=>{
      state.vexUserList = payload
    }
  },
  // action行動
  actions: {
    // eslint-disable-next-line no-unused-vars
    fetchVexUserList: ({ commit })=>{
      // 同步寫法
      const api="https://randomuser.me/api/?results=20"
      axios.get(api).then((response) => {
        console.log(response.data)
      const payload = response.data;
      commit('fetchVexUserList',payload)
      })
      // 異步寫法
      // const api="https://randomuser.me/api/?results=20"
      // const result = await axios.get(api)
      // console.log(result)
    }
  },
  // modules模塊
  modules: {
  }
})




