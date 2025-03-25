// 获取应用实例
const app = getApp();

Page({
  data: {
    article: null, // 文章详情
    relatedNews: [], // 相关推荐
    isLiked: false, // 是否已点赞
    isFavorite: false // 是否已收藏
  },

  onLoad: function(options) {
    const id = options.id;
    if (!id) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }

    // 获取文章详情
    this.getArticleDetail(id);
    
    // 添加到浏览历史
    app.addHistory(id);
  },

  // 页面显示时触发
  onShow: function() {
    // 刷新收藏状态
    if (this.data.article) {
      this.setData({
        isFavorite: app.isFavorite(this.data.article.id)
      });
    }
  },

  // 分享
  onShareAppMessage: function() {
    const article = this.data.article;
    return {
      title: article.title,
      path: '/pages/article/article?id=' + article.id,
      imageUrl: article.coverImage
    };
  },

  // 获取文章详情
  getArticleDetail: function(id) {
    // 获取文章详情
    const article = app.getNewsDetail(id);
    if (!article) {
      wx.showToast({
        title: '文章不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }

    // 格式化内容为富文本
    article.content = article.content.replace(/\n/g, '<br>');

    // 设置页面标题
    wx.setNavigationBarTitle({
      title: article.categoryName
    });

    // 获取相关推荐
    const relatedNews = app.globalData.newsList
      .filter(item => item.categoryId === article.categoryId && item.id !== article.id)
      .slice(0, 3);

    this.setData({
      article: article,
      relatedNews: relatedNews,
      isFavorite: app.isFavorite(id)
    });
  },

  // 点赞
  toggleLike: function() {
    const article = this.data.article;
    const isLiked = !this.data.isLiked;

    // 更新点赞数
    if (isLiked) {
      article.likeCount++;
    } else {
      article.likeCount--;
    }

    this.setData({
      isLiked: isLiked,
      article: article
    });

    wx.showToast({
      title: isLiked ? '点赞成功' : '已取消点赞',
      icon: 'none'
    });
  },

  // 收藏
  toggleFavorite: function() {
    const article = this.data.article;
    const isFavorite = !this.data.isFavorite;

    if (isFavorite) {
      app.addFavorite(article.id);
    } else {
      app.removeFavorite(article.id);
    }

    this.setData({
      isFavorite: isFavorite
    });

    wx.showToast({
      title: isFavorite ? '收藏成功' : '已取消收藏',
      icon: 'none'
    });
  },

  // 分享
  shareArticle: function() {
    // 点击分享按钮时触发
  },

  // 跳转到文章详情页
  navigateToArticle: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id
    });
  }
}); 