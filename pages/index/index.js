import { request } from "../../request/index.js"

//Page Object
Page({
  data: {
   swiperList:[],
   catesList:[],
   getfloordataList:[],

  },
  //options(Object)
  onLoad: function(options) {
   this.getSwiperList();
   this.getCateList();
    this.getfloordataList();
   
  },
  //轮播图
  getSwiperList(){
    request({ url: '/home/swiperdata' }).then(
      //https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata
      result => {
        this.setData({
          swiperList: result
        })
      });
  },
  //导航栏
  getCateList() {
    request({ url: '/home/catitems' }).then(
      result => {
        this.setData({
          catesList: result
        })
      });
  },
//地板
  getfloordataList() {
    request({ url: '/home/floordata' }).then(
      result => {
        this.setData({
          getfloordataList: result
        })
      });
  },
 
});
  