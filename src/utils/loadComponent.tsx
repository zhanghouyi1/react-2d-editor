import React from 'react';
import { Img } from '../components/Img';
import { Table } from '../components/Table';
import { Div } from '../components/Div';
import { Txt } from '../components/Txt';
import { Svg } from '../components/Svg';
import { Child } from './Interface';

export const component = (item: Child, index: number): any => {
    switch (item.type) {
        case 'img':
            return <Img key={item.id} item={item} index={index} />;
        case 'graphical':
            return <Div key={item.id} item={item} index={index} />;
        case 'txt':
            return <Txt key={item.id} item={item} index={index} />;
        case 'svg':
            return <Svg key={item.id} item={item} index={index} />;
        case 'table':
            return <Table key={item.id} item={item} index={index} />;
    }
};
