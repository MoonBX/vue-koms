<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="商家名称" class="m-b-sm">
          <v-input v-model="filterList.shopName" placeholder="请输入商家名称" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="平台商家" class="m-b-sm">
          <v-select v-model="tempList.pingtai" tags style="width: 160px;" placeholder="请输入平台商家"  :data="options.pingtai" ></v-select>
        </v-form-item>
        <v-form-item label="扫码商家" class="m-b-sm">
          <v-select v-model="tempList.saoma" tags style="width: 160px;" placeholder="请输入扫码商家" :data="options.saoma" ></v-select>
        </v-form-item>
        <v-form-item label="所在小区" class="m-b-sm">
          <v-select v-model="filterList.communityId" search :loading="loading" :remote-method="remoteMethod" :data="remoteOption" placeholder="请输入所在小区" style="width: 200px;"></v-select>
        </v-form-item>
        <v-form-item label="当前状态" class="m-b-sm">
          <v-select v-model="filterList.userStatus" tags style="width: 160px;" placeholder="请输入当前状态" :data="options.status" ></v-select>
        </v-form-item>
        <v-form-item label="账户余额" class="m-b-sm">
          <v-input v-model="filterList.balance" placeholder="请输入账户余额" style="width: 160px;"></v-input>
        </v-form-item>
        <div class="row text-center">
          <v-button type="primary" style="margin-right:10px" @click="search()">
            提交
          </v-button>
          <v-button type="ghost" @click="reset()">
            重置
          </v-button>
        </div>
      </v-form>
    </div>
    <div class="g-table-content p-md m-b-md">
      <div class="clear m-b-sm">
        <div class="prop-button-group pull-right">
          <v-button type="primary" class="p-h-md m-r-sm" ghost @click="showModal('create')">
            新建
          </v-button>
          <v-button type="primary" class="p-h-md" ghost >
            <a href="javascript:;" @click="exportList">导出</a>
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
                    <th width="13%">商家名称</th>
                    <th width="8%">平台商家</th>
                    <th width="8%">扫码商家</th>
                    <th width="8%">折扣</th>
                    <th width="8%">账户余额</th>
                    <th width="13%">所在小区</th>
                    <th width="12%">联系电话</th>
                    <th width="8%">状态</th>
                    <th width="8%">操作</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr v-for="item in shopInfoList">
                    <td>{{item.shopName}}</td>
                    <td>{{item.tradeType_pt}}</td>
                    <td>{{item.tradeType_sm}}</td>
                    <td>{{item.discount}}</td>
                    <td>{{item.balance}}</td>
                    <td>{{item.communityName}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>
                      <span class="state-circle bg-success"
                            :class="{'bg-success': item.userStatus == '1',
                                     'bg-danger': item.userStatus == '0'}"></span>
                      {{item.userStatus_cn}}
                    </td>
                    <td>
                      <a href="javascript:;" class="m-r-sm">
                        编辑
                      </a>
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
    <div class="g-modal">
      <v-modal title="添加商家信息"
               :visible="modalVisible.create"
               :width="500"
               @cancel="cancelModal('create')">
        <shop-info-create ref="shopInfoCreateRef"></shop-info-create>
        <div slot="footer">
          <v-button key="cancel"
                    @click="cancelModal('create')">
            取 消
          </v-button>
          <v-button key="confirm"
                    type="primary" @click="submit('create')">
            提 交
          </v-button>
        </div>
      </v-modal>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import { extend } from '../util/extend'
  import { bus } from '../util/bus.js'
  import ShopInfoCreate from '@/components/ShopInfoCreate'
  export default {
    data() {
      return{
        modalVisible:{
          create: false
        },
        filterList:{
          shopName: "",
          userStatus: "",
          tradeType: "",
          communityId: "",
          balance: ""
        },
        tempList: {
          pingtai: "",
          saoma: ""
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
        shopInfoList: [],
        options: {
          pingtai: [{
            value: '1',
            label: '是'
          }, {
            value: '2',
            label: '否'
          }],
          saoma: [{
            value: '1',
            label: '是'
          }, {
            value: '2',
            label: '否'
          }],
          status: [{
            value: '0',
            label: '冻结'
          }, {
            value: '1',
            label: '在线'
          }]
        },
        loading: false,
        remoteOption: [],
        list: [],
        communityOptions: []
      }
    },
    components: {
      ShopInfoCreate
    },
    methods: {
      showModal(value){
        this.modalVisible[value] = true;
      },
      showTotal(total){
        return `全部 ${total} 条`;
      },
      loadPage(i){
        this.getShopInfoList(i)
      },
      search(){
        this.getShopInfoList(1, 'search');
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
      reset(){
        this.filterList = {
          shopName: "",
          userStatus: "",
          tradeType: "",
          communityId: "",
          balance: ""
        };
        this.tempList = {
          pingtai: "",
          saoma: ""
        };
        this.getShopInfoList(1, 'reset');
      },
      cancelModal(value){
        this.modalVisible[value] = false;
      },
      submit(){
        this.$refs.shopInfoCreateRef.submit()
      },
      exportList(){
        let obj = {
          uid : localStorage.koUid,
          token : localStorage.koToken
        };
        window.open('http://192.168.22.139:8088/shop/shopInfo/list/excel/auto?uid='+localStorage.koUid+'&token='+localStorage.koToken)
//        api.exportShopInfoList(obj).then(res => {
//          console.log(res);
//        })
      },
      getShopInfoList(curPage, type){
        this.obj.curPage = curPage;
        let obj = this.obj;
        if(type == 'search'){
          if(this.tempList.pingtai == '1'&&this.tempList.saoma == '1'){
            this.filterList.tradeType = '12'
          }else if(this.tempList.pingtai == '1'&&this.tempList.saoma != '1'){
            this.filterList.tradeType = '0'
          }else if(this.tempList.pingtai != '1'&&this.tempList.saoma == '1'){
            this.filterList.tradeType = '1'
          }else{
            this.filterList.tradeType = ""
          }
          console.log(this.filterList);
          obj = extend(this.obj, this.filterList);
        }else if(type == 'reset'){
          obj = extend(this.obj, this.filterList);
        }
        console.log(obj)
        api.getShopInfoList(obj).then(res => {
          console.log(res);
          for (var i = 0; i < res.result.length; i++) {
            switch (res.result[i].userStatus) {
              case "0":
                res.result[i].userStatus_cn = '冻结';
                break;
              case "1":
                res.result[i].userStatus_cn = '在线';
                break;
              default:
                res.result[i].userStatus_cn = '';
            }
            switch (res.result[i].tradeType) {
              case "0":
                res.result[i].tradeType_pt = '是';
                res.result[i].tradeType_sm = '否';
                break;
              case "1":
                res.result[i].tradeType_pt = '否';
                res.result[i].tradeType_sm = '是';
                break;
              case "12":
                res.result[i].tradeType_pt = '是';
                res.result[i].tradeType_sm = '是';
                break;
              default:
                res.result[i].tradeType_pt = '';
                res.result[i].tradeType_sm = '';
            }
          }
          this.page.total = res.total;
          this.shopInfoList = res.result;
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
      this.getShopInfoList(1);
      document.title = '商家管理'
      bus.$on('SIForm_model', (text) => {
        var obj = text[0];

        if(obj.shopTypeArr.length == 2){
          obj.shopType = 2
        }else if(obj.shopTypeArr.length == 1){
          obj.shopType = obj.shopTypeArr[0]
        }
        delete obj.shopTypeArr;
        obj.token = localStorage.koToken;
        obj.uid = localStorage.koUid;
        api.createShopInfo(obj).then(res => {
          this.cancelModal(text[1]);
          this.getShopInfoList(1);
        })
      })
    }
  }
</script>
