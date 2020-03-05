import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js'
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync("cart") || [];
    console.log(cart.checked)
    cart = cart.filter(v=>v.checked)
    this.setData({ address });
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum, address
    })
   // wx.setStorageSync('cart', cart)
  },
  //点击支付
 async handleOrderPay(){
  const token=wx.getStorageSync('token')
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/index',
    });
    //准备请求头参数
    const header = {Autorization:token};
     //准备请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderParams = { order_price, consignee_addr, goods};
    //准备发送请求 创建订单
    const res = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data:orderParams,header:header})
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
    })
  }
  },
  

})