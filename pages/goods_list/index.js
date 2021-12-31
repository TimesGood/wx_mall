// pages/goods_list/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:false
            },
        ],
        //商品数据
        goodsList:[],
    },
    //接口所需参数
    queryParams: {
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    //总页数
    totalPages:0,
    handleTabsItemChange(e){
        const index = e.detail
        let tabs = this.data.tabs
        tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.queryParams.cid = options.cid;
        this.getGoodsList()
    },
    
    //获取商品数据
    async getGoodsList(){
        const res = await request({url:"/goods/search",data: this.queryParams})
        //计算总页数
        this.totalPages = Math.ceil(res.total/this.queryParams.pagesize)
        this.setData({
            // 在原有数据的情况下追加数据
            goodsList:[...this.data.goodsList,...res.goods]
        })
        wx.stopPullDownRefresh()
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

    /* 
        需求：用户下拉刷新数据
            1、重置数据
            2、页面设为1
            3、数据请求回来之后，手动关闭loading
        注：需要在json配置文件开启下拉刷新功能
    */
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        //重置数据
        this.setData({
            goodsList:[],
        })
        //重置页码
        this.queryParams.pagenum = 1
        //重新请求数据
        this.getGoodsList();
    },

    /* 
        需求：用户上滑页面 滚动条触底 开始加载下一页数据
        1、需要判断还有没有下一页：判断当前页面是否大于等于总页数
            总页数：Math.ceil(总条数 / 每页容量)
        2、假设没有下一页，弹出提示
        3、如果有下一页，加载下一页数据
    */
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.queryParams.pagenum >= this.totalPages){
            wx.showToast({title: "没有了"})
        }else{
            this.queryParams.pagenum++
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})