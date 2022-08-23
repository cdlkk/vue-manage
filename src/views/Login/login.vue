<template>
  <div>
    <el-form :model="form" status-icon="" :rules="rules" ref="form" label-width="100px" class="login-container">
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" label-width="80px" prop="username" class="username">
        <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password" class="password">
        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="login_submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mockjs from 'mockjs'
import { getMenu } from '@/api/data'
export default {
  name: 'login',
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
      // const token = mockjs.random.guid()
      // this.$store.commit('setToken', token)
      // this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0px 0px 25px #cac6c6;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  width: 400px;
}
.login-title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0 auto;
}
</style>
