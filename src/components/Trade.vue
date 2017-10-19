<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="门店" class="m-b-sm">
          <v-input v-model="filterList.store" placeholder="请选择门店" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="手机号码" class="m-b-sm">
          <v-input v-model="filterList.mobile" placeholder="请输入手机号码" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="订单号" class="m-b-sm">
          <v-input v-model="filterList.order" placeholder="请选择订单号" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="时间范围" class="m-b-sm">
          <v-date-picker v-model="filterList.dateTime" placeholder="请选择时间范围"  range clearable></v-date-picker>
        </v-form-item>
        <v-form-item label="交易类型" class="m-b-sm">
          <v-select v-model="filterList.type" tags style="width: 160px;" placeholder="请输入交易类型" :data="options.type" ></v-select>
        </v-form-item>
        <v-form-item label="支付方式" class="m-b-sm">
          <v-select v-model="filterList.pay" tags style="width: 160px;" placeholder="请输入支付类型" :data="options.pay" ></v-select>
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
                  <tr>
                    <td>2016-11-11 23:00</td>
                    <td>1234568794565</td>
                    <td>铁锤妹妹</td>
                    <td>210724568974885451</td>
                    <td>扫码支付</td>
                    <td>50.00</td>
                    <td>支付宝</td>
                    <td>先锋水果-万家花城店</td>
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
  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        filterList:{
          store: "",
          order: "",
          mobile: "",
          type: "",
          dateTime: "",
          pay: ""
        },
        options:{
          type: [],
          pay: []
        }
      }
    },
    methods: {},
    created() {
    }
  }
</script>
