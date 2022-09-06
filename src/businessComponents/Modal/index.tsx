import React,{useContext} from 'react';
import './index.css';
import {Context} from '../../App';
import {Child} from '../../utils/Interface';
import {Cut} from '../Cut/index'

export const Modal:React.FC=()=>{
    const {data,index,setShowModal,setData}=useContext(Context);
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
    return <div className='modal' onClick={onClose}>
        <div className='modalContaint' onClick={onOk}>
            <Cut imgURL={item.url} onSaveHandler={onGetDarta} />
        </div>
    </div>
}