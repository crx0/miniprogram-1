// 获取应用实例
const app = getApp();

Page({
  data: {
    categories: [], // 分类数据
    currentCategory: null, // 当前选中的分类ID
    currentCategoryIndex: 0, // 当前选中的分类索引
    courseList: [], // 当前分类下的课程列表
    isLoading: true, // 是否正在加载
    refreshing: false, // 是否正在下拉刷新
    loading: false, // 是否正在加载更多
    noMore: false, // 是否没有更多数据
    pageNum: 1, // 当前页码
    pageSize: 5, // 每页数量
    windowWidth: 375, // 默认窗口宽度
    windowHeight: 667 // 默认窗口高度
  },

  onLoad: function () {
    // 获取设备信息以适配不同屏幕
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowWidth: systemInfo.windowWidth,
      windowHeight: systemInfo.windowHeight
    });

    // 初始化分类数据
    this.loadCategories();
  },

  // 页面显示时触发
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 选中课程标签
      });
    }
  },

  // 加载分类数据
  loadCategories: function() {
    // 模拟加载延迟
    wx.showLoading({
      title: '加载中...',
    });

    setTimeout(() => {
      // 初始化分类数据
      this.setData({
        categories: app.globalData.courseCategories,
        isLoading: false
      });
      wx.hideLoading();

      // 如果有默认分类则自动选中
      if (this.data.categories.length > 0) {
        this.selectCategory({
          currentTarget: {
            dataset: {
              id: this.data.categories[0].id
            }
          }
        });
      }
    }, 500);
  },

  // 选择分类
  selectCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    const categoryIndex = this.data.categories.findIndex(item => item.id === categoryId);
    
    if (categoryIndex > -1) {
      this.setData({
        currentCategory: categoryId,
        currentCategoryIndex: categoryIndex,
        courseList: [], // 清空原有课程列表
        pageNum: 1,
        noMore: false,
        isLoading: true
      });
      
      // 获取该分类下的课程
      this.getCoursesByCategory(categoryId);
    }
  },
  
  // 根据分类获取课程
  getCoursesByCategory: function(categoryId, isLoadMore = false) {
    // 如果是加载更多，并且已经没有更多数据，则直接返回
    if (isLoadMore && this.data.noMore) {
      this.setData({ loading: false });
      return;
    }

    if (!isLoadMore) {
      this.setData({ isLoading: true });
    } else {
      this.setData({ loading: true });
    }

    // 模拟网络请求延迟
    setTimeout(() => {
      // 调用app中的方法获取课程
      const allCourses = app.getCourseList(categoryId) || [];
      
      // 分页处理
      const { pageNum, pageSize } = this.data;
      const start = (pageNum - 1) * pageSize;
      const end = pageNum * pageSize;
      const courses = allCourses.slice(start, end);
      
      // 判断是否还有更多数据
      const hasMore = allCourses.length > end;

      if (isLoadMore) {
        // 加载更多时，将新数据追加到列表末尾
        this.setData({
          courseList: [...this.data.courseList, ...courses],
          loading: false,
          noMore: !hasMore,
          isLoading: false
        });
      } else {
        // 首次加载时，直接替换数据
        this.setData({
          courseList: courses,
          noMore: !hasMore,
          isLoading: false
        });
      }
    }, 800);
  },
  
  // 下拉刷新
  onRefresh: function() {
    this.setData({
      refreshing: true,
      pageNum: 1,
      noMore: false
    });
    
    // 重新加载当前分类的课程
    setTimeout(() => {
      this.getCoursesByCategory(this.data.currentCategory);
      this.setData({ refreshing: false });
    }, 1000);
  },
  
  // 加载更多
  onLoadMore: function() {
    if (this.data.loading || this.data.noMore) return;
    
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    
    this.getCoursesByCategory(this.data.currentCategory, true);
  },
  
  // 刷新课程
  refreshCourses: function() {
    this.setData({
      pageNum: 1,
      noMore: false
    });
    this.getCoursesByCategory(this.data.currentCategory);
  },

  // 跳转到课程详情页
  navigateToCourse: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id
    });
  },

  // 添加到购物车
  addToCart: function(e) {
    const id = e.currentTarget.dataset.id;
    app.addToCart(id);
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
    // 阻止事件冒泡
    e.stopPropagation();
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {
    // 使用自定义的下拉刷新，这里不需要实现
    wx.stopPullDownRefresh();
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    // 使用自定义的上拉加载更多，这里不需要实现
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: '精品课程分类',
      path: '/pages/category/category'
    };
  }
});
