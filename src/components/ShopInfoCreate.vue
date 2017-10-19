<template>
    <div>
      <v-form direction="horizontal" :model="model" :rules="rules" ref="SIForm">
        <v-form-item label="商家名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="title" has-feedback>
          <v-input placeholder="请输入商家名称" v-model="model.userName" disabled></v-input>
        </v-form-item>
        <v-form-item label="电话号码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="mobile" has-feedback>
          <v-input placeholder="请输入电话号码" v-model="model.mobile"></v-input>
        </v-form-item>
        <v-form-item label="折扣" :label-col="labelCol" :wrapper-col="wrapperCol" prop="discount" has-feedback>
          <v-input v-model="model.discount" style="width: 60px;"></v-input>
          <span class="content-tip">(扫码商家必填)</span>
        </v-form-item>
        <v-form-item label="地址" :label-col="labelCol" :wrapper-col="wrapperCol" prop="address" has-feedback>
          <v-input placeholder="请输入地址" v-model="model.address"></v-input>
        </v-form-item>
        <v-form-item label="商家签名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="sign" has-feedback>
          <v-input placeholder="请输入商家签名" v-model="model.sign"></v-input>
        </v-form-item>
        <v-form-item label="LOGO" :label-col="labelCol" :wrapper-col="wrapperCol" prop="logo" has-feedback>
          <div style="width: 100px; height: 100px">
            <v-upload :name="name" :action="action" drag>
              <v-icon type="plus"></v-icon>
            </v-upload>
          </div>
        </v-form-item>
        <v-form-item label="负责小区" :label-col="labelCol" :wrapper-col="wrapperCol" prop="village" has-feedback>
          <v-select style="width: 100%;" multiple :data="options" v-model="model.village"></v-select>
        </v-form-item>
        <v-form-item label="活动性质" :label-col="labelCol" :wrapper-col="wrapperCol" prop="type" has-feedback>
          <v-checkbox-group v-model="model.type" :data="checkboxOpt"></v-checkbox-group>
        </v-form-item>
        <div>
          <v-form-item label="配送费" :label-col="{span: 8}" :wrapper-col="{span:16}" prop="distribution" has-feedback style="display: inline-block;width: 50%;">
            <v-input style="width: 80%;" v-model="model.distribution"></v-input>
          </v-form-item>
          <v-form-item label="最低起送金" :label-col="{span: 11}" :wrapper-col="{span:13}" prop="delivery" has-feedback style="display: inline-block;width: 40%;">
            <v-input style="width: 80%;" v-model="model.delivery"></v-input>
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
  import { bus } from '../util/bus.js'
    export default {
        data() {
            return {
              model: {
                userName: "",
                mobile: "",
                discount: "",
                address: "",
                sign: "",
                village: "",
                type: [],
                distribution: "",
                delivery: "",
                tag: ""
              },
              checkboxOpt: [{
                label: '平台商家',
                value: '1'
              }, {
                label: '扫码商家',
                value: '2'
              }],
              rules: {
                mobile: [{
                  required: true,
                  message: '请输入手机号码'
                },{
                  pattern: '(^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-))?(1[3578]\\d{9})$)',
                  message: '手机号码格式不正确'
                }],
                discount: [{
                  required: true,
                  message: '请输入折扣数字'
                }, {
                  pattern: '^[0-9]+([.]{1}[0-9]+){0,1}$',
                  message: '格式不正确'
                }],
                address: [{
                  required: true,
                  message: '请输入地址'
                }],
                sign: [{
                  required: true,
                  message: '请输入签名'
                }],
                village: [{
                  type: 'array',
                  required: true,
                  message: '请选择小区'
                }],
                type: [{
                  type: 'array',
                  required: true,
                  message: '请选择商家类型'
                }]
              },
              options: [{
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
              }],
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
              name: 'file',
              action: '/upload'
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
          }
        },
        created() {
        }
    }
</script>
