// 获取应用实例
const app = getApp();

Page({
  data: {
    services: [
      {
        id: 1,
        title: '智能客服系统',
        category: '企业智能化',
        description: '基于大模型的智能客服解决方案，提升客户体验，降低运营成本。通过自然语言处理和知识图谱技术，实现智能问答、多轮对话、情感分析、自动总结等功能。',
        features: [
          '7x24小时无间断服务',
          '多轮对话理解能力',
          '知识库自动更新',
          '多渠道整合部署',
          '客户情绪分析'
        ],
        cases: [
          {
            id: 101,
            name: '某国有银行智能网点改造',
            result: '接入率提升45%，客户满意度提升32%'
          },
          {
            id: 102,
            name: '某电商平台客服系统升级',
            result: '人工客服效率提升60%，成本降低35%'
          }
        ],
        icon: '/images/service_chat.png',
        coverImage: '/images/service_detail1.png'
      },
      {
        id: 2,
        title: '智能数据分析',
        category: '数据智能',
        description: '利用AI技术对企业数据进行深度挖掘，提供决策支持。结合机器学习、统计分析和大数据技术，实现数据可视化、预测分析、异常检测、推荐系统等功能。',
        features: [
          '多源数据整合分析',
          '自动化报表生成',
          '趋势预测与预警',
          '个性化推荐算法',
          '深度学习模型'
        ],
        cases: [
          {
            id: 201,
            name: '某零售集团销售预测系统',
            result: '预测准确率达92%，库存优化30%'
          },
          {
            id: 202,
            name: '某制造企业生产优化方案',
            result: '生产效率提升28%，成本降低22%'
          }
        ],
        icon: '/images/service_data.png',
        coverImage: '/images/service_detail2.png'
      },
      {
        id: 3,
        title: '智慧安防系统',
        category: '视觉智能',
        description: '基于计算机视觉的安防监控系统，实时检测异常行为。利用深度学习、目标检测、行为识别等技术，实现人员识别、异常行为检测、环境监测等功能。',
        features: [
          '实时视频分析',
          '人脸识别与比对',
          '异常行为检测',
          '环境安全监测',
          '轨迹追踪分析'
        ],
        cases: [
          {
            id: 301,
            name: '某工业园区安防升级项目',
            result: '安全事件发现率提升75%，响应时间缩短65%'
          },
          {
            id: 302,
            name: '某商场智能监控系统',
            result: '可疑行为检出率达85%，误报率降低40%'
          }
        ],
        icon: '/images/service_security.png',
        coverImage: '/images/service_detail3.png'
      },
      {
        id: 4,
        title: '企业知识库构建',
        category: '企业智能化',
        description: '帮助企业沉淀和管理知识资产，提高信息流通效率。通过知识图谱、文本挖掘、智能搜索等技术，实现企业知识的结构化存储、智能检索和知识推送。',
        features: [
          '自动化知识抽取',
          '智能语义搜索',
          '知识关联推荐',
          '多形态知识整合',
          '权限精细化管理'
        ],
        cases: [
          {
            id: 401,
            name: '某集团企业知识库构建',
            result: '员工培训时间缩短60%，知识复用率提升250%'
          },
          {
            id: 402,
            name: '某研发中心技术文档管理',
            result: '研发效率提升40%，知识沉淀覆盖率达95%'
          }
        ],
        icon: '/images/service_knowledge.png',
        coverImage: '/images/service_detail4.png'
      },
      {
        id: 5,
        title: '智能办公助手',
        category: '企业智能化',
        description: '基于AI技术的企业办公自动化解决方案，提高日常工作效率。通过自然语言处理、流程自动化等技术，实现会议记录、日程管理、文档处理等功能。',
        features: [
          '智能会议助手',
          '自动化文档处理',
          '智能日程管理',
          '团队协作增强',
          '办公流程优化'
        ],
        cases: [
          {
            id: 501,
            name: '某企业智能办公升级',
            result: '员工工作效率提升35%，满意度提高48%'
          },
          {
            id: 502,
            name: '某政府部门流程再造',
            result: '业务处理时间缩短55%，纸质文档减少85%'
          }
        ],
        icon: '/images/service_office.png',
        coverImage: '/images/service_detail5.png'
      },
      {
        id: 6,
        title: 'AI定制开发',
        category: '技术服务',
        description: '根据企业特定需求，提供AI技术定制开发服务。涵盖算法研发、模型训练、系统集成、部署维护等全流程服务，满足企业个性化AI应用需求。',
        features: [
          '需求精准分析',
          '算法模型定制',
          '系统集成开发',
          '部署与维护',
          '技术培训支持'
        ],
        cases: [
          {
            id: 601,
            name: '某医疗机构AI诊断系统',
            result: '诊断效率提升50%，准确率达到98%'
          },
          {
            id: 602,
            name: '某农业企业智能种植系统',
            result: '产量提升28%，资源利用率提高40%'
          }
        ],
        icon: '/images/service_custom.png',
        coverImage: '/images/service_detail6.png'
      }
    ],
    categories: [
      { id: 'all', name: '全部服务' },
      { id: '企业智能化', name: '企业智能化' },
      { id: '数据智能', name: '数据智能' },
      { id: '视觉智能', name: '视觉智能' },
      { id: '技术服务', name: '技术服务' }
    ],
    currentCategory: 'all',
    filteredServices: []
  },

  onLoad: function() {
    this.setData({
      filteredServices: this.data.services
    });
  },

  // 页面显示时触发
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 选中服务页面
      });
    }
  },

  // 切换分类
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    let filtered = [];

    if (categoryId === 'all') {
      filtered = this.data.services;
    } else {
      filtered = this.data.services.filter(item => item.category === categoryId);
    }

    this.setData({
      currentCategory: categoryId,
      filteredServices: filtered
    });
  },

  // 跳转到服务详情
  navigateToServiceDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id + '&type=service'
    });
  }
}); 