import React,{useState,useRef} from 'react';
import {getRgba} from '../../utils/calculation';
import {rgbToString} from '../../utils/utils'
import './index.css'

interface SlideStyle{
    top:string,
    left:string
}
interface ColorStyle{
    top?:string,
    left?:string,
    bottom?:string,
    right?:string
}
interface PositionStyle{
   position?:ColorStyle,
    colorChange?:Function
}

export const Color:React.FC<PositionStyle>=({position,colorChange})=>{
    const [flag,setFlag]=useState<boolean>(false);
    const [hval,setHval]=useState<number>(0);
    const [sval,setSval]=useState<number>(0.5);
    const [vval,setVval]=useState<number>(100);
    const [hSlideTop,setHSlideTop]=useState<string>('-7px');
    const colorValue=useRef<HTMLInputElement>()
    const [sVSlide,setSVSlide]=useState<SlideStyle>({
        top:'0px',
        left:'0px'
    });
    const [endColors,setEndColors]=useState<string>("#ff0000");
    const [colorTitle,setColorTitle]=useState<string>(rgbToString('rgb(255, 255, 255)'))


    const H=useRef<HTMLDivElement>();
    const SV=useRef<HTMLDivElement>();
    
    const onReactDown=(e:React.MouseEvent<SVGRectElement>)=>{
        setFlag(true)
    }

    const onReactMove=(ev:React.MouseEvent<SVGRectElement>)=>{
        if(!flag) return;
         let offsetY:number = ev.nativeEvent.offsetY / H.current.offsetHeight;
         setHSlideTop(ev.nativeEvent.offsetY - 8 + 'px');
         console.log('offsetY',offsetY)
         setHval(360 * offsetY);
         setHSV();
    }
    const onReactUp=()=>{
        setFlag(false)
    }
     const  setHSV=()=>{
        let color:string = rgbToString(`rgb(${getRgba(hval, sval, vval).join(',')})`);
        let StopColor = `rgb(${getRgba(hval, 100, 100).join(',')})`;
        setEndColors(StopColor);
        setColorTitle(color);
        //最终颜色
        console.log('color',rgbToString(color))
    }
    
    const onSvgDown=(e:React.MouseEvent<SVGRectElement>)=>{
        console.log(e.nativeEvent.offsetX / SV.current.offsetWidth * 100);
        console.log((1 - e.nativeEvent.offsetY / SV.current.offsetHeight) * 100)
        setSval(e.nativeEvent.offsetX / SV.current.offsetWidth * 100);
        setVval((1 - e.nativeEvent.offsetY / SV.current.offsetHeight) * 100);
        setSVSlide({
            top:e.nativeEvent.offsetY  + 'px',
            left:e.nativeEvent.offsetX  + 'px'
        })
        setHSV();
    }

    const changeColor=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(colorValue.current.value)
    }

    const makeTrueColorChange=()=>{
        colorChange(colorTitle)
    }

    return <div className="colorComponent" style={{...position}}>
    <div className='colorMain'>
    <div className="svContaint" ref={SV}>
        <svg>
            <defs>
                <linearGradient id="gradient-black" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="1"></stop>
                    <stop className="endColor" offset="100%" stopColor={endColors} stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="gradient-white" x1="100%" y1="100%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={endColors} stopOpacity="1"></stop>
                    <stop className="endColor" offset="100%" stopColor={endColors} stopOpacity="0"></stop>
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-white)"></rect>
            <rect x="0" onMouseDown={onSvgDown} y="0" width="100%" height="100%" fill="url(#gradient-black)"></rect>
        </svg>
        <div style={{top:sVSlide.top,left:sVSlide.left}} className="slide check1"></div>
    </div>
    <div className="hContaint" ref={H}>
        <svg>
            <defs>
                <linearGradient id="gradient-hsv" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FF0000" stopOpacity="1"></stop>
                    <stop offset="13%" stopColor="#FF00FF" stopOpacity="1"></stop>
                    <stop offset="25%" stopColor="#8000FF" stopOpacity="1"></stop>
                    <stop offset="38%" stopColor="#0040FF" stopOpacity="1"></stop>
                    <stop offset="50%" stopColor="#00FFFF" stopOpacity="1"></stop>
                    <stop offset="63%" stopColor="#00FF40" stopOpacity="1"></stop>
                    <stop offset="75%" stopColor="#0BED00" stopOpacity="1"></stop>
                    <stop offset="88%" stopColor="#FFFF00" stopOpacity="1"></stop>
                    <stop offset="100%" stopColor="#FF0000" stopOpacity="1"></stop>
                </linearGradient>
            </defs>
            <rect onMouseDown={onReactDown} onMouseMove={onReactMove} onMouseUp={onReactUp} x="0" y="0" width="100%" height="100%" fill="url(#gradient-hsv)"></rect>
        </svg>
        <div style={{top:hSlideTop}} className="slide check2"></div>
    </div>
    </div>

    <div className="result">
        <div className="show" style={{background: colorTitle}}></div>
        <input ref={colorValue} onChange={changeColor} className="colorTxt" value={colorTitle} />
        <div className='checkColor' onClick={makeTrueColorChange}>确定</div>
    </div>
</div>
}