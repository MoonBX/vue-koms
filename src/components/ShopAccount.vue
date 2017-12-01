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
                      <input type="checkbox" @click="selectAll">
                    </th>
                    <th width="34%">账号</th>
                    <th width="34%">状态</th>
                    <th width="19%">操作</th>
                  </tr>
                  </thead>
                  <tbody class="ant-table-tbody">
                  <tr v-for="item in shopList">
                    <td>
                      <input type="checkbox" :checked="selectToggle" v-bind:value="item.shopId" class="checkbox">
                    </td>
                    <td>{{item.shopName}}</td>
                    <td>
                      <span class="state-circle"
                            :class="{'bg-success': item.shopStatus == '1',
                                     'bg-danger': item.shopStatus == '0'}"></span>
                      {{item.shopStatus_cn}}
                    </td>
                    <td>
                      <a href="javascript:;" class="m-r-sm" @click="showModal('edit', item)">
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
      <v-modal title="编辑账号"
               :visible="modalVisible.edit"
               :width="500"
               @cancel="cancelModal('edit')">
        <shop-account-edit :item="itemParam"  ref="shopAccountEditRef"></shop-account-edit>
        <div slot="footer">
          <v-button key="cancel"
                    @click="cancelModal('edit')">
            取 消
          </v-button>
          <v-button key="confirm" v-if="step == 1"
                    type="primary" @click="changeEditStep()">
            下一步
          </v-button>
          <v-button key="confirm" v-if="step == 2"
                    type="primary" @click="cancelModal('edit')">
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
  import api from '../fetch/api'
  import { bus } from '../util/bus.js'
  import ShopAccountCreate from '@/components/ShopAccountCreate'
  import ShopAccountEdit from '@/components/ShopAccountEdit'
  export default{
    data(){
      return{
        modalVisible:{
          create: false,
          edit: false
        },
        step: 1,
        selectToggle: 0,
        checked: "",
        page: {
          total: 0,
          value: 1
        },
        obj: {
          uid : localStorage.koUid,
          token : localStorage.koToken,
          pagesize : 10
        },
        shopList: [],
        itemParam: {}
      }
    },
    components: {
      ShopAccountCreate,
      ShopAccountEdit
    },
    methods:{
      showModal(value, param){
        if(param){
          this.itemParam = param;
        }
        this.modalVisible[value] = true;
        this.step = 1;
      },
      showTotal(total){
        return `全部 ${total} 条`;
      },
      loadPage(i){
        this.getShopList(i)
      },
      cancelModal(value){
        this.modalVisible[value] = false;
      },
      changeStep(){
        this.$refs.shopAccountCreateRef.changeStep();
      },
      changeEditStep(){
        this.$refs.shopAccountEditRef.changeStep();
      },
      selectAll(){
        this.selectToggle = !this.selectToggle;
      },
      showConfirm () {
        var arr = [],
          frozenObj = {
            uid: localStorage.koUid,
            token: localStorage.koToken
          },
          el = document.getElementsByClassName('checkbox');

        for(let i=0;i<el.length;i++){
          if(el[i].checked == true){
            arr.push(el[i].value);
          }
        }
        console.log(arr);
        frozenObj.uidList = arr;
        this.$modal.confirm({
          title: '是否确认冻结已选中账号？',
          content: '冻结后，该商家不会出现在APP商家列表中，且商家二维码不可用。',
          onOk: () => {
            api.frozenAccount(frozenObj).then(res => {
              console.log(res);
              this.getShopList(1);
            });

          },
          onCancel: function () {}
        })
      },
      getShopList(curPage){
        this.obj.curPage = curPage;
        console.log(this.obj);
        api.getShopList(this.obj).then(res => {
          console.log(res);
          for (var i = 0; i < res.result.length; i++) {
            switch (res.result[i].shopStatus) {
              case 0:
                res.result[i].shopStatus_cn = '冻结';
                break;
              case 1:
                res.result[i].shopStatus_cn = '正常';
                break;
              default:
                res.result[i].shopStatus_cn = '';
            }
          }
          this.page.total = res.total;
          this.shopList = res.result;
        });
      }
    },
    created(){
      document.title = '账号管理'
      this.getShopList(1);
      bus.$off('SAForm_step_change');
      bus.$on('SAForm_step_change', (text) => {
//        this.step = text[0];
        if(text[1] == 'edit'){
          this.cancelModal('edit');
        }else{
          this.cancelModal('create');
        }

        this.getShopList(1);
      })
    }
  }
</script>
