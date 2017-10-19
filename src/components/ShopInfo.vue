<template>
  <div class="position-right">
    <div class="g-table-banner p-v-lg p-h-md b-b">
      <v-form>
        <v-form-item label="商家名称" class="m-b-sm">
          <v-input v-model="filterList.name" placeholder="请输入商家名称" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="商家总部" class="m-b-sm">
          <v-input v-model="filterList.shopHead" placeholder="请输入商家总部" style="width: 160px;"></v-input>
        </v-form-item>
        <v-form-item label="平台商家" class="m-b-sm">
          <v-select v-model="filterList.pingtai" tags style="width: 160px;" placeholder="请输入平台商家"  :data="options.pingtai" ></v-select>
        </v-form-item>
        <v-form-item label="扫码商家" class="m-b-sm">
          <v-select v-model="filterList.saoma" tags style="width: 160px;" placeholder="请输入扫码商家" :data="options.saoma" ></v-select>
        </v-form-item>
        <v-form-item label="所在小区" class="m-b-sm">
          <v-input v-model="filterList.village" placeholder="请输入所在小区" style="width: 200px;"></v-input>
        </v-form-item>
        <v-form-item label="当前状态" class="m-b-sm">
          <v-select v-model="filterList.status" tags style="width: 160px;" placeholder="请输入当前状态" :data="options.status" ></v-select>
        </v-form-item>
        <v-form-item label="账户余额" class="m-b-sm">
          <v-input v-model="filterList.balance" placeholder="请输入账户余额" style="width: 160px;"></v-input>
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
          <v-button type="primary" class="p-h-md m-r-sm" ghost @click="showModal('create')">
            新建
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
                    <th width="13%">商家名称</th>
                    <th width="13%">商家总部</th>
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
                  <tr>
                    <td>有机菜园</td>
                    <td>有机菜谱</td>
                    <td>否</td>
                    <td>是</td>
                    <td>93</td>
                    <td>2000</td>
                    <td>杭州万家花城</td>
                    <td>0571-28222052</td>
                    <td>
                      <span class="state-circle bg-success"></span>
                      在线
                    </td>
                    <td>
                      <a href="javascript:;" class="m-r-xs">
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
  import { bus } from '../util/bus.js'
  import ShopInfoCreate from '@/components/ShopInfoCreate'
  export default {
    data() {
      return{
        modalVisible:{
          create: false
        },
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
    components: {
      ShopInfoCreate
    },
    methods: {
      showModal(value){
        this.modalVisible[value] = true;
      },
      cancelModal(value){
        this.modalVisible[value] = false;
      },
      submit(){
        this.$refs.shopInfoCreateRef.submit()
      },
    },
    created() {
      bus.$on('SIForm_model', (text) => {
        console.log(text[0]);
        this.cancelModal(text[1])
      })
    }
  }
</script>
