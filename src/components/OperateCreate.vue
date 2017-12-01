<template>
  <div>
    <transition name="slide-fade">
      <v-form direction="horizontal" :model="model" v-if="step == 1" :rules="rules" ref="OCForm">
        <v-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="userName" has-feedback>
          <v-input placeholder="请输入用户名" v-model="model.userName"></v-input>
        </v-form-item>
        <v-form-item label="登录密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="pwd" has-feedback>
          <v-input type="password" placeholder="请输入登录密码" v-model="model.pwd"></v-input>
        </v-form-item>
        <v-form-item label="确认密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="rePassword" has-feedback>
          <v-input type="password" placeholder="请输入登录密码" v-model="model.rePassword"></v-input>
        </v-form-item>
        <v-form-item label="手机号码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="phoneNum" has-feedback>
          <v-input placeholder="请输入手机号码" v-model="model.phoneNum"></v-input>
        </v-form-item>
        <v-form-item label="负责小区" :label-col="labelCol" :wrapper-col="wrapperCol" prop="communityId" has-feedback>
          <v-select style="width: 100%;" :data="options" v-model="model.communityId"></v-select>
        </v-form-item>
        <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol" prop="content" has-feedback>
          <v-input type="textarea" placeholder="请输入备注" autosize v-model="model.content" ></v-input>
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
          content: "",
          communityId: "",
          pwd: "",
          rePassword: "",
          phoneNum: ""
        },
        rules: {
          userName: [{
            required: true,
            message: '请输入用户名'
          }],
          pwd: [{
            required: true,
            message: '请输入密码'
          }],
          rePassword: [{
            required: true,
            message: '请再次输入密码'
          },{
            validator: validatePass2
          }],
          phoneNum: [{
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
          title: '运营',
          expanded: true,
          checked: true,
          children: [{
            title: '商家管理',
            expanded: true,
            checked: true,
            children: [{
              title: '商家充值',
              checked: true,
            }, {
              title: '商家信息',
              checked: true,
            }]
          }, {
            title: '用户管理',
            expanded: true,
            checked: true,
            children: [{
              title: "用户信息",
              checked: true,
            }, {
              title: "借吧",
              checked: true,
            }]
          }, {
            title: '交易明细',
            checked: true,
          }]
        }],
        options: [
          {
            value: '1',
            label: '小区1'
          }, {
            value: '2',
            label: '小区2'
          }, {
            value: '3',
            label: '小区3'
          },{
            value: '4',
            label: '小区4'
          }, {
            value: '5',
            label: '小区5'
          }, {
            value: '6',
            label: '小区6'
          }]
      }
    },
    props: ['myStep'],
    methods: {
      changeStep(){
        this.$refs.OCForm.validate((valid) => {
          if (valid) {
            console.log(this.model)
            var obj = this.model;
            obj.token = localStorage.koToken;
            obj.uid = localStorage.koUid;
            delete obj.rePassword;
            api.regOperator(obj).then(res => {
              console.log(res);
              if(res.code == 0){
                this.$notification.success({
                  message: '新建成功！',
                  duration: 2
                });
                bus.$emit('OCForm_step_change', [this.step, 'create']);
              }else{
                this.$notification.error({
                  message: res.errorMsg,
                  duration: 2
                });
              }
//              this.step = 0;
//              setTimeout(()=>{
//                this.step = 2;
//                bus.$emit('OCForm_step_change', [this.step, 'create']);
//              }, 500);
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      washData(){

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
        for(let i=0;i<res.result.length;i++){
          let optionItem = {};
          optionItem.label = res.result[i].communityName;
          optionItem.value = res.result[i].communityId;
          optionList.push(optionItem);
        }
        this.options = optionList;
      })
    }
  }
</script>
