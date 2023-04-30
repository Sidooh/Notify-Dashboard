import moment from 'moment';
import { hexToRgb, rgbaColor } from "@nabcellent/sui-react";
import { ChartOptions } from "chart.js";
import { merge } from "chart.js/helpers";
import { SMSProvider } from "./enums";

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
    { unTitled: [] }
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

export const defaultLineChartOptions = (options?: ChartOptions<'line'>): ChartOptions<'line'> => merge({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            border: {
                display: false
            },
            grid: {
                color: 'rgba(250, 250, 250, .1)',
            },
            ticks: {
                color: rgbaColor('#0F1B4C', 0.7),
            }
        },
        y: {
            grace: '5%',
            border: {
                display: false
            },
            beginAtZero: true,
            grid: {
                lineWidth: .3
            },
            ticks: {
                color: rgbaColor('#648381', 1),
                font: {
                    weight: 600
                },
                callback: (val: number | string) => Intl.NumberFormat('en', { notation: 'compact' }).format(Number(val))
            }
        },
    },
    elements: {
        line: {
            borderWidth: 0,
            tension: .3,
            fill: true
        },
        point: {
            pointStyle: 'star',
            radius: 5,
            hoverRadius: 10
        }
    },
    plugins: {
        title: {
            padding: {
                bottom: 20
            },
            display: true,
            align: 'start',
            font: {
                size: 17
            },
            color: rgbaColor('#0F1B4C', 0.7),
        },
        legend: {
            display: false,
            labels: {
                usePointStyle: true
            }
        },
        tooltip: {
            padding: {
                x: 10,
                y: 5
            },
            displayColors: false,
        }
    }
}, options)

export const getSMSProviderColor = (provider: SMSProvider, asRGB = false) => {
    let color = '#648381'
    if (provider === SMSProvider.WAVESMS) {
        color = '#EE212E';
    } else if (provider === SMSProvider.WEBSMS) {
        color = '#182838';
    } else if (provider === SMSProvider.AT) {
        color = '#FC9206';
    }

    return asRGB ? hexToRgb(color) : color
}