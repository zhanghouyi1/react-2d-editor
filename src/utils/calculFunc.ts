import {Style} from './Interface';

export const nwPosition=(style:Style)=>{
    return {
      left:style.left,
      top:style.top
    }
  }
export const nePosition=(style:Style)=>{
    return {
      left: style.left + style.width,
      top: style.top
    }
  }
export const swPosition=(style:Style)=>{
    return {
      left: style.left,
      top: style.top + style.height
    }
  }
export const sePosition=(style:Style)=>{
    return {
      left: style.left + style.width,
      top: style.top + style.height
    }
  }
export const nPosition=(style:Style)=>{
    return {
      left: style.left + style.width / 2,
      top: style.top
    }
  }
export const ePosition=(style:Style)=>{
    return {
      left:style.left + style.width,
      top: style.top + style.height / 2
    }
}
export const sPosition=(style:Style)=>{
    return {
      left:style.left + style.width / 2,
      top: style.top + style.height
    }
  }
export const wPosition=(style:Style)=>{
    return {
      left: style.left,
      top: style.top + style.height / 2
    }
  }