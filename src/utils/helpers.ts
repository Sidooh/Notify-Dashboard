import moment from "moment";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const REFERENCE = moment(); // fixed just for testing, use moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");
const A_WEEK_OLD = REFERENCE.clone().subtract(7, "days").startOf("day");

interface ToastDataType {
    type: 'success' | 'info' | 'warning' | 'danger';
    msg: string;
    duration?: number | undefined;
    close?: boolean | undefined;
    gravity?: 'top' | 'bottom' | undefined;
    position?: 'left' | 'center' | 'right' | undefined;
}

export const Helpers = {
    isToday: (momentDate: any) => momentDate.isSame(TODAY, "d"),
    isYesterday: (momentDate: any) => momentDate.isSame(YESTERDAY, "d"),
    isWithinAWeek: (momentDate: any) => momentDate.isAfter(A_WEEK_OLD),
    isTwoWeeksOrMore: (momentDate: any) => !Helpers.isWithinAWeek(momentDate),

    toast: (data: ToastDataType) => {
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
    },
    isFunction: (v: any) => typeof v === 'function',
    fakeAuth: () => new Promise((resolve) => {
        setTimeout(() => resolve('2342f2f1d131rf12'), 250);
    }),
    JWT: {
        decode: (token: string) => {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
    }
};