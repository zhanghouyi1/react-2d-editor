/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-07-29 16:28:12
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-12 17:28:24
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
export const transform=(direction, oriPos, e,original,txtDom)=>{
    const {top,left,cX,cY,width,height,rotate}=oriPos.current;
    const style = {...oriPos.current}
    let radio=(oriPos.current.width/oriPos.current.height).toFixed(2);
    // /data.style.fontSize = (data.style.width / originWidth) * fontSize; 字体计算方式 originWidth 初始长度
    const offsetX = e.clientX - oriPos.current.cX;
    const offsetY = e.clientY - oriPos.current.cY;

    const centerX=left+width/2
    const centerY=top+height/2
    console.log('cX',cX)
    /**旋转前的角度 */
    const rotateDegreeBefore=Math.atan2(cY-centerY,cX-centerX)/(Math.PI/180);
    console.log('oriPos',oriPos)
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
            if(txtDom){
                style.height = txtDom.clientHeight;
            }
            return style
        // 西
        case 'w':
            // 增加宽度、位置同步左移
            style.width -= offsetX;
            style.left += offsetX;
            if(txtDom){
                style.height = txtDom.clientHeight;
            }
            return style
        // 南
        case 's':
            style.height += offsetY;
            return style
        // 北
        case 'n':
            style.height -= offsetY;
            style.top += offsetY;
            break
        // 东北
        case 'ne':
            style.height -= offsetY;
            style.top += offsetY;
            style.width = style.height*radio;
            style.fontSize=original.current.fontSize?(style.width / original.current.width) * (original.current.fontSize||20):0
            break
        // 西北
        case 'nw':
            style.height -= offsetY;
            style.top += offsetY;
            style.width =style.height*radio;
            style.left += offsetY*radio;
            style.fontSize=original.current.fontSize?(style.width / original.current.width) * (original.current.fontSize||20):0
            break
        // 东南
        case 'se':
            style.width += offsetX;
            style.height = style.width/radio;
            style.fontSize=original.current.fontSize?(style.width / original.current.width) * (original.current.fontSize||20):0
            break
        // 西南
        case 'sw':
            style.width -= offsetX;
            style.height = style.width/radio;
            // style.height += offsetY;
            // style.width -= offsetX;
            style.left += offsetX;
            style.fontSize=original.current.fontSize?(style.width / original.current.width) * (original.current.fontSize||20):0
            break
        case 'rotate':
            console.log('rotateDegreeBefore',rotateDegreeBefore)
            const curX=e.clientX;
            const curY=e.clientY;
            // 旋转后的角度
            const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
            const result = rotate + rotateDegreeAfter - rotateDegreeBefore
            console.log('rotate',result)
              // 运用高中的三角函数
            style.rotate = result
            break
    }
    return style
}

/**节流函数 */
export const throttle=(fn,delay)=>{
    let timer;
    return (...args)=>{
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this,args)
            timer = null
        },delay)
    }
}

export const calculateSingleElementPosition=(direction)=>{
    const { style } = this.curDesign;
    let result = {};
    if (direction === "nw") {
      result = {
        x: style.left,
        y: style.top,
      };
    } else if (direction === "ne") {
      result = {
        x: style.left + style.width,
        y: style.top,
      };
    } else if (direction === "sw") {
      result = {
        x: style.left,
        y: style.top + style.height,
      };
    } else if (direction === "se") {
      result = {
        x: style.left + style.width,
        y: style.top + style.height,
      };
    } else if (direction === "n") {
      result = {
        x: style.left + style.width / 2,
        y: style.top,
      };
    } else if (direction === "e") {
      result = {
        x: style.left + style.width,
        y: style.top + style.height / 2,
      };
    } else if (direction === "s") {
      result = {
        x: style.left + style.width / 2,
        y: style.top + style.height,
      };
    } else if (direction === "w") {
      result = {
        x: style.left,
        y: style.top + style.height / 2,
      };
    }

    return result;
  }