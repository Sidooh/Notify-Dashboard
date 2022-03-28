import React from 'react';
import {Mail, Telegram} from '@mui/icons-material';
import {NotificationType} from '../utils/types';

type DestinationItem = { recipient: string | number, status: string }

const DestinationChips = ({notification}: { notification: NotificationType }) => {
    let data: DestinationItem[], icon: JSX.Element;

    if (notification.channel === "sms" && notification.notifiable_id) {
        data = notification.notifiable_id.data.map(item => ({status: notification.status, recipient: item.phone}));
    } else {
        data = notification.destination.map(recipient => ({recipient: recipient, status: notification.status}));
    }

    if (notification.channel === "mail") {
        icon = <Mail fontSize={"small"} className={'pe-2'}/>;
    } else if (notification.channel === "sms") {
        icon = <Telegram fontSize={"small"} className={'pe-2'}/>;
    } else {
        icon = <i className={'fab fa-slack pe-2'}/>;
    }

    return (
        <>
            {data.map((item: DestinationItem, i: number) => {
                return (
                    <span key={i}
                          className={`badge badge rounded-pill badge-soft-${item.status === "success" ? "success" : "danger"}`}>
                        {icon}{item.recipient}
                        {<span className={`ms-1 fas fa-${item.status === "success" ? "check" : "xmark"}`}/>}
                    </span>
                );
            })}
        </>
    );
};

export default DestinationChips;