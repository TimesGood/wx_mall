// 获取权限状态,只会显示小程序向用户请求过的权限
export const getSetting=()=>{
    return new Promise((resolve,reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
//获取地址
export const chooseAddress=()=>{
    return new Promise((resolve,reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
//打开授权界面,该界面只会显示小程序向用户请求过的权限
export const openSetting=()=>{
    return new Promise((resolve,reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}