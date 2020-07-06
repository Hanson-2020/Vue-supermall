<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>
<script>
  export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return{
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message="默认值", duration=2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = ""
      },duration)
    }
  }
}
</script>
<style scoped>
.toast{
  z-index: 999;
  position: fixed;
  /* width: 40px; */
  /* height: 50px; */
  padding: 8px 10px;
  left: 50%;
  top: 50%;
  color:white;
  transform: translate(-50%, -50%);
  background: rgb(0, 0, 0, .8)
}
</style>