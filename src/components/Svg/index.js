/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:51:58
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-12 16:50:00
 * @FilePath: /2d-ediotor/src/components/Img/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Context} from '../../App';
import {useContext,useEffect,useState } from 'react';
import svg from '../../bs.svg'
const readFile = (filePath) => {
    // 创建一个新的xhr对象
    let xhr = null;
    xhr = new XMLHttpRequest();
    const okStatus = document.location.protocol === "file" ? 0 : 200;
    xhr.open("GET", filePath, false);
    xhr.overrideMimeType("image/svg+xml");
    xhr.send(null);
    return xhr.status === okStatus ? xhr.responseText : null;
};
export default function Svg({item,index}){
    const {setStyle,currentCom,setIndex,setShow,setTxtDom}=useContext(Context);
    const {left,top,width,height,url,rotate}=item;
    
    let svgFile=readFile(url);
    let result=''
    if(svgFile&&svgFile.indexOf("<svg")>-1){
        let svgFileSplit=svgFile.split('<svg')
        let final=svgFileSplit[0]+'<svg preserveAspectRatio="none"'+svgFileSplit[1];
        let _p=''
        if(final.indexOf('style=')>-1){
            _p=final.split('style="');
            result=_p[0]+'style="width:100%;height:100%;'+_p[1]
        }else{
            result=svgFileSplit[0]+'<svg preserveAspectRatio="none" style="width:100%;height:100%"'+svgFileSplit[1]
        }
    }
    
    const checkElement=(e)=>{
        e.stopPropagation();
        currentCom.current=item
        setStyle({
            left,
            top,
            width,
            height,
            rotate
        });
        setIndex(index);
        setShow(true);
        setTxtDom(null)
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return  <div 
    className='item'
    
    key={item.type} 
    src={svg}
    style={{
        position:item.position,
        width:item.width+'px',
        height:item.height+'px',
        left:item.left+'px',
        top:item.top+'px',
        transform:`rotate(${item.rotate}deg)`,
        background:item.background
    }}  
    onMouseDown={checkElement}>
       <div style={{ width:item.width+'px',
        height:item.height+'px',}} dangerouslySetInnerHTML={{__html:result}}></div>
    </div>
}