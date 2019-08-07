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
      <div class="weui-cell disabled">
        <div class="weui-cell__hd">
          <label class="weui-label">观看时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="movie.createTime" disabled />
        </div>
      </div>
      <div class="weui-cell disabled">
        <div class="weui-cell__hd">
          <label class="weui-label">修改时间</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="movie.updateTime" disabled />
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
      <button
        class="weui-btn"
        @click="updateMovie"
        plain
        type="primary"
        hover-class="plain-hover"
      >保存</button>
      <button class="weui-btn" @click="deleteMovie" plain type="warn" hover-class="plain-hover">删除</button>
    </div>
  </div>
</template>

<script>
let app = getApp();
export default {
  data() {
    return {
      id: "",
      movie: {},
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
  onLoad(e) {
    // console.log(111);
    // console.log(e);
    // console.log(this.$root.$mp.query)
    this.id = e.id;
    this.fetchMovie();
  },
  onShow() {
    this.currentNum = 0;
  },
  methods: {
    fetchMovie() {
      const nowTime = this.$date.formatTime(new Date());
      this.movie.updateTime = nowTime;

      // 加载动画
      wx.showLoading({
        title: "加载中..."
      });
      this.$cloud.doc(this.id).get({
        success: res => {
          wx.hideLoading();
          // console.log(res.data);
          this.movie = {
            title: res.data.title,
            address: res.data.address,
            createTime: res.data.createTime,
            updateTime: res.data.updateTime,
            grade: res.data.grade,
            comment: res.data.comment
          };
          this.index = this.addressList.indexOf(res.data.address);
        }
      });
      // this.$https
      //   .request({
      //     url:
      //       this.$interfaces.getMovie +
      //       this.$store.getters.openId +
      //       "/" +
      //       id +
      //       ".json",
      //     method: "get"
      //   })
      //   .then(res => {
      //     this.movie = res;
      //     this.index = this.addressList.indexOf(res.address);
      //   });
    },
    updateMovie() {
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
      this.movie.updateTime = nowTime;
      this.$cloud.doc(this.id).update({
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
            // this.movie = {};
            this.index = 0;
            wx.switchTab({
              url: "/pages/movie/main"
            });
          }, 2000);
        }
      });
      // const _this = this;
      // this.$https
      //   .request({
      //     url:
      //       this.$interfaces.getMovie +
      //       this.$store.getters.openId +
      //       "/" +
      //       this.id +
      //       ".json",
      //     method: "put",
      //     data: this.movie
      //   })
      //   .then(res => {
      //     app.alert = true;
      //     wx.showToast({
      //       title: "保存成功",
      //       icon: "success",
      //       duration: 2000
      //     });
      //     setTimeout(function() {
      //       wx.switchTab({
      //         url: "/pages/movie/main"
      //       });
      //     }, 2000);
      //   });
    },
    deleteMovie() {
      // 显示
      wx.showModal({
        title: "提示",
        content: "确定删除吗",
        success: res => {
          if (res.confirm) {
            this.$cloud.doc(this.id).remove({
              success: res => {
                app.alert = true;
                wx.showToast({
                  title: "删除成功",
                  icon: "success",
                  duration: 2000
                });
                setTimeout(() => {
                  wx.switchTab({
                    url: "/pages/movie/main"
                  });
                }, 2000);
              }
            });
          }
        }
      });
    },
    bindPickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index = e.mp.detail.value;
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
