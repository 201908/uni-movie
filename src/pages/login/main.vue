<template>
  <div class="container">
    <div class="login">
      <div class="img-box">
        <img src="/static/images/logo.svg" class="App-logo" alt="logo" />
      </div>
      <div class="learn">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  onLoad() {
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //     }
    //   }
    // })
  },
  methods: {
    getUserInfo(e) {
      // 判断授权是否成功
      if (e.mp.detail.userInfo) {
        // console.log(e.mp.detail.userInfo);
        wx.setStorageSync("userInfo", e.mp.detail.userInfo);
        // 存储到vuex
        this.$store.dispatch("setIsAuthenticated", true);
        this.$store.dispatch("setUser", e.mp.detail.userInfo);
        // 获取code
        this.getOpenid();
      }
    },
    // 获取用户openid
    getOpenid() {
      let that = this;
      wx.cloud.callFunction({
        name: "getOpenid",
        complete: res => {
          // console.log('云函数获取到的openid: ', res.result.openid)
          var openid = res.result.openid;
          this.$store.dispatch("setOpenId", openid);
          wx.setStorageSync("openid", openid);
          // 跳转
          wx.switchTab({
            url: "/pages/index/main"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #282c34;
}
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.login .img-box {
  width: 60%;
  height: 80%;
  margin: 0 auto;
}
.login img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.learn button {
  position: absolute;
  top: 80%;
  left: 10%;
  width: 80%;
  background-color: #009eef;
  color: white;
}
.App-logo {
  -webkit-animation: App-logo-spin infinite 20s linear;
  animation: App-logo-spin infinite 20s linear;
  height: 20px;
  pointer-events: none;
}
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
