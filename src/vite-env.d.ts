/// <reference types="vite/client" />

import { LogLevel } from '@nabcellent/sui-react';

interface ImportMetaEnv {
    readonly VITE_LOG_LEVEL: LogLevel

    readonly VITE_ACCOUNTS_API_URL: string
    readonly VITE_NOTIFY_API_URL: string

    readonly VITE_ACCOUNTS_DASHBOARD_URL: string
    readonly VITE_MERCHANTS_DASHBOARD_URL: string
    readonly VITE_PAYMENTS_DASHBOARD_URL: string
    readonly VITE_PRODUCTS_DASHBOARD_URL: string
    readonly VITE_SAVINGS_DASHBOARD_URL: string
    readonly VITE_USSD_DASHBOARD_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}