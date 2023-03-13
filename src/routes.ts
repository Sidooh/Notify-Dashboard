import { RouteType } from '@nabcellent/sui-react';

export const dashboardRoutes: RouteType = {
    label: 'Dashboard',
    labelDisable: true,
    children: [
        {
            name: 'Dashboard',
            active: true,
            icon: 'chart-pie',
            children: [
                {
                    name: 'Home',
                    to: '/',
                    exact: true,
                    active: true
                },
            ]
        }
    ]
};

export const notificationRoutes: RouteType = {
    label: 'Notifications',
    children: [
        {
            name: 'Notifications',
            icon: 'comment-sms',
            active: true,
            to: '/notifications',
        },
        {
            name: 'Create Notification',
            icon: 'paper-plane',
            to: '/notifications/create',
            active: true,
        },
    ]
};

export const appRoutes: RouteType = {
    label: 'App',
    children: [
        {
            name: 'SMS Providers',
            icon: 'comments',
            to: '/sms-providers',
            active: true
        },
        {
            name: 'Settings',
            icon: 'wrench',
            to: '/settings',
            active: true
        },
    ]
};

const routes = [
    dashboardRoutes,
    notificationRoutes,
    appRoutes
];

export default routes