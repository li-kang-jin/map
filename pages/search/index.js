import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inpValue:""
  },
  TimeId:-1,

  handleInput(e){
    const { value } = e.detail
    //trim() 方法用于删除字符串的头尾空格。 trim() 方法不会改变原始字符串。
    if(!value.trim()){
     this.setData({
       goods: [],
       isFocus:false
     })
     return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId)
    this.TimeId= setTimeout(()=>{
      this.qsearch(value)
    },1000)
   
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  },
 async qsearch(quest){
   const res = await request({ url: "/goods/search", data: { quest}})
   this.setData({
    goods:res
   })
  } 
})