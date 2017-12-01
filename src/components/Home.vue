<template>
  <div class="home position-right">
    欢迎使用KoKoKo运营管理中心
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'home',
    data(){
      return {

      }
    },
    methods: {

    },
    created(){
      document.title = '首页'
    }
  }
</script>

<style lang="scss" scoped>
  .home {

  }

  .position-right {
    background-color: #ececec;
  }

  .message-filter{
    font-size: 12px;
    position: relative;
    z-index: 1010;
    float: right;
    top: -8px;
    right: 0;
  }

  .message-notice-filter {
    width: auto;
    vertical-align: middle;
    position: relative;
    right: -50%;
  }

  .unline {
    background: #DE4E4E;
    display: inline;
    color: #fff;
    padding: 2px 6px;
    font-size: 13px;
  }

  .state {
    display: inline;
    color: #fff;
    padding: 2px 6px;
    font-size: 13px;
  }

  .warning {
    background: #F4B33E;
  }

  .danger {
    background: #DE4E4E;
  }

  .card-shadow {
    box-shadow: 0 0 4px 0 rgba(155, 185, 235, 0.30);
  }
</style>
