// 获取应用实例
const app = getApp();

Page({
  data: {
    categories: [
      { id: 'all', name: '全部案例' },
      { id: 'finance', name: '金融行业' },
      { id: 'retail', name: '零售行业' },
      { id: 'manufacturing', name: '制造业' },
      { id: 'government', name: '政府机构' },
      { id: 'education', name: '教育行业' },
      { id: 'medical', name: '医疗健康' }
    ],
    currentCategory: 'all',
    cases: [
      {
        id: 1,
        title: '某国有银行智能网点改造项目',
        coverImage: '/images/case_bank.png',
        category: 'finance',
        client: '某国有银行',
        date: '2023-12',
        tags: ['金融', '智能客服', '流程优化'],
        description: '为某国有银行打造全方位智能网点解决方案，通过AI语音助手、智能导诊、远程视频坐席等技术手段，全面提升银行网点服务效率和客户体验。',
        challenge: '传统银行网点面临客户等待时间长、业务办理效率低下、人力成本高等挑战，亟需数字化转型升级。',
        solution: [
          '智能导览机器人：根据客户需求快速分流引导',
          'AI智能客服：7x24小时解答客户常见问题',
          '智能填单系统：通过OCR技术自动识别证件信息',
          '远程专家服务：复杂业务远程视频连线专家处理',
          '数据分析系统：实时监控网点运营情况并提供优化建议'
        ],
        results: [
          '客户等待时间减少45%',
          '业务处理效率提升50%',
          '客户满意度提升32%',
          '人力成本降低25%'
        ],
        images: [
          '/images/case_bank_detail1.png',
          '/images/case_bank_detail2.png',
          '/images/case_bank_detail3.png'
        ]
      },
      {
        id: 2,
        title: '某电商平台用户画像系统',
        coverImage: '/images/case_ecommerce.png',
        category: 'retail',
        client: '某电商平台',
        date: '2023-10',
        tags: ['电商', '用户画像', '精准营销'],
        description: '基于用户行为数据和AI算法，为某大型电商平台构建精准用户画像系统，实现个性化推荐和精准营销，大幅提升转化率和用户留存率。',
        challenge: '海量用户数据难以有效利用，个性化推荐不精准，营销活动转化率低，用户留存率下降。',
        solution: [
          '多维用户特征抽取：从浏览、购买、收藏等行为提取用户兴趣特征',
          '实时画像更新：基于用户最新行为实时更新画像',
          '兴趣衰减模型：考虑用户兴趣随时间衰减的特性',
          '个性化推荐引擎：基于画像的多策略融合推荐算法',
          '营销自动化系统：针对不同用户群体的精准营销方案'
        ],
        results: [
          '商品推荐点击率提升65%',
          '营销活动转化率提升45%',
          '用户平均停留时间增加40%',
          '用户复购率提升32%'
        ],
        images: [
          '/images/case_ecommerce_detail1.png',
          '/images/case_ecommerce_detail2.png',
          '/images/case_ecommerce_detail3.png'
        ]
      },
      {
        id: 3,
        title: '某工业园区智能监控系统',
        coverImage: '/images/case_industry.png',
        category: 'manufacturing',
        client: '某工业园区',
        date: '2023-11',
        tags: ['工业', '安防监控', '异常检测'],
        description: '为某大型工业园区提供基于计算机视觉的智能监控解决方案，实现人员、车辆识别，安全隐患自动检测，提高园区安全管理水平。',
        challenge: '传统监控系统被动观看，无法主动发现安全隐患；大量摄像头难以全面监控；人工巡检效率低下。',
        solution: [
          '智能视频分析：基于深度学习的实时视频内容分析',
          '多目标检测跟踪：人员、车辆、设备等多目标实时检测与跟踪',
          '异常行为识别：闯入禁区、攀爬、异常聚集等行为自动识别',
          '安全隐患检测：危险物品、消防通道堵塞等自动检测',
          '集中管理平台：统一监控、报警联动、数据分析'
        ],
        results: [
          '安全事件发现率提升75%',
          '安全响应时间缩短65%',
          '安全事故发生率降低50%',
          '安保人力需求减少30%'
        ],
        images: [
          '/images/case_industry_detail1.png',
          '/images/case_industry_detail2.png',
          '/images/case_industry_detail3.png'
        ]
      },
      {
        id: 4,
        title: '某医疗集团智能辅助诊断系统',
        coverImage: '/images/case_medical.png',
        category: 'medical',
        client: '某医疗集团',
        date: '2023-09',
        tags: ['医疗', '辅助诊断', '影像识别'],
        description: '为某医疗集团开发基于深度学习的医学影像辅助诊断系统，覆盖胸部X光、CT等多种影像类型，提高诊断准确率和效率。',
        challenge: '医疗影像诊断工作量大，易受主观因素影响；优质医疗资源分配不均；基层医院诊断能力有限。',
        solution: [
          '多模态医学影像分析：支持X光、CT、MRI等多种影像类型',
          '病灶自动检测与分割：快速定位并标注可疑病灶',
          '诊断报告生成：自动生成初步诊断报告供医生参考',
          '远程会诊系统：基层医院与三甲医院专家远程协作',
          '医学知识图谱：提供相关病例参考和治疗方案建议'
        ],
        results: [
          '诊断准确率提升15%',
          '诊断时间平均缩短60%',
          '医生工作效率提升40%',
          '患者满意度提升35%'
        ],
        images: [
          '/images/case_medical_detail1.png',
          '/images/case_medical_detail2.png',
          '/images/case_medical_detail3.png'
        ]
      },
      {
        id: 5,
        title: '某教育机构个性化学习平台',
        coverImage: '/images/case_education.png',
        category: 'education',
        client: '某教育机构',
        date: '2023-08',
        tags: ['教育', '个性化学习', '智能教育'],
        description: '为某全国连锁教育机构打造智能化个性化学习平台，通过学习行为分析和自适应学习路径，提供因材施教的教育服务。',
        challenge: '传统教育模式难以满足不同学生的学习需求；教师无法精准把握每个学生的学习状态；缺乏科学的学习效果评估体系。',
        solution: [
          '学习行为分析：全面采集并分析学生的学习过程数据',
          '知识图谱构建：建立学科知识点关联网络',
          '能力评估模型：科学评估学生各知识点掌握程度',
          '自适应学习路径：为每个学生定制个性化学习计划',
          '智能题库推荐：根据学生薄弱点智能推荐练习题'
        ],
        results: [
          '学生学习效率提升45%',
          '知识点掌握程度提高38%',
          '学生学习积极性提升50%',
          '教师工作效率提升60%'
        ],
        images: [
          '/images/case_education_detail1.png',
          '/images/case_education_detail2.png',
          '/images/case_education_detail3.png'
        ]
      },
      {
        id: 6,
        title: '某政府部门智慧政务平台',
        coverImage: '/images/case_government.png',
        category: 'government',
        client: '某省级政府部门',
        date: '2023-07',
        tags: ['政务', '流程优化', '智能服务'],
        description: '为某省级政府部门打造智慧政务服务平台，通过流程再造和AI技术应用，提升政务服务效率和群众满意度。',
        challenge: '传统政务服务流程复杂、效率低；部门间数据壁垒严重；群众办事体验差；基层工作人员负担重。',
        solution: [
          '一站式服务平台：整合多部门业务，实现"一网通办"',
          '智能咨询机器人：7x24小时解答政策咨询',
          '智能表单系统：表单智能填写与校验',
          '业务流程优化：基于数据分析的流程再造',
          '智能审批辅助：辅助工作人员快速审核材料'
        ],
        results: [
          '办事环节平均减少60%',
          '办事时间平均缩短70%',
          '群众满意度提升45%',
          '基层工作人员工作量减少35%'
        ],
        images: [
          '/images/case_government_detail1.png',
          '/images/case_government_detail2.png',
          '/images/case_government_detail3.png'
        ]
      }
    ],
    filteredCases: []
  },

  onLoad: function() {
    this.filterCases('all');
  },

  // 页面显示时触发
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 // 选中案例页面
      });
    }
  },

  // 过滤案例
  filterCases: function(category) {
    let filtered = [];
    
    if (category === 'all') {
      filtered = this.data.cases;
    } else {
      filtered = this.data.cases.filter(item => item.category === category);
    }
    
    this.setData({
      currentCategory: category,
      filteredCases: filtered
    });
  },

  // 切换分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.id;
    this.filterCases(category);
  },

  // 跳转到案例详情
  navigateToCaseDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id + '&type=case'
    });
  }
}); 