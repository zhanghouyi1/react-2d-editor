import React,{ useState,useRef,createContext} from 'react';
import './App.css';
import {transform,throttle,calculateSingleElementPosition,calculateRotation} from './utils/utils'
import {_Component} from './utils/loadComponent'
import {element,points,vertex,opposition} from './utils/data'

export const Context=createContext({});

function App() {
 // 画板的
  const [style, setStyle] = useState({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    rotate:0
  })
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef({
    top: 0, // 元素的坐标
    left: 0,
    cX: 0, // 鼠标的坐标
    cY: 0,
  })
  //选择了哪个 元素的坐标
  const [index,setIndex]=useState(0);
  //控制选择框的显示
  const [show,setShow]=useState(false);
  //是否按下
  const isDown = useRef(false);
  //存储方向操纵的 哪个方向
  const direction=useRef(null);
  //存储当前被操纵的 组件
  const currentCom=useRef(null);
  //如果是文字的话 要存下当前的dom 实时获取dom 的宽高 
  const [txtDom,setTxtDom]=useState(null);
  //数据
  let [data,setData]=useState(element);

  //
  const unitVectorData=useRef()
  const targetData=useRef()
  const oppositeData=useRef()

  const [checkTxt,setCheckTxt]=useState(false)
  const original=useRef({
    width:null,
    fontSize:null
  })
  // 鼠标被按下
  const onMouseDown = (dir, e) => {
    e.stopPropagation();
    
  // 阻止事件冒泡
  
    if(dir==='none'){
      setShow(false);
      setTxtDom(null);
      setCheckTxt(false)
      // currentCom.current=null;
      return 
    }
    // 保存方向。
    direction.current = dir;
    //确定按下
    isDown.current = true;
    // 然后鼠标坐标是
    const cY = e.clientY; // clientX 相对于可视化区域
    const cX = e.clientX;

    oriPos.current = {
        ...style,
        cX, cY
    }

    let target=calculateSingleElementPosition(direction.current,style);
    let opposite = calculateSingleElementPosition(opposition[direction.current],style);
    const designCenter = {
      x: style.left + style.width / 2,
      y: style.top + style.height / 2,
    };
    target = calculateRotation(
      target.x,
      target.y,
      designCenter.x,
      designCenter.y,
      style.rotate || 0
    );
    targetData.current=target
    opposite = calculateRotation(
      opposite.x,
      opposite.y,
      designCenter.x,
      designCenter.y,
      style.rotate || 0
    );
    oppositeData.current=opposite
    // 计算单位向量
    const unitVector = {
      x: target.x - opposite.x,
      y: target.y - opposite.y,
    };
    const a = Math.sqrt(unitVector.x * unitVector.x + unitVector.y * unitVector.y);
      unitVector.x /= a;
      unitVector.y /= a;
    unitVectorData.current=unitVector
  }
// 鼠标移动
  const onMouseMove = throttle((e) => {
    // 判断鼠标是否按住
    if (!isDown.current) return;
    let newStyle = transform(direction, oriPos, e,original,txtDom,unitVectorData.current,targetData.current,oppositeData.current);
    /**字体的改变只有 点击四个斜方向的角才会出现字体大小改变 其他方向操作只会改变区域操作 */
    setStyle(newStyle);
    /**这里导致了数据的变化 会有问题吗 */
    data[index]=Object.assign(data[index],newStyle);
    setData(data);
  },50)
  
    // 鼠标被抬起
  function onMouseUp(e) {
    isDown.current = false;
  }
  const doubleClick=()=>{
    setCheckTxt(true)
  }

 /**双击事件 */
  return <Context.Provider value={{data,setData,oriPos,style,setStyle,currentCom,setIndex,show,setShow,setTxtDom,original,checkTxt}}>
    <div className="drawing-wrap" onMouseDown={onMouseDown.bind(this,'none')} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
            {
              data.map((item,index)=>_Component(item,index))
            }
            
            {show?<div className="drawing-item" onDoubleClick={doubleClick} onMouseDown={onMouseDown.bind(this, 'move')} style={{width:style.width,height:style.height,top:style.top,left:style.left,transform:`rotate(${style.rotate}deg)`}}>
            {(txtDom?vertex:points).map(item => <div key={item}  className={`control-point point-${item}`}  onMouseDown={onMouseDown.bind(this, item)}></div>)}
            
            <div className="control-point control-rotator" onMouseDown={onMouseDown.bind(this, 'rotate')}></div>
        </div>:null}
        </div>
  </Context.Provider> 
}

export default App;
