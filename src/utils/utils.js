/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-07-29 16:28:12
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-08-18 09:46:05
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
export const transform=(direction, oriPos, e,txtDom,unitVector,target,opposite)=>{
    const {top,left,cX,cY,width,height,rotate}=oriPos.current;
    const style = {...oriPos.current}
    const eX=e.clientX;
    const eY=e.clientY
    // /data.style.fontSize = (data.style.width / originWidth) * fontSize; 字体计算方式 originWidth 初始长度
    const offsetX = eX - oriPos.current.cX;
    const offsetY = eY - oriPos.current.cY;

    const centerX=(left+200)+width/2
    const centerY=top+height/2

    const moveVector = {
        x: (offsetX * unitVector.x + offsetY * unitVector.y) *unitVector.x,
        y: (offsetX * unitVector.x + offsetY * unitVector.y) *unitVector.y,
    };
    const newTarget = {
        x: target.x + moveVector.x,
        y: target.y + moveVector.y,
    };
    const cx = (newTarget.x + opposite.x) / 2;
    const cy = (newTarget.y + opposite.y) / 2;
    const _newTarget = calculateRotation(newTarget.x, newTarget.y, cx, cy, -style.rotate);

    const newOpposite = calculateRotation(
      opposite.x,
      opposite.y,
      cx,
      cy,
      -style.rotate
    );
    /**旋转前的角度 */
    const rotateDegreeBefore=Math.atan2(cY-centerY,cX-centerX)/(Math.PI/180);

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
            style.width = _newTarget.x - newOpposite.x;
            style.left = newOpposite.x;
            style.top = newOpposite.y - oriPos.current.height / 2;
            if(txtDom){
                style.height = txtDom.clientHeight;
            }
            return style
        // 西
        case 'w':
            // 增加宽度、位置同步左移
            style.width = newOpposite.x - _newTarget.x;
            style.left = _newTarget.x;
            style.top = _newTarget.y - oriPos.current.height / 2;
            if(txtDom){
                style.height = txtDom.clientHeight;
            }
            return style
        // 南
        case 's':
            style.height = _newTarget.y - newOpposite.y;
            style.left = newOpposite.x - oriPos.current.width / 2;
            style.top = newOpposite.y;
            return style
        // 北
        case 'n':
            style.height = newOpposite.y - _newTarget.y;
        style.left = _newTarget.x - oriPos.current.width / 2;
        style.top = _newTarget.y;
            break
        // 东北
        case 'ne':
            style.width = -newOpposite.x + _newTarget.x;
            style.height = newOpposite.y - _newTarget.y;
            style.left = newOpposite.x;
            style.top = _newTarget.y;
            style.fontSize=oriPos.current.fontSize?(style.width / oriPos.current.width) * (oriPos.current.fontSize||20):0
            break
        // 西北
        case 'nw':
            style.width = newOpposite.x - _newTarget.x;
            style.height = newOpposite.y - _newTarget.y;
            style.left = _newTarget.x;
            style.top = _newTarget.y;
            style.fontSize=oriPos.current.fontSize?(style.width / oriPos.current.width) * (oriPos.current.fontSize||20):0
            break
        // 东南
        case 'se':
            style.width = -newOpposite.x + _newTarget.x;
            style.height = -newOpposite.y + _newTarget.y;
            style.left = newOpposite.x;
            style.top = newOpposite.y;
            // style.width += offsetX;
            // style.height = style.width/radio;
            style.fontSize=oriPos.current.fontSize?(style.width / oriPos.current.width) * (oriPos.current.fontSize||20):0
            break
        // 西南
        case 'sw':
            style.width = newOpposite.x - _newTarget.x;
            style.height = -newOpposite.y + _newTarget.y;
            style.left = _newTarget.x;
            style.top = newOpposite.y;
            style.fontSize=oriPos.current.fontSize?(style.width / oriPos.current.width) * (oriPos.current.fontSize||20):0
            break
        case 'rotate':
            const curX=eX;
            const curY=eY;
            // 旋转后的角度
            const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
            const result = rotate + rotateDegreeAfter - rotateDegreeBefore
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

export const calculateSingleElementPosition=(direction,curDesign)=>{
    const style  = {...curDesign};
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

  export const calculateRotation=(x1, y1, x2, y2, angle)=>{
    const cos = Math.cos((angle / 180) * Math.PI);
    const sin = Math.sin((angle / 180) * Math.PI);
  
    const x = x1 - x2;
    const y = y1 - y2;

    return {
      x: x * cos - y * sin + x2,
      y: x * sin + y * cos + y2,
    };
  }