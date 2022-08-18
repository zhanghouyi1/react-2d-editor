/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-18 17:14:40
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 17:22:47
 * @FilePath: /2d-ediotor/src/components/Table/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const table=[
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
export const Table=()=>{
    return <ul className="tableHead" style={{width:'200px'}}>
        {table.map((item,index)=><li className="tabTh"></li>)}
    </ul>
}