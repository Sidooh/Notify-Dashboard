import { IMAGES } from './images';

export type AutoCompleteItem = {
    id: number
    url: string
    breadCrumbTexts?: string[]
    categories: string
    key?: string
    text?: string
    type?: 'warning' | 'success' | 'info'
    img?: string
    file?: boolean
    title?: string
    imgAttrs?: {
        class: string
    }
    time?: string
    icon?: {
        img: string
        size: string
        status?: string
    }
}

const autoCompleteInitialItems: AutoCompleteItem[] = [
    {
        id: 1,
        url: '/events/event-detail',
        breadCrumbTexts: ['Pages ', ' Events'],
        categories: 'recentlyBrowsedItems'
    },
    {
        id: 2,
        url: '/e-commerce/customers',
        breadCrumbTexts: ['E-commerce ', ' Customers'],
        categories: 'recentlyBrowsedItems'
    },
    {
        id: 3,
        categories: 'suggestedFilters',
        url: '/e-commerce/customers',
        key: 'customers',
        text: 'All customers list',
        type: 'warning'
    },
    {
        id: 4,
        categories: 'suggestedFilters',
        url: '/events/event-detail',
        key: 'events',
        text: 'Latest events in current month',
        type: 'success'
    },
    {
        id: 5,
        categories: 'suggestedFilters',
        url: '/e-commerce/product/product-grid',
        key: 'products',
        text: 'Most popular products',
        type: 'info'
    },
    {
        id: 6,
        categories: 'suggestionFiles',
        url: '#!',
        img: IMAGES.products['3-thumb'],
        file: true,
        title: 'iPhone',
        imgAttrs: {
            class: 'border h-100 w-100 fit-cover rounded-lg'
        },
        time: '<span class="fw-semi-bold">Antony</span><span class="fw-medium text-600 ms-2">27 Sep at 10:30 AM</span>'
    },
    {
        id: 8,
        url: '/user/profile',
        categories: 'suggestionMembers',
        icon: {
            img: IMAGES.team['2'],
            size: 'l',
            status: 'status-online'
        },
        title: 'Anna Karinina',
        text: 'Technext Limited'
    },
    {
        id: 9,
        url: '/user/profile',
        categories: 'suggestionMembers',
        icon: {
            img: IMAGES.team['1'],
            size: 'l'
        },
        title: 'Antony Hopkins',
        text: 'Brain Trust'
    },
    {
        id: 10,
        url: '/user/profile',
        categories: 'suggestionMembers',
        icon: {
            img: IMAGES.team['3'],
            size: 'l'
        },
        title: 'Emma Watson',
        text: 'Google'
    }
];

export default autoCompleteInitialItems;
