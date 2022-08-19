/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 17:14:40
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-19 14:24:35
 * @FilePath: /2d-ediotor/src/components/Table/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import {BoardContext} from '../../pages/Board/index';
import {useContext,useState,useRef} from 'react';
import {tableData} from '../../utils/data'
import './index.css'

export const Table=({item,index})=>{
    const {setStyle,currentCom,setIndex,setShow,checkTxt}=useContext(BoardContext);
    const {left,top,width,height,rotate,fontSize,zIndex}=item
    const [enable,setEnable]=useState(false);
    const txt=useRef()
    const th=tableData.filter(item=>item.type==='th');
  
    const liWidth=width/th.length;
    const liHeight=height/(tableData.length/th.length)

    /**双击事件 */
    const doubleClick=()=>{
        // const selection = window.getSelection() //
        // const range = document.createRange()
        // range.selectNodeContents(txt[0])
        // selection.removeAllRanges()
        // selection.addRange(range);
        setEnable(true)
    }
    /**单击事件 */
    const checkElement=(e)=>{
        e.stopPropagation();
        console.log(item)
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
    const blurHandle=()=>{
        setEnable(false)
    }
    /**co */
    const handleInput=(e)=>{
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