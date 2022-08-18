/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 16:03:37
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 16:16:24
 * @FilePath: /2d-ediotor/src/utils/calculation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const calculateSingleElementPosition = (direction, curDesign) => {
    const style = {
      ...curDesign
    };
    let result = {};
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

export const calculateRotation = (x1, y1, x2, y2, angle) => {
    const cos = Math.cos((angle / 180) * Math.PI);
    const sin = Math.sin((angle / 180) * Math.PI);
  
    const x = x1 - x2;
    const y = y1 - y2;
  
    return {
      x: x * cos - y * sin + x2,
      y: x * sin + y * cos + y2,
    };
  }