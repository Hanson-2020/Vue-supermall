import {request} from './request'

export function getCategory() {
  return request({
    url: '/category'
  })
}
export function getSubcategory(maitKey) {
  return request({
      url: '/subcategory',
      // http://152.136.185.210:8000/api/z8/subcategory?maitKey=582
      params: {
          maitKey
      }
  })
}