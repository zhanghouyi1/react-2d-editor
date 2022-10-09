/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 14:40:36
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 16:51:06
 * @FilePath: /2d-ediotor/src/components/Txt/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {BoardContext} from '../../pages/Board/index';
import React,{useContext,useState,useRef} from 'react';
import {Props} from '../../utils/Interface'
import './index.less'

export const Txt:React.FC<Props>=(props)=>{
    const {item,index}=props
    const {setStyle,currentCom,setIndex,setShow,setTxtDom,checkTxt,setData,data}=useContext(BoardContext);
    const {left,top,width,height,rotate,fontSize,zIndex,opacity}=item
    const [enable,setEnable]=useState(false);

    let _ref=useRef<HTMLDivElement>(null)
    /**双击事件 */
    const doubleClick=():void=>{
        setEnable(true)
    }
    /**单击事件 */
    const checkElement=(e:React.MouseEvent<HTMLDivElement>):void=>{
        e.stopPropagation();
        currentCom.current=item
        setTxtDom(_ref.current)
        const {clientWidth,clientHeight}=_ref.current
        setStyle({
            left,
            top,
            width:clientWidth||width,
            height:clientHeight||height,
            rotate,
            fontSize
        });
        data[index].width=clientWidth||width
        setData(data)
        setIndex(index);
        setShow(true);
    }
    /**失去焦点 */
    const blurHandle=():void=>{
        setEnable(false)
    }
    /**co */
    const handleInput=(e:React.MouseEvent<HTMLDivElement>):void=>{
        const {clientWidth,clientHeight}=_ref.current
        setStyle({
            left,
            top,
            width:clientWidth,
            height:clientHeight
        });
    }
    return <div 
        className="txt" 
        style={{
            width:width+'px',
            left:left+'px',
            top:top+'px',
            background:item.background,
            fontSize:fontSize,
            zIndex:checkTxt?1100:zIndex,
            transform:`rotate(${rotate}deg)`,
            opacity,
            color:item.color
        }} 
        ref={_ref} 
        onMouseDown={checkElement}
        onBlur={blurHandle}
        onInput={handleInput}
        contentEditable={enable}
        onClick={doubleClick}
        suppressContentEditableWarning={true}
    >{item.txt}</div>
}