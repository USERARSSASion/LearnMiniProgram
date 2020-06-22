// components/m-tab-control/m-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        console.log(newVal, oldVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(event) {
      // console.log('-----------', event.currentTarget.dataset.index)
      const index = event.currentTarget.dataset.index;
      const title = this.properties.titles[index];
      this.setData({currentIndex: index})
      // 通知页面内部的点击事件
      this.triggerEvent('itemClick', { index, title }, {})
    }
  },
  // styleIsolation: 设置样式的隔离方式
  // multipleSlots: 使用多插槽的时候设置为 true
  options: {
    multipleSlots: false,
  },
  // 外界给组件传入额外的样式
  externalClasses: [],
  // 监听数据，但是拿不到 oldVal
  observers: {
    counter: function (newVal) {
      console.log(newVal)
    }
  },
  // 监听所在页面的生命周期
  pageLifetimes: {
    show() {
      console.log('监听组件所在页面显示出来')
    },
    hide() {
      console.log('监听组件所在页面隐藏起来')
    },
    resize() {
      console.log('监听页面尺寸的改变')
    }
  },
  // 监听组件本身的生命周期
  lifetimes: {
    created() {
      console.log('监听组件被创建出来')
    },
    attached() {
      console.log('监听组件被添加的时候')
    },
    ready() {
      console.log('监听组件被渲染出来时')
    },
    moved() {
      console.log('监听组件被移动到另外一个节点')
    },
    detached() {
      console.log('监听组件被移除掉')
    }
  }
})
