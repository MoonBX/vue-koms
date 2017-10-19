<template>
  <div class="position-right">
    <div class="g-table-content p-md m-b-md">
      <div class="clear m-b-md">
        <div class="prop-button-group pull-left">
          <v-button type="primary" class="m-r-sm" ghost>
            冻结账号
          </v-button>
          <span class="content-tip">冻结账号无法登陆</span>
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
                    <th width="13%">
                      <v-checkbox></v-checkbox>
                    </th>
                    <th width="24%">账号</th>
                    <th width="24%">状态</th>
                    <th width="24%">状态</th>
                    <th width="15%">操作</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr>
                    <td>
                      <v-checkbox></v-checkbox>
                    </td>
                    <td>先锋水果</td>
                    <td>
                      <a href="javascript:;" class="m-r-sm">
                        分店管理
                      </a>
                    </td>
                    <td>
                      <span class="state-circle bg-success"></span>
                      正常
                    </td>
                    <td>
                      <a href="javascript:;" class="m-r-sm">
                        资料
                      </a>
                      <a href="javascript:;" class="m-r-xs">
                        权限
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .content-tip{
    line-height: 28px;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{}
    },
    methods: {},
    created(){}
  }
</script>
