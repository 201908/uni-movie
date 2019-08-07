<template>
  <div>
    <div class="weui-search-bar" id="search_bar">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input
            type="search"
            class="weui-search-bar__input"
            id="search_input"
            placeholder="搜索"
            v-model="inputVal"
            :focus="inputShowed"
            confirm-type="search"
            @confirm="confirmSearch"
          />
          <a
            class="weui-icon-clear"
            id="search_clear"
            v-if="inputVal.length > 0"
            @click="clearInput"
          >
            <icon type="clear" size="14"></icon>
          </a>
        </div>
        <label
          for="search_input"
          class="weui-search-bar__label"
          :hidden="inputShowed"
          @tap="showInput"
        >
          <icon class="weui-icon-search" type="search" size="14"></icon>
          <span class="weui-search-bar__text">搜索</span>
        </label>
      </form>
      <a class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</a>
    </div>
    <div class="weui-panel" style="margin-top:0;">
      <div class="weui-panel__bd">
        <div
          class="weui-media-box weui-media-box_text"
          v-for="(item,index) in list"
          :key="index"
          @click="edit(item._id)"
          hover-class="global-hover"
        >
          <h4 class="weui-media-box__title">{{item.title}}</h4>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">{{item.address}}</li>
            <li class="weui-media-box__info__meta">{{item.createTime}}</li>
            <li
              class="weui-media-box__info__meta weui-media-box__info__meta_extra"
              v-if="item.grade"
            >{{item.grade}}分</li>
          </ul>
        </div>
      </div>
    </div>
    <view class="weui-loadmore weui-loadmore_line" v-show="loadmore">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无影片</view>
    </view>
  </div>
</template>

<script>
let app = getApp();
export default {
  data() {
    return {
      list: [],
      searchList: [],
      inputShowed: false,
      inputVal: "",
      loadmore: false
    };
  },
  onLoad() {
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     const openid = wx.getStorageSync("openid");
    //     if (res.authSetting["scope.userInfo"] && openid) {
    //       this.$store.dispatch("setOpenId", openid);
    //       this.getData();
    //     } else {
    //       // 跳转
    //       wx.reLaunch({
    //         url: "/pages/login/main"
    //       });
    //     }
    //   }
    // });
    this.getData();
  },
  onShow() {
    if (app.alert) {
      this.getData();
      app.alert = false;
    }
    // this.setLearnInfo();
  },
  methods: {
    getData() {
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
            // console.log(res.data);
            this.list = res.data.reverse();
            this.$store.dispatch("setMovieList", this.list.length);
            this.loadmore = this.list.length > 0 ? false : true;
            // 搜索用到的
            this.searchList = this.list;
          }
        });

      // this.$https
      //   .request({
      //     url: this.$interfaces.getMovie + this.$store.getters.openId + ".json",
      //     method: "get"
      //   })
      //   .then(res => {
      //     var blogsArray = [];
      //     for (let key in res) {
      //       res[key].id = key;
      //       blogsArray.push(res[key]);
      //     }
      //     this.list = blogsArray.reverse();
      //     this.$store.dispatch("setMovieList", this.list.length);
      //     this.loadmore = this.list.length > 0 ? false : true;
      //     // 搜索用到的
      //     this.searchList = this.list;
      //   });
    },
    edit(e) {
      wx.navigateTo({
        url: "/pages/edit/main?id=" + e
      });
    },
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = "";
      this.inputShowed = false;
      this.confirmSearch();
    },
    clearInput() {
      this.inputVal = "";
      this.confirmSearch();
    },
    confirmSearch() {
      this.list = this.filterBy(this.searchList, this.inputVal);
      this.loadmore = this.list.length > 0 ? false : true;
    },
    filterBy(list, value) {
      return list.filter(item => {
        return item.title.match(value);
      });
    }
  }
};
</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.weui-media-box__info {
  color: #999;
}
</style>
