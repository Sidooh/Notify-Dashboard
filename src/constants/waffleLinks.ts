import { CONFIG } from '../config';

export type WaffleLinkType = {
    avatar?: string
    avatarText?: string
    title?: string
    link?: string
    img?: string
    hr?: boolean
    contentClass?: string
    disabled?: boolean
}

export const waffleLinks: WaffleLinkType[] = [
    {
        avatarText: 'A',
        title: 'Accounts',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    {
        avatarText: 'E',
        title: 'Enterprise',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    {
        avatarText: 'L',
        title: 'Legacy',
        link: CONFIG.sidooh.services.legacy.dashboard.url,
        contentClass: 'bg-soft-primary text-primary'
    },
    {
        avatarText: 'N',
        title: 'Notify',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    {
        avatarText: 'p',
        title: 'Payments',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    {
        avatarText: 'P',
        title: 'Products',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    {
        avatarText: 'S',
        title: 'Savings',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    {
        avatarText: 'U',
        title: 'USSD',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
        disabled:true
    },
    /*{
        avatar: account,
        title: 'Account',
        link: `/user/profile`
    },*/
];
