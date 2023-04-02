import { Model, Status } from '@nabcellent/sui-react';
import { ReactNode } from 'react';
import { Environment } from './enums';

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
    destination: string | string[];
    content: string;
    event_type: string,
    status: Status
    notifiables: Notifiable[]
}

export type Setting = Model & {
    key: string
    value: string
}

export type SMSProvider = Model & {
    name: string
    environment: Environment
    priority: number
    status: Status
}