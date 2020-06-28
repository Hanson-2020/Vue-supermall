import {request} from './request'

export function getHomeMultiadata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}

//函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
//函数调用结束 -> 弹出函数栈（释放函数所有的变量）
// function test() {
//   const names = ['Hanson', 'codewhy']
// }
// test()

// 吧数组存进另一个数组
// const totalNUms = [],
// const num1 =[20,11,22]
// const num2 =[10,222,133]
// //for循环
// // for(let n of num1){
// //   totalNUms.push(n);
// // }
// totalNUms.push(...num1)