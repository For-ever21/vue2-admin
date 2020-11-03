<template>
  <el-container>
    <div class="login_bg1"></div>
    <div class="login_bg2"></div>
    <el-main>
      <el-row type="flex" class="login-wrapper">
        <div class="login-form">
          <el-col :span="24">
            <el-form class="form-wrapper" :model="loginForm" ref="loginFormRef">
              <div class="login_tit">
                <h3>登录</h3>
              </div>
              <el-form-item
                label="用户名"
                prop="userName"
                :rules="[{ required: true, trigger: 'blur' }]"
              >
                <el-input
                  class="login_ipt"
                  v-model="loginForm.userName"
                  autocomplete="off"
                  @keyup.enter.native="handleLogin"
                  placeholder="请输入用户名"
                />
              </el-form-item>
              <el-form-item
                label="登录密码"
                prop="password"
                :rules="[{ required: true, trigger: 'blur' }]"
              >
                <el-input
                  class="login_ipt"
                  type="password"
                  v-model="loginForm.password"
                  autocomplete="off"
                  @keyup.enter.native="handleLogin"
                  placeholder="请输入账户登录密码"
                />
              </el-form-item>
              <el-button class="login_btn" type="primary" :loading="loading" @click="handleLogin">
                {{ loading ? "登录中..." : "登录" }}
              </el-button>
            </el-form>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "Login"
})
export default class extends Vue {
  public $refs!: {
    loginFormRef: any;
  };
  private loading = false; // 按钮登录态
  private redirect?: string; // 调转地址
  private loginForm = {
    // 登陆表单
    userName: "admin",
    password: "123456"
  };
  private handleLogin() {
    this.$refs.loginFormRef.validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        setTimeout(() => {
          this.$notify({
            title: "成功",
            message: "登录成功！",
            type: "success"
          });
          this.$router.push("/dashboard");
        }, 1000);
      } else {
        this.loading = false;
      }
    });
  }
}
</script>
<style lang="less" scoped>
.el-container {
  background: linear-gradient(25deg, rgba(57, 192, 255, 1), rgba(88, 92, 255, 1));
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 600px;
}
.login-form {
  position: fixed;
  top: 50%;
  left: 50%;
  // width: 497px;
  width: 860px;
  height: 500px;
  margin-left: -430px;
  margin-top: -300px;
  background: #fff url(../images/login_bg.png) no-repeat left top;
  border-radius: 7px;
  padding-left: 363px;
}
.form-wrapper {
  padding: 0 100px;
  .login_tit {
    text-align: center;
    font-size: 18px;
    color: #333;
    padding: 40px 0;
    h3 {
      font-weight: bold;
      border-bottom: 4px solid #2688fc;
      display: inline-block;
      line-height: 40px;
    }
  }
  .title {
    padding: 15px 0;
    font-size: 24px;
    margin: 50px 0;
    text-align: center;
  }
  .code {
    width: 100px;
  }
  .login_btn {
    width: 100%;
    height: 48px;
    font-size: 18px;
    margin-top: 20px;
  }
  /deep/.login_ipt input {
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-radius: 0;
    padding: 0;
    box-shadow: 0 0 0 1000px white inset;
  }
}

.login-wrapper {
  margin: 40px 0;
}
.login-form /deep/ .el-input__icon {
  line-height: 38px;
}

.login_bg1 {
  height: 51px;
  background: url(../images/login_bg_wave1.png) repeat-x;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 400%;
  z-index: 91;
  animation: wave1 25s linear 0.4s infinite normal;
  -moz-animation: wave1 25s linear 0.4s infinite normal;
  -webkit-animation: wave1 25s linear 0.4s infinite normal;
  -o-animation: wave1 25s linear 0.4s infinite normal;
}
.login_bg2 {
  height: 51px;
  background: url(../images/login_bg_wave2.png) repeat-x;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 400%;
  z-index: 90;
  animation: wave2 60s linear 0.4s infinite normal;
  -moz-animation: wave2 60s linear 0.4s infinite normal;
  -webkit-animation: wave2 60s linear 0.4s infinite normal;
  -o-animation: wave2 60s linear 0.4s infinite normal;
}
@-webkit-keyframes wave1 {
  from {
    left: -236px;
  }
  to {
    left: -1233px;
  }
}
@-moz-keyframes wave1 {
  from {
    left: -236px;
  }
  to {
    left: -1233px;
  }
}
@-o-keyframes wave1 {
  from {
    left: -236px;
  }
  to {
    left: -1233px;
  }
}
@keyframes wave1 {
  from {
    left: -236px;
  }
  to {
    left: -1233px;
  }
}
@-webkit-keyframes wave2 {
  from {
    left: 0;
  }
  to {
    left: -1009px;
  }
}
@-moz-keyframes wave2 {
  from {
    left: 0;
  }
  to {
    left: -1009px;
  }
}
@-o-keyframes wave2 {
  from {
    left: 0;
  }
  to {
    left: -1009px;
  }
}
@keyframes wave2 {
  from {
    left: 0;
  }
  to {
    left: -1009px;
  }
}
</style>
