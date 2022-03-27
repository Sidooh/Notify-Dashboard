import {ReactNode} from 'react';

export type Children = {
    children: ReactNode
}

export type Notification = {
    id: string;
    channel: string;
    channel_id: bigint;
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

export type Setting = {
    id: string
    type: string
    value: string
}