import request from "./network";

const baseUrl = 'http://152.136.185.210:8000/api/n3'

function getMultiData() {
  return request({
    url: `${baseUrl}/home/multidata`
  })
}

function getGoodsData(type, page) {
  return request({
    url: `${baseUrl}/home/data`,
    data: {
      type,
      page
    }
  })
}

export {
  getMultiData,
  getGoodsData
}
