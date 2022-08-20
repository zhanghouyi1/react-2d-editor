/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 17:14:40
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-19 14:24:35
 * @FilePath: /2d-ediotor/src/components/Table/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import {BoardContext} from '../../pages/Board/index';
import React, {useContext,useState,useRef} from 'react';
import {tableData} from '../../utils/data'
import {Props,TableData} from '../../utils/Interface'
import './index.css'

export const Table:React.FC<Props>=({item,index})=>{
    const {setStyle,currentCom,setIndex,setShow,checkTxt}=useContext(BoardContext);
    const {left,top,width,height,rotate,fontSize,zIndex}=item
    const [enable,setEnable]=useState<boolean >(false);
    const txt=useRef<HTMLDivElement>()
    const th:TableData[]=tableData.filter(item=>item.type==='th');
  
    const liWidth:number=width/th.length;
    const liHeight:number=height/(tableData.length/th.length)

    /**双击事件 */
    const doubleClick=():void=>{
        setEnable(true)
    }
    /**单击事件 */
    const checkElement=(e:React.MouseEvent<HTMLElement>):void=>{
        e.stopPropagation();
        currentCom.current=item
        setStyle({
            left,
            top,
            width,
            height,
            rotate,
            fontSize
        });
        setIndex(index);
        setShow(true);
    }
    /**失去焦点 */
    const blurHandle=():void=>{
        setEnable(false)
    }
    /**co */
    const handleInput=(e:React.MouseEvent<HTMLDivElement>):void=>{
        setStyle({
            left,
            top,
            width,
            height
        });
    }
    return <ul className="tableHead"
    onMouseDown={checkElement}
        style={{
            position:'absolute',
            width:(item.width+1)+'px',
            height:item.height+'px',
            left:item.left+'px',
            top:item.top+'px',
            transform:`rotate(${item.rotate}deg)`,
            zIndex:checkTxt?1100:zIndex,
            background:item.background
         }}  >
        {tableData.map((item,index)=><li 
        key={index} className={item.type}
        style={{width:liWidth+'px',height:liHeight+'px'}}
        
        >
            <div
            ref={txt}
            onMouseDown={checkElement}
            onBlur={blurHandle}
            onInput={handleInput}
            contentEditable={enable}
            onClick={doubleClick}
            suppressContentEditableWarning={true}></div>
        </li>)}
    </ul>
}