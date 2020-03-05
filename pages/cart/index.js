import { getSetting, chooseAddress, openSetting, showModal, showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync("cart")||[];
    // const allChecked = cart.length?cart.every(v => v.checked):false;
    // console.log(cart)
    this.setData({ address})
    this.setCart(cart)
  },
  //复选框按钮
  handeItemChange(e){
   let goods_id =  e.currentTarget.dataset.id;
   let {cart} = this.data;
   const index = cart.findIndex(v=>v.goods_id===goods_id)
   cart[index].checked=!cart[index].checked;
   this.setCart(cart)
  
  },
  //全选框
  handleItemAllCheck(){
    let { cart, allChecked}=this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart)
  },
  //加减购物数量
 async handleItemNumEdit(e){
    let { id, operation } = e.currentTarget.dataset;
    let {cart}=this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if (cart[index].num === 1 && operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '是否要删除',
      //   success:(res)=> {
      //     if (res.confirm) {
      //       // console.log("hello")
      //       // console.log(cart, index)
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      let res = await showModal({ content:'是否要删除'});
      if (res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
      console.log(res)
    }else{
      cart[index].num += operation;
      this.setCart(cart)
    }
    
  },
  //结算
async handlePay(){
  let { address, totalNum} = this.data;
    if (!address.userName){
      //showToast
  await showToast({title:"没写地址了啊"});
   return;
    };
  if (totalNum===0){
    await showToast({ title: "没有购物信息" });
    return;
  } 
  wx.navigateTo({
    url: '/pages/pay/index',
  })
  },
 //封装购物车状态
 setCart(cart){
   let allChecked = true;
   let totalPrice = 0;
   let totalNum = 0;
   cart.forEach(v => {
     if (v.checked) {
       totalPrice += v.num * v.goods_price;
       totalNum += v.num
     } else {
       allChecked = false
     }
     allChecked = cart.length != 0 ? allChecked : false;
   })
   this.setData({
     cart,
     allChecked,
     totalPrice,
     totalNum
   })
   wx.setStorageSync('cart', cart)
 },
 //点击收货地址按钮
 async handleChooseAddress(){
   
    // authSetting  scope.address
  //   wx.getSetting({
  //      success:(result)=>{
  //        const scopeAddress = result.authSetting["scope.address"]
  //        if (scopeAddress === true || scopeAddress===undefined){
  //       获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
  //           wx.chooseAddress({
  //             success:(result1)=>{
  //               console.log(result1)
  //             }
  //           })
  //        }else{
  //          wx.openSetting({
  //            success:(result2)=>{
  //              wx.chooseAddress({
  //                success: (result3) => {
  //                  console.log(result3)
  //                }
  //              })
  //            }
  //          })
  //        }
  //      }
  //   })
  // }
  try{
    const res1 = await getSetting();
    //console.log(res1)
    const scopeAddress = res1.authSetting["scope.address"];
    // console.log(scopeAddress)
    //或if(scopeAddress=false){ await openSetting();}const res2 = await chooseAddress();
    // if (scopeAddress === true || scopeAddress === undefined) {
      
    //   //  console.log("hello")
    //   const res2 = await chooseAddress();
    //   console.log(res2)
    // } else {
    //   await openSetting();
    //   const res2 = await chooseAddress();
    //   console.log(res2)
    // }
    if (scopeAddress===false){
      await openSetting();
    }
    const address = await chooseAddress();
  address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
   // console.log(address)
    wx.setStorageSync('address',address)
  }catch(error){
    console.log(error)
    }
  
}

})