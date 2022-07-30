export const CONFIG = {
    sidooh: {
        services: {
            accounts: {
                api: {
                    url: import.meta.env.VITE_ACCOUNTS_API_URL,
                }
            },
            notify: {
                api: {
                    url: import.meta.env.VITE_NOTIFY_API_URL,
                }
            },
            legacy: {
                dashboard: {
                    url: "https://sidooh-admin-dashboard-okctxaztla-uc.a.run.app/admin"
                }
            }
        },

        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
};