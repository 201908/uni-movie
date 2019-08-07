<template>
  <div class="mine">
    <!-- <view class="weui-cells__title">带图标、说明的列表项</view> -->
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
        <view class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image
            :src="userInfo.avatarUrl || '../../static/tabs/mine.png'"
            style="width: 50px; height: 50px; display: block; border-radius: 50%;"
          />
        </view>
        <view class="weui-cell__bd">
          <button open-type="getUserInfo" @getuserinfo="getUserInfo">{{userInfo.nickName || "登录"}}</button>
          <!-- <view style="font-size: 13px;color: #888888;">{{user.gender == 1 ? '男' : "女"}}</view> -->
        </view>
      </view>
      <view class="weui-cell weui-cell_access">
        <view class="weui-cell__bd">
          <view style="display: inline-block; vertical-align: middle">共看过{{movieCount}}部电影</view>
        </view>
      </view>
    </view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: "",
        nickName: ""
      }
    };
  },
  created() {
    // console.log(11);
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          this.userInfo = wx.getStorageSync("userInfo");
        }
      }
    });
  },
  onLoad() {
    // console.log(22);
  },
  methods: {
    getUserInfo(e) {
      // console.log(e);
      // 判断授权是否成功
      if (e.mp.detail.userInfo) {
        this.userInfo = e.mp.detail.userInfo;
        // 必须用storage,其他地方可以不用
        wx.setStorageSync("userInfo", e.mp.detail.userInfo);
      }
    }
  },
  computed: {
    // user() {
    //   // console.log(this.$store.getters.user);
    //   const userInfo = wx.getStorageSync("userInfo");
    //   return userInfo;
    // },
    movieCount() {
      let movieCount = "0";
      if (this.$store.getters.movieList) {
        movieCount = this.$store.getters.movieList;
      } else {
        // 加载动画
        wx.showLoading({
          title: "加载中..."
        });

        this.$cloud
          .where({
            _openid: this.$store.getters.openId
          })
          .get({
            success: res => {
              wx.hideLoading();
              this.$store.dispatch("setMovieList", res.data.length);
              movieCount = res.data.length;
            }
          });
      }

      return movieCount;
    }
  }
};
</script>
<style scoped>
button {
  background-color: #ffffff;
  height: 100rpx;
  display: inline-block;
}
button::after {
  border: none;
}
</style>