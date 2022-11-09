import React from 'react';
import './index.less'

export const Top:React.FC=()=>{
    return <div className='topContaint'>
        <div className='left'></div>
        <div className='middle'></div>
        <div className='right'>
            <div className='btn'>
                还未完成
            </div>
        </div>
    </div>
}