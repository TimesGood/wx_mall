// pages/category/index.js
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //左侧菜单数据
        leftMenuList:[],
        //右边商品内容
        rightContent:[],
        //被点击的左侧菜单
        currentIndex:0,
        //右侧列表的顶部位置
        scrollTop:0
    },
    //储存接口的返回数据
    Cates:[],
    //左侧菜单的点击事件
    handleItemTap(e){
        const index = e.currentTarget.dataset.index
        this.setData({
            currentIndex:index,
            rightContent: this.Cates[index].children,
            scrollTop:0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
         /*
            0、web中的本地存储与小程序的本地存储的区别
                （1）写代码的方式不一样
                    web:存值：localStorage.setItem("key","value")  取值：localStorage.getItem("key")
                    小程序：存值：wx.setStorageSync("key","value")  取值：wx.getStorageSync("key")
                （2）存的时候有没有做类型转换
                    web:不管存入的是什么类型的数据，最终都会先调用toString方法ba数据以字符串形式存入
                    小程序：存入什么类型的值，就是什么类型的值
            1、请求前需判断一下本地存储有没有旧数据
            2、没有旧数据直接发送新请求
            3、有旧的数据并且旧数据没有过期，就直接使用旧数据即可
          */
        //1、获取本地存储
        const Cates = wx.getStorageSync("cates")
        //2、判断
        if(!Cates){
            this.getCates();
        }else{
            //有数据，但还需要判断有没有过期
            if(Date.now()-Cates.time > 1000*10) {
                this.getCates();
            }else{
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name)
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
        
    },
    //获取分类数据
    async getCates(){
        const res = await request({url:"/categories"})
        this.Cates = res;
        //把接口返回的数据存储到本地
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        //构造左侧的菜单数据，.map()获得数组中特定元素
        let leftMenuList = this.Cates.map(v => v.cat_name)
        //构造第一次进入该页面时选中的数据列表
        let rightContent = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
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