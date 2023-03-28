import request from '@/api/request'

/* 三级联动接口 */
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });
