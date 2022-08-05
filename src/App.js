import { useState,useRef,useContext,createContext } from 'react';
import './App.css';
import {transform} from './utils/utils'
import {_Component} from './utils/loadComponent'
import {_map} from './utils/data'

const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'];
function App() {
 // 画板的
  const [style, setStyle] = useState({
    left: 100,
    top: 100,
    width: 100,
    height: 100
  })
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef({
    top: 0, // 元素的坐标
    left: 0,
    cX: 0, // 鼠标的坐标
    cY: 0
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
  const setCurrentCom=useRef(null);
  //如果是文字的话 要存下当前的dom 实时获取dom 的宽高 
  const [txtDom,setTxtDom]=useState(null)


  // 鼠标被按下
  const onMouseDown = (dir, e) => {
    e.stopPropagation();
    
  // 阻止事件冒泡
  
    if(dir==='none'){
      setShow(false);
      setTxtDom(null);
      setCurrentCom.current=null;
      console.log('haha')
      return 
    }
    console.log(111)
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
  }
// 鼠标移动
  const onMouseMove = (e) => {
    // 判断鼠标是否按住
    if (!isDown.current) return
    let newStyle = transform(direction, oriPos, e);
    /**字体的改变只有 点击四个斜方向的角才会出现字体大小改变 其他方向操作只会改变区域操作 */
    setStyle(newStyle);
    //这里说明 选择了文字组件
    if(txtDom){
        if(direction.current==='se'){
          console.log('aa',newStyle.width, oriPos.current.fontSize)
          newStyle.fontSize=(newStyle.width / oriPos.current.width) * 20;
          console.log('newStyle.fontSize',newStyle.fontSize)
        }
    }
    _map[index]=Object.assign(_map[index],newStyle)
  }
  
    // 鼠标被抬起
  function onMouseUp(e) {
    isDown.current = false;
  }
 /**选择元素 */
 const checkBox=(item,index,ref)=>{
  console.log('qaaa')
  setCurrentCom.current=item
  oriPos.current.fontSize=item.fontSize
  console.log('oriPos',oriPos)
  const {left,top,width,height}=item;
  let clientWidth=null,clientHeight=null;
  if(ref){
    setTxtDom(ref.current)
    clientWidth=ref.current.clientWidth;
    clientHeight=ref.current.clientHeight;
  }
  setStyle({
    left,
    top,
    width:clientWidth?clientWidth:width,
    height:clientHeight?clientHeight:height
  });
  setIndex(index)
  setShow(true);
 }
 /**双击事件 */

  return <div className="drawing-wrap" onMouseDown={onMouseDown.bind(this,'none')} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
            {
              _map.map((item,index)=>_Component(item,index,checkBox))
            }
            
            {show?<div className="drawing-item" onMouseDown={onMouseDown.bind(this, 'move')} style={style}>
            {points.map(item => <div key={item}  className={`control-point point-${item}`} onMouseDown={onMouseDown.bind(this, item)}></div>)}
            
            {/* <div className="control-point control-rotator" onMouseDown={onMouseDown.bind(this, 'rotate')}></div> */}
        </div>:null}
        </div>
}

export default App;
