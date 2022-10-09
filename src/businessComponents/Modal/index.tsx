import React,{useContext} from 'react';
import './index.less';
import {Context} from '../../App';
import {Child} from '../../utils/Interface';
import {Cut} from '../Cut/index'
import {CustomCut} from '../CustomCut/index'

export const Modal:React.FC=()=>{
    const {data,index,setShowModal,setData,modalType}=useContext(Context);
    let item:Child=null;
    if(index>=0){
        item=data[index];
        console.log('item',item)
    }
    const onClose=(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        setShowModal(false)
    }
    const onOk=(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        console.log(2)
    }
    const onGetDarta=(e:string)=>{
        if(e){
            setShowModal(false);
            data[index]['url']=e;
            const arr=[].concat(data);
            setData(arr)
        }
    }
    const cutImgChange=(imgSrcData, w, h)=>{
        if(imgSrcData){
            setShowModal(false);
            data[index]['url']=imgSrcData;
            const arr=[].concat(data);
            setData(arr)
        }
    }
    return <div className='modal' onClick={onClose}>
        <div className='modalContaint' onClick={onOk}>
            {
               modalType==='cut'?<Cut imgURL={item.url} onSaveHandler={onGetDarta} />:''
            }
            {
                modalType==='customCut'?<CustomCut imgURL={item.url} getCutImg={cutImgChange} width={item.width} height={item.height} />:''
            }
            
        </div>
    </div>
}