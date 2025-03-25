App({
  globalData: {
    userInfo: null,
    courseCategories: [
      { id: 1, name: '基础入门', icon: '/images/beginner.png' },
      { id: 2, name: '机器学习', icon: '/images/ml.png' },
      { id: 3, name: '深度学习', icon: '/images/dl.png' },
      { id: 4, name: '自然语言处理', icon: '/images/nlp.png' },
      { id: 5, name: '计算机视觉', icon: '/images/cv.png' },
      { id: 6, name: '强化学习', icon: '/images/rl.png' },
      { id: 7, name: '大模型应用', icon: '/images/llm.png' },
      { id: 8, name: '项目实战', icon: '/images/project.png' }
    ],
    // 模拟课程数据
    courseList: []
  },

  onLaunch: function() {
    // 初始化模拟数据
    this.initMockData();
    
    // 获取用户信息
    this.getUserInfo();
  },

  // 初始化模拟数据
  initMockData: function() {
    const mockCourses = [];
    const categories = this.globalData.courseCategories;
    
    // 为每个分类生成5门模拟课程
    categories.forEach(category => {
      for (let i = 1; i <= 5; i++) {
        mockCourses.push({
          id: `${category.id}-${i}`,
          title: `${category.name}课程${i}: AI实战课程系列`,
          summary: `这是一门关于${category.name}的实用课程，适合各个水平的学习者。`,
          content: `# 课程介绍\n\n这是一门关于${category.name}的精品课程，由雷叔智能精心打造。\n\n## 课程内容\n\n- 基础理论讲解\n- 代码实战演练\n- 项目案例分析\n- 行业应用解析\n\n## 适合人群\n\n- AI爱好者\n- 在校学生\n- 转行人士\n- 技术升级人士`,
          categoryId: category.id,
          categoryName: category.name,
          publishTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
          instructor: '雷叔',
          coverImage: `https://picsum.photos/300/200?random=${category.id * 10 + i}`,
          price: Math.floor(Math.random() * 20) * 50 + 99,
          originalPrice: Math.floor(Math.random() * 20) * 50 + 299,
          studentCount: Math.floor(Math.random() * 10000),
          rating: (4 + Math.random()).toFixed(1),
          isFree: i === 1 ? true : false
        });
      }
    });
    
    // 按发布时间排序
    mockCourses.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime));
    
    this.globalData.courseList = mockCourses;
  },
  
  // 获取用户信息
  getUserInfo: function() {
    const that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        that.globalData.userInfo = res.userInfo;
        // 将用户信息存储到本地
        wx.setStorageSync('userInfo', res.userInfo);
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    });
  },
  
  // 获取课程列表
  getCourseList: function(categoryId = 0) {
    if (categoryId === 0) {
      // 返回所有课程
      return this.globalData.courseList;
    } else {
      // 返回指定分类的课程
      return this.globalData.courseList.filter(item => item.categoryId === categoryId);
    }
  },
  
  // 获取课程详情
  getCourseDetail: function(courseId) {
    return this.globalData.courseList.find(item => item.id === courseId);
  },
  
  // 搜索课程
  searchCourses: function(keyword) {
    if (!keyword) return [];
    
    keyword = keyword.toLowerCase();
    return this.globalData.courseList.filter(item => 
      item.title.toLowerCase().includes(keyword) || 
      item.content.toLowerCase().includes(keyword)
    );
  },
  
  // 添加收藏
  addFavorite: function(courseId) {
    let favorites = wx.getStorageSync('favorites') || [];
    if (!favorites.includes(courseId)) {
      favorites.push(courseId);
      wx.setStorageSync('favorites', favorites);
    }
  },
  
  // 取消收藏
  removeFavorite: function(courseId) {
    let favorites = wx.getStorageSync('favorites') || [];
    const index = favorites.indexOf(courseId);
    if (index > -1) {
      favorites.splice(index, 1);
      wx.setStorageSync('favorites', favorites);
    }
  },
  
  // 检查是否已收藏
  isFavorite: function(courseId) {
    let favorites = wx.getStorageSync('favorites') || [];
    return favorites.includes(courseId);
  },
  
  // 获取收藏列表
  getFavorites: function() {
    let favorites = wx.getStorageSync('favorites') || [];
    return this.globalData.courseList.filter(item => favorites.includes(item.id));
  },
  
  // 添加浏览历史
  addHistory: function(courseId) {
    let history = wx.getStorageSync('history') || [];
    // 如果已存在，先移除旧记录
    const index = history.indexOf(courseId);
    if (index > -1) {
      history.splice(index, 1);
    }
    // 添加到列表开头
    history.unshift(courseId);
    // 最多保存50条历史记录
    if (history.length > 50) {
      history = history.slice(0, 50);
    }
    wx.setStorageSync('history', history);
  },
  
  // 获取浏览历史
  getHistory: function() {
    let history = wx.getStorageSync('history') || [];
    return history.map(id => this.getCourseDetail(id)).filter(item => item);
  },

  // 添加购物车
  addToCart: function(courseId) {
    let cart = wx.getStorageSync('cart') || [];
    if (!cart.includes(courseId)) {
      cart.push(courseId);
      wx.setStorageSync('cart', cart);
    }
  },
  
  // 从购物车移除
  removeFromCart: function(courseId) {
    let cart = wx.getStorageSync('cart') || [];
    const index = cart.indexOf(courseId);
    if (index > -1) {
      cart.splice(index, 1);
      wx.setStorageSync('cart', cart);
    }
  },
  
  // 获取购物车列表
  getCart: function() {
    let cart = wx.getStorageSync('cart') || [];
    return cart.map(id => this.getCourseDetail(id)).filter(item => item);
  }
});