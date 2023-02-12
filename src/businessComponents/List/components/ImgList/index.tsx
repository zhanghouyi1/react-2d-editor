import React, { useContext } from 'react';
import './index.less';
import { Child } from '@/utils/Interface';

import { Context } from '@/App';
interface Props {
    list: Array<Child>;
}

export const ImgList: React.FC<Props> = ({ list }) => {
    const { setCurrentItem, proportion } = useContext(Context);
    const dragStart = (e: number) => {
        list[e].width = list[e].width * proportion;
        list[e].height = list[e].height * proportion;
        if (list[e].fontSize) {
            list[e].fontSize = list[e].fontSize * proportion;
        }

        console.log('list[e]', list[e]);
        setCurrentItem(list[e]);
    };
    return (
        <div className="imgList">
            {list.map((item, index) => (
                <div key={item.name} draggable={true} onDragStart={dragStart.bind(this, index)}>
                    <img src={item.url} />
                </div>
            ))}
        </div>
    );
};
