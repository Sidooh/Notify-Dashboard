import moment from 'moment';
import Toastify from 'toastify-js';

export const getColor = function getColor(name: string) {
    let dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--falcon-".concat(name)).trim();
};

export const camelize = (str: string) => {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const getItemFromStore = (key: string, defaultValue?: string | boolean, store = localStorage) => {
    try {
        return JSON.parse(String(store.getItem(key))) || defaultValue;
    } catch {
        return store.getItem(key) || defaultValue;
    }
};

export const hasClass = (el: HTMLElement, className: string) => {
    if (!el) return false;
    return el.classList.value.includes(className);
};

export const setItemToStore = (key: string, payload: string, store = localStorage) => store.setItem(key, payload);

export const isIterableArray = (array: any) => Array.isArray(array) && !!array.length;

//  routes helper
export const flatRoutes = (children: any) => {
    const allChildren: any[] = [];

    const flatChild = (children: any) => {
        children.forEach((child: any) => {
            if (child.children) {
                flatChild(child.children);
            } else {
                allChildren.push(child);
            }
        });
    };
    flatChild(children);

    return allChildren;
};

export const getFlatRoutes = (children: any) => children.reduce(
    (acc: any, val: any) => {
        if (val.children) {
            return {
                ...acc,
                [camelize(val.name)]: flatRoutes(val.children)
            };
        } else {
            return {
                ...acc,
                unTitled: [...acc.unTitled, val]
            };
        }
    },
    {unTitled: []}
);


/** ------------------------------------    DATE HELPERS
 * */
const REFERENCE = moment(); // fixed just for testing, use moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");
const A_WEEK_OLD = REFERENCE.clone().subtract(7, "days").startOf("day");

export const isToday = (momentDate: any) => momentDate.isSame(TODAY, "d");
export const isYesterday = (momentDate: any) => momentDate.isSame(YESTERDAY, "d");
export const isWithinAWeek = (momentDate: any) => momentDate.isAfter(A_WEEK_OLD);
export const isTwoWeeksOrMore = (momentDate: any) => !isWithinAWeek(momentDate);


type ToastDataType = {
    type: 'success' | 'info' | 'warning' | 'danger';
    msg: string;
    duration?: number | undefined;
    close?: boolean | undefined;
    gravity?: 'top' | 'bottom' | undefined;
    position?: 'left' | 'center' | 'right' | undefined;
}
export const toast = (data: ToastDataType) => {
    let duration = (data.duration ?? 7) * 1000,
        type = data.type ?? 'success',
        close = data.close ?? true;

    Toastify({
        text: data.msg,
        duration: duration,
        close: close,
        gravity: data.gravity ?? 'bottom',
        position: data.position ?? 'right',
        className: type,
    }).showToast();
};

export const JWT = {
    decode: (token: string) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
};

export const isFunction = (v: any) => typeof v === 'function';

export const fakeAuth = () => new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
});

export const capitalize = (str: string) => (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');


/** ----------------------------------------    Break Points
 * */
export const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540
};

const vendor = ((navigator && navigator.vendor) || '').toLowerCase();
const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();

// build a 'comparator' object for various comparison checks
let comparator = {
    '<': (a: any, b: string) => a < b,
    '<=': (a: any, b: string) => a <= b,
    '>': (a: any, b: string) => a > b,
    '>=': (a: any, b: string) => a >= b
};

// helper function which compares a version to a range
function compareVersion(version: any, range?: string) {
    let string: string = (range + '');
    let n = +(string.match(/\d+/) || NaN);
    let op: string = string.match(/^[<>]=?|/) ? string.match(/^[<>]=?|/)![0] : "";

    // @ts-ignore
    return comparator[op] ? comparator[op](version, n) : (version === n);
}

// is current operating system windows?
export const is = {
    windows: () => {
        return window.navigator.appVersion.indexOf('Win') !== -1;
    },
    chrome: (range?: string): boolean => {
        let match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && !is.opera() && compareVersion(match[1], range);
    },
    opera: (range?: string): boolean => {
        let match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    firefox: (range?: string): boolean => {
        let match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    }
};