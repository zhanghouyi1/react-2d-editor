/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-02 10:02:46
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-16 16:54:04
 * @FilePath: /test-zu/src/utils/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import bs from '../bs.svg'
export const element=[
    {
      type:'div', 
      position: 'absolute',
      width: 200,
      height: 200,
      background: 'red',
      left: 20,
      rotate:0,
      top: 80,
    },
    {
      type:'img', 
      position: 'absolute',
      width: 300,
      url:require('../1.png'),
      height: 200,
      background: 'red',
      left: 234,
      rotate:0,
      top: 193,
    },
    {
      type:'svg', 
      position: 'absolute',
      width: 100,
      url:bs,
      height: 100,
      background: 'red',
      left: 300,
      rotate:0,
      top: 300,
    },
    {
      type:'txt',
      txt:"你好",
      position: 'absolute',
      fontSize:40,
      left: 200,
      rotate:0,
      top: 20,
      zIndex:1
    }
]

export const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'];
export const vertex = ['e', 'w', 'ne', 'nw', 'se', 'sw'];
export const opposition={
  e:'w', w:'e', s:'n', n:'s', ne:'sw', nw:'se', se:'nw', sw:'ne'
}