import Mock from 'mockjs'
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'
// mock数据  参数1：请求路径，参数2：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });