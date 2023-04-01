import request from '@/api/request'
import requestMock from '@/api/requestMock';
/* 三级联动接口 */
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });
export const reqBannerList = () => requestMock({ url: '/banner', method: 'get' });
export const reqFlooerList = () => requestMock({ url: '/floor', method: 'get' });