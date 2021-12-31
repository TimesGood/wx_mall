//将微信原生请求修改为Promise请求
/*
    为什么使用Promise？
        涉及到一个场景：当请求有两个或两个以上时，并且其中一个请求所需要的参数是上一个请求返回的值时，
        如果网速稍慢就会陷入等待，如果其后的请求也是需要前一个请求的返回值作为参数
        那我们的代码就变成一场灾难，请求与请求的嵌套太多，也就是陷入了回调地狱，所以需要使用Promise来解决这个问题
*/
// 同时发送异步代码的次数，用于控制同时请求时当最后一个请求回来才关闭loading
let ajaxTimes = 0
export const request=(params)=>{
    ajaxTimes++
    //显示加载中
    wx.showLoading({
        title: "加载中...",
        mask: true
    })
    //定义baseurl
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
          ...params,
          url: baseUrl+params.url,
          //成功回调
          success:(result)=>{
              resolve(result.data.message)
          },
          //失败回调
          fail:(err)=>{
              reject(err)
          },
          complete:() => {
              ajaxTimes--
              if(ajaxTimes === 0){
                  wx.hideLoading();
              }
          }
        })
    })
}