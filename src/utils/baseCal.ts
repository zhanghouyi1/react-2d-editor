import {Style} from './Interface';
import {next} from './midFun'
import {calPosition} from './strategy'
export const _cos=(rotate)=>{
    return Math.cos((rotate / 180) * Math.PI)
}

export const _sin=(rotate)=>{
    return Math.sin((rotate / 180) * Math.PI)
}

export const base=(x1,x2)=>{
    return x1-x2
}
export const baseFnCos=(x1,rotate,x2,center)=>{
    return base( x1,center.x)* _cos(rotate) - base(x2,center.y) * _sin(rotate) + center.x
}
export const baseFnSin=(x1,rotate,x2,center)=>{
    return base( x1,center.x)* _sin(rotate) + base(x2,center.y) *_cos(rotate) + center.y
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
export const Position = (direction:String, style:Style,center) => {
    let fn=next({rotate:style.rotate,center});
    return fn(calPosition[`${direction}`]&&calPosition[`${direction}`](style))
     
  }