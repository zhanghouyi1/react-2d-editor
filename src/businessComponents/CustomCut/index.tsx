import React,{useEffect, useRef} from 'react';
import {Cut} from '../../utils/customCut';
import './index.less'


export const CustomCut=({imgURL,getCutImg,width,height})=>{
    let canvas=useRef();
    let  _penCutout=null;
    useEffect(()=>{  
        _penCutout = new Cut({
            drawPanel: "drawPanel",
            imgSrc:imgURL,
            penColor: "#000",
            width,
            height,
            canvasId:canvas.current,
        })
    })
    const redoChange=()=>{
        _penCutout.ReDo();
    }
    const cutChange=()=>{
        _penCutout.createCutImg((imgSrcData, w, h)=>{
            getCutImg(imgSrcData, w, h)
        })
    }
    return <div className='penCut'>
        <div className="canvasDiv" style={{
                width:width+2,
                height:height+2,
            }}>
            <img width={width} height={height} style={{
                position:'absolute',
                zIndex:1
            }} src={imgURL} alt=""/>
            <canvas width={width} height={height} ref={canvas} style={{
                position:'absolute',
                zIndex:2
            }}  />
        </div>
        <div className='cutOperation'>
            <div onClick={redoChange}>重做</div>
            <div onClick={cutChange}>保存</div>
        </div>
    </div>
}