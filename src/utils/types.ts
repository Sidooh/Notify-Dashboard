import {ReactNode} from 'react';

export type Children = {
    children: ReactNode
}

export type NotificationType = {
    id?: string;
    channel: string;
    destination: string[];
    content: string;
    event_type: string,
    provider: string,
    status: string
    created_at: string;
    notifiable_type: string,
    notifiable_id: {
        data: [{
            message_id: string,
            phone: string,
            description: string,
            status_code: Number,
            status: string
        }]
    }
}

export type SettingType = {
    id?: string
    type: string
    value: string
}

export type AccountType = {
    id: number
    phone: string
    active: boolean
}

export type UserType = {
    id: number
    email: string
    name: string
}