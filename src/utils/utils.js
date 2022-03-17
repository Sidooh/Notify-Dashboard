/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
let docReady = function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        setTimeout(fn, 1);
    }
};

let resize = function resize(fn) {
    return window.addEventListener('resize', fn);
};

let isIterableArray = function isIterableArray(array) {
    return Array.isArray(array) && !!array.length;
};

let camelize = function camelize(str) {
    let text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
    return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

let getData = function getData(el, data) {
    try {
        return JSON.parse(el.dataset[camelize(data)]);
    } catch (e) {
        return el.dataset[camelize(data)];
    }
};
/* ----------------------------- Colors function ---------------------------- */


let hexToRgb = function hexToRgb(hexValue) {
    let hex;
    hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    }));
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

let rgbaColor = function rgbaColor() {
    let color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
    let alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
    return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


let getColor = function getColor(name) {
    let dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--falcon-".concat(name)).trim();
};

let getColors = function getColors(dom) {
    return {
        primary: getColor('primary', dom),
        secondary: getColor('secondary', dom),
        success: getColor('success', dom),
        info: getColor('info', dom),
        warning: getColor('warning', dom),
        danger: getColor('danger', dom),
        light: getColor('light', dom),
        dark: getColor('dark', dom)
    };
};

let getSoftColors = function getSoftColors(dom) {
    return {
        primary: getColor('soft-primary', dom),
        secondary: getColor('soft-secondary', dom),
        success: getColor('soft-success', dom),
        info: getColor('soft-info', dom),
        warning: getColor('soft-warning', dom),
        danger: getColor('soft-danger', dom),
        light: getColor('soft-light', dom),
        dark: getColor('soft-dark', dom)
    };
};

let getGrays = function getGrays(dom) {
    return {
        white: getColor('white', dom),
        100: getColor('100', dom),
        200: getColor('200', dom),
        300: getColor('300', dom),
        400: getColor('400', dom),
        500: getColor('500', dom),
        600: getColor('600', dom),
        700: getColor('700', dom),
        800: getColor('800', dom),
        900: getColor('900', dom),
        1000: getColor('1000', dom),
        1100: getColor('1100', dom),
        black: getColor('black', dom)
    };
};

let hasClass = function hasClass(el, className) {
    return el ? el.classList.value.includes(className) : false
};

let addClass = function addClass(el, className) {
    el.classList.add(className);
};

let getOffset = function getOffset(el) {
    let rect = el.getBoundingClientRect();
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};

function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let windowWidth = window.innerWidth || document.documentElement.clientWidth;
    let vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    let horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
    return vertInView && horInView;
}

let breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540
};

let getBreakpoint = function getBreakpoint(el) {
    let classes = el && el.classList.value;
    let breakpoint;

    if (classes) {
        breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
            return cls.includes('navbar-expand-');
        }).pop().split('-').pop()];
    }

    return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


let setCookie = function setCookie(name, value, expire) {
    let expires = new Date();
    expires.setTime(expires.getTime() + expire);
    document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

let getCookie = function getCookie(name) {
    let keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
    return keyValue ? keyValue[2] : keyValue;
};

let settings = {
    tinymce: {
        theme: 'oxide'
    },
    chart: {
        borderColor: 'rgba(255, 255, 255, 0.8)'
    }
};
/* -------------------------- Chart Initialization -------------------------- */

let newChart = function newChart(chart, config) {
    let ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


let getItemFromStore = function getItemFromStore(key, defaultValue) {
    let store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

    try {
        return JSON.parse(store.getItem(key)) || defaultValue;
    } catch (_unused) {
        return store.getItem(key) || defaultValue;
    }
};

let setItemToStore = function setItemToStore(key, payload) {
    let store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
    return store.setItem(key, payload);
};

let getStoreSpace = function getStoreSpace() {
    let store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
    return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};
/* get Dates between */


let getDates = function getDates(startDate, endDate) {
    let interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
    let duration = endDate - startDate;
    let steps = duration / interval;
    return Array.from({
        length: steps + 1
    }, function (v, i) {
        return new Date(startDate.valueOf() + interval * i);
    });
};

let getPastDates = function getPastDates(duration) {
    let days;

    switch (duration) {
        case 'week':
            days = 7;
            break;

        case 'month':
            days = 30;
            break;

        case 'year':
            days = 365;
            break;

        default:
            days = duration;
    }

    let date = new Date();
    let endDate = date;
    let startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
    return getDates(startDate, endDate);
};
/* Get Random Number */


let getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

export const utils = {
    docReady: docReady,
    resize: resize,
    isIterableArray: isIterableArray,
    camelize: camelize,
    getData: getData,
    hasClass: hasClass,
    addClass: addClass,
    hexToRgb: hexToRgb,
    rgbaColor: rgbaColor,
    getColor: getColor,
    getColors: getColors,
    getSoftColors: getSoftColors,
    getGrays: getGrays,
    getOffset: getOffset,
    isScrolledIntoView: isScrolledIntoView,
    getBreakpoint: getBreakpoint,
    setCookie: setCookie,
    getCookie: getCookie,
    newChart: newChart,
    settings: settings,
    getItemFromStore: getItemFromStore,
    setItemToStore: setItemToStore,
    getStoreSpace: getStoreSpace,
    getDates: getDates,
    getPastDates: getPastDates,
    getRandomNumber: getRandomNumber
};