/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-17 09:37:28
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-22 15:02:02
 * @FilePath: /2d-ediotor/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{ useState,createContext} from 'react';
import './App.css';
import {Board} from './pages/Board';
import {Left} from './pages/Left/index'
import {Right} from './pages/Right/index'
import {generateID} from './utils/utils'
import {Child,Variable} from './utils/Interface'

export const Context=createContext<Variable>({});
export const App:React.FC=()=>{
  const [data,setData]=useState<Child[]>([]);
  const [currentItem,setCurrentItem]=useState<Child>();
  //选择了哪个 元素的坐标
  const [index,setIndex]=useState<number>(null);
  const dragOver=(e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault()
  }

const dragHandle=(e:React.DragEvent<HTMLDivElement>)=>{
  let obj:Child={...currentItem};
  obj.top = e.clientY
  obj.left = e.clientX - 200;
  obj.id=generateID()

  const _d=data.concat([{...obj}])
  setData(_d)
}

 /**双击事件 */
  return <Context.Provider value={{data,setData,setCurrentItem,index,setIndex}}>
    <main className='containt'>
      <section className='left-list'>
        <Left />
      </section>
      <section className='middle'>
        <div onDrop={dragHandle} onDragOver={dragOver}  className='middle-containt'>
          <Board />
        </div>
      </section>
      <section className="right-list">
        <Right />
      </section>
    </main>
  </Context.Provider> 
}
