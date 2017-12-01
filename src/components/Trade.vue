<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="门店" class="m-b-sm">
          <v-input v-model="filterList.store" placeholder="请选择门店" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="手机号码" class="m-b-sm">
          <v-input v-model="filterList.phoneNumber" placeholder="请输入手机号码" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="订单号" class="m-b-sm">
          <v-input v-model="filterList.orderId" placeholder="请选择订单号" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="时间范围" class="m-b-sm">
          <v-date-picker v-model="tempList.startTime" :disabled-date="disabledStartDate"></v-date-picker>
          <span>-</span>
          <v-date-picker v-model="tempList.endTime" :disabled-date="disabledEndDate"></v-date-picker>
        </v-form-item>
        <v-form-item label="交易类型" class="m-b-sm">
          <v-select v-model="filterList.tradeType" tags style="width: 160px;" placeholder="请输入交易类型" :data="options.type" ></v-select>
        </v-form-item>
        <v-form-item label="支付方式" class="m-b-sm">
          <v-select v-model="filterList.pay" tags style="width: 160px;" placeholder="请输入支付类型" :data="options.pay" ></v-select>
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
                    <th width="13%">交易时间</th>
                    <th width="13%">订单号</th>
                    <th width="10%">昵称</th>
                    <th width="13%">手机号码</th>
                    <th width="12%">交易类型</th>
                    <th width="11%">金额/元</th>
                    <th width="12%">支付方式</th>
                    <th width="15%">消费门店</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr v-for="item in orderList">
                    <td>{{item.tradeTime}}</td>
                    <td>{{item.orderId}}</td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.tradeType_cn}}</td>
                    <td>{{item.amount}}</td>
                    <td>支付宝</td>
                    <td>{{item.shopName}}</td>
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
          store: "",
          order: "",
          mobile: "",
          type: "",
          startTime: "",
          endTime: "",
          pay: ""
        },
        tempList: {
          dateTime: "",
          startTime: "",
          endTime: ""
        },
        options:{
          type: [{
            value: 1,
            label: '充值'
          }, {
            value: 2,
            label: '消费'
          },{
            value: 3,
            label: '转账-转出'
          }, {
            value: 4,
            label: '转账-转入'
          }],
          pay: []
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
        orderList: []
      }
    },
    methods: {
      showTotal(total){
        return `全部 ${total} 条`;
      },
      loadPage(i){
        this.getOrderList(i)
      },
      search(){
        if(this.tempList.startTime&&this.tempList.endTime){
          this.filterList.startTime = this.tempList.startTime +' 00:00:00';
          this.filterList.endTime = this.tempList.endTime +' 00:00:00';
        }else{
          this.filterList.startTime = this.filterList.endTime = ""
        }
        console.log(this.filterList);
        this.getOrderList(1, 'search');
      },
      reset(){
        this.filterList = {
          communityId: "",
          nickname: "",
          balance: ""
        };
        this.getOrderList(1, 'reset');
      },
      disabledStartDate(current){
        return current && current.valueOf() > Date.parse(new Date(this.tempList.endTime));
      },
      disabledEndDate(current){
        return current && current.valueOf() < Date.parse(new Date(this.tempList.startTime));
      },
      getOrderList(curPage){
        this.obj.curPage = curPage;
        let obj = extend(this.obj, this.filterList);
        console.log(obj);
        api.getOrderList(obj).then(res => {
          console.log(res);
          for (var i = 0; i < res.result.length; i++) {
            switch (res.result[i].tradeType) {
              case 1:
                res.result[i].tradeType_cn = '充值';
                break;
              case 2:
                res.result[i].tradeType_cn = '消费';
                break;
              case 3:
                res.result[i].tradeType_cn = '转账-转出';
                break;
              case 4:
                res.result[i].tradeType_cn = '转账-转入';
                break;
              default:
                res.result[i].tradeType_cn = '';
            }

          }
          this.page.total = res.total;
          this.orderList = res.result;
        })
      }
    },
    created() {
      this.getOrderList(1);
      document.title = '交易明细';
    }
  }
</script>
