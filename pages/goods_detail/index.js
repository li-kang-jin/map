import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false,
    goToBuy:{},
    cart: []
  },
  goodsInfo:{},
  //点击收藏
  handleCollect(){
    let isCollect=false;
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
     console.log(index)
    if(index!==-1){
      //该商品已收藏this.goodsInfo
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏成功',
        icon:"success",
        mask:true,
      })
    }else{
      collect.push(this.goodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: "success",
        mask: true,
      })
     
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  },
  //点击轮播图放大方法
  handlePrevewImage(e){
    const urls = this.goodsInfo.pics.map(v => v.pics_mid)
    // console.log(e)
    const current = e.currentTarget.dataset.urls
     wx.previewImage({
       current: current, // 当前显示图片的http链接
       urls: urls, // 需要预览的图片http链接列表
     })
  },
  //加入购物车
  handleCartAdd(){
   let cart = wx.getStorageSync("cart")||[];
   let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
   if(index===-1){
     this.goodsInfo.num=1;
     this.goodsInfo.checked=true;
     cart.push(this.goodsInfo)
   }else{
     cart[index].num++;
   };
   wx.setStorageSync("cart", cart)
   wx.showToast({
     title: '加入成功',
     icon:'success',
     mask:true 
   })
  },
  //买卖
  // goToBuy(){
  //   let cart = this.data.cart;
  //   let goodsInfo= this.goodsInfo
  //   goodsInfo.checked = true;
  //   cart.push(goodsInfo)
  //   this.setData({
  //     cart, 
  //   })
  //   wx.setStorageSync('cart', cart)
  
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options; 
    this.getgoodsDetail(goods_id);
  },
  async getgoodsDetail(goods_id){
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id}});
    this.goodsInfo = goodsObj;
    //获取缓存中商品收藏的数组
    let collect = wx.getStorageSync("collect")||[];
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics
      },
      isCollect,
    })
 }
  
})