// 获取应用实例
const app = getApp();

Page({
  data: {
    companyInfo: {
      name: '雷叔智能科技有限公司',
      founded: '2019年',
      location: '北京市海淀区科技园区88号雷叔智能大厦',
      mission: '用人工智能技术赋能产业升级，为企业和社会创造智能化未来。',
      vision: '成为人工智能技术与行业应用深度融合的引领者。',
      values: [
        '创新驱动：持续探索前沿技术，推动AI应用创新',
        '行业赋能：深入理解行业需求，用AI技术解决实际问题',
        '用户价值：以用户体验为中心，创造实用且易用的AI产品',
        '开放协作：积极拥抱开源社区，促进AI技术生态发展'
      ]
    },
    milestones: [
      {
        year: '2019',
        title: '公司成立',
        description: '雷叔智能科技有限公司在北京成立，专注于AI技术研发与应用'
      },
      {
        year: '2020',
        title: '首轮融资',
        description: '获得A轮1亿元融资，加速技术研发和团队建设'
      },
      {
        year: '2021',
        title: '核心技术突破',
        description: '自研大模型取得突破，达到行业领先水平'
      },
      {
        year: '2022',
        title: '产品矩阵形成',
        description: '形成覆盖多个行业的AI解决方案体系'
      },
      {
        year: '2023',
        title: '规模化落地',
        description: '产品服务在金融、零售、制造等多个行业规模化落地'
      },
      {
        year: '2024',
        title: '全面升级',
        description: '产品全面升级，融合大模型技术，强化行业解决方案'
      }
    ],
    team: [
      {
        name: '李雷',
        title: '创始人兼CEO',
        avatar: '/images/team1.png',
        background: '前微软AI研究院首席科学家，人工智能领域顶尖专家'
      },
      {
        name: '王芳',
        title: '技术副总裁',
        avatar: '/images/team2.png',
        background: '前谷歌深度学习团队负责人，机器学习算法专家'
      },
      {
        name: '张伟',
        title: '产品副总裁',
        avatar: '/images/team3.png',
        background: '前阿里巴巴智能产品部总监，拥有丰富的AI产品经验'
      },
      {
        name: '赵强',
        title: '商务副总裁',
        avatar: '/images/team4.png',
        background: '前IBM大客户总监，拥有20年企业服务经验'
      }
    ],
    honors: [
      {
        title: '国家高新技术企业',
        year: '2020'
      },
      {
        title: '中关村高成长企业TOP100',
        year: '2021'
      },
      {
        title: '人工智能行业最具影响力企业',
        year: '2022'
      },
      {
        title: '科技创新示范企业',
        year: '2023'
      },
      {
        title: '年度最佳AI创新应用奖',
        year: '2023'
      },
      {
        title: '中国AI企业50强',
        year: '2024'
      }
    ],
    contactInfo: {
      address: '北京市海淀区科技园区88号雷叔智能大厦',
      phone: '400-123-4567',
      email: 'contact@leishu.ai',
      website: 'www.leishu.ai'
    }
  },
  
  onLoad: function() {
    // 页面加载时执行
  },
  
  onShow: function() {
    // 更新底部导航栏选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3  // 底部导航栏中"关于"的索引
      });
    }
  },
  
  // 复制联系方式
  copyContact: function(e) {
    const type = e.currentTarget.dataset.type;
    let content = '';
    
    switch(type) {
      case 'phone':
        content = this.data.contactInfo.phone;
        break;
      case 'email':
        content = this.data.contactInfo.email;
        break;
      case 'address':
        content = this.data.contactInfo.address;
        break;
      case 'website':
        content = this.data.contactInfo.website;
        break;
    }
    
    wx.setClipboardData({
      data: content,
      success: function() {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        });
      }
    });
  },
  
  // 拨打电话
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.contactInfo.phone.replace(/-/g, '')
    });
  }
}); 