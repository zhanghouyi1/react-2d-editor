import { Interface } from 'readline';
import {baseFnCos,baseFnSin} from './baseCal';
import {Item,Calculate} from './Interface'

interface Next{
  rotate:number,
  center:Calculate
}

export const next=(data:Next)=>{
    return (saga:Item)=>{
      const {rotate,center}=data;
      const {left,top}=saga;
     return {
       x: baseFnCos(left,rotate,top,center),
       y: baseFnSin(left,rotate,top,center)
     }
    }
}