//引入用来发送请求的方法,方法一定要补齐全,
//不能写成import {request} from "../../request";
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

//Page Object
Page({
  data: {
    //存放轮播图数据的数组
    swiperList: [],
    //存放导航数据的数组
    cateList: [],
    //存放楼层数据的数组
    floorList: []
  },
  //页面加载就会触发
  onLoad: function(options) {
    //不要忘记有this
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  //获取轮播图的数据
  async getSwiperList() {
    //1、发送异步请求获取轮播图数据,使用Promise函数解决回调地狱
    //第一种方法没有使用Promise,会引起回调地狱
    /*wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
      //下面这样写是错的,不符合request({})里面对参数的要求
      // success(result) {
      //   this.setData({
      //     swiperList: result.data.message
      //   })
      // },
      success: (result) => {
        console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      },
      fail: (err) => {

      },
      //接口调用结束的回调函数（调用成功、失败都会执行）
      complete: () => {

      }
    })*/
    //第二种方法使用了Promise,不会引起回调地狱,看起来更整洁
    // request({url: "/home/swiperdata"})
    //   .then(result => {
    //     //console.log(result);
    //     this.setData({
    //       swiperList: result
    //     })
    //   })
    //   .catch(err => console.log(err))
    let result = await request({ url: "/home/swiperdata" });
    this.setData({
      swiperList: result
    })
  },
  //获取分类导航的数据
  async getCateList() {
    // request({url: "/home/catitems"})
    //   .then(result => {
    //     console.log(result);
    //     this.setData({
    //       cateList: result
    //     })
    //   })
    //   .catch(err => console.log(err))
    let result = await request({url: "/home/catitems"});
    this.setData({
      cateList: result
    })
  },
  //获取楼层导航的数据
  async getFloorList() {
    // request({url: "/home/floordata"})
    //   .then(result => {
    //     console.log(result);
    //     this.setData({
    //       floorList: result
    //     })
    //   })
    //   .catch(err => console.log(err))
    let result = await request({url: "/home/floordata"});
    this.setData({
      floorList: result
    })
  }
});