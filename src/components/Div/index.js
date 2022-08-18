/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:52:03
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-17 15:58:18
 * @FilePath: /test-zu/src/components/Div/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {BoardContext} from '../../pages/Board/index';
import {useContext } from 'react';

export default function Div({item,index}){
    const {setStyle,currentCom,setIndex,setShow,setTxtDom}=useContext(BoardContext);
    const {left,top,width,height,rotate}=item;
    let obj={left,top,width,height,rotate}
    const checkElement=(e)=>{
        e.stopPropagation();
        currentCom.current=item
        setStyle({
            ...obj
        });
        setIndex(index);
        setShow(true);
        setTxtDom(null);
    }

    return <div 
    key={item.type} 
    className='item' 
    style={{
        position:item.position,
        width:item.width+'px',
        height:item.height+'px',
        left:item.left+'px',
        top:item.top+'px',
        transform:`rotate(${item.rotate}deg)`,
        background:item.background
    }}  
    onMouseDown={checkElement}>1111</div>
}