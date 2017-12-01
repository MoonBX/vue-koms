<template>
    <div>
      <v-form direction="horizontal" :model="model" :rules="rules" ref="SIForm">
        <v-form-item label="商家名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shopId" has-feedback>
          <v-select style="width: 100%;" :data="shopOptions" v-model="model.shopId"></v-select>
        </v-form-item>
        <v-form-item label="折扣" :label-col="labelCol" :wrapper-col="wrapperCol" prop="discount" has-feedback>
          <v-input v-model="model.discount" style="width: 90px;"></v-input>
          <!--<span class="content-tip">(扫码商家必填)</span>-->
        </v-form-item>
        <v-form-item label="地址" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shopAddress" has-feedback>
          <v-input placeholder="请输入地址" v-model="model.shopAddress"></v-input>
        </v-form-item>
        <v-form-item label="商家签名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shopDesc" has-feedback>
          <v-input placeholder="请输入商家签名" v-model="model.shopDesc"></v-input>
        </v-form-item>
        <v-form-item label="LOGO" :label-col="labelCol" :wrapper-col="wrapperCol" prop="url" has-feedback>
          <div style="width: 100px; height: 100px">
            <v-upload :name="file.name" :action="file.action" :data="file.data" @change="onChange" drag>
              <v-icon type="plus" v-if="!model.url&&!file.uploading"></v-icon>
              <v-icon type="loading" v-if="file.uploading"></v-icon>
              <img src="../assets/logo.png" alt="" width="100%" height="50%" v-if="model.url">
            </v-upload>
          </div>
        </v-form-item>
        <v-form-item label="上架" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shopTypeArr" has-feedback>
          <v-checkbox-group v-model="model.shopTypeArr" :data="checkboxOpt"></v-checkbox-group>
        </v-form-item>
        <div>
          <v-form-item label="配送费" :label-col="{span: 8}" :wrapper-col="{span:16}" prop="postFee" has-feedback style="display: inline-block;width: 50%;">
            <v-input style="width: 80%;" v-model="model.postFee"></v-input>
          </v-form-item>
          <v-form-item label="最低起送金" :label-col="{span: 11}" :wrapper-col="{span:13}" prop="minOrderPay" has-feedback style="display: inline-block;width: 40%;">
            <v-input style="width: 80%;" v-model="model.minOrderPay"></v-input>
          </v-form-item>
        </div>
        <v-form-item label="买手标签" :label-col="labelCol" :wrapper-col="wrapperCol" prop="tag" has-feedback>
          <v-input placeholder="请输入商家签名" v-model="model.tag"></v-input>
        </v-form-item>
      </v-form>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import { bus } from '../util/bus.js'
    export default {
        data() {
            return {
              model: {
                discount: "",
                shopAddress: "",
                shopId: "",
                shopDesc: "",
                shopTypeArr: [],
                postFee: "",
                minOrderPay: "",
                tag: "",
                url: ""
              },
              file: {
                name: 'uploadFile',
                action: 'http://192.168.22.139:8088/shop/upload/goods',
                uploadFailData: [],
                data: {
                  uid: localStorage.koUid,
                  token: localStorage.koToken
                },
                uploading: false
              },
              checkboxOpt: [{
                label: '平台商家',
                value: '0'
              }, {
                label: '扫码商家',
                value: '1'
              }],
              rules: {
                shopId: [{
                  required: true,
                  message: '请选择商家'
                }],
//                discount: [{
//                  required: true,
//                  message: '请输入折扣数字'
//                }, {
//                  pattern: '^[0-9]+([.]{1}[0-9]+){0,1}$',
//                  message: '格式不正确'
//                }],
                shopAddress: [{
                  required: true,
                  message: '请输入地址'
                }],
                shopDesc: [{
                  required: true,
                  message: '请输入签名'
                }],
                shopTypeArr: [{
                  type: 'array',
                  required: true,
                  message: '请选择商家类型'
                }]
              },
              shopOptions: [],
              labelCol: { span: 4 },
              wrapperCol: { span: 14 }
            }
        },
        methods: {
          submit(){
            this.$refs.SIForm.validate((valid) => {
              if (valid) {
//                return this.model;
                bus.$emit('SIForm_model', [this.model, 'create']);
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          onChange(info){
            if (info.file.status === 'done') {
              this.file.uploading = false;
              if(info.file.response.code == 0){
                this.model.url = info.file.response.result;
              }
            }else if(info.file.status === 'uploading'){
              this.file.uploading = true;
            } else if (info.file.status === 'error') {
              this.file.uploading = false;
            }
          }
        },
        created() {
          var obj = {
            uid : localStorage.koUid,
            token : localStorage.koToken
          };
          api.getShopListAll(obj).then(res => {
            console.log(res);
            var optionList = [];
            for (let i = 0; i < res.result.length; i++) {
              let optionItem = {};
              optionItem.label = res.result[i].shopName;
              optionItem.value = res.result[i].shopId;
              optionList.push(optionItem);
            }
            this.shopOptions = optionList;
          })
        }
    }
</script>
