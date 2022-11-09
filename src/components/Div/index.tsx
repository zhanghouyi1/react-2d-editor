/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:52:03
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-23 15:25:56
 * @FilePath: /test-zu/src/components/Div/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {BoardContext} from '../../pages/Board/index';
import React, {useContext } from 'react';
import {Context} from '../../App';
import {Props} from '../../utils/Interface'

export const Div:React.FC<Props>=(props)=>{
    const {item,index}=props
    const {setStyle,currentCom,setIndex,setShow,setTxtDom}=useContext(BoardContext);
    const {proportion}=useContext(Context);
    const {left,top,width,height,rotate,border,borderRadius,opacity}=item;
    let obj={left,top,width,height,rotate}
    const checkElement=(e:React.MouseEvent<HTMLDivElement>):void=>{
        e.stopPropagation();
        currentCom.current=item
        setStyle({
            ...obj
        });
        console.log('index',index)
        setIndex(index);
        setShow(true);
        setTxtDom(null);
    }
    console.log('proportion',proportion)
    return <div 
    key={item.type} 
    className='item' 
    style={{
        position:'absolute',
        width:width+'px',
        height:height+'px',
        left:left+'px',
        top:top+'px',
        transform:`rotate(${rotate}deg)`,
        background:item.background,
        border:border,
        borderRadius:`${borderRadius}%`,
        opacity:opacity
    }}  
    onMouseDown={checkElement}></div>
}