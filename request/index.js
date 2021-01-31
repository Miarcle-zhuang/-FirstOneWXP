//ajaxTimes是加载数据的次数
let ajaxTimes = 0; 
//es6语法中,export和import是对应的
export const request = (params) => {
  ajaxTimes++;
  //1、显示加载中图标
  wx.showLoading({
    title: '加载中',
  });
  //提取公共路径
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      //路径拼接
      url: baseUrl + params.url,
      success: function(result) {
        resolve(result.data.message);
      },
      fail: function(err) {
        reject(err);
      },
      //2、无论成功与否，请求完成时，隐藏加载中图标
      complete: () => {
        ajaxTimes--;
        if(ajaxTimes === 0) {
          //关闭正在等待的图标
          wx.hideLoading();
        } 
      }
    })
  })
}