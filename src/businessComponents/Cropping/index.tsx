import React,{useEffect,useRef,useState} from "react";
import './index.css'

const Cropping:React.FC=()=>{
    const canvas=useRef<HTMLCanvasElement>();
    const img = new Image();
    let scaleX:number=1;
    let scaleY:number;
    let cropH = 80; //截图框默认高度
    let cropW = 80; //截图框默认高度
    let posX:number=0
    let posY:number=0
    useEffect(()=>{
        const ctx=canvas.current.getContext('2d');
        
        img.src = './1.jpg';
        img.setAttribute('id', 'img');
        img.width = 600;
        img.height = 600;
        let originWidth:number;
        let originHeight:number;
        
        img.onload = function () {
            console.log('onload()执行...');
            ctx.drawImage(img, 0, 0, 800, 800);
            originWidth = img.naturalWidth;
            originHeight = img.naturalHeight;
          

            scaleX=img.width/originWidth;
            scaleY=img.height/originHeight;
            

            posX = canvas.current.width / 2 - cropW / 2; // 截图框左上角x坐标
            posY = canvas.current.height / 2 - cropH / 2;
        };

        
    })
    return <div>
        <div className="imgDiv" id="imgDiv">
            <div className="oRelDiv" style={{
                width:img.width+'px',
                height:img.height+'px',
            }}>
                <div id="zxxCropBox" style={{height:cropH + 'px',width:cropW +'px', position:'absolute',left:posX + 'px',top:posY + 'px',border:'1px solid black'}}>
                    <div className="zxxDragBg" id="zxxDragBg"></div>
                    <div className="dragLeftTop" id="dragLeftTop"></div>
                    <div className="dragLeftBot" id="dragLeftBot"></div>
                    <div className="dragRightTop" id="dragRightTop"></div>
                    <div className="dragRightBot" id="dragRightBot"></div>
                    <div className="dragRightBot" id="dragTopCenter"></div>
                    <div className="dragBotCenter" id="dragBotCenter"></div>
                    <div className="dragRightCenter" id="dragRightCenter"></div>
                    <div className="dragLeftCenter" id="dragLeftCenter"></div>
                </div>
            </div>
            <canvas ref={canvas} width={600} height={600} className="imgCanvas" />
        </div>
    </div>
}