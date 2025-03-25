Page({
  data: {
    isDayView: true,
    schedules: [],
    weekSchedules: {}
  },

  onLoad: function() {
    this.loadSchedules();
  },

  loadSchedules: function() {
    const schedules = wx.getStorageSync('schedules') || [];
    // 按开始时间排序，并将时间转换为北京时间
    schedules.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    schedules.forEach(schedule => {
      schedule.startTime = new Date(schedule.startTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
      schedule.endTime = new Date(schedule.endTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    });

    // 将日程按周几分类
    const weekSchedules = {
      '周一': [],
      '周二': [],
      '周三': [],
      '周四': [],
      '周五': [],
      '周六': [],
      '周日': []
    };

    schedules.forEach(schedule => {
      const dayOfWeek = new Date(schedule.startTime).getDay();
      const dayName = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][dayOfWeek];
      weekSchedules[dayName].push(schedule);
    });

    this.setData({ schedules, weekSchedules });
  },

  switchToDayView: function() {
    this.setData({ isDayView: true });
  },

  switchToWeekView: function() {
    this.setData({ isDayView: false });
  },

  addSchedule: function() {
    wx.navigateTo({
      url: '/pages/scheduleDetail/scheduleDetail'
    });
  },

  deleteSchedule: function(event) {
    const id = event.currentTarget.dataset.id;
    const schedules = this.data.schedules.filter(schedule => schedule.id !== id);
    wx.setStorageSync('schedules', schedules);
    this.setData({ schedules });
  },

  viewScheduleDetail: function(event) {
    const id = event.currentTarget.dataset.id;
    const schedule = this.data.schedules.find(schedule => schedule.id === id);
    wx.navigateTo({
      url: `/pages/scheduleDetail/scheduleDetail?id=${id}`
    });
  }
});