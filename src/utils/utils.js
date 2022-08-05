/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-07-29 16:28:12
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-05 17:22:55
 * @FilePath: /test-zu/src/utils/utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 元素变化。 方法放在组件外部或者其他地方。 
 * @param direction  方向 // move 移动 / 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
 * @param oriStyle 元素的属性 width height top left
 * @param oriPos   鼠标按下时所记录的坐标 
 * @param e        事件event
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const transform=(direction, oriPos, e)=>{
    const style = {...oriPos.current}
    console.log('...oriPos.current',oriPos.current.width)
    let radio=(oriPos.current.width/oriPos.current.height).toFixed(2);
    // /data.style.fontSize = (data.style.width / originWidth) * fontSize; 字体计算方式 originWidth 初始长度
    console.log(radio,oriPos)
    const offsetX = e.clientX - oriPos.current.cX;
    const offsetY = e.clientY - oriPos.current.cY;
    // eslint-disable-next-line default-case
    switch (direction.current) {
        // 拖拽移动
        case 'move' :
            // 元素当前位置 + 偏移量
            const top = oriPos.current.top + offsetY;
            const left = oriPos.current.left + offsetX;
            // 限制必须在这个范围内移动 画板的高度-元素的高度
            style.top = top;
            style.left = left;
            break
        // 东
        case 'e':
            // 向右拖拽添加宽度
            style.width += offsetX;
            return style
        // 西
        case 'w':
            // 增加宽度、位置同步左移
            style.width -= offsetX;
            style.left += offsetX;
            console.log('w',style)
            return style
        // 南
        case 's':
            style.height += offsetY;
            console.log('s',style)
            return style
        // 北
        case 'n':
            style.height -= offsetY;
            style.top += offsetY;
            console.log('n',style)
            break
        // 东北
        case 'ne':
            style.height -= offsetY;
            style.top += offsetY;
            style.width += offsetX;
            break
        // 西北
        case 'nw':
            style.height -= offsetY;
            style.top += offsetY;
            style.width -= offsetX;
            style.left += offsetX; 
            break
        // 东南
        case 'se':
            if((((offsetX > 0 && offsetY < 0) && (offsetX > Math.abs(offsetY))) || (offsetX > 0 && offsetY > 0 && offsetX > offsetY) || (offsetX > 0 && offsetY === 0)) ){
                //right
                style.width += offsetX;
                style.height = style.width/radio;
                console.log('right')
            }else if(((offsetY > 0 && offsetX < 0) && (offsetY > Math.abs(offsetX))) || (offsetY > 0 && offsetX > 0 && offsetY > offsetX) || (offsetY > 0 && offsetX == 0) ){
                //down
                style.height += offsetY;
                style.width = style.height*radio;
                
                console.log('down')
            }else if( ( (offsetX < 0  && offsetY > 0) && (Math.abs(offsetX) > offsetY) ) || ( (offsetX < 0 &&  offsetY < 0)  && (Math.abs(offsetX) > Math.abs(offsetY)) ) || (offsetX < 0 && offsetY === 0) ){
                style.width += offsetX;
                style.height = style.width/radio;
            }else if(((offsetY < 0 && offsetX < 0) && Math.abs(offsetY) > Math.abs(offsetX)) || ((offsetY < 0 && offsetX > 0) &&  (Math.abs(offsetY) > offsetX)) || (offsetY < 0 && offsetX === 0)){
                //up
                style.height += offsetY;
                style.width = style.height*radio;
                console.log('up')
            }else{
                style.height += offsetY;
                style.width += offsetX;
            }
            
            break
        // 西南
        case 'sw':
            style.height += offsetY;
            style.width -= offsetX;
            style.left += offsetX;
            break
        case 'rotate':
              // 先计算下元素的中心点, x，y 作为坐标原点
            const x = style.width / 2 + style.left;
            const y = style.height / 2 + style.top;
              // 当前的鼠标坐标
            const x1 = e.clientX;
            const y1 = e.clientY;
              // 运用高中的三角函数
              console.log('1',(y1 - y), (x1 - x))
            style.transform = `rotate(${(Math.atan2((y1 - y), (x1 - x))) *(180 / Math.PI)}deg)`;
            break
    }
    return style
}