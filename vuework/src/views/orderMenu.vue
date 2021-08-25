<template>
        <div class="noddles-page">
            <div class="container">
                <div class="control row pt-5">
                    <div class="col-md-4 text-left">最低價格<input type="text" v-model="minPrice"></div>
                    <div class="col-md-4 text-left">最高價格<input type="text" v-model="maxPrice"></div>
                    <div class="col-md-4 text-left">關鍵字搜尋<input type="text" v-model="keyWords"></div>
                    <div class="col-md-4 mt-3 control-box" v-for="(cardList, index) in cards" :key="cardList.title">
                        <div class="">
                          {{ index+1 }}{{ cardList.title }}
                        <input type="text" v-model.number="cardList.price">
                        </div>
                        是否已售完：
                        <input type="checkbox" v-model="cardList.soldOut">
                    </div>
                </div>
                <div class="menu">
                    <div class="cards row">
                        <h4 class="mt-5 keyWords-title" v-if="keyWords != ''">您搜尋的關鍵字為{{ keyWords }}</h4>
                        <div class="col-md-4 mt-5" v-for="cardList in cards" :key="cardList.title">
                          <div v-if="basicPrice + cardList.price > minPrice && basicPrice + cardList.price < maxPrice && cardList.title.indexOf(keyWords) != -1">
                              <div class="card">
                                  <img class="w-100 noddles-image" :src="cardList.cover" alt="">
                                  <h3>{{ cardList.title }}</h3>
                                  <div class="price-text">{{ cardList.price + basicPrice }}</div>
                                  <div>(+{{ serviceFee }}%服務費)</div>
                                  <div class="soldOut-text" v-if="cardList.soldOut">已售完</div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      basicPrice: 100,
      serviceFee: 10,
      minPrice: 0,
      maxPrice:500,
      keyWords:"",
      cards:[
      {
        title: "醬油拉麵",
        cover: "http://www.tabirai.net/tabirai-uploader/img/0005408/s1_0005408.jpg",
        price: 150,
        soldOut: true
      },
      {
        title: "豚股拉麵",
        cover: "http://3.bp.blogspot.com/-aj0ideQcly0/VfZ5RvLGyDI/AAAAAAAAWzE/Vy6U0R6vs90/s1600/IMG_2848.jpg",
        price: 250,
        soldOut: true
      },
      {
        title: "南洋咖哩拉麵",
        cover: "http://img.anikolife.com/uploads/20180325191054_65.jpg",
        price: 300,
        soldOut: false
      },{
        title: "味噌叉燒拉麵",
        cover: "http://img.listen-vision.com/uploads/20170830235936_33.jpg",
        price: 150,
        soldOut: false
      },
      {
        title: "蝦醬豚骨拉麵",
        cover: "http://d10pyp7ylo9bub.cloudfront.net/2017/06/tokyofruitramen_papapapapain1.jpg",
        price: 250,
        soldOut: false
      },
      {
        title: "豚骨叉燒拉麵",
        cover: "https://farm1.static.flickr.com/380/32022985490_3e2bfbe774_b.jpg",
        price: 300,
        soldOut: true
      }
      ]

    };
  },
        
}
</script>

<style scoped>
  .noddles-image{
    height: 200px;
    object-fit: cover;
  }

  .noddles-page{
    background-color: rgb(38, 38, 38);
    width: 100%;
    height: auto;
  }

  .home {
    background-color: rgb(211, 229, 235);
  }

  .card{
    position: relative;
  }

  .soldOut-text{
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgb(228, 70, 70);
    border-radius: 10px;
    padding: 10px;
    color: #fff;
  }

  .control{
    color:#fff;
  }

  .control-box{
    text-align: left;
  }
  .keyWords-title{
    color:#fff;
  }

  .text-left{
    text-align: left;
  }

  .price-text{
    font-weight: 700;
    font-size: 2rem;
  }
</style>
