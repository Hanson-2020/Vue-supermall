<template>
  <div class="homeRecommendView" >
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>

export default {
  name: "HomeRecommendView",
  components: {
  },
  props:{
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
};
</script>
<style scoped>
  .homeRecommendView{
    display: flex;
    width: 100%;
    text-align: center;
    /* height: 200px; */
    padding: 15px 0 30px;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .homeRecommendView .recommend-item{
    width: 20%;
    flex: 1;
    /* border: 1px red solid; */
  }
  .homeRecommendView .recommend-item img{
    width: 80%;
  }
</style>