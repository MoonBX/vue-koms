<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="商家名称" class="m-b-sm">
          <v-input v-model="filterList.name" placeholder="请输入商家名称" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="时间范围" class="m-b-sm">
          <v-date-picker v-model="filterList.dateTime" placeholder="请选择时间范围"  range clearable></v-date-picker>
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
                    <th width="16%">交易时间</th>
                    <th width="16%">订单号</th>
                    <th width="16%">交易类型</th>
                    <th width="16%">金额/元</th>
                    <th width="16%">支付方式</th>
                    <th width="16%">商家名称</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr>
                    <td>2016-11-11</td>
                    <td>123123123123</td>
                    <td>商家充值</td>
                    <td>3400.00</td>
                    <td>银行转账</td>
                    <td>杭州万家花城</td>
                  </tr>
                  <div style="width: 100%;height: 20px;"></div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    type="primary" @click="cancelModal('create')">
            下一步
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
  export default {
    data() {
      return {
        filterList:{
          title: "",
          dateTime: "",
          status: "",
          shopHead: "",
          pingtai: "",
          saoma: "",
          village: "",
          balance: ""
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
        }
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
      },
    },
    created() {

    }
  }
</script>
