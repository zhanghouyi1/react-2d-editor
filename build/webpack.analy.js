/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-09-30 10:17:08
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 10:20:47
 * @FilePath: /rtw/build/webpack.analy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const prodConfig=require('./webpack.prod');

const SpeedMeasurePlugin=require('speed-measure-webpack-plugin');
const smp=new SpeedMeasurePlugin();

const {merge}=require('webpack-merge');

module.exports=smp.wrap(merge(prodConfig,{}))