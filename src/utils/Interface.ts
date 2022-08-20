export interface Item{
    top?:number,
    left?:number,
    id?:string,
    width?:number
}

export interface Style{
    left: number,
    top: number,
    width: number,
    height: number,
    rotate:number,
    fontSize?:number,
    zIndex?:number,
    background?:string,
    txt?:string,
    cX?: number,
    cY?: number,
}
export interface Variable{
    data?:Child[],
    setData?:Function,
    setCurrentItem?:Function,
    oriPos?:any,
    style?:Style,
    setStyle?:Function,
    currentCom?:any,
    setIndex?:Function,
    show?:Boolean,
    setShow?:Function,
    setTxtDom?:Function,
    checkTxt?:Boolean
}



export interface Calculate{
    x:number,
    y:number
}

export interface Child{
    type:string,
    name?:string,
    icon?:string,
    width?: number,
    url?:any,
    height?: number,
    background?: string,
    left?: number,
    rotate?:number,
    top?: number,
    txt?:string,
    borderRadius?:string,
    border?:string
    fontSize?:number,
    zIndex?:number,
    id?:string
}

export interface Props{
    item:Child,
    index:number
}

export interface TableData{
    type:string,
}

export interface Rect{
    x?:number,
    y?:number,
    left?:number,
    top?:number
}