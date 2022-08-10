import {Context} from '../../App';
import {useContext } from 'react';
export default function Img({item,index}){
    const {setStyle,setCurrentCom,setIndex,setShow}=useContext(Context);
    const {left,top,width,height}=item
    const checkElement=(e)=>{
        e.stopPropagation();
        setCurrentCom.current=item
        setStyle({
            left,
            top,
            width,
            height
        });
        setIndex(index);
        setShow(true);
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return  <img 
    className='item' 
    key={item.type} 
    src={item.url} 
    style={{
        position:item.position,
        width:item.width+'px',
        height:item.height+'px',
        left:item.left+'px',
        top:item.top+'px',
        background:item.background
    }}  
    onMouseDown={checkElement} />
}