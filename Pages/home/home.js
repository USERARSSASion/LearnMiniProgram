// getApp() 获取 App() 产生的实例对象
const app = getApp();
const name = app.globalData.name;

Page({
  data: {
    name: '明',
  },
  handleGetUserInfo(event) {
    console.log(event)
  },
  tabControlClick(event) {
    console.log(event.detail, "++++++++")
  }
})