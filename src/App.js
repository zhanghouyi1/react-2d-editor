/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-17 09:37:28
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 15:01:25
 * @FilePath: /2d-ediotor/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{ useState,createContext} from 'react';
import './App.css';
import Board from './pages/Board';
import {Left} from './pages/Left/index'
import {generateID} from './utils/utils'
export const Context=createContext({});

function App() {
  const [data,setData]=useState([]);
  const [currentItem,setCurrentItem]=useState(0)
  const dragOver=e=>{
    e.preventDefault()
  }

const dragHandle=e=>{
  let obj={...currentItem};
  obj.top = e.clientY
  obj.left = e.clientX - 200;
  obj.id=generateID()
  const _d=data.concat([{...obj}])
  setData(_d)
  console.log('data',data)
}

 /**双击事件 */
  return <Context.Provider value={{data,setData,setCurrentItem}}>
    <main className='containt'>
      <section className='left-list'>
        <Left />
      </section>
      <section className='middle'>
        <div onDrop={dragHandle} onDragOver={dragOver}  className='middle-containt'>
          <Board />
        </div>
      </section>
      <section className="right-list"></section>
    </main>
  </Context.Provider> 
}

export default App;
