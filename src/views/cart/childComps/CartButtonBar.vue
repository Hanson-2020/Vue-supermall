<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="check-price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartButtonBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        return this.cartList.forEach(item => (item.checked = false));
      } else {
        return this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (this.checkLength === 0) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      // 如果有不被选中的，就有了长度,就为true,所以取反，从而当有没选中的时就为false
      //1.使用filter
      // return !this.cartList.filter(item => !item.checked).length;

      if (this.cartList.length === 0) return false;

      //2.使用find
      return !this.cartList.find(item => !item.checked);
      //3.使用every
      // return this.cartList.every(item => item.checked)
      //4.使用普通遍历
      // for(let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      //   return true
      // }
    }
  }
};
</script>
<style scoped>
.button-bar {
  height: 40px;
  width: 100%;
  position: relative;
  background: #eee;
  position: fixed;
  display: flex;
  bottom: 50px;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.check-price {
  margin-left: 20px;
}
.calculate {
  width: 90px;
  height: 40px;
  line-height: 40px;
  background: red;
  margin-top: 5px;
  margin-left: auto;
  color: #fff;
  text-align: center;
}
</style>