<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form :model= "loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon ="el-icon-user-solid" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon ="el-icon-warning"
          type="password" placeholder="密码"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">提交</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginFormRules: {
        username: [
          { require: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在3-9字符之间', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入登录名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在5-12字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单按钮
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) { return null }
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error('登录失败！')
        }
        this.$message.success('登录成功')
        // 1.将登录成功之后的 token，保存到客户端 sessionStorage 中
        //  1.1 项目中除了登录之外的其他Api接口，必须在登录之后才能访问
        //  1.2 token 只应在当前网站在打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 2.通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style scope>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
}
.avatar_box img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: pink;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>