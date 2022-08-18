/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-08-01 14:11:22
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 17:29:46
 * @FilePath: /test-zu/src/utils/loadComponent.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**策略模式加载组件 */
import {Img} from '../components/Img';
import {Table} from '../components/Table';
import Div from '../components/Div';
import Txt from '../components/Txt';
import Svg from '../components/Svg';

export const _Component=(item,index)=>{
    // eslint-disable-next-line default-case
    switch(item.type){
        case 'img':
            return <Img key={item.id} item={item} index={index} />
        case 'div':
            return <Div key={item.id} item={item} index={index} />
        case 'txt':
            return <Txt key={item.id} item={item} index={index} />
        case 'svg':
            return <Svg key={item.id} item={item} index={index} />
        case 'table':
            return <Table key={item.id} item={item} index={index} />
    }
    
}