// getApp() 获取 App() 产生的实例对象
// const app = getApp();
// const name = app.globalData.name;

import { getMultiData, getGoodsData } from "../../service/home";

const id2type = {
  '0': "pop",
  '1': "new",
  '2': "sell"
};
const TOP_DISTANCE = 1000;

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] },
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  onLoad: async function (options) {
    this._getMultidata();
    this._getGoodsdata('pop');
    this._getGoodsdata('new');
    this._getGoodsdata('sell');
  },

  // ------------------- 网络请求函数 -------------------------
  // 轮播图和推荐数据
  async _getMultidata() {
    try {
      const homedata = await getMultiData();
      const banners = homedata.data.data.banner.list;
      const recommends = homedata.data.data.recommend.list;

      this.setData({
        recommends,
        banners
      })
    } catch (error) {
      console.log(error);
    }
  },

  async _getGoodsdata(type) {
    const page = this.data.goods[type].page + 1

    try {
      const goodsdata = await getGoodsData(type, page);
      const list = goodsdata.data.data.list;

      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    } catch (error) {
      console.log(error);
    }
  },

  // ------------------- 事件监听 -------------------------
  handleItemClick(event) {
    const index = event.detail.index;
    // const title = event.detail.title;
    // console.log(index, title);
    this.setData({
      currentType: id2type[index]
    })
  },

  handleImageload() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      console.log(rect, '组建高度');
      this.data.tabScrollTop = rect.top;
    }).exec()
  },

  onReachBottom() {
    this._getGoodsdata(this.data.currentType)
  },

  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag1 = scrollTop >= TOP_DISTANCE;
    if (flag1 !== this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }

    const flag2 = scrollTop >= this.data.tabScrollTop;
    console.log(this.data.tabScrollTop, scrollTop)
    if (flag2 !== this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})