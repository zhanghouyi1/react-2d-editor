/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-22 14:26:48
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-23 15:15:43
 * @FilePath: /react-2d-editor/src/pages/Right/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{useContext} from "react";
import {Context} from '../../App';
import {Child} from '../../utils/Interface';
import {Counter} from '../../businessComponents/Counter/index'
import './index.css'
/**右侧操作面板 暂时 先加入 圆角透明等操作*/
interface Type{
    img:string,
    txt:string,
    svg:string,
    table:string,
    div:string
}
 export const Right:React.FC=()=>{
    const {index,data,setData}=useContext(Context);
    let item:Child=null;
    const type:Type={
        txt:'文字',
        img:'图片',
        svg:'svg',
        table:'表格',
        div:'普通'
    }
    if(index>=0){
        item=data[index];
        console.log()
    }
    const getCount=(e:number,type:string):void=>{
        data[index][type]=e;
        const arr=[].concat(data);
        setData(arr)
    }
    return <div className="operation">
        {item?
        <div>
            <div className="title">{type[item.type]}</div>
            <ul className="operation-list">
                <li>
                    <div className="label">圆角: </div>
                    <Counter count={item.borderRadius} difference={1} type='borderRadius' onCallBack={getCount} />
                </li>
                <li>
                    <div className="label">透明度: </div>
                    <Counter count={item.opacity} difference={0.1} type='opacity' onCallBack={getCount} />
                </li>
            </ul>
        </div>
        :<div>未选择组件</div>}
    </div>
 }