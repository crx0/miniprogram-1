// 获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: null,
    studyStats: {
      courseCount: 5,
      studyTime: 12,
      points: 320
    },
    cartCount: 0
  },

  onLoad: function() {
    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
  },

  // 页面显示时触发
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 // 选中个人中心
      });
    }
    
    // 获取购物车数量
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      cartCount: cart.length
    });
  },

  // 获取用户信息
  getUserProfile: function() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        });
        wx.setStorageSync('userInfo', res.userInfo);
      }
    });
  },

  // 跳转到指定页面
  navigateTo: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },

  // 跳转到收藏页
  navigateToFavorite: function() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    });
  },

  // 跳转到浏览历史页
  navigateToHistory: function() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  // 清除缓存
  clearCache: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除除了用户信息外的所有缓存
          const userInfo = wx.getStorageSync('userInfo');
          wx.clearStorageSync();
          if (userInfo) {
            wx.setStorageSync('userInfo', userInfo);
          }
          wx.showToast({
            title: '缓存已清除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 显示意见反馈
  showFeedback: function() {
    wx.showModal({
      title: '意见反馈',
      content: '您可以通过以下方式联系我们提供反馈：\n电话：400-123-4567\n邮箱：feedback@leishuzn.com',
      showCancel: false
    });
  },

  // 关于我们
  showAbout: function() {
    wx.showModal({
      title: '关于雷叔智能',
      content: '雷叔智能，专注于人工智能教育的在线学习平台，为广大AI爱好者、学生和从业者提供优质的学习资源和服务。\n\n版本：1.0.0\n客服电话：400-123-4567',
      showCancel: false
    });
  }
});
