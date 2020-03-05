import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      }, {
        id: 1,
        value: "待付款",
        isActive: false
      }, {
        id: 2,
        value: "待发货",
        isActive: false
      }, {
        id: 3,
        value: "退款/退货",
        isActive: false
      }]
  },
 onShow(){
   
  const pages =  getCurrentPages()
  const currentPages = pages[pages.length-1];
  //console.log(currentPages.options)
   const { type } = currentPages.options;
  this.changetobb(type-1)
   this.getOrders()
 },
async getOrders(type){
  let res = await request({ url: "/my/orders/all", data: {type}})
  console.log(res)
},
  changetobb(index){
    const { tabs } = this.data;
    //console.log(tabs)
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
    handleTabschange(e){
      //console.log(e)
      const { index } = e.detail;
      // console.log(index)
      this.changetobb(index)
  },

  
})