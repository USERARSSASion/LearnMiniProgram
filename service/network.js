export default function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}
