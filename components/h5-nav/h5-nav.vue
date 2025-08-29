<!-- components/h5-nav/h5-nav.vue -->
<template>
  <view class="h5-nav">
    <view 
      v-for="(item, index) in navList" 
      :key="index"
      class="nav-item"
      :class="{ active: currentPath === item.pagePath }"
      @click="jumpTo(item.pagePath)"
    >
      {{ item.text }}
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 导航列表（和 tabBar.list 保持一致，可复用配置）
      navList: [
        { pagePath: "pages/index/index", text: "首页" },
        { pagePath: "pages/expense/expense_add", text: "添加支出" },
        { pagePath: "pages/login/login", text: "我的" }
      ],
      currentPath: "" // 当前页面路径
    };
  },
  onLoad() {
    // 获取当前页面路径，用于高亮激活项
    const pages = getCurrentPages();
    this.currentPath = pages[pages.length - 1].route;
  },
methods: {
  jumpTo(path) {
    this.currentPath = path;
    uni.switchTab({
      url: `/${path}`,
      success: () => {
        console.log("跳转成功");
      },
      fail: (err) => {
        // 如果不是tabBar页面，可以用navigateTo
        uni.navigateTo({ url: `/${path}` });
      }
    });
  }
}
};
</script>

<style scoped>
.h5-nav {
  display: flex;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.nav-item {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
}
.nav-item.active {
  color: $uni-color-primary; /* 复用 uni.scss 中的主题色 */
  border-bottom: 2px solid $uni-color-primary;
}
</style>