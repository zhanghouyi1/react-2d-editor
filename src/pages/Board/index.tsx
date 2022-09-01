import React,{ useState,useRef,createContext,useContext} from 'react';

import {transform,throttle} from '../../utils/utils'
import {Position,difference} from '../../utils/calculation'
import {component} from '../../utils/loadComponent'
import {points,vertex} from '../../utils/data'
import {Context} from '../../App';
import {Variable,Style,Calculate,Rect} from '../../utils/Interface'


export const BoardContext=createContext<Variable>({});
export const Board:React.FC=()=> {
  //数据
  const {data,setData,index,setIndex}=useContext(Context);
 // 画板的
  const [style, setStyle] = useState<Style>({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    rotate:0
  })
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef<Style>()
  
  //控制选择框的显示
  const [show,setShow]=useState<Boolean>(false);
  //是否按下
  const isDown = useRef<Boolean>(false);
  //存储方向操纵的 哪个方向
  const direction=useRef<string|null>();
  //存储当前被操纵的 组件
  const currentCom=useRef<HTMLElement>(null);
  //如果是文字的话 要存下当前的dom 实时获取dom 的宽高 
  const [txtDom,setTxtDom]=useState<HTMLElement>();
  
  //画布dom
  const editor=useRef<HTMLDivElement>();
  const editorOffset=useRef<Rect|null>()
  //
  const vectorData=useRef<Calculate>()
  const targetData=useRef<Calculate>()
  const oppositeData=useRef<Calculate>()

  const [checkTxt,setCheckTxt]=useState<Boolean>(false)

  // 鼠标被按下
  const onMouseDown = (dir:string, e:React.MouseEvent<HTMLDivElement>):void => {
    e.stopPropagation();
    
  // 阻止事件冒泡
  
    if(dir==='none'){
      setShow(false);
      setTxtDom(null);
      setCheckTxt(false)
      setIndex(null)
      // currentCom.current=null;
      return 
    }
    // 保存方向。
    direction.current = dir;
    //确定按下
    isDown.current = true;
    // 然后鼠标坐标是
    const cY:number = e.clientY; // clientX 相对于可视化区域
    const cX:number = e.clientX;

    oriPos.current = {
        ...style,
        cX, cY
    }
    /**元素中心点 */
    const center = {
      x: style.left + style.width / 2,
      y: style.top + style.height / 2,
    };
    // 计算单位向量
    const vector:Calculate =difference(direction.current,style,center)
    vectorData.current=vector;
    editorOffset.current=editor.current.getBoundingClientRect()
  }
// 鼠标移动
  const onMouseMove = throttle((e:React.MouseEvent<HTMLDivElement>):void => {
    // 判断鼠标是否按住
    if (!isDown.current) return;
    let newStyle:Style = transform(direction, oriPos, e,txtDom,vectorData,editorOffset);
    /**字体的改变只有 点击四个斜方向的角才会出现字体大小改变 其他方向操作只会改变区域操作 */
    setStyle(newStyle);
    /**这里导致了数据的变化 会有问题吗 */
    data[index]=Object.assign(data[index],newStyle);
    setData(data);
  },50)
  
    // 鼠标被抬起
  function onMouseUp(e:React.MouseEvent<HTMLDivElement>):void {
    isDown.current = false;
  }
  const doubleClick=():void=>{
    if(txtDom){
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(txtDom)
      selection.removeAllRanges()
      selection.addRange(range);
    }
    setCheckTxt(true)
  }

 /**双击事件 */
  return <BoardContext.Provider value={{data,setData,oriPos,style,setStyle,currentCom,setIndex,show,setShow,setTxtDom,checkTxt}}>
    <div className="drawing-wrap" ref={editor} onMouseDown={onMouseDown.bind(this,'none')} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
            {
              data.map((item,index)=>component(item,index))
            }
            
            {show?<div className="drawing-item" onDoubleClick={doubleClick} onMouseDown={onMouseDown.bind(this, 'move')} style={{width:style.width,height:style.height,top:style.top,left:style.left,transform:`rotate(${style.rotate}deg)`}}>
            {(txtDom?vertex:points).map(item => <div key={item}  className={`control-point point-${item}`}  onMouseDown={onMouseDown.bind(this, item)}></div>)}
            
            <div className="control-point control-rotator" onMouseDown={onMouseDown.bind(this, 'rotate')}></div>
        </div>:null}
        </div>
  </BoardContext.Provider> 
}
