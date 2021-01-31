/*
  1、用户上滑页面，滚动条触底，开始加载下一页数据
  (1)找到滚动条触底事件 微信小程序官方文档寻找
  (2)判断还有没有下一页数据
    1、获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 / 页容量(pagesize))
      总页数=Math.ceil(23 / 10) =3
    2、获取到当前的页码，pagenum
    3、判断一下，当前的页码是否大于等于总页数
        表示没有下一页数据
  (3)假如没有下一页数据，弹出一个提示框
  (4)假如还有下一页数据，来加载下一页数据
    1、当前的页码++
    2、重新发送请求
    3、数据请求回来，要对data中的数组进行 拼接 而不是全部替代！！
 */
/*
  2、下拉刷新页面
  (1)触发下拉刷新事件，需要在页面的json文件中开启一个配置项
      找到触发下拉刷新事件
  (2)重置数据数组
  (3)重置页码 设置为1
  (4)重新发送请求
  (5)数据请求回来,需要手动地关闭等待效果

 */

import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    }
    ],
    goodsList: []
  },
  queryGoodsListParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryGoodsListParams.cid = options.cid;
    this.getGoodsListData();
  },

  //请求商品列表数据
  async getGoodsListData() {
    let res = await request({
      url: "/goods/search",
      // 路径的参数用data接收
      data: this.queryGoodsListParams
    });
    console.log(res.goods);
    //数据请求回来，要对data中的数组进行 拼接 而不是全部替代！！
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    });
    //4、数据请求回来,需要手动地关闭等待效果
    //关闭下拉刷新地窗口，如果没有调用下拉刷新的窗口，直接关闭也不会报错
    wx.stopPullDownRefresh();
  },
  //标题点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    //console.log(e);//e.detail为传递的参数
    //1、修改原数组
    let tabs = this.data.tabs;
    tabs.forEach((value, index) => e.detail === index ? value.isActive=true : value.isActive=false);
    //2、赋值tabs数组,这一步至关重要
    this.setData({
      tabs: tabs
    });
  },
   // 页面上滑 滚动条触底事件
   onReachBottom(){
    //  1 判断还有没有下一页数据
      if(this.queryGoodsListParams.pagenum>=this.totalPages){
        // 没有下一页数据
        //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
        wx.showToast({ title: '没有下一页数据' });
          
      }else{
        // 还有下一页数据
        //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
        this.queryGoodsListParams.pagenum++;
        this.getGoodsListData();
      }
    },
    //下拉加载更多数据
    onPullDownRefresh() {
      //1、重置goodsList数组
      this.setData({
        goodsList: []
      });
      //2、重置页码，设置为1
      this.queryGoodsListParams.pagenum = 1;
      //3、重新发送请求
      this.getGoodsListData();
    }
})