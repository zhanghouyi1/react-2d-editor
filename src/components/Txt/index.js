/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 14:40:36
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-05 14:41:07
 * @FilePath: /test-zu/src/components/Txt/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './txt.css'
import {useState,useRef,useEffect} from 'react';
export default function Txt({item,index,onCheckBox}){
    const [enable,setEnable]=useState(false);

    
    let _ref=useRef()
    /**双击事件 */
    const doubleClick=()=>{
        console.log('qq')
        setEnable(true)
    }
    /**单击事件 */
    const checkElement=(e)=>{
        
        e.stopPropagation();
        onCheckBox(item,index,_ref)
    }
    /**失去焦点 */
    const blurHandle=()=>{
        console.log('失去焦点')
    }
    return <div 
        className="txt" 
        style={{
            width:item.width+'px',
            height:item.height+'px',
            left:item.left+'px',
            top:item.top+'px',
            background:item.background,
            fontSize:item.fontSize,
            zIndex:item.zIndex||0
        }} 
        ref={_ref} 
        onMouseDown={checkElement}
        onBlur={blurHandle}
        contentEditable={enable}
        onDoubleClick={doubleClick}
        suppressContentEditableWarning={true}
    >{item.txt}</div>
}