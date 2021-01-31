import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    //分类页面右侧滚动位置
    scrollTop: 0
  },
  //存储请求到的数据, 即要渲染页面的数据
  Cates: [],
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      (一)使用缓存的步骤(思路最重要)
      1、先判断一下本地存储中有没有旧的数据
        旧数据的存储方式:{time: Date.now(), data: [...]}
      2、没有旧的数据，直接发送新请求
      3、有旧的数据，同时旧的数据还没过期，就使用本地存储的旧数据即可
      
      (二)web中的本地存储和小程序中的本地存储的区别
      1、写代码的方式不一样了
        web：(1)存数据：localStorage.setItem("key", data);
             (2)取数据：localStorage.getItem("key");
        小程序：(1)存数据：wx.setStorageSync("key", data);
               (2)取数据：wx.getStorageSync("key");
      2、存的时候，没有做类型转换
      (1)web: 不管存入的是什么类型的数据，最终都会先调用以下toString()，把数据变成了字符串，再存入进去
      (2)小程序：不存在类型转换这个操作，存什么类型的数据，获取的就是什么类型的
     */
    //获取本地存储中的数据
    //这里的Cates存储的是, 从本地存储中请求到的数据，分清两个Cates的作用
    const Cates = wx.getStorageSync("cates");
    //判断
    if(!Cates) {
      //不存在，发送请求数据
      this.getCates();
    }else {
      //有旧的数据，同时旧的数据还没过期，还没超过5s,就使用本地存储的旧数据即可
      if(Date.now() - Cates.time < 1000 * 5) {
        //使用本地数据
        this.Cates = Cates.data;
        //构造左侧的大菜单数据
        /* 
          map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值,
          其中v是this.Cates这个数组的元素
        */
        let leftMenuList = this.Cates.map(v => v.cat_name);
        //构造右侧商品数据
        /* 
          可以首先将this.Cate[0]写死,先完成第一个布局,后面将写死的数据
          进行更改即可,这也是布局常用的方法
        */
        let rightContent = this.Cates[0].children;
        
        this.setData({
          leftMenuList,
          rightContent
        })
      }else {
        //再次发送请求
        this.getCates();
      }
    }
  },
  //获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   //console.log(res);
    //   this.Cates = res.data.message;
    //   //请求到数据之后，就应该导入本地存储中
    //   wx.setStorageSync("cates", {time: Date.now(), data: this.Cates});
      
    //   //构造左侧的大菜单数据
    //   /* 
    //     map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值,
    //     其中v是this.Cates这个数组的元素
    //    */
    //   let leftMenuList = this.Cates.map(v => v.cat_name);
    //   //构造右侧商品数据
    //   /* 
    //     可以首先将this.Cate[0]写死,先完成第一个布局,后面将写死的数据
    //     进行更改即可,这也是布局常用的方法
    //    */
    //   let rightContent = this.Cates[0].children;
      
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    
    //1、使用es7的async await来发送请求
    let res = await request({  url: "/categories" });
    this.Cates = res;
    //请求到数据之后，就应该导入本地存储中
    wx.setStorageSync("cates", {time: Date.now(), data: this.Cates});
    
    //构造左侧的大菜单数据
    /* 
      map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值,
      其中v是this.Cates这个数组的元素
      */
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧商品数据
    /* 
      可以首先将this.Cate[0]写死,先完成第一个布局,后面将写死的数据
      进行更改即可,这也是布局常用的方法
      */
    let rightContent = this.Cates[0].children;
    
    this.setData({
      leftMenuList,
      rightContent
    });
  },
  //左侧菜单的点击数据
  handleItemTap(e) {
    /*
      1、获取被点击的标题身上的索引
      2、给data中的currentIndex赋值就可以了
      3、根据不同的索引来渲染右侧的商品内容
     */
    //console.log(e);
    const {index} = e.currentTarget.dataset;

    //构造右侧商品数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})