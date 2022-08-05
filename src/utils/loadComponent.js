/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 14:11:22
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-04 14:05:06
 * @FilePath: /test-zu/src/utils/loadComponent.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**策略模式加载组件 */
import Img from '../components/Img';
import Div from '../components/Div';
import Txt from '../components/Txt';

export const _Component=(item,index,cb)=>{
    // eslint-disable-next-line default-case
    switch(item.type){
        case 'img':
            return <Img key={item.type} item={item} index={index} onCheckBox={cb} />
        case 'div':
            return <Div key={item.type} item={item} index={index} onCheckBox={cb} />
        case 'txt':
            return <Txt key={item.type} item={item} index={index} onCheckBox={cb} />
    }
    
}