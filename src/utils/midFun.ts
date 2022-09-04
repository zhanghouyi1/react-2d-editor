import {baseFnCos,baseFnSin} from './baseCal';

export const next=(data)=>{
    return (saga)=>{
      const {rotate,center}=data;
      const {left,top}=saga;
     return {
       x: baseFnCos(left,rotate,top,center),
       y: baseFnSin(left,rotate,top,center)
     }
    }
}