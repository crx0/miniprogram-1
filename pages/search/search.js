// 获取应用实例
const app = getApp();

Page({
  data: {
    keyword: '', // 搜索关键词
    searchResult: [], // 搜索结果
    searchHistory: [], // 搜索历史
    hasSearch: false // 是否已执行搜索
  },

  onLoad: function() {
    // 获取搜索历史
    this.getSearchHistory();
  },

  // 获取搜索历史
  getSearchHistory: function() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({
      searchHistory: history
    });
  },

  // 输入框输入
  onInput: function(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  // 执行搜索
  doSearch: function() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      return;
    }

    // 搜索新闻
    const result = app.searchNews(keyword);

    // 更新搜索状态
    this.setData({
      searchResult: result,
      hasSearch: true
    });

    // 保存搜索历史
    this.saveSearchHistory(keyword);
  },

  // 保存搜索历史
  saveSearchHistory: function(keyword) {
    let history = wx.getStorageSync('searchHistory') || [];
    
    // 如果已存在，先移除旧记录
    const index = history.indexOf(keyword);
    if (index > -1) {
      history.splice(index, 1);
    }
    
    // 添加到列表开头
    history.unshift(keyword);
    
    // 最多保存10条历史记录
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    // 保存到本地
    wx.setStorageSync('searchHistory', history);
    
    // 更新页面数据
    this.setData({
      searchHistory: history
    });
  },

  // 清空关键词
  clearKeyword: function() {
    this.setData({
      keyword: '',
      hasSearch: false
    });
  },

  // 使用历史关键词
  useHistoryKeyword: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      keyword: keyword
    }, () => {
      this.doSearch();
    });
  },

  // 清除搜索历史
  clearHistory: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清除搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储
          wx.removeStorageSync('searchHistory');
          
          // 重置页面数据
          this.setData({
            searchHistory: []
          });
          
          wx.showToast({
            title: '已清除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack();
  },

  // 跳转到文章详情页
  navigateToArticle: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id
    });
  }
});
