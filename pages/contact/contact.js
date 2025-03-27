// 获取应用实例
const app = getApp();

Page({
  data: {
    contactInfo: {
      address: '北京市海淀区科技园区88号雷叔智能大厦',
      phone: '400-123-4567',
      email: 'contact@leishu.ai',
      website: 'www.leishu.ai',
      weixin: 'leishuzhineng',
      location: {
        latitude: 39.9,
        longitude: 116.4,
        name: '雷叔智能科技有限公司'
      }
    },
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
    }],
    // 表单数据
    feedbackForm: {
      name: '',
      phone: '',
      email: '',
      company: '',
      content: ''
    },
    formValid: false
  },
  
  onLoad: function() {
    // 页面加载时执行
  },
  
  onShow: function() {
    // 更新底部导航栏选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3  // 底部导航栏中"联系"的索引
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
      case 'weixin':
        content = this.data.contactInfo.weixin;
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
  },
  
  // 导航到公司
  openLocation: function() {
    const location = this.data.contactInfo.location;
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      address: this.data.contactInfo.address,
      scale: 18
    });
  },
  
  // 表单输入处理
  inputChange: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    let feedbackForm = this.data.feedbackForm;
    feedbackForm[field] = value;
    
    // 检查表单是否有效
    const formValid = feedbackForm.name && feedbackForm.phone && feedbackForm.content;
    
    this.setData({
      feedbackForm: feedbackForm,
      formValid: formValid
    });
  },
  
  // 提交表单
  submitForm: function() {
    if (!this.data.formValid) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none'
      });
      return;
    }
    
    // 这里可以添加表单提交到服务器的逻辑
    
    // 模拟提交成功
    wx.showLoading({
      title: '提交中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      
      // 重置表单
      this.setData({
        feedbackForm: {
          name: '',
          phone: '',
          email: '',
          company: '',
          content: ''
        },
        formValid: false
      });
    }, 1500);
  }
}); 