import { Style, Calculate } from './Interface';
import { next } from './midFun';
import { calPosition } from './strategy';

export const _cos = (rotate: number): number => {
    return Math.cos((rotate / 180) * Math.PI);
};

export const _sin = (rotate: number): number => {
    return Math.sin((rotate / 180) * Math.PI);
};

export const base = (x1: number, x2: number): number => {
    return x1 - x2;
};
export const baseFnCos = (x1: number, rotate: number, x2: number, center: Calculate): number => {
    return base(x1, center.x) * _cos(rotate) - base(x2, center.y) * _sin(rotate) + center.x;
};
export const baseFnSin = (x1: number, rotate: number, x2: number, center: Calculate): number => {
    return base(x1, center.x) * _sin(rotate) + base(x2, center.y) * _cos(rotate) + center.y;
};

export const mid = (n: number): number => {
    if (n < 0) {
        return NaN;
    }
    if (n === 0) {
        return 0;
    }
    let low: number = 0;
    let high: number = n;
    let prevMid: number;
    let mid: number = (low + high) / 2;
    do {
        if (mid * mid > n) {
            high = mid;
        } else {
            low = mid;
        }
        prevMid = mid;
        mid = (low + high) / 2;
    } while (Math.abs(prevMid - mid) > 1e-15);
    return parseFloat(mid.toFixed(15));
};
export const Position = (direction: String, style: Style, center: Calculate) => {
    let fn = next({ rotate: style.rotate, center });
    return fn(calPosition[`${direction}`] && calPosition[`${direction}`](style));
};
