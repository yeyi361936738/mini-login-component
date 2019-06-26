// pages/authorize-login/authorize-login.js
var app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 授权登陆

  methods: {
    bindGetUserInfo: function (e) {
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        //执行登陆
        app.globalData.is_authorize = true
        app.globalData.authorize_message = e.detail
        this.triggerEvent('isAuthoruze',true)
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '温馨提示',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击了“返回授权”')
            }
          }
        })
      }
    },
  }
})