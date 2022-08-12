/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:51:58
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-12 16:50:35
 * @FilePath: /2d-ediotor/src/components/Img/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Context} from '../../App';
import {useContext } from 'react';
export default function Img({item,index}){
    const {setStyle,currentCom,setIndex,setShow,setTxtDom}=useContext(Context);
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
        setTxtDom(null)
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return  <img 
    className='item' 
    key={item.type} 
    src={item.url} 
    style={{
        position:item.position,
        width:item.width+'px',
        height:item.height+'px',
        left:item.left+'px',
        top:item.top+'px',
        transform:`rotate(${item.rotate}deg)`,
        background:item.background
    }}  
    onMouseDown={checkElement} />
}