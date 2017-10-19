<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="姓名" class="m-b-sm">
          <v-input v-model="filterList.name" placeholder="请输入姓名" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="手机号码" class="m-b-sm">
          <v-input v-model="filterList.mobile" placeholder="请输入手机号码" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="状态" class="m-b-sm">
          <v-input v-model="filterList.status" placeholder="请选择状态" style="width: 160px;"></v-input>
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
                    <th width="14%">创建时间</th>
                    <th width="10%">真实姓名</th>
                    <th width="14%">手机号码</th>
                    <th width="16%">身份证号</th>
                    <th width="11%">透支金额</th>
                    <th width="11%">可用余额</th>
                    <th width="12%">状态</th>
                    <th width="12%">操作</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr>
                    <td>2016-11-11 23:00</td>
                    <td>铁锤妹妹</td>
                    <td>234234234234</td>
                    <td>210724568974885451</td>
                    <td>50.00</td>
                    <td>350.00</td>
                    <td>
                      <span class="state-circle bg-success"></span>
                      在线
                    </td>
                    <td>
                      <v-popconfirm placement="left"
                                    title="确定删除吗?"
                                    @confirm="push()">
                        <a href="javascript:;" class="m-r-sm">开通</a>
                      </v-popconfirm>
                      <v-popconfirm placement="left"
                                    title="确定删除吗?"
                                    @confirm="refuse()">
                        <a href="javascript:;" class="m-r-sm">拒绝</a>
                      </v-popconfirm>
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
          name: "",
          mobile: "",
          status: "",
          dateTime: ""
        }
      }
    },
    methods: {
      push(){
        console.log('开通')
      },
      refuse(){
        console.log('拒绝')
      }
    },
    created() {
    }
  }
</script>
