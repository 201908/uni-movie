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
          @click="add(item.movieName)"
          hover-class="global-hover"
        >
          <h4 class="weui-media-box__title">{{item.movieName}}</h4>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">{{item.releaseInfo}}</li>
            <li class="weui-media-box__info__meta">{{item.sumBoxInfo}}</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra blue-wrap">
              今日票房
              <span class="blue">{{item.boxInfo}}</span>万
            </li>
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
import { uniIcon } from "@dcloudio/uni-ui";
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
  components: {
    uniIcon
  },
  onLoad() {
    this.getData();
  },
  onPullDownRefresh() {
    // 请求数据
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.$httpsPure
      .request({
        url: "https://box.maoyan.com/promovie/api/box/second.json",
        method: "get"
      })
      .then(res => {
        this.list = res.data.list;
        this.loadmore = this.list.length > 0 ? false : true;
        // 搜索用到的
        this.searchList = this.list;
        // 隐藏加载状态
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      })
      .catch(res => {
        wx.showToast({
          title: "网络出错,稍后在试!",
          icon: "none",
          duration: 2000
        });
      });
  },
  methods: {
    getData() {
      this.$https
        .request({
          url: "https://box.maoyan.com/promovie/api/box/second.json",
          method: "get"
        })
        .then(res => {
          this.list = res.data.list;
          this.loadmore = this.list.length > 0 ? false : true;
          // 搜索用到的
          this.searchList = this.list;
        })
        .catch(res => {
          wx.showToast({
            title: "网络出错,稍后在试!",
            icon: "none",
            duration: 2000
          });
        });
    },
    add(name) {
      app.toSwitchParam = name;
      wx.switchTab({
        url: "/pages/add/main"
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
        return item.movieName.match(value);
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
.blue-wrap {
  border: 0;
  float: right;
}
.blue {
  color: #009eef;
}
.weui-media-box__info {
  color: #999;
}
.weui-icon-search {
  display: inline-block;
}
</style>
