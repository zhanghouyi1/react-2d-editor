/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-17 09:37:28
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-17 17:44:41
 * @FilePath: /2d-ediotor/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{ useState,createContext} from 'react';
import './App.css';
import {element,} from './utils/data'
import Board from './pages/Board';

export const Context=createContext({});

function App() {
  const [data,setData]=useState(element)
 /**双击事件 */
  return <Context.Provider value={{data,setData}}>
    <main className='containt'>
      <section className='left-list'></section>
      <section className='middle'>
        <div className='middle-containt'>
          <Board />
        </div>
      </section>
      <section className="right-list"></section>
    </main>
  </Context.Provider> 
}

export default App;
