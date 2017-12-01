<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        isLogin: false
      }
    },
    created(){
      if(localStorage.kokokoToken){
        this.isLogin = true;
      }else{
        this.isLogin = false;
//        this.$router.push('/login');
      }
    }
  }
</script>

<style>
  html, body, #all {
    height: 100%;
    background-color: #ececec;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  .g-table-banner{
    background: #F1F6FF;
  }
  .g-table-content{
    padding-bottom: 15px;
  }

  .ant-menu-dark .ant-menu-inline.ant-menu-sub{
    background-color: #06101F;
    color: #7f8ea7;
  }

  .ant-dropdown-menu{
    left: -15px !important;
  }

  .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title{
    padding: 7px 12px;
  }

  .position-right {
    margin: 15px;
    background: #fff;
    min-height: 500px;
  }

  /*table*/
  .ant-input:focus {
    border-color: #49a9ee;
    outline: 0;
    box-shadow: 0 0 0 0px rgba(16, 142, 233, 0.2);
  }

  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 16px 8px;
    word-break: break-all;
    white-space: normal;
  }
  /*table end*/

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .ant-checkbox-wrapper + span, .ant-checkbox + span {
    padding-left: 0px;
    padding-right: 0px;
  }
  form .has-feedback > .ant-select .ant-select-arrow, form .has-feedback > .ant-select .ant-select-selection__clear, form .has-feedback :not(.ant-input-group-addon) > .ant-select .ant-select-arrow, form .has-feedback :not(.ant-input-group-addon) > .ant-select .ant-select-selection__clear {
    right: 12px !important;
  }
  .ant-upload-list{
    display: none !important;
  }

  .ant-notification{
    width: 275px !important;
  }
  .ant-notification-notice-message{
    font-size: 14px !important;
    position: relative !important;
    top: 2px !important;
    margin-left: 36px !important;
  }
  .ant-notification-notice-icon{
    font-size: 24px !important;
  }
  .ant-notification-notice-with-icon .ant-notification-notice-description {
    margin-left: 36px !important;
    font-size: 12px !important;
  }
</style>
