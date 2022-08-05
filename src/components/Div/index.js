/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:52:03
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-02 14:49:57
 * @FilePath: /test-zu/src/components/Div/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export default function Div({item,index,onCheckBox}){
    const checkElement=(e)=>{
        e.stopPropagation();
        onCheckBox(item,index)
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