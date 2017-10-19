<template>
  <div class="position-right">
    <div class="g-table-content p-md m-b-md">
      <div class="clear m-b-md">
        <div class="prop-button-group pull-left">
          <v-button type="primary" class="m-r-sm" ghost @click="showConfirm">
            冻结账号
          </v-button>
          <span class="content-tip">冻结账号无法登陆</span>
        </div>
        <div class="prop-button-group pull-right">
          <v-button type="primary" ghost @click="showModal('create')">
            新建
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
                    <th width="13%">
                      <v-checkbox></v-checkbox>
                    </th>
                    <th width="34%">账号</th>
                    <th width="34%">状态</th>
                    <th width="19%">操作</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr>
                    <td>
                      <v-checkbox></v-checkbox>
                    </td>
                    <td>郭德纲</td>
                    <td>
                      <span class="state-circle bg-success"></span>
                      正常
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
    </div>
    <div class="g-modal">
      <v-modal title="新建账号"
               :visible="modalVisible.create"
               :width="500"
               @cancel="cancelModal('create')">
        <shop-account-create ref="shopAccountCreateRef"></shop-account-create>
        <div slot="footer">
          <v-button key="cancel"
                    @click="cancelModal('create')">
            取 消
          </v-button>
          <v-button key="confirm" v-if="step == 1"
                    type="primary" @click="changeStep()">
            下一步
          </v-button>
          <v-button key="confirm" v-if="step == 2"
                    type="primary" @click="cancelModal('create')">
            提 交
          </v-button>
        </div>
      </v-modal>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .content-tip{
    line-height: 28px;
  }
</style>
<script>
  import ShopAccountCreate from '@/components/ShopAccountCreate'
  export default{
    data(){
      return{
        modalVisible:{
          create: false
        },
        step: 1
      }
    },
    components: {
      ShopAccountCreate
    },
    methods:{
      showModal(value){
        this.modalVisible[value] = true;
        this.step = 1;
      },
      cancelModal(value){
        this.modalVisible[value] = false;
      },
      changeStep(){
        this.step = 2;
        this.$refs.shopAccountCreateRef.changeStep();
      },
      showConfirm () {
        this.$modal.confirm({
          title: '是否确认冻结已选中账号？',
          content: '冻结后，该商家不会出现在APP商家列表中，且商家二维码不可用。',
          onOk: function () {
            console.log('确定')
          },
          onCancel: function () {}
        })
      }
    }

  }
</script>
