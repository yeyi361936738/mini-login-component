// pages/home/home.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_authorize: true,//是否已授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkAuthorize(this.init)
  },

  // 初始化
  init() {
    let param = {}
    param.is_authorize = app.globalData.is_authorize ? true : false
    this.setData(param)
    // 需要登陆才能请求的接口
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

  },

  // 授权成功回调
  getIsAuthoruze(e) {
    app.login(this.init)
  }
})