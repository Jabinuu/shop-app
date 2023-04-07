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
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
export const reqUserRegister = (info) => request({ url: '/user/passport/register', method: 'post', data: info })
export const reqUserLogin = (info) => request({ url: '/user/passport/login', method: 'post', data: info })
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' })
export const reqUserLogout = () => request({ url: '/user/passport/logout', method: 'get' });
export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
export const reqOrderInfo = () => request({ url: 'order/auth/trade', method: 'get' })
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
export const reqIndividualOrder = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' })




