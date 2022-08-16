/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 14:40:36
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-16 17:57:27
 * @FilePath: /2d-ediotor/src/components/Txt/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Context} from '../../App';
import {useContext,useState,useRef} from 'react';
import './txt.css'
export default function Txt({item,index}){
    const {setStyle,currentCom,setIndex,setShow,setTxtDom,original,checkTxt,setData,data}=useContext(Context);
    const {left,top,width,height,rotate}=item
    const [enable,setEnable]=useState(false);
    // useEffect(()=>{

    // },checkTxt)
    let _ref=useRef()
    /**双击事件 */
    const doubleClick=()=>{
        setEnable(true)
    }
    /**单击事件 */
    const checkElement=(e)=>{
        e.stopPropagation();
        console.log(item)
        currentCom.current=item
        setTxtDom(_ref.current)
        const {clientWidth,clientHeight}=_ref.current
        setStyle({
            left,
            top,
            width:clientWidth||width,
            height:clientHeight||height,
            rotate
        });
        data[index].width=clientWidth||width
        setData(data)
        original.current.width=clientWidth||width
        original.current.height=clientHeight||height
        original.current.fontSize=item.fontSize;
        setIndex(index);
        setShow(true);
    }
    /**失去焦点 */
    const blurHandle=()=>{
        setEnable(false)
    }
    /**co */
    const handleInput=(e)=>{
        console.log(e.target.innerHTML);
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
            width:item.width+'px',
            left:item.left+'px',
            top:item.top+'px',
            background:item.background,
            fontSize:item.fontSize,
            zIndex:checkTxt?1100:item.zIndex,
            transform:`rotate(${item.rotate}deg)`
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