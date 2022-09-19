/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-22 14:26:48
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-23 15:15:43
 * @FilePath: /react-2d-editor/src/pages/Right/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{useContext,useRef, useState,useEffect} from "react";
import {Context} from '../../App';
import {Child} from '../../utils/Interface';
import {Counter} from '../../businessComponents/Counter/index';
import {Color} from '../../businessComponents/Color/index'
import './index.css'
/**右侧操作面板 暂时 先加入 圆角透明等操作*/
interface Type{
    img:string,
    txt:string,
    svg:string,
    table:string,
    div:string
}
 export const Right:React.FC=()=>{
    const {index,data,setData,setWh,wh,setShowModal,editorMain}=useContext(Context);
    const refW=useRef<HTMLInputElement>();
    const refH=useRef<HTMLInputElement>();
    const [visibility,setVisibility]=useState<boolean>(false);
    const [bWidth,setBWidth]=useState<number>(0);
    const [bHidth,setBHidth]=useState<number>(0)
    
    useEffect(()=>{
        setBWidth(Number(wh.width.toFixed(2)))
        setBHidth(Number(wh.height.toFixed(2)))
    },[wh.width,wh.height])
    let item:Child=null;
    const type:Type={
        txt:'文字',
        img:'图片',
        svg:'svg',
        table:'表格',
        div:'普通'
    }
    if(index>=0){
        item=data[index];
        console.log('item',item)
    }
    const getCount=(e:number,type:string):void=>{
        data[index][type]=e;
        const arr=[].concat(data);
        setData(arr)
    }
    const changeHandleW=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setBWidth(Number(refW.current.value))
     
    }
    const onShowCut=():void=>{
        setShowModal(true)
    }
    const changeHandleH=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setBHidth(Number(refH.current.value))
    }
    const getLength=()=>{
        let rect=editorMain.current.getBoundingClientRect();
    let proportion:number=1;
    //先判断是长大于宽还是宽大于长
    let isAWidth:boolean=rect.width>=rect.height;
        const width=bWidth;
        const height=bHidth;
        let isBWidth:boolean=width>=height;
        if(isBWidth&&isAWidth){
            console.log(2)
            if(width>height){
                proportion=rect.width/width
            }else{
                proportion=rect.height/height
            }
        }else if(isBWidth&&!isAWidth){
            console.log(3)
            proportion=rect.width/width
            
        }else if(!isBWidth&&isAWidth){
            console.log(4)
            proportion=rect.height/height
        }else{
            console.log(5)
            proportion=rect.width/width
        }
        
        proportion=Number(proportion.toFixed(2))
        setWh({
            width:Number(width*proportion),
            height:Number(height*proportion)
        });
    }
    /**颜色选择 */
    const checkColorChange=()=>{
        setVisibility(true)
    }
    const getColor=(e:string)=>{
        console.log(e);
        
        data[index]['color']=e;
        const arr=[].concat(data);
        console.log('arr',arr)
        setData(arr)
        setVisibility(false);
        console.log('hahah',visibility)
    }
    return <div className="operation">
        {item?
        <div>
            <div className="title">{type[item.type]}</div>
            <ul className="operation-list">
                <li>
                    <div className="label">圆角: </div>
                    <Counter count={item.borderRadius} difference={1} type='borderRadius' onCallBack={getCount} />
                </li>
                <li>
                    <div className="label">透明度: </div>
                    <Counter count={item.opacity} difference={0.1} type='opacity' onCallBack={getCount} />
                </li>
                {item.color? <li>
                    <div className="label">颜色: </div>
                    <div className='colorTxt'>{item.color}</div>
                    <div className='colorBack' onClick={checkColorChange} style={{background:item.color}}>
                        
                    </div>
                    {visibility?(<Color position={{top:'33px',right:'0px'}} colorChange={getColor} />):''}
                </li>:''}
            </ul>
            {item.type==='img'?<div className='cutItem'>
               <div onClick={onShowCut}>裁剪</div>
               {/* <div>裁剪</div>
               <div>裁剪</div> */}
            </div>:''}
               {/* 颜色 */}
            
        </div>
        :<div>
            <div className='wh'>
            <div className="label">长度: </div>
            <input className="borderWidth" ref={refW} value={bWidth} onChange={changeHandleW} type="text" />
            </div>
            <div className='wh'>
            <div className="label">高度: </div>
            <input className="borderWidth" ref={refH} value={bHidth} onChange={changeHandleH} type="text" />
            </div>
            <div onClick={getLength} className="lengthTrue">确定</div>
        </div>}
    </div>
 }