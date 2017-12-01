<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="商家名称" class="m-b-sm">
          <v-input v-model="filterList.name" placeholder="请输入商家名称" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="时间范围" class="m-b-sm">
          <v-date-picker v-model="tempList.startTime" :disabled-date="disabledStartDate"></v-date-picker>
          <span>-</span>
          <v-date-picker v-model="tempList.endTime" :disabled-date="disabledEndDate"></v-date-picker>
        </v-form-item>
        <div class="row text-center">
          <v-button type="primary" style="margin-right:10px">
            提交
          </v-button>
          <v-button type="ghost">
            重置
          </v-button>
        </div>
      </v-form>
    </div>
    <div class="g-table-content p-md m-b-md">
      <div class="clear m-b-sm">
        <div class="prop-button-group pull-right">
          <v-button type="primary" class="m-r-sm" ghost @click="showModal('create')">
            新增充值记录
          </v-button>
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
                    <th width="25%">订单号</th>
                    <th width="25%">商家名称</th>
                    <th width="25%">交易时间</th>
                    <!--<th width="16%">交易类型</th>-->
                    <th width="25%">金额/元</th>
                    <!--<th width="16%">支付方式</th>-->
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr v-for="item in chargeList">
                    <td>{{item.orderId}}</td>
                    <td>{{item.shopName}}</td>
                    <td>{{item.tradeTime}}</td>
                    <!--<td>{{}}</td>-->
                    <td>{{item.amount}}</td>
                    <!--<td>银行转账</td>-->
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
      <v-modal title="新增充值记录"
               :visible="modalVisible.create"
               :width="500"
               @cancel="cancelModal('create')">
        <shop-recharge-create ref="shopRechargeCreateRef"></shop-recharge-create>
        <div slot="footer">
          <v-button key="cancel"
                    @click="cancelModal('create')">
            取 消
          </v-button>
          <v-button key="confirm"
                    v-if="step == 1"
                    type="primary" @click="nextStep">
            下一步
          </v-button>
          <v-button key="confirm"
                    v-if="step == 2"
                    type="primary" @click="prevStep">
            上一步
          </v-button>
          <v-button key="confirm"
                    v-if="step == 2"
                    type="primary" @click="submit">
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
  import ShopRechargeCreate from '@/components/ShopRechargeCreate'
  import api from '../fetch/api'
  import { extend } from '../util/extend'
  import { bus } from '../util/bus.js'
  export default {
    data() {
      return {
        filterList:{
          shopName: "",
          startTime: "",
          endTime: ""
        },
        tempList: {
          dateTime: "",
          startTime: "",
          endTime: ""
        },
        modalVisible:{
          create: false
        },
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
        page: {
          total: 0,
          value: 1
        },
        obj: {
          uid : localStorage.koUid,
          token : localStorage.koToken,
          pagesize : 10
        },
        step: 1,
        chargeList: []
      }
    },
    components:{
      ShopRechargeCreate
    },
    methods: {
      showModal(value){
        this.modalVisible[value] = true;
      },
      cancelModal(value){
        this.modalVisible[value] = false;
        this.step = 1;
      },
      prevStep(){
        this.$refs.shopRechargeCreateRef.prevStep()
      },
      nextStep(){
        this.$refs.shopRechargeCreateRef.nextStep()
      },
      submit(){
        this.$refs.shopRechargeCreateRef.submit()
      },
      disabledStartDate(current){
        return current && current.valueOf() > Date.parse(new Date(this.tempList.endTime));
      },
      disabledEndDate(current){
        return current && current.valueOf() < Date.parse(new Date(this.tempList.startTime));
      },
      showTotal(total){
        return `全部 ${total} 条`;
      },
      loadPage(i){
        this.getShopInfoList(i)
      },
      getChargeList(curPage){
        this.obj.curPage = curPage;
        api.getChargeList(this.obj).then(res => {
          console.log(res);
          this.page.total = res.total;
          this.chargeList = res.result;
        })
      }
    },
    created() {
      this.getChargeList(1);
      document.title = '商家管理';
      bus.$off('RCForm_model');
      bus.$on('RCForm_model', (text) => {
        if(text[1] == 2){
          this.step = 2;
        }else if(text[1] == 1){
          this.step = 1;
        }
        if(text[2] == 'submit'){
          api.createCharge(text[0]).then(res => {
            console.log(res);
            this.getChargeList(1);
            this.cancelModal('create')
          })
        }
      })
    }
  }
</script>
