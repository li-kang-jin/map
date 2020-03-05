
import { request } from "../../request/index.js";
import { login} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 async handleGetUserInFo(e){
    const { encryptedData, iv, rawData, signature } = e.detail;
   const { code } = await login();
   const loginParams = { encryptedData, iv, rawData, signature, code}
  //  const token = await request({
  //    url: '',
  //    data: loginParams,
  //    method: 'post',
  //  })
   
   wx.setStorageSync("token", token);
   wx.navigateBack({
     dalta:1
   })
   return
  },
  
})