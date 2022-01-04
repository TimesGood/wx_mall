// pages/cart/index.js
//引入写好的工具类
import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    //点击收货地址
    handleChooseAddress(){
        wx.chooseAddress({
          success: (result) => {
              //把获取的地址存储与缓存中
              result.all = result.provinceName+result.cityName+result.countyName+result.detailInfo
              wx.setStorageSync('address', result)
          },
        })
    },
    // 点击单选
    handleItemChange(e){
        const goods_id = e.currentTarget.dataset.goods_id
        let cart = this.data.cart
        let index = cart.findIndex(v => v.goods_id===goods_id)
        cart[index].checked = !cart[index].checked
        this.setCart(cart)
    },
    // 点击数量
    handlerNum(e){
        const goods_id = e.currentTarget.dataset.goods_id
        const num = e.currentTarget.dataset.num
        let cart = this.data.cart
        let index = cart.findIndex(v => v.goods_id === goods_id)
        if(cart[index].num === 1 && num ===-1) {
            wx.showModal({
                title: '确认删除',
                content: '是否删除该商品',
                cancelColor: 'cancelColor',
                success: (res) => {
                    if(res.confirm) {
                        cart.splice(index,1)
                        this.setCart(cart)
                    }else if(res.cancel){
                    }
                }
            })
        }else{
             cart[index].num += num
        }
        this.setCart(cart)
        
    },
    //设置购物车状态
    setCart(cart){
        let allChecked = true
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            if(v.checked){
                totalPrice+=v.goods_price*v.num
                totalNum+=v.num
            }else{
                allChecked = false 
            }
        })
        allChecked = cart.length?allChecked:false
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum,
        })
        wx.setStorageSync('cart', cart)
    },
    // 点击全选
    handleAllChecked(){
        const cart = this.data.cart
        cart.forEach(v => v.checked = !this.data.allChecked)
        this.setCart(cart)
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //获取缓存中的地址给address赋值
        const address = wx.getStorageSync('address');
        //获取缓存中的购物车数组，||[] 表示当||左边为空时，返回右边的值
        const cart = wx.getStorageSync('cart') || [];
        this.setCart(cart)
        this.setData({
            address
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})