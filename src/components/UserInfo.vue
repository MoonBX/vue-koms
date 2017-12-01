<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="所在小区" class="m-b-sm">
          <v-select v-model="filterList.communityId" search :loading="loading" :remote-method="remoteMethod" :data="remoteOption" placeholder="请输入所在小区" style="width: 200px;"></v-select>
        </v-form-item>
        <v-form-item label="商家名称" class="m-b-sm">
          <v-input v-model="filterList.nickname" placeholder="请输入商家名称" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="账户余额" class="m-b-sm">
          <v-input v-model="filterList.balance" placeholder="请输入账户余额" style="width: 160px;"></v-input>
        </v-form-item>
        <div class="row text-center">
          <v-button type="primary" style="margin-right:10px" @click="search">
            提交
          </v-button>
          <v-button type="ghost" @click="reset">
            重置
          </v-button>
        </div>
      </v-form>
    </div>
    <div class="g-table-content p-md m-b-md">
      <div class="clear m-b-sm">
        <div class="prop-button-group pull-right">
          <v-button type="primary" class="p-h-md" ghost>
            导出
          </v-button>
        </div>
      </div>
      <div class="ant-table ant-table-large" style="width: 100%;">
        <div class="ant-table-content">
          <div class="ant-table-body">
            <div class="ant-spin-nested-loading" style="min-height: auto;">
              <div class="ant-spin-container">

                <table class="wk-table" style="table-layout:fixed;">
                  <thead class="ant-table-thead">
                  <tr>
                    <th width="14%">注册时间</th>
                    <th width="12%">昵称</th>
                    <th width="12%">手机号码</th>
                    <th width="14%">所在小区</th>
                    <th width="16%">地址</th>
                    <th width="8%">余额/元</th>
                    <th width="10%">状态</th>
                    <th width="10%">操作</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr v-for="item in userInfoList">
                    <td>{{item.regTime}}</td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.communityName}}</td>
                    <td>{{item.publicAddress}}</td>
                    <td>{{item.balance}}</td>
                    <td>{{}}</td>
                    <td>
                      <a href="javascript:;" @click="dredge(item.uid)">开通</a>
                    </td>
                  </tr>
                  <div style="width: 100%;height: 20px;"></div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-pagination class="m-t-md m-b-md"
                    v-model="page.value"
                    :pageSize="10"
                    :showTotal="showTotal"
                    @change="loadPage"
                    show-quick-jumper
                    ref="pagination"
                    :total="page.total">
      </v-pagination>
    </div>

  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import {extend} from '../util/extend'
  export default {
    data() {
      return {
        filterList:{
          communityId: "",
          nickname: "",
          balance: ""
        },
        page: {
          total: 0,
          value: 1
        },
        obj: {
          uid : localStorage.koUid,
          token : localStorage.koToken,
          pagesize : 10
        },
        userInfoList: [],
        loading: false,
        remoteOption: [],
        list: [],
        communityOptions: []
      }
    },
    methods: {
      showTotal(total){
        return `全部 ${total} 条`;
      },
      loadPage(i){
        this.getUserInfoList(i)
      },
      search(){
        this.getUserInfoList(1, 'search');
      },
      reset(){
        this.filterList = {
          communityId: "",
          nickname: "",
          balance: ""
        };
        this.getUserInfoList(1, 'reset');
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.remoteOption = this.communityOptions.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.remoteOption = [];
        }
      },
      dredge(id){
        let obj = {
          uid : localStorage.koUid,
          token : localStorage.koToken,
          uidList: [id]
        }
        api.dredge(obj).then(res =>{
          console.log(res);
        })
      },
      getUserInfoList(curPage){
        this.obj.curPage = curPage;
        let obj = extend(this.obj, this.filterList);
        api.getUserInfoList(obj).then(res => {
          console.log(res);
          this.page.total = res.total;
          this.userInfoList = res.result;
        });
      }
    },
    mounted(){
      var obj = {
        uid : localStorage.koUid,
        token : localStorage.koToken
      };
      api.getCommunityList(obj).then(res => {
        console.log(res);
        var optionList = [];
        for (let i = 0; i < res.result.length; i++) {
          let optionItem = {};
          optionItem.label = res.result[i].communityName;
          optionItem.value = res.result[i].communityId;
          optionList.push(optionItem);
        }
        this.communityOptions = optionList;
      })
    },
    created() {
      this.getUserInfoList(1);
      document.title = '用户管理';
    }
  }
</script>
