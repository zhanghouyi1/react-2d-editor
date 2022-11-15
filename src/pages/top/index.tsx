import React,{useContext} from 'react';
import html2canvas from 'html2canvas';
import {Context} from '../../App';
import './index.less'

export const Top:React.FC=()=>{
    const {editor,wh,proportion}=useContext(Context);
    const canvas:HTMLCanvasElement = document.createElement("canvas");
    canvas.width=wh.width;
    canvas.height=wh.height;

    const createImage=():void=>{
        html2canvas(editor.current,{
            scale:wh.width/editor.current.getBoundingClientRect().width
        }).then(img=>{
            console.log(wh);
            console.log(proportion,editor.current.getBoundingClientRect());
            console.log(wh.width/proportion,wh.height/proportion)
            console.log(img)
            console.log(img.toDataURL());
            setTimeout(()=>{
                let link = document.createElement("a");//创建一个超链接对象实例
                link.href = img.toDataURL();
                link.setAttribute("download", "截图.png");
                link.click();
            })
        });
    }
    return <div className='topContaint'>
        <div className='left'></div>
        <div className='middle'></div>
        <div className='right'>
            <div onClick={()=>createImage()} className='btn'>
                合成图片
            </div>
        </div>
    </div>
}