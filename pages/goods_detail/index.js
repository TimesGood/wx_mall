
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj:{}
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getGoodsDetail(options.goods_id)
    },
    //获取商品详情数据
    async getGoodsDetail(goods_id){
        const res = await request({url:"/goods/detail",data:{goods_id}})
        /*
            优化：
            当后台返回的数据量有点多，而我们要使用的数据并没有使用到某些属性时
            在接收数据时，可以指定接收其中一些要使用的数据，就达到一些优化的效果
        */
        this.setData({
            goodsObj:{
                goods_name:res.goods_name,
                goods_price:res.goods_price,
                /*
                    iphone部分手机不识别webp格式的图片
                    1、找后台修改（这是正常企业开发的解决方式）
                    2、自己临时修改（但注意后台是存在相应的jpg格式的图片）
                    使用正则表达式替换
                    goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
                */
                goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
                pics:res.pics
            }
        })
    },
    /*
        点击轮播图放大预览功能
        1、使用wxwx.previewImage()方法
        2、
    */
    handlePrevewImage(e){
        const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
        let index = e.currentTarget.dataset.index
        wx.previewImage({
            current: urls[index],
          urls: urls,
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