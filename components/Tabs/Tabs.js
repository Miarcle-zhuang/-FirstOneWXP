// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      //这种默认值是vue中的写法
      // default() {
      //   return []
      // }
      //这下面才是小程序额写法
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击事件
    handleItemChange(e) {
      //console.log(e);
      //1、获取点击的索引
      let {index} = e.currentTarget.dataset;
      //2、触发父组件中的事件定义
      this.triggerEvent("tabsItemChange", index);
    }
  }
})
