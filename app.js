//app.js
App({
  onLaunch: function() {
    let _this = this
    // 获取code
    wx.login({
      success: res => {
        if (res.errMsg == 'login:ok') {
          _this.globalData.code = res.code //获取code
        }
      }
    })
    // 获取定位
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.latitude = res.latitude
        this.globalData.longitude = res.longitude
      },
    })
    // 获取系统信息
    wx.getSystemInfo({
      success(res) {
        _this.globalData.system_message = res
      }
    })
  },

  // 检验是否授权
  checkAuthorize(fn) {
    let _this = this
    wx.getSetting({
      success: res => {
        if (res.errMsg == 'getSetting:ok' && res.authSetting['scope.userInfo']) {
          // 若已经授权
          _this.globalData.is_authorize = true
          wx.getUserInfo({
            success: res => {
              _this.globalData.authorize_message = res //赋值授权信息
              _this.login(fn) //执行登陆
            }
          })
        } else {
          // 若未授权，授权登陆组件显示
          _this.globalData.is_authorize = false
          fn()
        }
      }
    })
  },

  // 登陆
  login(fn) {
    let _this = this
    let param = {
      api_name: 'stardepot.user.xcxLogin',
      wx_code: this.globalData.code,
      encryptedData: this.globalData.authorize_message.encryptedData,
      iv: this.globalData.authorize_message.iv,
    }
    this.http(param).then(res => {
      let data = res.data
      if (res.code == 0) {
        // 将登陆返回的信息存储在globalData中
        _this.globalData.user_id = data.user_id
        fn()
      }
    })
  },

  // 公用post请求
  http: function(data) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: _this.globalData.api_url,
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        success: function(res) {
          if (res.statusCode != 200) {
            _this.showToast('网络错误')
            return;
          }
          resolve(res.data);
          if (res.data.code != 0 && res.data.code != 40011) {
            _this.showToast(res.data.error_msg)
          }
        },
        fail: function(res) {
          // fail调用接口失败
          _this.showToast('网络错误')
        },
        complete: function(res) {
          // complete
        }
      })
    })
  },

  // 消息提示框
  showToast(title, bool) {
    let icon = bool ? 'success' : 'none'
    wx.showToast({
      title: title,
      icon: icon
    })
  },

  // 展示加载框
  showLoading(title) {
    wx.showLoading({
      title: title,
      mask: true
    })
  },

  globalData: {
    code: '', //wx.login获取的code
    api_url: 'https://stardepot.sevenbubble.com/api/api',
    is_authorize: true, //是否已授权
    authorize_message: {}, //授权信息
    latitude: 0,
    longitude: 0,
  },
})