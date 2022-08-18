/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-02 10:02:46
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 17:55:02
 * @FilePath: /test-zu/src/utils/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import bs from '../bs.svg'
import img from '../accets/img/img.png';
import txt from '../accets/img/txt.png';
import svg from '../accets/img/svg.png';
import circular from '../accets/img/circular.png';
import table from '../accets/img/table.png'


export const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'];
export const vertex = ['e', 'w', 'ne', 'nw', 'se', 'sw'];
export const opposition={
  e:'w', w:'e', s:'n', n:'s', ne:'sw', nw:'se', se:'nw', sw:'ne'
}


/**左侧数据 */
export const list=[
  {
    type:'img',
    name:'图片',
    icon:img,
    width: 300,
    url:require('../1.png'),
    height: 200,
    background: 'red',
    left: 0,
    rotate:0,
    top: 0,
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
    zIndex:1
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
    icon:svg,
  },
  {
    type:'div',
    name:'圆环',
    icon:circular,
    width: 200,
    height: 200,
    background: 'none',
    left: 20,
    rotate:0,
    top: 80,
    borderRadius:'50%',
    border:'1px solid #000'
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
    zIndex:1
  },
]

export const tableData=[
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