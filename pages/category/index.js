// pages/category/index.js
import {request} from '../../request/index.js';
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent: [],
    currentIndex:0,
    scrollTop:0,
  },
  Cates:[],

  handleItemTap(e){ 
    let {index} = e.target.dataset;
    const rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    console.log(Cates.time)
    if(!Cates){
      this.categorieslist()
    }else{
      if(Date.now() - Cates.time > 15565676779*3){
        this.categorieslist();
      }else{
        console.log("旧数据")
        console.log(Cates.time)
       this.Cates = Cates.data;
        const leftMenuList = this.Cates.map(v => v.cat_name);
        const rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
 
  },

  categorieslist() {
    request({ url: '/categories' }).then(
      result => {
        this.Cates = result;
       
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
        const leftMenuList = this.Cates.map(v => v.cat_name);
        const rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent,
          
        })
      });
  },
  
})