<template>
  <div class="TabContentCategory">
    <grid-view>
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a class="item-a" :href="item.link">
          <img class="item-img" :src="item.image" alt />
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";

export default {
  name: "TabContentCategory",
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.TabContentCategory{
  margin-top: 20px;
  margin-bottom: 50px;
}
.item {
  text-align: center;
  font-size: 12px;
  display: inline-block;

}
.item-img {
  width: 90px;
  height: 90px;
}
.item-text {
  margin-top: 15px;
}
</style>
