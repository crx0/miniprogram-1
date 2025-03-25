// 获取应用实例
const app = getApp();

Page({
  data: {
    categories: [], // 分类数据
    selectedCategory: null, // 当前选中的分类
    courseList: [] // 当前分类下的课程列表
  },

  onLoad: function () {
    // 初始化分类数据
    this.setData({
      categories: app.globalData.courseCategories
    });
  },

  // 页面显示时触发
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 选中课程标签
      });
    }
  },

  // 选择分类
  selectCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    const category = this.data.categories.find(item => item.id === categoryId);
    
    if (category) {
      this.setData({
        selectedCategory: category,
        courseList: [] // 清空原有课程列表
      });
      
      // 获取该分类下的课程
      this.getCoursesByCategory(categoryId);
    }
  },
  
  // 根据分类获取课程
  getCoursesByCategory: function(categoryId) {
    // 调用app中的方法获取课程
    const courses = app.getCourseList(categoryId);
    
    this.setData({
      courseList: courses
    });
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
  }
});
