/**用于策略模式 */
import {
    nwPosition,
    nePosition,
    swPosition,
    sePosition,
    nPosition,
    ePosition,
    sPosition,
    wPosition,
} from './calculFunc';

export const calPosition = {
    nw: nwPosition,
    ne: nePosition,
    sw: swPosition,
    se: sePosition,
    n: nPosition,
    e: ePosition,
    s: sPosition,
    w: wPosition,
};

export const points: object = {
    e: 'w',
    w: 'e',
    s: 'n',
    n: 's',
    ne: 'sw',
    nw: 'se',
    se: 'nw',
    sw: 'ne',
};
