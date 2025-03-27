// 获取应用实例
const app = getApp();

Page({
  data: {
    banners: [], // 轮播图数据
    advantages: [
      {
        id: 1,
        title: '技术领先',
        description: '拥有行业领先的AI技术栈，包括大模型、计算机视觉和自然语言处理',
        icon: '/images/tech.png'
      },
      {
        id: 2,
        title: '专业团队',
        description: '由AI领域资深专家组成的研发团队，平均拥有10年以上行业经验',
        icon: '/images/team.png'
      },
      {
        id: 3,
        title: '定制方案',
        description: '根据客户需求提供个性化解决方案，确保最佳效果和用户体验',
        icon: '/images/solution.png'
      },
      {
        id: 4,
        title: '全程服务',
        description: '从需求分析到部署实施，再到售后维护，提供全生命周期服务',
        icon: '/images/service.png'
      }
    ],
    services: [
      {
        id: 1,
        title: '智能客服系统',
        brief: '基于大模型的智能客服解决方案，提升客户体验，降低运营成本',
        image: '/images/service_chat.png'
      },
      {
        id: 2,
        title: '智能数据分析',
        brief: '利用AI技术对企业数据进行深度挖掘，提供决策支持',
        image: '/images/service_data.png'
      },
      {
        id: 3,
        title: '智慧安防系统',
        brief: '基于计算机视觉的安防监控系统，实时检测异常行为',
        image: '/images/service_security.png'
      },
      {
        id: 4,
        title: '企业知识库构建',
        brief: '帮助企业沉淀和管理知识资产，提高信息流通效率',
        image: '/images/service_knowledge.png'
      }
    ],
    cases: [
      {
        id: 1,
        title: '某国有银行智能网点改造项目',
        client: '某国有银行',
        tags: ['金融', '智能客服', '流程优化'],
        coverImage: '/images/case_bank.png'
      },
      {
        id: 2,
        title: '某电商平台用户画像系统',
        client: '某电商平台',
        tags: ['电商', '用户画像', '精准营销'],
        coverImage: '/images/case_ecommerce.png'
      },
      {
        id: 3,
        title: '某工业园区智能监控系统',
        client: '某工业园区',
        tags: ['工业', '安防监控', '异常检测'],
        coverImage: '/images/case_industry.png'
      }
    ],
    partners: [
      { id: 1, logo: '/images/partner1.png' },
      { id: 2, logo: '/images/partner2.png' },
      { id: 3, logo: '/images/partner3.png' },
      { id: 4, logo: '/images/partner4.png' },
      { id: 5, logo: '/images/partner5.png' },
      { id: 6, logo: '/images/partner6.png' }
    ],
    markers: [{
      id: 1,
      latitude: 39.9,
      longitude: 116.4,
      name: '雷叔智能科技有限公司',
      callout: {
        content: '雷叔智能科技有限公司',
        color: '#000000',
        fontSize: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
        display: 'ALWAYS'
      }
    }]
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
    this.initData();
    wx.stopPullDownRefresh();
  },

  // 初始化数据
  initData: function() {
    // 获取轮播图数据
    this.setBanners();
  },

  // 设置轮播图数据
  setBanners: function() {
    // 模拟轮播图数据
    const banners = [
      {
        id: 1,
        title: '雷叔智能科技 - 引领AI创新',
        image: '/images/banner1.png',
        type: 'about'
      },
      {
        id: 2,
        title: '智能客服解决方案',
        image: '/images/banner2.png',
        type: 'service'
      },
      {
        id: 3,
        title: '某国有银行智能网点改造案例',
        image: '/images/banner3.png',
        type: 'case'
      }
    ];

    this.setData({
      banners: banners
    });
  },

  // 跳转到详情页
  navigateToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    const type = e.currentTarget.dataset.type;
    
    if (type === 'about') {
      wx.navigateTo({
        url: '/pages/about/about'
      });
    } else if (type === 'service') {
      wx.navigateTo({
        url: '/pages/article/article?id=' + id + '&type=service'
      });
    } else if (type === 'case') {
      wx.navigateTo({
        url: '/pages/article/article?id=' + id + '&type=case'
      });
    }
  },

  // 跳转到搜索页
  navigateToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 跳转到关于页面
  navigateToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 跳转到服务页面
  navigateToServices: function() {
    wx.switchTab({
      url: '/pages/services/services'
    });
  },

  // 跳转到案例页面
  navigateToCases: function() {
    wx.switchTab({
      url: '/pages/cases/cases'
    });
  },

  // 跳转到服务详情
  navigateToServiceDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id + '&type=service'
    });
  },

  // 跳转到案例详情
  navigateToCaseDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id + '&type=case'
    });
  }
});