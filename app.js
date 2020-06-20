App({
  onLaunch: function () {
    console.log('小程序初始化 一般获取用户信息')
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
      },
    })
  },
  globalData: {
    name: '全局数据'
  }
})