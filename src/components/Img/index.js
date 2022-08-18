/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:51:58
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 17:33:35
 * @FilePath: /2d-ediotor/src/components/Img/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {BoardContext} from '../../pages/Board/index';
import {useContext, useMemo} from 'react';
function Index({item,index}){
    const {setStyle,currentCom,setIndex,setShow,setTxtDom}=useContext(BoardContext);
    const {left,top,width,height,rotate}=item
    const checkElement=(e)=>{
        e.stopPropagation();
        currentCom.current=item
        setStyle({
            left,
            top,
            width,
            height,rotate
        });
        setIndex(index);
        setShow(true);
        setTxtDom(null);
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return  <img 
    className='item' 
    key={item.type} 
    src={item.url} 
    style={{
        position:'absolute',
        width:item.width+'px',
        height:item.height+'px',
        left:item.left+'px',
        top:item.top+'px',
        transform:`rotate(${item.rotate}deg)`,
        background:item.background
    }}  
    onMouseDown={checkElement} />
}

export const Img=({item,index})=>{
    return useMemo(()=><Index item={item} index={index} />,[item,index])
}