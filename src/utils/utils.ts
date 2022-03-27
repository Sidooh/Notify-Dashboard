let getColor = function getColor(name: string) {
    let dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--falcon-".concat(name)).trim();
};

export const utils = {
    docReady: function docReady(fn: () => void) {
        // see if DOM is already available
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            setTimeout(fn, 1);
        }
    },
    getGrays: function getGrays() {
        return {
            white: getColor('white'),
            100: getColor('100'),
            200: getColor('200'),
            300: getColor('300'),
            400: getColor('400'),
            500: getColor('500'),
            600: getColor('600'),
            700: getColor('700'),
            800: getColor('800'),
            900: getColor('900'),
            1000: getColor('1000'),
            1100: getColor('1100'),
            black: getColor('black')
        };
    },

    hasClass: function hasClass(el: HTMLElement, className: string) {
        if (!el) return false;
        return el.classList.value.includes(className);
    },

    getColors: function getColors() {
        return {
            primary: getColor('primary'),
            secondary: getColor('secondary'),
            success: getColor('success'),
            info: getColor('info'),
            warning: getColor('warning'),
            danger: getColor('danger'),
            light: getColor('light'),
            dark: getColor('dark')
        };
    },

    /* ---------------------------------- Store --------------------------------- */

    getItemFromStore: function getItemFromStore(key: string, defaultValue?: string) {
        const store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

        try {
            return JSON.parse(store.getItem(key)) || defaultValue;
        } catch (_unused) {
            return store.getItem(key) || defaultValue;
        }
    },

    setItemToStore: function setItemToStore(key: string, payload: string | boolean) {
        const store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
        return store.setItem(key, payload as string);
    },
};