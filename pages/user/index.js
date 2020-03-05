// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collextNums:0
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync('collect') || [];
    console.log(collect.length)
    this.setData({
      userInfo, collextNums: collect.length
    })
  }
  
})