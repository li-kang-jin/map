// pages/feedback/index.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      }, {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal:""
  },
  UpLoadImgs:[], 
  //删除图片
  handleRemoveImg(e){

    const { index } = e.currentTarget.dataset;
    let { chooseImgs} =this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },
  //点击添加图片
  handleChooseImg(){
  wx.chooseImage({
    success: (res)=> {
    
      this.setData({
        chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
      })
    },
  })
  },
  
  handleTabschange(e) {
    //console.log(e)
    const { index } = e.detail;
    // console.log(index)
    const { tabs } = this.data;
    //console.log(tabs)
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //文本内容
  chendtext(e){
this.setData({
  textVal: e.detail.value
})
  },
  //点击提交
  handleFormSubmit(){
    let { textVal, chooseImgs} = this.data
    if (!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
      return;
    }
    chooseImgs.forEach((v,i)=>{
  //https://images.ac.cn/home/Index/UploadAction/
  wx.uploadFile({
    url: 'https://images.ac.cn/api/upload',
    filePath: 'v',
    name: 'file',
    success:(resule)=>{
      console.log(result)
    }
  })
    })
  }, 

})