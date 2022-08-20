/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 16:03:37
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 16:16:24
 * @FilePath: /2d-ediotor/src/utils/calculation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Style,Calculate} from '../utils/Interface'

export const calculateSingleElementPosition = (direction:String, curDesign:Style):Calculate => {
    const style = {
      ...curDesign
    };
    let result:Calculate = {x:0,y:0};
    if (direction === "nw") {
      result = {
        x: style.left,
        y: style.top,
      };
    } else if (direction === "ne") {
      result = {
        x: style.left + style.width,
        y: style.top,
      };
    } else if (direction === "sw") {
      result = {
        x: style.left,
        y: style.top + style.height,
      };
    } else if (direction === "se") {
      result = {
        x: style.left + style.width,
        y: style.top + style.height,
      };
    } else if (direction === "n") {
      result = {
        x: style.left + style.width / 2,
        y: style.top,
      };
    } else if (direction === "e") {
      result = {
        x: style.left + style.width,
        y: style.top + style.height / 2,
      };
    } else if (direction === "s") {
      result = {
        x: style.left + style.width / 2,
        y: style.top + style.height,
      };
    } else if (direction === "w") {
      result = {
        x: style.left,
        y: style.top + style.height / 2,
      };
    }
  
    return result;
}

export const calculateRotation = (x1:number, y1:number, x2:number, y2:number, angle:number):Calculate => {
    const cos:number = Math.cos((angle / 180) * Math.PI);
    const sin:number = Math.sin((angle / 180) * Math.PI);
  
    const x:number = x1 - x2;
    const y:number = y1 - y2;
  
    return {
      x: x * cos - y * sin + x2,
      y: x * sin + y * cos + y2,
    };
}