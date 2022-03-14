import React from 'react';
import {Mail, Telegram} from '@mui/icons-material';

const DestinationChips = ({notification}) => {
    let data, icon;
    if (notification.channel === "sms" && notification.notifiable_id) {
        data = notification.notifiable_id.data.map(notif => ({...notif, recipient: notif.phone}));
    } else {
        data = notification.destination.map(notif => ({recipient: notif, status: notification.status}));
    }

    if (notification.channel === "mail") {
        icon = <Mail fontSize={"small"} style={{paddingLeft: "7px"}}/>;
    } else if (notification.channel === "sms") {
        icon = <Telegram fontSize={"small"} className={'pe-2'}/>;
    } else {
        icon = <i className={'fab fa-slack'} style={{paddingLeft: "7px"}}/>;
    }

    return (
        <>
            {data.map((data, i) => {
                return (
                    <span key={i} className={`badge badge rounded-pill badge-soft-${data.status === "success" ? "success" : "error"}`}>
                        {icon}{data.recipient}<span className="ms-1 fas fa-check" data-fa-transform="shrink-2"/>
                    </span>
                );
            })}
        </>
    );
};

export default DestinationChips;
