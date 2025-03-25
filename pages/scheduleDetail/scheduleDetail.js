Page({
  data: {
    defaultDate: '',
    startTime: '00:00',
    endTime: '00:00'
  },

  onLoad: function(options) {
    const today = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' });
    this.setData({
      defaultDate: today
    });
  },

  bindStartTimeChange: function(event) {
    this.setData({
      startTime: event.detail.value
    });
  },

  bindEndTimeChange: function(event) {
    this.setData({
      endTime: event.detail.value
    });
  },

  saveSchedule: function(event) {
    const { title, startTime, endTime, location, notes } = event.detail.value;
    // 将输入的时间转换为北京时间
    const today = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const beijingStartTime = new Date(`${today} ${startTime}`).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
    const beijingEndTime = new Date(`${today} ${endTime}`).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
    const schedule = { id: Date.now(), title, startTime: beijingStartTime, endTime: beijingEndTime, location, notes };
    const schedules = wx.getStorageSync('schedules') || [];
    schedules.push(schedule);
    wx.setStorageSync('schedules', schedules);
    wx.navigateBack({
      success: function() {
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 1];
        prevPage.loadSchedules();
      }
    });
  }
});