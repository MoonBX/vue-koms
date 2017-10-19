<template>
  <div>
    <v-form direction="horizontal" v-model="model">
      <v-form-item label="商家名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="title" has-feedback>
        <v-input placeholder="请输入商家名称" v-model="model.userName"></v-input>
      </v-form-item>
      <v-form-item label="充值金额" :label-col="labelCol" :wrapper-col="wrapperCol" prop="title" has-feedback>
        <v-input placeholder="100" v-model="model.password" style="width: 100px;"></v-input>
        <span class="content-tip">元</span>
      </v-form-item>
      <v-form-item label="确认密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="title" has-feedback>
        <v-input placeholder="请确认登录密码" v-model="model.password"></v-input>
      </v-form-item>
    </v-form>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        model: {
          userName: "",
          content: "",
          password: "",
          rePassword: "",
          mobile: ""
        },
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    },
    methods: {},
    created() {
    }
  }
</script>
