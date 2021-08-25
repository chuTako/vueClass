<template>
        <div class="container">
            {{ vexUserList }}
            <button @click="fetchVexUserList">axios資料</button>
        </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    methods:{
        ...mapActions(['fetchVexUserList'])
    },
    computed:{
        ...mapState(['vexUserList'])
    }
        
}
</script>
