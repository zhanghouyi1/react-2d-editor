import {Calculate} from '../utils/Interface';
import {_cos,_sin,mid,Position} from './baseCal'
import {points} from './strategy'

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
