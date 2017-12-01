<template>
  <div class="hello">
    <v-layout>
      <v-header>
        {{title}}
        <span class="pull-right">
          <a href="javascript:;" @click="logout">登出</a>
        </span>
      </v-header>
      <v-sider style="flex: 0 0 230;width: 230px;position:fixed; height: 100%">
        <div class="sdn-brand">
          <img class="brand-img" src="../assets/logo.png" width="27%">
          <div class="brand-text text-lt">Kokoko运营管理平台</div>
        </div>
        <v-menu style="width:230px;background-color:#0c1729" mode="inline" :data="themeMenuData" :theme="theme"
                selected>
          <template scope="{data}">
            <i v-if="data.icon" :class="'fa fa-' + data.icon"></i>
            <router-link style="margin-left: 5px;display: inline" :to="{path: data.href}">{{data.name}}</router-link>
          </template>
          <template scope="{data}" slot="sub">
            <i v-if="data.icon" :class="'fa fa-' + data.icon"></i>
            <span style="margin-left: 5px">{{data.name}}</span>
          </template>
        </v-menu>
      </v-sider>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'hello',
    data () {
      return {
        title: '',
        theme: 'dark',
        themeMenuData: [],
      }
    },
    methods: {
      fetchTitle(){
        this.title = this.$route.name;
      },
      logout(){
        console.log('d');
        this.$router.push('login');
      }
    },
    created(){
      this.fetchTitle();
      var routePath = this.$route.path.split('/')[1];
      var data = [
        {name: '首页',  icon: 'home', href: 'home'},
        { name: '账号管理', icon: 'building', children: [
          {name: "运营账号", href: 'operateAccount'},
          {name: "商家账号", href: 'shopAccount'},
//          {name: "商家总部账号", href: 'shopHeadAccount'}
          ]
        },
        {name: '商家管理', icon: 'cog', children: [
          {name: "商家信息", href: 'shopInfo'},
          {name: "商家充值", href: 'shopRecharge'}]
        },
        {name: '用户管理', icon: 'unlock-alt', children: [
          {name: "用户信息", href: 'userInfo'}
          ]
        },
        {name: '交易明细', icon: 'file-text-o', href: 'trade'}
      ];
      for (let i = 0; i < data.length; i++) {
        if (data[i].href == routePath) {
          data[i].selected = true;
        } else {
          if (data[i].children) {
            for (let j = 0; j < data[i].children.length; j++) {
              if (data[i].children[j].href == routePath) {
                data[i].children[j].selected = true;
                data[i].expand = true;
              }
            }
          }
        }
      };
      this.themeMenuData = data;
    },
    watch: {
      $route(){
        this.fetchTitle()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello {
    height: 100%;
    margin-bottom: 20px;
    .ant-layout {
      height: 100%;
      .ant-layout-header {
        position: fixed;
        top: 0;
        height: 50px;
        width: 100%;
        background-color: #fff;
        padding-left: 240px;
        padding-right: 20px;
        line-height: 50px;
        z-index: 999;
      }
      .ant-layout-sider {
        background-color: #0c1729;
        padding-top: 40px;
        overflow-y: auto;
        z-index: 1000;
        .sdn-brand {
          text-align: center;
          margin-bottom: 40px;
          .brand-img {
            margin-bottom: 8px;
          }
          .brand-text {
            color: #ffffff;
            font-weight: 700;
          }
        }
      }
      .ant-layout-content {
        margin-top: 50px;
        width: auto;
        padding-left: 230px;
      }
    }
  }

</style>
