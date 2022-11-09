/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 10:10:39
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 16:51:43
 * @FilePath: /2d-ediotor/src/pages/Left/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { list } from "@/utils/data";
import './index.less';
import React, { useState} from "react";
import {List} from '@/businessComponents/List'

export const Left:React.FC=()=>{
    const [listIndex,setListIndex]=useState<number>(0)
    const onCheakChange=(e:number):void=>{
        console.log(e)
        setListIndex(e)
    }
    return <div className='listWarp'>
        <div className="list-containt">
            {list.map((item,index:number)=><div key={item.name} className={["list", listIndex === index?"list-check":"list-null"].join(' ')} onClick={()=>onCheakChange(index)}>
                <img alt=""  src={item.icon} />
                <div className='name' style={{color:index===listIndex?'#fff':''}}>{item.name}</div>
            </div>)}
        </div>
        <div className='listContent'>
            <List index={listIndex} type={list[listIndex].type} />
        </div>
    </div>
}