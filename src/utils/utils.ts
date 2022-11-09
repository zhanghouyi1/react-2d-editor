/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-07-29 16:28:12
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-31 15:28:35
 * @FilePath: /test-zu/src/utils/utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {summation} from './calculation'
import {Style,Rect,Calculate} from '../utils/Interface'
import { RefObject,MouseEvent} from 'react';
// eslint-disable-next-line react-hooks/exhaustive-deps
export const transform = (
  direction:RefObject<string>,
  oriPos:RefObject<Style>, 
  e:MouseEvent<HTMLDivElement>, 
  txtDom:HTMLElement, 
  vectorData:RefObject<Calculate>, 
  editorOffset:RefObject<Rect>
  ):Style => {
  const {
    top,
    left,
    cX,
    cY,
    width,
    height,
    rotate
  } = oriPos.current;
  const style = {
    ...oriPos.current
  }
  const eX:number = e.clientX;
  const eY:number = e.clientY
  // /data.style.fontSize = (data.style.width / originWidth) * fontSize; 字体计算方式 originWidth 初始长度
  const offsetX:number = eX - oriPos.current.cX;
  const offsetY:number = eY - oriPos.current.cY;
  /**计算画布editor中心点 之前是元素的中心点 */
  const centerX:number = (left + editorOffset.current.left) + width / 2
  const centerY:number = (top+editorOffset.current.top) + height / 2
  let result=summation(vectorData.current,offsetX,offsetY,style.rotate )
  const {start,end}=result
  /**旋转前的角度 */
  const rotateDegreeBefore:number = Math.atan2(cY - centerY, cX - centerX) / (Math.PI / 180);

  // eslint-disable-next-line default-case
  switch (direction.current) {
    // 拖拽移动
    case 'move':
      // 元素当前位置 + 偏移量
      const top:number = oriPos.current.top + offsetY;
      const left:number = oriPos.current.left + offsetX;
      // 限制必须在这个范围内移动 画板的高度-元素的高度
      style.top = top;
      style.left = left;
      break
      // 东
    case 'e':
      // 向右拖拽添加宽度
      style.width = start.x - end.x;
      style.left = end.x;
      style.top = end.y - oriPos.current.height / 2;
      if (txtDom) {
        style.height = txtDom.clientHeight;
      }
      return style
      // 西
    case 'w':
      // 增加宽度、位置同步左移
      style.width = end.x - start.x;
      style.left = start.x;
      style.top = start.y - oriPos.current.height / 2;
      if (txtDom) {
        style.height = txtDom.clientHeight;
      }
      return style
      // 南
    case 's':
      style.height = start.y - end.y;
      style.left = end.x - oriPos.current.width / 2;
      style.top = end.y;
      return style
      // 北
    case 'n':
      style.height = end.y - start.y;
      style.left = start.x - oriPos.current.width / 2;
      style.top = start.y;
      break
      // 东北
    case 'ne':
      style.width = -end.x + start.x;
      style.height = end.y - start.y;
      style.left = end.x;
      style.top = start.y;
      style.fontSize = oriPos.current.fontSize ? (style.width / oriPos.current.width) * (oriPos.current.fontSize || 20) : 0
      break
      // 西北
    case 'nw':
      style.width = end.x - start.x;
      style.height = end.y - start.y;
      style.left = start.x;
      style.top = start.y;
      style.fontSize = oriPos.current.fontSize ? (style.width / oriPos.current.width) * (oriPos.current.fontSize || 20) : 0
      break
      // 东南
    case 'se':
      style.width = -end.x + start.x;
      style.height = -end.y + start.y;
      style.left = end.x;
      style.top = end.y;
      // style.width += offsetX;
      // style.height = style.width/radio;
      style.fontSize = oriPos.current.fontSize ? (style.width / oriPos.current.width) * (oriPos.current.fontSize || 20) : 0
      break
      // 西南
    case 'sw':
      style.width = end.x - start.x;
      style.height = -end.y + start.y;
      style.left = start.x;
      style.top = end.y;
      style.fontSize = oriPos.current.fontSize ? (style.width / oriPos.current.width) * (oriPos.current.fontSize || 20) : 0
      break
    case 'rotate':
      const curX:number = eX;
      const curY:number = eY;
      // 旋转后的角度
      const rotateDegreeAfter:number = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
      const result:number = rotate + rotateDegreeAfter - rotateDegreeBefore
      // 运用高中的三角函数
      style.rotate = result
      break
  }
  return style
}

/**节流函数 */
export const throttle = (fn:Function, delay:number) => {
  let timer:any=null;
  return (...args:any) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

const _lut:Array<string> = [];
for (let i = 0; i < 256; i++) {
  _lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
/**
 * 这个方法是生成uuid 借鉴three.js 源码方式
 * @returns ID
 */
export const generateID = ():string => {
  const d0:number = Math.random() * 0xffffffff | 0;
  const d1:number = Math.random() * 0xffffffff | 0;
  const d2:number = Math.random() * 0xffffffff | 0;
  const d3:number = Math.random() * 0xffffffff | 0;
  // eslint-disable-next-line no-mixed-operators
  const uuid:string = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
  return uuid.toUpperCase();
}
/**rgba 转16进制 */
export const rgbToString = (str:string):string => {
  let result = ''
  if (str.indexOf("#") === 0) {
      result = str
  } else if (str.indexOf("rgb(") === 0) {
      const colors = str.replace(/rgb\(/g, "").replace(/\)/g, "").split(",")
      const r = parseInt(colors[0]).toString(16).length === 1 ? "0" + parseInt(colors[0]).toString(16) : parseInt(colors[0]).toString(16)
      const g = parseInt(colors[1]).toString(16).length === 1 ? "0" + parseInt(colors[1]).toString(16) : parseInt(colors[1]).toString(16)
      const b = parseInt(colors[2]).toString(16).length === 1 ? "0" + parseInt(colors[2]).toString(16) : parseInt(colors[2]).toString(16)
      result = `#${r}${g}${b}`
  }
  return result
}