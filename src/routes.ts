import { RouteType } from '@nabcellent/sui-react';
import { FaBell, FaChartPie, FaComments, FaPaperPlane, FaWrench } from "react-icons/all";

export const dashboardRoutes: RouteType = {
    label: 'Dashboard',
    labelDisable: true,
    children: [
        {
            name: 'Dashboard',
            active: true,
            icon: FaChartPie,
            children: [
                { name: 'Home', to: '/', exact: true },
                { name: 'Analytics', to: '/dashboard/analytics', exact: true },
            ]
        }
    ]
};

export const notificationRoutes: RouteType = {
    label: 'Notifications',
    children: [
        {
            name: 'All Notifications',
            icon: FaBell,
            active: true,
            to: '/notifications',
        },
        {
            name: 'Send Notification',
            icon: FaPaperPlane,
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
            icon: FaComments,
            to: '/sms-providers',
            active: true
        },
        {
            name: 'Settings',
            icon: FaWrench,
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