/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-22 14:18:50
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 16:01:05
 * @FilePath: /react-2d-editor/src/utils/data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-02 10:02:46
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-22 17:25:04
 * @FilePath: /test-zu/src/utils/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import bs from '@/assets/svg/bs.svg'
import hs from '@/assets/svg/hs.svg'
import img from '@/assets/img/img.png';
import txt from '@/assets/img/txt.png';
import svg from '@/assets/img/svg.png';
import img1 from '@/assets/img/1.jpg';
import img2 from '@/assets/img/2.jpg';
import img3 from '@/assets/img/3.jpg';
import nihao from '@/assets/img/nihao.png';
import table1 from '@/assets/img/table1.png';

import circular from '@/assets/img/circular.png';
import table from '@/assets/img/table.png'
import {Child,TableData} from './Interface'
import web from '@/assets/img/images.jpeg'
export const points:Array<string> = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'];
export const vertex:Array<string> = ['e', 'w', 'ne', 'nw', 'se', 'sw'];


/**左侧数据 */
export const list:Child[]=[
  {
    type:'img',
    name:'图片',
    icon:img,
    width: 300,
    url:web,
    height: 200,
    background: 'red',
    left: 0,
    rotate:0,
    borderRadius:0,
    top: 0,
    opacity:1
  },
  {
    type:'txt',
    name:'文字',
    icon:txt,
    txt:"你好",
    fontSize:40,
    left: 0,
    rotate:0,
    top: 0,
    borderRadius:0,
    zIndex:1,
    opacity:1,
    color:'#999'
  },
  {
    type:'svg',
    name:'svg',
    width: 100,
    url:bs,
    height: 100,
    background: 'red',
    left: 300,
    rotate:0,
    top: 300,
    borderRadius:0,
    icon:svg,
    opacity:1
  },
  {
    type:'graphical',
    name:'图形',
    icon:circular,
    width: 200,
    height: 200,
    background: 'none',
    left: 20,
    rotate:0,
    top: 80,
    borderRadius:50,
    border:'1px solid #000',
    opacity:1
  },
  {
    type:'table',
    name:'表格',
    icon:table,
    width: 260,
    height: 120,
    background: 'none',
    left: 20,
    rotate:0,
    top: 0,
    borderRadius:0,
    zIndex:1,
    opacity:1
  },
]

export const tableData:Array<TableData>=[
  {
      type:'th',
  },
  {
      type:'th',
  },{
      type:'th',
  },{
      type:'th',
  },
  {
      type:'td',
  },
  {
      type:'td',
  },{
      type:'td',
  },{
      type:'td',
  },
  {
      type:'td',
  },
  {
      type:'td',
  },{
      type:'td',
  },{
      type:'td',
  }
]


/**图片列表 */
export const imgList:Array<Child>=[
  {
    type:'img',
    name:'图片1',
    icon:img1,
    width: 325,
    url:img1,
    height: 281,
    background: 'red',
    left: 0,
    rotate:0,
    borderRadius:0,
    top: 0,
    opacity:1
  },
  {
    type:'img',
    name:'图片2',
    icon:img2,
    width: 200,
    url:img2,
    height: 200,
    background: 'red',
    left: 0,
    rotate:0,
    borderRadius:0,
    top: 0,
    opacity:1
  },
  {
    type:'img',
    name:'图片3',
    icon:img3,
    width: 200,
    url:img3,
    height: 200,
    background: 'red',
    left: 0,
    rotate:0,
    borderRadius:0,
    top: 0,
    opacity:1
  }
]
// 文字
export const TxtArr:Array<Child>=[{
  type:'txt',
  name:'文字',
  icon:txt,
  txt:"你好",
  fontSize:40,
  left: 0,
  rotate:0,
  top: 0,
  borderRadius:0,
  zIndex:1,
  opacity:1,
  color:'#000',
  url:nihao
}]

export const SvgArr:Array<Child>=[{
  type:'svg',
  name:'svg',
  width: 100,
  url:bs,
  height: 100,
  background: 'red',
  left: 300,
  rotate:0,
  top: 300,
  borderRadius:0,
  icon:svg,
  opacity:1
},
{
  type:'svg',
  name:'svg1',
  width: 100,
  url:hs,
  height: 100,
  background: 'red',
  left: 300,
  rotate:0,
  top: 300,
  borderRadius:0,
  icon:svg,
  opacity:1
}]

export const GraphicalArr:Array<Child>=[
  {
    type:'graphical',
    name:'图形',
    icon:circular,
    url:circular,
    width: 200,
    height: 200,
    background: 'none',
    left: 20,
    rotate:0,
    top: 80,
    borderRadius:50,
    border:'1px solid #000',
    opacity:1
  }
]
export const TableArr:Array<Child>=[
  {
    type:'table',
    name:'表格',
    icon:table,
    width: 260,
    height: 120,
    background: 'none',
    left: 20,
    rotate:0,
    top: 0,
    url:table1,
    borderRadius:0,
    zIndex:1,
    opacity:1
  }
]