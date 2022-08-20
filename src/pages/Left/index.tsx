/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 10:10:39
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 14:33:38
 * @FilePath: /2d-ediotor/src/pages/Left/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { list } from "../../utils/data";
import './index.css';
import React, { useContext} from "react";
import {Context} from '../../App';

export const Left:React.FC=()=>{
    const {setCurrentItem}=useContext(Context);
    const dragStart=(e:number)=>{
        setCurrentItem(list[e])
    }

    return <div className="list-containt">
        {list.map((item,index)=><div key={item.name} className="list">
            <img alt="" draggable={true} onDragStart={dragStart.bind(this,index)}  src={item.icon} />
        </div>)}
    </div>
}