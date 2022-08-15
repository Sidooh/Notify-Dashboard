import { Model } from '@nabcellent/sui-react';
import { ReactNode } from 'react';

export type Children = {
    children: ReactNode
}

export type Notifiable = Model & {
    message_id: string,
    phone: string,
    description: string,
    status_code: Number,
    status: string
    provider: string
}

export type Notification = Model & {
    channel: string;
    destination: string;
    content: string;
    event_type: string,
    status: string
    notifiables: Notifiable[]
}

export type Setting = Model & {
    key: string
    value: string
}