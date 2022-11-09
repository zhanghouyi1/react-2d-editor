import React, { ReactElement } from 'react';
import {ImgList} from './components/ImgList/index';
import {TxtArr,SvgArr,imgList,GraphicalArr,TableArr} from '@/utils/data';
import {Child} from '@/utils/Interface'
import './index.less'

interface Props{
    index:number,
    type:string
}
interface Ele{
    img:Array<Child>,
    txt:Array<Child>,
    svg:Array<Child>,
    graphical:Array<Child>,
    table:Array<Child>
}
const ElementObj:Ele={
    img:imgList,
    txt:TxtArr,
    svg:SvgArr,
    graphical:GraphicalArr,
    table:TableArr
}
export const List:React.FC<Props>=({index,type})=>{
    console.log('type',type)

    return <div className='listCon'>
        <ImgList list={ElementObj[type]} />
    </div>
}