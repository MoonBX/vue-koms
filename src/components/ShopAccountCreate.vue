<template>
  <div>
    <transition name="slide-fade">
      <v-form direction="horizontal" :model="model" v-if="step == 1" :rules="rules" ref="SAForm">
        <v-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="userName" has-feedback>
          <v-input placeholder="请输入用户名" v-model="model.userName"></v-input>
        </v-form-item>
        <v-form-item label="商家名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
          <v-input placeholder="请输入商家名称" v-model="model.name"></v-input>
        </v-form-item>
        <v-form-item label="登录密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
          <v-input placeholder="请输入登录密码" v-model="model.password"></v-input>
        </v-form-item>
        <v-form-item label="确认密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="rePassword" has-feedback>
          <v-input placeholder="请确认登录密码" v-model="model.rePassword"></v-input>
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
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.model.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        model: {
          userName: "",
          name: "",
          password: "",
          rePassword: ""
        },
        rules: {
          userName: [{
            required: true,
            message: '请输入用户名'
          }],
          name: [{
            required: true,
            message: '请输入商家名称'
          }],
          password: [{
            required: true,
            message: '请输入密码'
          }],
          rePassword: [{
            required: true,
            message: '请再次输入密码'
          },{
            validator: validatePass2
          }]
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
    methods: {
      changeStep(){
        this.$refs.SAForm.validate((valid) => {
          if (valid) {
            console.log(this.model)
            this.step = 0;
            setTimeout(()=>{
              this.step = 2;
              console.log(this.step)
            }, 500);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {

    }
  }
</script>
