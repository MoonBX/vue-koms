<template>
  <div class="login">
    <form class="login-content">
      <v-input-group class="p-v-sm p-h-md">
        <v-input placeholder="请输入用户名" v-model="loginObj.userName" size="large" class="m-b-sm"></v-input>
        <v-input placeholder="请输入密码" v-model="loginObj.pwd" size="large" class="m-b-sm"></v-input>
        <div class="form-group text-center m-t-lg">
          <v-button type="primary" class="p-h-md" :loading="loading" @click="login">{{ loading ? "登录中" : "管理员登录" }}</v-button>
        </div>
      </v-input-group>
    </form>
    <form class="login-content">
      <v-input-group class="p-v-sm p-h-md">
        <v-input placeholder="请输入用户名" v-model="oLoginObj.userName" size="large" class="m-b-sm"></v-input>
        <v-input placeholder="请输入密码" v-model="oLoginObj.pwd" size="large" class="m-b-sm"></v-input>
        <div class="form-group text-center m-t-lg">
          <v-button type="primary" class="p-h-md" :loading="loading" @click="oLogin">{{ loading ? "登录中" : "运营人员登录" }}</v-button>
        </div>
      </v-input-group>
    </form>
  </div>
</template>
<style lang="scss" scoped>
  html {
    height: 100%;
  }

  .ant-input-group > .ant-input:first-child, .ant-input-group-addon:first-child{
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }

  .ant-input-group-addon:not(:first-child):not(:last-child),
  .ant-input-group-wrap:not(:first-child):not(:last-child),
  .ant-input-group > .ant-input:not(:first-child):not(:last-child){
    border-radius: 4px;
  }

  .bg-user {
    background: url('http://weker.oss-cn-shanghai.aliyuncs.com/51weker_com/male_user.png') center left no-repeat;
    background-size: 14px 14px;
    background-position-x: 6px;
  }

  .bg-key {
    background: url('http://weker.oss-cn-shanghai.aliyuncs.com/51weker_com/key.png') center left no-repeat;
    background-size: 14px 14px;
    background-position-x: 6px;
  }
</style>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  export default{
    name: 'login',
    data(){
      return{
        loading: false,
        loginObj: {
          userName: "",
          pwd: ""
        },
        oLoginObj: {
          userName: "",
          pwd: ""
        }
      }
    },

    methods: {
      login() {
        console.log(this.loginObj)
        api.login(this.loginObj).then(res => {
          console.log(res);
          localStorage.koToken = res.result.token;
          localStorage.koUid = res.result.uid;
          localStorage.koUserState = 1;
          this.$router.push('home')
        }).catch(error => {
          console.log(error)
        })
      },
      oLogin(){
        console.log(this.oLoginObj);
        api.oLogin(this.oLoginObj).then(res => {
          console.log(res);
          localStorage.koToken = res.result.token;
          localStorage.koUid = res.result.uid;
          localStorage.koUserState = 2;
          this.$router.push('home')
        })
      }
    },
    created(){
      document.title = '登录'
    }
  }
</script>
