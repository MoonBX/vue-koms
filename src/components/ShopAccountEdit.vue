<template>
  <div>
    <transition name="slide-fade">
      <v-form direction="horizontal" :model="model" v-if="step == 1" :rules="rules" ref="SAForm">
        <v-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="userName" has-feedback>
          <v-input placeholder="请输入用户名" v-model="model.userName"></v-input>
        </v-form-item>
        <v-form-item label="商家名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shopName" has-feedback>
          <v-input placeholder="请输入商家名称" v-model="model.shopName"></v-input>
        </v-form-item>
        <v-form-item label="负责小区" :label-col="labelCol" :wrapper-col="wrapperCol" prop="communityId" has-feedback>
          <v-select style="width: 100%;" :data="options" v-model="model.communityId"></v-select>
        </v-form-item>
        <v-form-item label="手机号码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="phoneNumber" has-feedback>
          <v-input placeholder="请输入手机号码" v-model="model.phoneNumber"></v-input>
        </v-form-item>
        <v-form-item label="登录密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="pwd">
          <v-input type="password" placeholder="请输入登录密码" v-model="model.pwd"></v-input>
        </v-form-item>
      </v-form>
    </transition>
    <transition name="slide-fade">
      <div v-if="step == 2">
        <v-tree :data="treeData" checkable multiple></v-tree>
      </div>
    </transition>

  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import { bus } from '../util/bus.js'
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.model.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        model: {
          userName: "",
          shopName: "",
          pwd: "",
          communityId: "",
          rePassword: "",
          phoneNumber: ""
        },
        options: [],
        rules: {
          userName: [{
            required: true,
            message: '请输入用户名'
          }],
          shopName: [{
            required: true,
            message: '请输入商家名称'
          }],
          phoneNumber: [{
            required: true,
            message: '请输入手机号码'
          },{
            pattern: '(^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-))?(1[3578]\\d{9})$)',
            message: '手机号码格式不正确'
          }],
          communityId: [{
            required: true,
            message: '请选择负责小区'
          }],
        },
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        step: 1,
        treeData: [{
          title: '商家',
          expanded: true,
          checked: true,
          children: [{
            title: '商家信息修改',
            checked: true
          }, {
            title: '查看账单明细',
            checked: true
          }, {
            title: '平台商家',
            checked: true,
            expanded: true,
            children: [{
              title: '订单管理（发货操作、查看订单）',
              checked: true
            },{
              title: '商品管理（商品发布、查看）',
              checked: true
            }]
          }]
        }]
      }
    },
    props: ['item'],
    methods: {
      changeStep(){
        this.$refs.SAForm.validate((valid) => {
          if (valid) {
            var obj = {};
            obj = this.model;
            obj.uid = localStorage.koUid;
            obj.token = localStorage.koToken;
            if(obj.pwd == "******"){
              obj.pwd = "";
              console.log(obj.pwd)
            }
            console.log(obj);
            api.editShopAccount(obj).then(res => {
              console.log(res);
              if(res.code == 0){
                this.$notification.success({
                  message: '编辑成功！',
                  duration: 2
                });
                bus.$emit('SAForm_step_change', [this.step, 'edit']);
              }else{
                this.$notification.error({
                  message: res.errorMsg,
                  duration: 2
                });
              }

            })
//            this.step = 0;
//            setTimeout(()=>{
//              this.step = 2;
//              bus.$emit('SAForm_step_change', [this.step, 'create']);
//            }, 500);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {

      var obj = {
        uid : localStorage.koUid,
        token : localStorage.koToken
      };
      api.getCommunityList(obj).then(res => {
        console.log(res);
        var optionList = [];
        for (let i = 0; i < res.result.length; i++) {
          let optionItem = {};
          optionItem.label = res.result[i].communityName;
          optionItem.value = res.result[i].communityId;
          optionList.push(optionItem);
        }
        this.options = optionList;
        this.model = {
          shopId: this.item.shopId,
          userName: this.item.userName,
          shopName: this.item.shopName,
          communityId: this.item.communityId,
          pwd: "******",
          phoneNumber: this.item.phoneNumber
        }
      })
    }
  }
</script>
