// pages/goods_list/index.js
import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value:"综合",
        isActive:true
      }, {
        id: 1,
        value: "销量",
        isActive: false
      }, {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goods_list:[]
  },

QueryParams:{
  query:"",
  cid:"",
  pagenum:1,
  pagesize:10
},
totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.QueryParams.cid = options.cid;
   this.getGoodsList();
  },
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    const total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    console.log(res)
  
    this.setData({
      goods_list: [...this.data.goods_list, ...res.goods]
    })
    
  },
  onReachBottom(){
   if(this.QueryParams.pagenum>=this.totalPages){
    wx.showToast({
      title: '没有了',
    })
   }else{
     this.QueryParams.pagenum++;
     this.getGoodsList();
   }  
  },
  onPullDownRefresh(){
     this.setData({
       goods_list:[],
     })
    this.getGoodsList();
  },
  handleTabschange(e){
    //console.log(e)
    const { index } = e.detail;
   // console.log(index)
    const {tabs} = this.data;
    //console.log(tabs)
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})