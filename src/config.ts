export const CONFIG = {
    logging: {
        level: import.meta.env.VITE_LOG_LEVEL
    },
    sidooh: {
        services: {
            accounts: {
                api: {
                    url: import.meta.env.VITE_ACCOUNTS_API_URL,
                },
                dashboard: {
                    url: import.meta.env.VITE_ACCOUNTS_DASHBOARD_URL
                }
            },
            merchants: {
                dashboard: {
                    url: import.meta.env.VITE_MERCHANTS_DASHBOARD_URL,
                }
            },
            notify: {
                api: {
                    url: import.meta.env.VITE_NOTIFY_API_URL,
                }
            },
            payments: {
                dashboard: {
                    url: import.meta.env.VITE_PAYMENTS_DASHBOARD_URL
                }
            },
            products: {
                dashboard: {
                    url: import.meta.env.VITE_PRODUCTS_DASHBOARD_URL
                }
            },
            savings: {
                dashboard: {
                    url: import.meta.env.VITE_SAVINGS_DASHBOARD_URL
                }
            },
            ussd: {
                dashboard: {
                    url: import.meta.env.VITE_USSD_DASHBOARD_URL
                }
            }
        },

        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
};