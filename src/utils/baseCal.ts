
export const _cos=(rotate)=>{
    return Math.cos((rotate / 180) * Math.PI)
}

export const _sin=(rotate)=>{
    return Math.sin((rotate / 180) * Math.PI)
}

export const base=(x1,x2)=>{
    return x1-x2
}
export const baseFnCos=(x1,rotate,x2,center)=>{
    return base( x1,center.x)* _cos(rotate) - base(x2,center.y) * _sin(rotate) + center.x
}
export const baseFnSin=(x1,rotate,x2,center)=>{
    return base( x1,center.x)* _sin(rotate) + base(x2,center.y) *_cos(rotate) + center.y
}
