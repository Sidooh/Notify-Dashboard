export const CONFIG = {
    "sidooh": {
        "services": {
            accounts: {
                "api": {
                    "url": process.env.REACT_APP_SIDOOH_ACCOUNTS_API_URL
                }
            },
            "notify": {
                "api": {
                    "url": process.env.REACT_APP_SIDOOH_NOTIFY_API_URL
                }
            },
            "legacy": {
                "dashboard": {
                    "url": process.env.REACT_APP_SIDOOH_LEGACY_DASHBOARD_URL
                }
            }
        },
        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
}