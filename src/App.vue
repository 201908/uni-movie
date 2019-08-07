<script>
export default {
  created() {
    console.log(2);
    // wx.cloud.callFunction({
    //   name: "getOpenid",
    //   complete: res => {
    //     // console.log('云函数获取到的openid: ', res.result.openid)
    //     var openid = res.result.openid;
    //     this.$store.dispatch("setOpenId", openid);
    //     wx.setStorageSync("openid", openid);
    //   }
    // });
  },
  onLaunch: function() {
    console.log(3);
  },
  alert: false, // page onshow用
  toSwithParam: ""
};
</script>

<style>
/*每个页面公共css */
* {
  margin: 0;
  padding: 0;
}
page {
  width: 100%;
  height: 100%;
  /* background-color: #f7f7f7; */
}
.weui-label {
  display: block;
}
.wx-picker {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.weui-cell.disabled .weui-input {
  text-fill-color: #888;
  -webkit-text-fill-color: #888;
  opacity: 1;
}
.btn-hover {
  position: relative;
  top: 3rpx;
  box-shadow: 0px 0px 8px #999 inset;
}
/* 镂空按钮 点击阴影不宜太深 */
.plain-hover {
  position: relative;
  top: 3rpx;
  box-shadow: 0px 0px 10px #bbbec4 inset;
}
.global-hover {
  background: #f0f0f0;
}
</style>
