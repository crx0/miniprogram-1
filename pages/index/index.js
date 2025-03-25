// 获取应用实例
const app = getApp();

Page({
  data: {
    banners: [], // 轮播图数据
    categories: [], // 分类数据
    courseList: [], // 课程列表
    popularCourses: [], // 热门课程
    freeCourses: [], // 免费课程
    currentCategory: 0, // 当前选中的分类，0表示推荐
    loading: false, // 是否正在加载
    noMore: false, // 是否没有更多数据
    page: 1, // 当前页码
    pageSize: 10 // 每页数据条数
  },

  onLoad: function() {
    // 初始化数据
    this.initData();
  },

  // 页面显示时触发
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 选中首页
      });
    }
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      courseList: [],
      page: 1,
      noMore: false
    });
    this.getCourseList(this.data.currentCategory, true);
    wx.stopPullDownRefresh();
  },

  // 上拉加载更多
  onReachBottom: function() {
    if (!this.data.loading && !this.data.noMore) {
      this.getCourseList(this.data.currentCategory);
    }
  },

  // 初始化数据
  initData: function() {
    // 获取分类
    this.setData({
      categories: app.globalData.courseCategories
    });

    // 获取轮播图数据
    this.setBanners();

    // 获取热门课程
    this.setPopularCourses();

    // 获取免费课程
    this.setFreeCourses();

    // 获取课程列表
    this.getCourseList(0);
  },

  // 设置轮播图数据
  setBanners: function() {
    // 从课程列表中选取前5条做为轮播图
    const banners = app.globalData.courseList.slice(0, 5).map(item => {
      return {
        id: item.id,
        title: item.title,
        image: item.coverImage
      };
    });

    this.setData({
      banners: banners
    });
  },

  // 设置热门课程
  setPopularCourses: function() {
    // 按学生数量排序获取前4个
    const popular = [...app.globalData.courseList]
      .sort((a, b) => b.studentCount - a.studentCount)
      .slice(0, 4);

    this.setData({
      popularCourses: popular
    });
  },

  // 设置免费课程
  setFreeCourses: function() {
    // 获取所有免费课程
    const free = app.globalData.courseList.filter(item => item.isFree).slice(0, 4);

    this.setData({
      freeCourses: free
    });
  },

  // 获取课程列表
  getCourseList: function(categoryId, reset = false) {
    this.setData({
      loading: true
    });

    // 模拟网络请求
    setTimeout(() => {
      let list = [];
      if (categoryId === 0) {
        // 推荐内容
        list = app.globalData.courseList;
      } else {
        // 分类内容
        list = app.globalData.courseList.filter(item => item.categoryId === categoryId);
      }

      // 分页处理
      const start = (this.data.page - 1) * this.data.pageSize;
      const end = this.data.page * this.data.pageSize;
      const pageList = list.slice(start, end);

      if (reset) {
        // 重置列表
        this.setData({
          courseList: pageList,
          loading: false,
          noMore: pageList.length < this.data.pageSize
        });
      } else {
        // 追加数据
        this.setData({
          courseList: [...this.data.courseList, ...pageList],
          page: this.data.page + 1,
          loading: false,
          noMore: pageList.length < this.data.pageSize
        });
      }
    }, 500);
  },

  // 切换分类
  switchCategory: function(e) {
    const categoryId = parseInt(e.currentTarget.dataset.id);
    if (categoryId === this.data.currentCategory) {
      return;
    }

    this.setData({
      currentCategory: categoryId,
      courseList: [],
      page: 1,
      noMore: false
    });

    this.getCourseList(categoryId);
  },

  // 跳转到课程详情页
  navigateToCourse: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id
    });
  },

  // 跳转到搜索页
  navigateToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 跳转到分类页
  navigateToCategory: function() {
    wx.switchTab({
      url: '/pages/category/category'
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
  }
});