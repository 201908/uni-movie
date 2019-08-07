<template>
  <div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">影片</label>
        </div>
        <div class="weui-cell__bd">
          <input placeholder="请输入影片" class="weui-input" v-model="movie.title" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">选择地点</label>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindPickerChange" :value="index" :range="addressList">
            <view class="weui-input">{{addressList[index]}}</view>
          </picker>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">评分</label>
        </div>
        <div class="weui-cell__bd">
          <input placeholder="请输入评分" class="weui-input" type="digit" v-model="movie.grade" />
        </div>
      </div>

      <div class="weui-cell self-padding">
        <div class="weui-cell__bd">
          <textarea
            class="weui-textarea"
            auto-height
            placeholder="好看吗，快来写下你的感受吧~"
            :maxlength="totalNum"
            @input="number"
            v-model="movie.comment"
          ></textarea>
          <div class="weui-textarea-counter">
            <span class="small-font">{{alertWord}}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:15px;">
      <button @click="add" plain type="primary" hover-class="plain-hover">保存</button>
    </div>
    <!-- <switch checked @change="switch2Change" /> -->
  </div>
</template>

<script>
let app = getApp();
export default {
  data() {
    return {
      movie: {
        title: "",
        grade: "",
        comment: ""
      },
      addressList: ["家里", "影院"],
      index: 0,
      currentNum: 0,
      totalNum: 400
    };
  },
  computed: {
    alertWord() {
      let word = "";
      if (this.currentNum >= 350) {
        word = `还可以写${this.totalNum - this.currentNum}个字啦`;
      }
      if (this.currentNum + 1 > this.totalNum) {
        word = "哎呀，不能再写啦";
      }
      return word;
    }
  },
  switch2Change: function(e) {
    console.log("switch2 发生 change 事件，携带值为", e.detail.value);
  },
  created() {
    // console.log("打开小程序就调用了");
  },
  onLoad(e) {
    // console.log("只执行一次");
    // console.log(this.$date.formatTime(new Date()))
  },
  onShow() {
    if (app.toSwitchParam) {
      this.movie.title = app.toSwitchParam;
      this.index = 1;
      app.toSwitchParam = "";
    }
  },
  onReady() {
    // console.log(33);
    // console.log("只执行一次");
  },
  methods: {
    add() {
      if (!this.movie.title) {
        wx.showToast({
          title: "请填写影片",
          icon: "none",
          duration: 2000
        });
        return;
      }
      this.movie.address = this.addressList[this.index];
      const nowTime = this.$date.formatTime(new Date());
      this.movie.createTime = nowTime;
      this.movie.updateTime = nowTime;
      this.$cloud.add({
        data: this.movie,
        success: res => {
          // console.log(res);
          app.alert = true;
          wx.showToast({
            title: "保存成功",
            icon: "success",
            duration: 2000
          });
          setTimeout(() => {
            // 初始化
            this.movie = {};
            this.index = 0;
            this.currentNum = 0;
            wx.switchTab({
              url: "/pages/movie/main"
            });
          }, 2000);
        }
      });
      // const _this = this
      // this.$https
      // .request({
      //   url: this.$interfaces.getMovie + this.$store.getters.openId + ".json",
      //   method: "post",
      //   data: this.movie
      // })
      // .then(res => {
      //   app.alert = true;
      //   wx.showToast({
      //     title: "保存成功",
      //     icon: 'success',
      //     duration: 2000
      //   })
      //   setTimeout(function () {
      //     _this.movie = {}
      //     _this.index = 0
      //     wx.switchTab({
      //       url: "/pages/movie/main"
      //     })
      //   }, 2000)
      // });
    },
    bindPickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index = e.mp.detail.value;
    },
    openKeyboard() {
      this.focus = true;
    },
    number(e) {
      this.currentNum = e.mp.detail.value.length;
    }
  }
};
</script>

<style scoped>
.self-padding {
  padding: 30rpx 30rpx;
}
.small-font {
  font-size: 26rpx;
}
</style>
