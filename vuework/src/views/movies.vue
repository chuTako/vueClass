<template>
  <div id="wrapper" class="movies-page" @wheel.prevent="wheelscroll">
    <div class="cards">
      <div class="card" v-for="moviesList in moviesData" :key="moviesList.name">
        <div class="left">
          <div class="cover" :style="bgcss(moviesList.cover)"></div>
        </div>
        <div class="right">
          <h2>{{ moviesList.name }}</h2>
          <h4>{{ moviesList.type }}</h4>
          <p>{{ moviesList.description }}</p>
          <div class="price">{{ moviesList.price }}$</div>
          <button class="add btn" @click="addCart(moviesList,$event)">+ Add to Cart</button>
        </div>
      </div>
    </div>
    <div class="fixed-control" @click="isCartOpen =! isCartOpen">
      <i class="fa fa-shopping-cart"></i>
      <span>{{ carts.length }}</span>
    </div>
    <div class="buybox" v-if="currentMovie" :style="bgcss(currentMovie.cover)"></div>
    <div v-if="isCartOpen" class="control" :class="{show: isCartOpen}">
        <div class="panel">
          <div class="model-close" @click="isCartOpen =! isCartOpen">
            <i class="fas fa-times"></i>
          </div>
          <h2>My Movie Cart</h2>
            <ul> 
                <li v-for="(movie,id) in carts" :key="movie.name">
                  <div class="thumbnail" :style="bgcss(movie.cover)"></div>
                  <h3>{{ movie.name }}
                    <div class="price">{{ movie.price }}</div>
                    <div class="remove" @click="carts.splice(id,1)">X</div>
                  </h3>
                </li>
                <li v-if="carts.length == 0">
                  <h3>Your cart is empty ! :(</h3>
                </li>
            </ul>
        </div> 
    </div>
    {{ moviesData }}
  </div>
</template>

<script>
import gsap from "gsap";
import $ from 'jquery'

export default {
  data() {
    return {
      moviesData: [],
      carts: [],
      cartCheck: true,
      currentMovie: null,
      isCartOpen: false,
    };
  },
  methods: {
    getmovieData() {
      var api = "http://localhost:3000/movies";
      //2.使用axios 進行get请求
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.moviesData = response.data;
      });
    },
    bgcss(url) {
      return {
        "background-image": `url(${url})`,
        'background-size': 'cover',
      };
    },
    wheelscroll(evt) {
      console.log(evt.deltaY);
      // eslint-disable-next-line no-undef
      gsap.to(".cards", {
        x: "+=" + evt.deltaY * 3,
        duration: 2,
      });
    },
    addCart(evt,eventnal){
      this.currentMovie = evt
      this.$nextTick(()=>{
      gsap.from(".buybox",{
          left: $(eventnal.target).offset().left,
          top: $(eventnal.target).offset().top,
          opacity: 1
      })
      gsap.from(".fa-shopping-cart",{
          scale:0.5
      })
      setTimeout(()=>{
      this.carts.push(evt)
      })
      })
    }
  },
  mounted() {
    this.getmovieData();
    console.log($('#wrapper'),'sssssdddfff');    
  }
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap')

@mixin size($w,$h:$w)
  width: $w
  height: $h

@mixin flexCenter
  display: flex
  justify-content: center
  align-items: center

@mixin bxShadow
  box-shadow: 0px 5px 25px 5px

@mixin fixedPos($l,$t)
  position: fixed
  left: $l
  top: $t

*
  vertical-align: center
  outline: none
  font-family: 'Roboto', sans-serif

html,body
  height: 100%
  margin: 0

.movies-page
  +size(100%,100vh)
  background-color: #1d1e22
  color: #fff
  position: relative
  .fixed-control
    +size(100px,50px)
    position: absolute
    right: 20px
    top: 20px
    cursor: pointer
    color: #fff
    z-index: 1000
    .fa-shopping-cart
      font-size: 26px
      margin-right: 10px 
      transform: translate(0px, 0px)
    span
      font-size: 22px
  .cards
    +flexCenter
    height: 100%
    justify-content: left
    margin-left: 20vw
    margin-right: 20vw
    transition: 0.5s,left 0s
    .card
      margin: 60px
      +size(460px,auto)
      display: inline-block
      flex-direction: inherit
      background-color: rgba(white,0.9)
      color: #111
      flex-shrink: 0
      display: inline-flex
      padding: 20px
      cursor: pointer

      +bxShadow
      .left
        flex: 1
        .cover
          +bxShadow
          +size(180px,240px)
          border-radius: 5px
          background-size: cover
          position: relative
          top: -50px
      .right
        flex: 2
        text-align: left
        padding: 20px 20px 0px 20px
        h2
          margin: 0
          font-weight: bold
          font-size: 24px
          color: #444
        h4
          margin-top: 10px
          margin-bottom: 10px
          opacity: 0.8
          font-weight: normal
          color: #444
        p
          font-size: 13px
          line-height: 1.3
          min-height: 5em
          opacity: .8
          color: #888
        .price
          display: inline-block
          margin-right: 20px
        button
          padding: 5px 10px
          background-color: #bbb
          color: rgba(white,.9)
          border-radius 50px
          cursor: pointer
          transition: 0.5s
          &:hover
            color: white
            background-color: #f95e5e
      &:hover
        transform: translateY(-10px)
        .left .cover
          transform: translateY(-10px)

//動態盒子
.buybox
  +size(50px,80px)
  background-color: #fff
  position: fixed
  right: 30px
  top: 101px;
  opacity: 0
  background-size: cover


//彈出視窗
.control
  +size(100%)
  +fixedPos(0,0)
  +flexCenter
  background-image: linear-gradient(10deg,#111 0%,#111 50%, transparent 100%)
  color: #eee
  padding: 5vmin
  box-sizing: border-box
  transition: 0.5s
  display: none
  .panel
    width: 70%
  ul
    padding: 0
    list-style: none
    li
      display: flex
      padding: 5px 10px
      margin-bottom: 5px
      margin-top: 5px
      cursor: pointer
      border-radius: 5px
      transition: 0.5s
      &:hover
        transform: translateY(-10px)
        background-color: rgba(white,0.1)
      h3
        font-size: 17px
        font-weight: normal
        display: inline-block
        width: 100%
        opacity: 0.8
        .price
          float: right
        .remove
          display: inline-block
          padding: 4px 15px
          background-color: rgba(white,0.3)
          border-radius: 50px
          transition: 0.5s
          margin-left: 10px
          &:hover
            background-color: #ef4c4c
            color: black
            font-size: 20px
      .thumbnail
        +size(50px,70px)
        display: inline-block
        margin-right: 20px

.show
  display: flex


.model-close
  +fixedPos(20,20)
  .fa-times
    color: #fff
    cursor: pointer
    

</style>
