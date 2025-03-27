// 获取应用实例
const app = getApp();

Page({
  data: {
    // 动态类型分类
    categories: ['全部', '公司新闻', '行业资讯', '技术动态', '产品更新'],
    currentCategory: '全部',
    
    // 分页相关数据
    page: 1,
    pageSize: 10,
    hasMore: true,
    
    // 动态列表数据
    newsList: [
      {
        id: 1,
        title: '雷叔智能完成B轮融资，估值突破10亿元',
        category: '公司新闻',
        cover: '/images/news1.jpg',
        date: '2024-05-15',
        summary: '近日，雷叔智能科技有限公司宣布完成B轮融资，融资金额3亿元，估值突破10亿元，本轮融资由金石资本领投，老股东持续跟投。',
        views: 1528,
        likes: 356,
        isTop: true
      },
      {
        id: 2,
        title: '雷叔智能与某国有银行达成战略合作，打造智能金融服务新模式',
        category: '公司新闻',
        cover: '/images/news2.jpg',
        date: '2024-05-10',
        summary: '雷叔智能与某国有大型银行正式签署战略合作协议，双方将在智能客服、风控模型、营销推荐等多个场景展开深度合作。',
        views: 1245,
        likes: 289,
        isTop: true
      },
      {
        id: 3,
        title: '2024年AI大模型技术发展趋势分析',
        category: '行业资讯',
        cover: '/images/news3.jpg',
        date: '2024-05-08',
        summary: '随着大模型技术的快速发展，2024年AI领域将迎来哪些新变化？本文从技术架构、商业模式和应用场景三个维度进行深入分析。',
        views: 986,
        likes: 235,
        isTop: false
      },
      {
        id: 4,
        title: '雷叔智能自研对话大模型LeishuGPT-4.0正式发布',
        category: '技术动态',
        cover: '/images/news4.jpg',
        date: '2024-05-05',
        summary: '经过一年的技术攻关，雷叔智能自研对话大模型LeishuGPT-4.0正式发布，在中文理解、逻辑推理、知识应用等方面均取得突破性进展。',
        views: 1742,
        likes: 467,
        isTop: true
      },
      {
        id: 5,
        title: '雷叔智能"智慧零售解决方案"全面升级',
        category: '产品更新',
        cover: '/images/news5.jpg',
        date: '2024-05-01',
        summary: '雷叔智能"智慧零售解决方案"2.0版本正式发布，全面升级消费者画像、个性化推荐、智能客服和库存管理四大核心模块。',
        views: 867,
        likes: 198,
        isTop: false
      },
      {
        id: 6,
        title: '人工智能在制造业的应用与挑战',
        category: '行业资讯',
        cover: '/images/news6.jpg',
        date: '2024-04-28',
        summary: '随着智能制造浪潮的兴起，人工智能技术在制造业领域的应用日益广泛，但同时也面临着哪些挑战？本文将为您详细剖析。',
        views: 765,
        likes: 156,
        isTop: false
      },
      {
        id: 7,
        title: '雷叔智能荣获"2024年度最具创新力AI企业"奖项',
        category: '公司新闻',
        cover: '/images/news7.jpg',
        date: '2024-04-25',
        summary: '在日前举办的"2024中国人工智能产业峰会"上，雷叔智能凭借在技术创新和产业应用方面的突出表现，荣获"年度最具创新力AI企业"奖项。',
        views: 1056,
        likes: 278,
        isTop: false
      },
      {
        id: 8,
        title: '多模态大模型技术原理与应用场景解析',
        category: '技术动态',
        cover: '/images/news8.jpg',
        date: '2024-04-20',
        summary: '多模态大模型成为当前AI领域的研究热点，本文深入浅出地介绍多模态大模型的技术原理，并结合典型案例分析其应用场景。',
        views: 1352,
        likes: 342,
        isTop: false
      },
      {
        id: 9,
        title: '雷叔智能与某知名高校共建"AI应用研究联合实验室"',
        category: '公司新闻',
        cover: '/images/news9.jpg',
        date: '2024-04-15',
        summary: '雷叔智能与某国内知名高校计算机学院签署合作协议，共建"AI应用研究联合实验室"，围绕大模型、知识图谱、智能决策等方向开展深度研究。',
        views: 876,
        likes: 213,
        isTop: false
      },
      {
        id: 10,
        title: '雷叔智能发布企业级知识库管理产品"智知"',
        category: '产品更新',
        cover: '/images/news10.jpg',
        date: '2024-04-10',
        summary: '雷叔智能正式发布企业级知识库管理产品"智知"，该产品结合大模型与知识图谱技术，可高效管理企业非结构化数据，提升知识共享与应用效率。',
        views: 934,
        likes: 245,
        isTop: false
      }
    ],
    
    // 筛选后的动态列表
    filteredNewsList: []
  },
  
  onLoad: function() {
    // 初始化时默认显示所有动态
    this.filterNews('全部');
  },
  
  onShow: function() {
    // 更新tabbar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3  // 假设动态页面在tabbar中的索引为3
      });
    }
  },
  
  // 切换分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      page: 1,
      hasMore: true
    });
    this.filterNews(category);
  },
  
  // 根据分类筛选动态
  filterNews: function(category) {
    let filteredList = [];
    
    if (category === '全部') {
      filteredList = this.data.newsList;
    } else {
      filteredList = this.data.newsList.filter(item => item.category === category);
    }
    
    // 先按置顶排序，再按日期排序
    filteredList.sort((a, b) => {
      if (a.isTop !== b.isTop) {
        return b.isTop ? 1 : -1;
      }
      return new Date(b.date) - new Date(a.date);
    });
    
    // 分页处理
    const start = 0;
    const end = this.data.page * this.data.pageSize;
    const pageData = filteredList.slice(start, end);
    
    this.setData({
      filteredNewsList: pageData,
      hasMore: pageData.length < filteredList.length
    });
  },
  
  // 加载更多
  loadMore: function() {
    if (!this.data.hasMore) return;
    
    const nextPage = this.data.page + 1;
    this.setData({
      page: nextPage
    });
    
    this.filterNews(this.data.currentCategory);
  },
  
  // 查看动态详情
  goToNewsDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/detail/detail?id=' + id
    });
  },
  
  // 点赞动态
  likeNews: function(e) {
    const id = e.currentTarget.dataset.id;
    const newsList = this.data.newsList;
    const index = newsList.findIndex(item => item.id === id);
    
    if (index !== -1) {
      // 更新点赞数
      const updatedList = [...newsList];
      updatedList[index].likes += 1;
      
      this.setData({
        newsList: updatedList
      });
      
      // 重新筛选并显示
      this.filterNews(this.data.currentCategory);
      
      wx.showToast({
        title: '点赞成功',
        icon: 'success'
      });
    }
  },
  
  // 下拉刷新
  onPullDownRefresh: function() {
    // 重置分页并刷新数据
    this.setData({
      page: 1,
      hasMore: true
    });
    
    this.filterNews(this.data.currentCategory);
    wx.stopPullDownRefresh();
  },
  
  // 触底加载更多
  onReachBottom: function() {
    this.loadMore();
  }
}); 