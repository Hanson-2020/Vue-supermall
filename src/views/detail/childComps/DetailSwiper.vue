<template>
  <swiper class="swiperimg">
    <swiper-item v-for="(item, index) in topImg" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImg: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.swiperimg {
  height: 300px;
  overflow: hidden;
}
</style>