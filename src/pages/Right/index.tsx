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
    const getCount=(e:number):void=>{
        data[index].borderRadius=e
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
                    <Counter count={item.borderRadius} onCallBack={getCount} />
                </li>
            </ul>
        </div>
        :<div>未选择组件</div>}
    </div>
 }