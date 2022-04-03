import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type RouteChildType = {
    name: string
    active: boolean
    icon?: IconProp
    to?: string
    exact?: boolean
    badge?: {
        text?: string
        type?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark',
    }
    children?: RouteChildType[]
}

export type RouteType = {
    label: string
    labelDisable?: boolean
    children: RouteChildType[]
}

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
                    name: 'Default',
                    to: '/',
                    exact: true,
                    active: true
                },
                /*{
                    name: 'Analytics',
                    to: '/dashboard/analytics',
                    active: true
                },
                {
                    name: 'CRM',
                    to: '/dashboard/crm',
                    active: true
                },
                {
                    name: 'E Commerce',
                    to: '/dashboard/e-commerce',
                    active: true
                },
                {
                    name: 'Management',
                    to: '/dashboard/project-management',
                    active: true
                },*/
            ]
        }
    ]
};

export const notificationRoutes: RouteType = {
    label: 'Notifications',
    children: [
        {
            name: 'Send',
            icon: 'paper-plane',
            to: '/notifications/create',
            active: true,
        },
        {
            name: 'SMS',
            icon: 'comments',
            active: true,
            children: [
                {
                    name: 'List',
                    to: '/notifications/sms',
                    active: true
                }
            ]
        },
        {
            name: 'Mail',
            icon: 'envelope',
            active: true,
            children: [
                {
                    name: 'List',
                    to: '/notifications/mail',
                    active: true
                }
            ]
        }
    ]
};

export const appRoutes: RouteType = {
    label: 'App',
    children: [
        {
            name: 'Settings',
            icon: 'wrench',
            to: '/settings',
            active: true
        },
    ]
};

export default [
    dashboardRoutes,
    notificationRoutes,
    appRoutes
];