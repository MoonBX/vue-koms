<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>

        <v-form-item label="所在小区" class="m-b-sm">
          <v-input v-model="filterList.village" placeholder="请输入所在小区" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="商家名称" class="m-b-sm">
          <v-input v-model="filterList.nickname" placeholder="请输入商家名称" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="账户余额" class="m-b-sm">
          <v-input v-model="filterList.mobile" placeholder="请输入账户余额" style="width: 160px;"></v-input>
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
                    <th width="16%">注册时间</th>
                    <th width="16%">昵称</th>
                    <th width="16%">手机号码</th>
                    <th width="16%">所在小区</th>
                    <th width="20%">地址</th>
                    <th width="12%">余额/元</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr>
                    <td>2016-11-11 23:00</td>
                    <td>铁锤妹妹</td>
                    <td>234234234234</td>
                    <td>万家花城</td>
                    <td>杭州万家花城 6幢4单元2002</td>
                    <td>50.00</td>
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
          village: "",
          nickname: "",
          mobile: ""
        }
      }
    },
    methods: {},
    created() {
    }
  }
</script>
