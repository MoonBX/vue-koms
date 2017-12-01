<template>
  <div>
    <v-form direction="horizontal" :model="model" :rules="rules" ref="RCForm">
      <v-form-item label="商家名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shopId" has-feedback>
        <v-select style="width: 100%;" :data="shopOptions" v-model="model.shopId" :disabled="step == 2"></v-select>
      </v-form-item>
      <v-form-item label="充值金额" :label-col="labelCol" :wrapper-col="wrapperCol" prop="amount" has-feedback>
        <v-input placeholder="100" v-model="model.amount" style="width: 100px;" :disabled="step == 2"></v-input>
        <span class="content-tip">元</span>
      </v-form-item>
      <v-form-item label="确认密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
        <v-input placeholder="请确认登录密码" v-model="model.password" :disabled="step == 2"></v-input>
      </v-form-item>
    </v-form>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import { extend } from '../util/extend'
  import { bus } from '../util/bus.js'
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        var obj = {
          uid : localStorage.koUid, token : localStorage.koToken, password: this.model.password
        }
        if (value === '') {
          callback(new Error('请输入管理员密码'));
        } else if (value !== '') {
          api.verifyPwd(obj).then(res => {
            if(res.code == 0){
              callback();
            }else{
              callback(new Error('请输入正确的管理员密码!'));
            }
          })
        } else {
          callback();
        }
      };
      return {
        model: {
          shopId: "",
          amount: "",
          password: ""
        },
        rules: {
          shopId: [{
            required: true,
            message: '请选择商家'
          }],
          amount: [{
            required: true,
            message: '请输入充值金额'
          }, {
            pattern: '^[0-9]+([.]{1}[0-9]+){0,1}$',
            message: '格式不正确'
          }],
          password: [{
            required: true,
            message: '请输入管理员密码'
          },{
            validator: validatePass2
          }],
        },
        step: 1,
        shopOptions: [],
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    },
    methods: {
      nextStep(){
        this.$refs.RCForm.validate((valid) => {
          if (valid) {
            this.step = 2;
            bus.$emit('RCForm_model', [{}, this.step, 'confirm']);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      prevStep(){
        this.step = 1;
        console.log(this.step);
        bus.$emit('RCForm_model', [{}, this.step, 'confirm']);
      },
      submit(){
        let obj = this.model;
        obj.uid = localStorage.koUid;
        obj.token = localStorage.koToken;
        bus.$emit('RCForm_model', [obj, this.step, 'submit']);
      }
    },
    created() {
      let obj = {
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
