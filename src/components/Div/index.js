/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:52:03
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-10 15:37:36
 * @FilePath: /test-zu/src/components/Div/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Context} from '../../App';
import {useContext } from 'react';

export default function Div({item,index}){
    const {setStyle,setCurrentCom,setIndex,setShow}=useContext(Context);
    const {left,top,width,height}=item;
    let obj={left,top,width,height}
    const checkElement=(e)=>{
        e.stopPropagation();
        setCurrentCom.current=item
        setStyle({
            ...obj
        });
        setIndex(index);
        setShow(true);
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
        background:item.background
    }}  
    onMouseDown={checkElement}>1111</div>
}