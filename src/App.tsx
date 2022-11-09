/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-17 09:37:28
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 16:07:32
 * @FilePath: /2d-ediotor/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{ useState,createContext,useRef} from 'react';
import '@/App.less';
import {Board} from '@/pages/Board';
import {Top} from '@/pages/top';
import {Left} from '@/pages/Left/index';
import {Right} from '@/pages/Right/index';
import {generateID} from '@/utils/utils';
import {Modal} from '@/businessComponents/Modal/index';
import {Child,Variable} from './utils/Interface';

export const Context=createContext<Variable>({});
export const App:React.FC=()=>{
   //画布dom
  const editor=useRef<HTMLDivElement>(null);
  //有效区域
  const editorMain=useRef<HTMLDivElement>();
  //全局宽高
  const [wh,setWh]=useState<object>({width:0,height:0});
  //页面宽高比例
  const [proportion,setProportion]=useState<number>(1)
  const [data,setData]=useState<Child[]>([]);
  const [currentItem,setCurrentItem]=useState<Child>();
  //选择了哪个 元素的坐标
  const [index,setIndex]=useState<number|undefined>(0);
  const dragOver=(e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
  }
  /**弹窗显示 */
  const [showModal,setShowModal]=useState<boolean>(false);
  /**弹窗内容显示 */
  const [modalType,setModalType]=useState<string>('')

const dragHandle=(e:React.DragEvent<HTMLDivElement>)=>{
  let obj:any={...currentItem};

  obj.top = e.clientY-editor.current!.getBoundingClientRect().top
  obj.left = e.clientX - editor.current!.getBoundingClientRect().left;
  obj.id=generateID()

  const _d=data.concat([{...obj}])
  setData(_d)
}

 /**双击事件 */
  return <Context.Provider value={{
    data,
    setData,
    setCurrentItem,
    index,
    setIndex,
    editor,
    editorMain,
    wh,
    setWh,
    setShowModal,
    modalType,
    setModalType,
    proportion,
    setProportion
    }}>
    <div className='containt'>
      <div>
        <Top />
      </div>
      <div className='main-containt'>
        <div className='left-list'>
          <Left />
        </div>
        <div className='middle'>
          <div onDrop={dragHandle} onDragOver={dragOver}  className='middle-containt'>
            <Board />
          </div>
        </div>
        <div className="right-list">
          <Right />
        </div>
        {showModal?<Modal />:''}
      </div>
    </div>
  </Context.Provider> 
}
