/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 16:03:37
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-31 18:16:56
 * @FilePath: /2d-ediotor/src/utils/calculation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Style,Calculate} from '../utils/Interface';
import {_cos,_sin,baseFnCos,baseFnSin} from './baseCal'

const nwPosition=(style:Style,center)=>{
  return {
    x:baseFnCos(style.left,style.rotate,style.top,center),
    y:baseFnSin(style.left,style.rotate,style.top,center)
  }
}
const nePosition=(style:Style,center)=>{
  return {
    x: baseFnCos(style.left + style.width,style.rotate,style.top,center),
    y: baseFnSin(style.left + style.width,style.rotate,style.top,center)
  }
}
const swPosition=(style:Style,center)=>{
  return {
    x: baseFnCos(style.left,style.rotate,style.top + style.height,center),
    y: baseFnSin(style.left,style.rotate,style.top + style.height,center)
  }
}
const sePosition=(style:Style,center)=>{
  return {
    x: baseFnCos(style.left + style.width,style.rotate,style.top + style.height,center),
    y: baseFnSin(style.left + style.width,style.rotate,style.top + style.height,center)
  }
}
const nPosition=(style:Style,center)=>{
  return {
    x: baseFnCos((style.left + style.width / 2),style.rotate,style.top,center),
    y: baseFnSin((style.left + style.width / 2),style.rotate,style.top,center),
  }
}
const ePosition=(style:Style,center)=>{
  return {
    x: baseFnCos(style.left + style.width,style.rotate,(style.top + style.height / 2),center),
    y: baseFnSin(style.left + style.width,style.rotate,(style.top + style.height / 2),center)
  }
}
const sPosition=(style:Style,center)=>{
  return {
    x: baseFnCos((style.left + style.width / 2),style.rotate,style.top + style.height,center),
    y: baseFnSin((style.left + style.width / 2),style.rotate,style.top + style.height,center),
  }
}
const wPosition=(style:Style,center)=>{
  return {
    x: baseFnCos(style.left,style.rotate,(style.top + style.height / 2),center),
    y: baseFnSin(style.left,style.rotate,(style.top + style.height / 2),center)
  }
}
export const calPosition = {
  nw: nwPosition,
  ne: nePosition,
  sw: swPosition,
  se: sePosition,
  n: nPosition,
  e: ePosition,
  s: sPosition,
  w: wPosition,
}

export const calculateRotation = (x1:number, y1:number, x2:number, y2:number, angle:number):Calculate => {
  return {
    x: (x1 - x2) * _cos(angle) - (y1 - y2) * _sin(angle) + x2,
    y: (x1 - x2) * _sin(angle) + (y1 - y2) * _cos(angle) + y2,
  };
}
export const Position = (direction:String, style:Style,center) => {
  return calPosition[`${direction}`]&&calPosition[`${direction}`](style,center);
}
const points:object={
  e:'w', w:'e', s:'n', n:'s', ne:'sw', nw:'se', se:'nw', sw:'ne'
}
export const difference=(direction,style,center)=>{
  if(direction==='rotate'||direction==='move'){
    return 
  }
  let num1=Position(direction,style,center);
  let num2=Position(points[direction],style,center);
 
  return {
    x:(num1.x - num2.x)/mid(Math.pow((num1.x - num2.x),2) +Math.pow(num1.y - num2.y,2)),
    y:(num1.y - num2.y)/mid(Math.pow((num1.x - num2.x),2) +Math.pow(num1.y - num2.y,2)),
    num1,
    num2
  }
}
export const mid=(n)=>{
  if (n < 0) {
    return NaN;
  }
  if (n === 0) {
     return 0; 
   }
  let low = 0;
  let high = n;
  let prevMid;
  let mid = (low + high) / 2;
  do {
    if (mid * mid > n) {
      high = mid;  
    } else {
      low = mid;
    }
    // 记录上一次取的中间数
    prevMid = mid;
    // 记录当前的中间数
    mid = (low + high) / 2;
  } while (Math.abs(prevMid - mid) > 1e-15);// 对两次的中间数进行对比 如果间隔小于等于精准区间时则说明达到了所需要的精准度 则退出循环
  return parseFloat(mid.toFixed(15));
}

export const summation=(vectorData,offsetX,offsetY,angle)=>{
  if(!vectorData) return {}
  let x=vectorData.num1.x + ((offsetX * vectorData.x + offsetY * vectorData.y) * vectorData.x);
  let y=vectorData.num1.y + ((offsetX * vectorData.x + offsetY * vectorData.y) * vectorData.y);

  const start:Calculate ={
    x:(x - ((x + vectorData.num2.x) / 2)) *_cos(-angle) - (y - ((y + vectorData.num2.y) / 2)) * _sin(-angle) + ((x + vectorData.num2.x) / 2),
    y:(x - ((x + vectorData.num2.x) / 2)) * _sin(-angle) + (y - ((y + vectorData.num2.y) / 2)) * _cos(-angle) + ((y + vectorData.num2.y) / 2)
  }

  const end:Calculate ={
    x:(vectorData.num2.x - ((x + vectorData.num2.x) / 2)) * _cos(-angle) - (vectorData.num2.y - ((y + vectorData.num2.y) / 2)) * _sin(-angle) + ((x + vectorData.num2.x) / 2),
    y:(vectorData.num2.x - ((x + vectorData.num2.x) / 2)) * _sin(-angle) + (vectorData.num2.y - ((y + vectorData.num2.y) / 2)) * _cos(-angle) + ((y + vectorData.num2.y) / 2)
  }

  return {
    start,
    end
  }
}