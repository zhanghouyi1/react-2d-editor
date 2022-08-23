/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 13:51:58
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-23 15:26:23
 * @FilePath: /2d-ediotor/src/components/Img/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {BoardContext} from '../../pages/Board/index';
import React, {useContext} from 'react';

import {Props} from '../../utils/Interface'
const readFile = (filePath:string):any => {
    // 创建一个新的xhr对象
    let xhr:any = null;
    xhr = new XMLHttpRequest();
    const okStatus:any = document.location.protocol === "file" ? 0 : 200;
    xhr.open("GET", filePath, false);
    xhr.overrideMimeType("image/svg+xml");
    xhr.send(null);
    return xhr.status === okStatus ? xhr.responseText : null;
};
export const Svg:React.FC<Props>=({item,index})=>{
    const {setStyle,currentCom,setIndex,setShow,setTxtDom}=useContext(BoardContext);
    const {left,top,width,height,url,rotate,borderRadius,opacity}=item;
    
    let svgFile:any=readFile(url);
    let result:string=''
    if(svgFile&&svgFile.indexOf("<svg")>-1){
        let svgFileSplit:Array<string>=svgFile.split('<svg')
        let final:string=svgFileSplit[0]+'<svg preserveAspectRatio="none"'+svgFileSplit[1];
        let _p:Array<string>=[]
        if(final.indexOf('style=')>-1){
            _p=final.split('style="');
            result=_p[0]+'style="width:100%;height:100%;'+_p[1]
        }else{
            result=svgFileSplit[0]+'<svg preserveAspectRatio="none" style="width:100%;height:100%"'+svgFileSplit[1]
        }
    }
    
    const checkElement=(e:React.MouseEvent<HTMLDivElement>):void=>{
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
        setTxtDom(null);
    }
    
    return  <div 
    className='item'
    
    key={item.type} 
    style={{
        position:'absolute',
        width:width+'px',
        height:height+'px',
        left:left+'px',
        top:top+'px',
        transform:`rotate(${rotate}deg)`,
        background:item.background,
        borderRadius:`${borderRadius}%`,
        opacity:opacity
    }}  
    onMouseDown={checkElement}>
       <div style={{ width:width+'px',
        height:height+'px'}} dangerouslySetInnerHTML={{__html:result}}></div>
    </div>
}