import request from '@/api/request'
import requestMock from '@/api/requestMock';
/* 三级联动接口 */
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });
export const reqBannerList = () => requestMock({ url: '/banner', method: 'get' });
export const reqFlooerList = () => requestMock({ url: '/floor', method: 'get' });
// 给服务器传递的参数不能为空，至少得是一个空对象。否则请求失败
export const reqSearchResList = (data) => request({ url: '/list', method: 'post', data: data || {} })
export const reqGoodsDetail = (skuid) => request({ url: `/item/${skuid}`, method: 'get' })
export const reqAddShopCart = (data) => request({ url: `/cart/addToCart/${data.skuid}/${data.skuNum}`, method: 'post' })
export const reqShopcartList = () => request({ url: '/cart/cartList', get: 'get' })
export const reqDeleteShopCart = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
export const reqUpdateChecked = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
