import moment from 'moment';

export const camelize = (str: string) => {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const hasClass = (el: HTMLElement, className: string) => {
    if (!el) return false;
    return el.classList.value.includes(className);
};
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


export const isFunction = (v: any) => typeof v === 'function';

export const createMarkup = (html: any) => ({ __html: html });