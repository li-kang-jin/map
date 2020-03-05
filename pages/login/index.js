// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//获取信息
  handleGetbindgetuserinfo(e){
    const { userInfo } = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta:1
    })
  }
})