/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-22 15:42:57
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-23 15:21:29
 * @FilePath: /react-2d-editor/src/businessComponents/Counter/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{useRef} from "react";
import './index.css'
interface Props{
    count:number,
    type:string,
    difference:number,
    onCallBack(e:number,type:string):void,
    
}
export const Counter:React.FC<Props>=({count,onCallBack,type,difference})=>{
    const num=useRef<number>(null);
    num.current=count
    const ref=useRef<HTMLInputElement>();

    const changeHandle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        num.current=Number(ref.current.value);
        onCallBack(Number(ref.current.value),type)
    }
    const reduce:React.MouseEventHandler<HTMLDivElement>=():void=>{
        num.current=parseFloat((num.current-difference).toFixed(10));
        onCallBack(num.current,type)
    }
    const add:React.MouseEventHandler<HTMLDivElement>=():void=>{
        num.current=parseFloat((num.current+difference).toFixed(10));
        onCallBack(num.current,type)
    }
    return <div className="count">
        <div className="reduce" onClick={reduce}>-</div>
        <input ref={ref} value={num.current} onChange={changeHandle} type="text" />
        <div className="reduce" onClick={add}>+</div>
    </div>
}