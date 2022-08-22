/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-22 15:42:57
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-22 16:50:38
 * @FilePath: /react-2d-editor/src/businessComponents/Counter/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{ useState,useRef} from "react";
import './index.css'
interface Props{
    count:number,
    onCallBack(e:number):void
}
export const Counter:React.FC<Props>=({count,onCallBack})=>{

    let [num,setNum]=useState<number>(count);
    const ref=useRef<HTMLInputElement>();

    const changeHandle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setNum(Number(ref.current.value));
        onCallBack(Number(ref.current.value))
    }
    const reduce:React.MouseEventHandler<HTMLDivElement>=():void=>{
        setNum(num-1);
        onCallBack(num)
    }
    const add:React.MouseEventHandler<HTMLDivElement>=():void=>{
        setNum(num+1);
        onCallBack(num)
    }
    return <div className="count">
        <div className="reduce" onClick={reduce}>-</div>
        <input ref={ref} value={num} onChange={changeHandle} type="text" />
        <div className="reduce" onClick={add}>+</div>
    </div>
}